## 本地安装（window）
#### Microsoft C++ 生成工具
1. <font style="color:rgb(53, 56, 65);">下载 </font>[Microsoft C++ 生成工具](https://visualstudio.microsoft.com/zh-hans/visual-cpp-build-tools/)<font style="color:rgb(53, 56, 65);"> 安装程序并打开它以开始安装。</font>
2. <font style="color:rgb(53, 56, 65);">在安装过程中，选中“使用 C++ 的桌面开发”选项。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743500956324-4d929534-24e0-4cf3-ad21-ac86ff4f2bce.png)

#### WebView2
> <font style="color:rgb(23, 24, 28);">WebView 2 已安装在 Windows 10（从版本 1803 开始）和更高版本的 Windows 上。如果你正在这些版本之一上进行开发，则可以跳过此步骤。</font>
>

#### 下载并安装 Rust
<font style="color:rgb(53, 56, 65);">前往 </font>[https://www.rust-lang.org/zh-CN/tools/install](https://www.rust-lang.org/zh-CN/tools/install)<font style="color:rgb(53, 56, 65);"> 下载 </font>`<font style="color:rgb(53, 56, 65);">rustup</font>`<font style="color:rgb(53, 56, 65);">。</font>

> <font style="color:rgb(53, 56, 65);">安装前先设置</font>[rust的国内镜像源](https://blog.csdn.net/CherishTaoTao/article/details/142611442?ops_request_misc=%257B%2522request%255Fid%2522%253A%252278333402df6ad86cfd11540be40804ce%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=78333402df6ad86cfd11540be40804ce&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-142611442-null-null.142^v102^pc_search_result_base7&utm_term=Rust%E7%8E%AF%E5%A2%83%E5%AE%89%E8%A3%85%E9%85%8D%E7%BD%AE&spm=1018.2226.3001.4187)，加快安装！！！
>

安装完成后查看版本

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743501400284-6dcf64ca-e970-4d40-a9be-8919a6515321.png)

## 创建项目
安装完成后 即可创建项目

```typescript
// 创建项目
pnpm create tauri-app
// 进入目录
cd tauri-app
// 安装依赖
pnpm install
// 启动
pnpm tauri dev
```

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743502543225-94c759e4-7909-4328-b104-c70557c4f8a1.png)

## demo
#### 调用系统弹窗
```vue
<template>
  <main class="container">
    <h1>Welcome to Tauri + Vue</h1>

    // ...
    <div class="block1">
      <el-button type="success" @click="handleMsg">消息提示</el-button>
    </div>
    <br>
      // ...
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { isPermissionGranted, sendNotification, requestPermission } from '@tauri-apps/plugin-notification';

const handleMsg = async () => {
  sendNotification({
    title: 'New Image',
    body: 'Check out this picture'
  });
}
</script>
```

 ![](https://cdn.nlark.com/yuque/0/2025/gif/613636/1743503210730-b7c84911-9c46-43ca-a0a8-87b6ff5f2380.gif)

#### 联调rust
##### 调用greet方法，将文案展示到屏幕上
```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            lib2::get_printer_list
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

```rust
<template>
  <main class="container">
    <h1>Welcome to Tauri + Vue</h1>

    <form class="row" @submit.prevent="greet">
      <input id="greet-input" v-model="name" placeholder="Enter a name..." />
      <button type="submit">Greet</button>
    </form>
    <p>{{ greetMsg }}</p>
    <div class="block1">
      <el-button type="success" @click="handleMsg">消息提示</el-button>
    </div>
    <br>
  </main>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { invoke } from "@tauri-apps/api/core";
import { isPermissionGranted, sendNotification, requestPermission } from '@tauri-apps/plugin-notification';

const greetMsg = ref<string>("");
async function greet() {
    
  greetMsg.value = await invoke("greet", { name: name.value }) as string;
}
</script>

```

![](https://cdn.nlark.com/yuque/0/2025/gif/613636/1743503527247-6a8596a5-3e16-49d7-811b-bb8f3ee22237.gif)

##### 获取本地打印机列表
先安装依赖模块([printers](https://docs.rs/printers/2.1.2/printers/))，

[rust依赖库](https://docs.rs/)

```rust
[package]
name = "tauri-app"
version = "0.1.0"
description = "A Tauri App"
authors = ["you"]
edition = "2021"

[dependencies]
tauri = { version = "2", features = [] }
tauri-plugin-opener = "2"
printers = "2.1.2" // 打印机模块
serde = { version = "1", features = ["derive"] }
serde_json = "1"
tauri-plugin-notification = "2"

```

```rust
use printers::{get_default_printer, get_printers};
use serde::Serialize;

#[derive(Serialize)]
pub struct PrinterInfo {
    name: String,
    driver: Option<String>,
    state: Option<String>,
    is_default: bool,
}

#[tauri::command]
pub fn get_printer_list() -> Vec<PrinterInfo> {
    let default_printer = get_default_printer();
    get_printers()
        .into_iter()
        .map(|printer| PrinterInfo {
            name: printer.name.clone(),
            driver: Some(printer.driver_name.clone()),
            state: Some(format!("{:?}", printer.state)),
            is_default: default_printer
                .as_ref()
                .map_or(false, |default| printer.name == default.name),
        })
        .collect()
}
```

```vue
<template>
  <main class="container">
    <h1>Welcome to Tauri + Vue</h1>

    <form class="row" @submit.prevent="greet">
      <input id="greet-input" v-model="name" placeholder="Enter a name..." />
      <button type="submit">Greet</button>
    </form>
    <p>{{ greetMsg }}</p>
    <div class="block1">
      <el-button type="success" @click="handleMsg">消息提示</el-button>
    </div>
    <br>
      <div class="block2">
        <el-select v-model="printer" placeholder="请选择打印机" style="width: 200px">
          <el-option v-for="item in printersList" :key="item.name" :label="item.name" :value="item.name">
          </el-option>
        </el-select>
        <el-button type="primary">打印</el-button>
      </div>
    </main>
</template>
<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { invoke } from "@tauri-apps/api/core";
  import { isPermissionGranted, sendNotification, requestPermission } from '@tauri-apps/plugin-notification';

  const greetMsg = ref<string>("");
  const name = ref<string>("");
  const printersList = ref<any>([]);
  const printer = ref<string>('');

  async function greet() {
    greetMsg.value = await invoke("greet", { name: name.value }) as string;
  }
  async function getPrintersList() {
    printersList.value = await invoke("get_printer_list");
    printer.value = printersList.value.filter((d: any) => { return !!d.is_default })[0].name
    console.log(printersList.value, 'printersList.')
  }
  const handleMsg = async () => {
    // const activeNotifications = await active();
    // console.log(123123, activeNotifications)
    sendNotification({
      title: '新窗口消息',
      body: 'hello world!!!!!'
    });
  }
  onMounted(async () => {
    getPrintersList()
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }

    console.log(permissionGranted, 'permissionGranted')
  })
</script>

```

![](https://cdn.nlark.com/yuque/0/2025/gif/613636/1743503811844-f52e53c4-6dc0-49f3-96d4-23ad7d9050ee.gif)

## 打包
##### 打包配置（exe和msi）
```vue
{
  ...
    "bundle": {
      "targets": "msi",
      "windows": {
        "wix": {
          "language": "zh-CN",
          "template": null,
          "bannerPath": null,
          "dialogImagePath": null
        }
      },
      "active": true,
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/128x128@2x.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ]
    }
}
```

**！！！打包之间会可能会遇到下载 **[**WiX等其它打包文件失败**](about:blank)**，需要下载对应的资源放本地。**

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743560301972-dbcefb0b-6b54-4e74-be56-056775e7af36.png)

```powershell
// 解决完后，然后执行
pnpm tauri build
```

##### 安装后的产物
![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743561110347-6aade6fd-526e-45d5-a784-83e97e16487a.png)

