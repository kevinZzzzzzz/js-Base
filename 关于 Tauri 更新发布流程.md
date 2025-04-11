接上文 [Tauri 环境安装以及demo调试](https://sharing8.yuque.com/tgxpqb/cooms5/qvokpdpgfc5bcmif)，此文将介绍tauri应用如何配置更新设置以及更新发布流程（[项目地址](https://git.sharing8.cn/zhangyingjie/tauri-exe)）

## 相关依赖安装
```json
"@tauri-apps/plugin-process": "~2",
"@tauri-apps/plugin-updater": "~2",
```

```toml
[package]
name = "tauri-test"
version = "0.1.0"
description = "A Tauri App"
authors = ["you"]
edition = "2021"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[lib]
# The `_lib` suffix may seem redundant but it is necessary
# to make the lib name unique and wouldn't conflict with the bin name.
# This seems to be only an issue on Windows, see https://github.com/rust-lang/cargo/issues/8519
name = "tauri_test_lib"
crate-type = ["staticlib", "cdylib", "rlib"]

[build-dependencies]
tauri-build = { version = "2", features = [] }

[dependencies]
tauri = { version = "2", features = ["tray-icon"] }
tauri-plugin-opener = "2"
printers = "2.1.2"
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tauri-plugin-notification = "2"
tauri-plugin-clipboard-manager = "2.2.1"
tauri-plugin-process = "2"
tauri-plugin-log = "2"


[target.'cfg(not(any(target_os = "android", target_os = "ios")))'.dependencies]
tauri-plugin-global-shortcut = "2"
tauri-plugin-updater = "2"

```

## 项目配置
#### 生成密钥
目录终端输入以下命令行，key名可自定义(这里叫myapp)

```shell
pnpm tauri signer generate -w signer/myapp.key
```

然后会需要你设置一个密码 **secretKey**， **需要记住这个密码 后续要用!!!**

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1744264124258-c885470d-3469-4e4a-ba2d-2b9b2e15b5e5.png)

生成密钥、公钥到指定路径下

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1744263901152-8ecb54ae-79ed-472e-8263-d486bdb9c143.png)

<font style="color:rgb(77, 77, 77);">配置系统环境变量</font>

```powershell
// 设置密钥
$env:TAURI_SIGNING_PRIVATE_KEY="密钥"
// 设置刚才的secretKey
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD="secretKey"

```

#### tauri配置文件
```json
{
  ...
  "plugins": {
    "updater": {
      "active": true,
      "windows": {
        "installMode": "passive"
      },
      "pubkey": "公钥",
      "endpoints": [
        // 这是远程服务器最新资源的地址
        "http://192.168.120.178:3000/download/latest/latest.json"
      ],
      "dangerousInsecureTransportProtocol": true
    }
  }
}
```

配置说明

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1744264470760-c5615e2b-76de-4197-925f-e7019949f6f3.png)

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1744264512110-ee8f2911-fd1b-49fb-84d6-1b6d64447c8a.png)

#### 依赖暗装完事后需要配置权限
```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Capability for the main window",
  "windows": [
    "main"
  ],
  "permissions": [
    // 更新权限
    "updater:default",
    "updater:allow-check",
    "updater:allow-download",
    "updater:allow-install",
    "core:default",
    "opener:default",
    "process:default",
    "log:default",
    "notification:default",
    "notification:allow-show",
    "notification:allow-is-permission-granted",
    "notification:allow-notify",
    "global-shortcut:allow-is-registered",
    "global-shortcut:allow-register",
    "global-shortcut:allow-unregister",
    "clipboard-manager:allow-read-text",
    "clipboard-manager:allow-write-text"
  ]
}
```

#### 初始化插件
```rust
// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
// ...
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        // 初始化插件
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            my_custom_command,
            lib2::get_printer_list
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

```

## 核心功能实现
#### 检查更新和更新下载的
```rust
import { check } from "@tauri-apps/plugin-updater"
import { ElMessage, ElMessageBox } from "element-plus"
import { relaunch } from "@tauri-apps/plugin-process"
export default () => {
// 检查更新
  const checkV = async () => {
    return await check()
      .then((e: any) => {
        if (!e?.available) {
          return
        }
        return {
          version: e.version,
          meg: e.body,
          date: e.date,
        }
      })
      .catch((e) => {
        console.error("检查更新错误，请稍后再试 " + e)
      })
  }
// 下载更新并安装
  const updater = async () => {
    ElMessageBox.confirm("您确认要更新吗 ?", "系统提示", {
      confirmButtonText: "更新",
      cancelButtonText: "不更新",
      type: "success",
    })
      .then(async () => {
        ElMessage({
          type: "success",
          message: "正在下载更新，请稍等",
        })

        await check()
          .then(async (e: any) => {
            if (!e?.available) {
              return
            }
            await e.downloadAndInstall((event: any) => {
              switch (event.event) {
                case "Started":
                  ElMessage({
                    type: "success",
                    message:
                      "文件大小：" + event.data.contentLength
                        ? event.data.contentLength
                        : 0,
                  })
                  break
                case "Progress":
                  ElMessage({
                    type: "success",
                    message: "正在下载" + event.data.chunkLength,
                  })
                  break
                case "Finished":
                  ElMessage({
                    type: "success",
                    message: "安装包下载成功，10s后重启并安装",
                  })
                  setTimeout(async () => {
                    // 安装
                    await relaunch()
                  }, 10000)
                  break
              }
            })
          })
          .catch((e) => {
            console.error("检查更新错误，请稍后再试 " + e)
          })
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "您已取消更新",
        })
      })
  }

  return {
    checkV,
    updater,
  }
}

```

然后项目启动、调试

```rust
pnpm tauri dev
```

## 项目打包
```rust
pnpm tauri build
```

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1744265450618-d109b75e-5fda-4516-b104-22435dee4fdf.png)

完后按提示需要输入刚才的 **secretKey， 并获得最终产物**

## 服务端
这里用node+koa 简单搭建了一个本地服务。

然后分别对tauri项目打包两次，生成两个不同版本的安装包

接着创建一个download的文件夹放置安装包，该文件夹结构如下图。

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1744266363832-ffac4ceb-9e11-461d-aeaa-1af2df3c9cb2.png)

每个版本除了有msi安装包之外，还得有一个json文件记录更新内容，**需要区分版本号**

```jsx
{
  "version": "0.1.0",
  "notes": "初始化",
  "pub_date": "Thu Apr 10 2025 11:15:18 GMT+0800 (中国标准时间)",
  "platforms": {
    "windows-x86_64": {
      "signature": "dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVUd3VYeFhzRkFUMjJCQVRoQkw5RFNlWW9vczBLaWtYQ05ZajFrNERFdFgvN1dURmgxNGNucTRGUGY0SmIvb0xJeWJTbFI1VWpxdk5RRWhOSklTQ2VCTC9IL2NjU0tIR3drPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzQ0MjU0ODIwCWZpbGU6dGF1cmktZXhlXzAuMS4wX3g2NF96aC1DTi5tc2kKZ0VoSjNFaCtHSXZHUVJ5dFpjaFJ4SFQwcnFYMysrUU84aEFNNUkzZnB5SS9kaDZ1aDNnSXJZRVlqWlNWTTY0emlDN2pEMmk0TkgrS0FMQzRLai9nQlE9PQo=",
      "url": "http://192.168.120.178:3000/download/v0.1.0/tauri-exe.msi"
    }
  }
}
```

+ <font style="color:rgba(0, 0, 0, 0.75);">signature： 是我们刚才打包的产物中 xxx\src-tauri\target\release\bundle\xxx.sig 生成的内容</font>
+ <font style="color:rgba(0, 0, 0, 0.75);">url： 该msi安装包放置在服务器上位置（即下载地址）</font>

#### 核心代码
```jsx
import koa from "koa"
import koaRouter from "koa-router"
import fs from "fs"
import path from "path"
import mime from "mime-types"

const app = new koa()
const router = new koaRouter()
// MIME类型映射表
const MIME_TYPES = {
  ".txt": "text/plain",
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
}
// 访问 download 文件夹内容的路由
router.get("/download/:version/:filename", async (ctx) => {
  try {
    const { version, filename } = ctx.params
    const filePath = path.join(process.cwd(), "download", version, filename)

    // 1. 验证文件存在性
    await fs.promises.access(filePath, fs.constants.F_OK)
    // 获取文件状态
    const stats = await fs.promises.stat(filePath)
    // 获取文件扩展名
    const ext = path.extname(filename).toLowerCase()
    // 设置响应头
    const mimeType = MIME_TYPES[ext] || "application/octet-stream"

    // 对于可执行文件和安装包，强制下载
    const isExecutable = /\.(exe|msi|dmg|pkg|deb|rpm|zip|rar|7z)$/i.test(
      filename
    )
    if (isExecutable) {
      ctx.set({
        "Content-Type": "application/octet-stream",
        "Content-Length": stats.size,
        "Cache-Control": "no-store", // 禁用缓存
        "Content-Disposition": `attachment; filename="${filename}"`,
      })
      ctx.body = fs.createReadStream(filePath, {
        encoding: null, // 禁用文本编码
        autoClose: true,
      })
      return false
    }
    ctx.set("Content-Type", mimeType)
    ctx.set("Content-Length", stats.size)
    ctx.set("Content-Disposition", "inline")

    // 创建文件流
    const fileStream = await fs.createReadStream(filePath)
    ctx.body = fileStream
  } catch (error) {
    console.error("文件下载错误:", error)
    ctx.status = 404
    const notFoundPage = await fs.readFile(
      path.join(process.cwd(), "404.html"),
      "utf-8"
    )
    ctx.body = notFoundPage
  }
})

app.use(router.routes())
app.use(router.allowedMethods())

// 处理所有未匹配的路由
app.use(async (ctx) => {
  if (ctx.status === 404) {
    const notFoundPage = await fs.readFile(
      path.join(process.cwd(), "404.html"),
      "utf-8"
    )
    ctx.body = notFoundPage
  }
})

app.listen(3000, () => {
  console.log("Server running at http://192.168.120.178:3000")
})

```

## 演示
首先打开浏览器，输入旧版本安装包的下载地址

![](https://cdn.nlark.com/yuque/0/2025/gif/613636/1744267918235-4ad3cb80-c2da-4879-a02a-9820989f27e8.gif)

按照向导逐步执行安装

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1744267944393-3b790d55-51b7-4a66-91ea-4064450f03e7.png)

界面如图所示，该版本号为**0.1.0**

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1744267944803-69d860ee-df57-43ca-9079-c1cb4168c7ba.png)

然后点击界面上** 检查更新 **按钮，程序会自动拉取根据**tauri.conf.js**文件中 **plugins - updater - endpoints**配置的服务器最新资源的地址去查找，并比较版本号，一旦有新版本可以选择安装更新。操作流程如下：

![](https://cdn.nlark.com/yuque/0/2025/gif/613636/1744268460617-de05748d-f922-49a5-9ed2-519a1873dbb9.gif)

