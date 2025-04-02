# 系统模板
## 技术选型
+ 框架 vue3
+ 状态管理 pinia
+ 组件库 element-plus
+ 路由 vue-router4
+ 打包构建工具 vite/rullup
+ node版本>= 20.12.0

## 项目落地
方式一：拉取远程仓库代码(**main分支**)

```shell
git clone https://git.sharing8.cn/zhangyingjie/system-template.git
```

方式二：npm安装 

```shell
// 全局安装
npm i -g kevinzzz-cli@latest
// 创建模板
kevin create [项目名]
// 回车选择 -> 系统平台模板(vue+ts+vite)
```

+ 快速启动

```shell
// 安装依赖
pnpm install
// 启动项目
pnpm dev
```

+ 项目打包

```shell
pnpm build:dev // 测试
pnpm build:prod // 生产
```

## 目录介绍
```markdown
system-template
├── .eslintrc.cjs                  # ESLint配置文件
├── commitlint.config.cjs          # 提交信息校验配置
├── lint-staged.config.cjs         # lint-staged配置
├──.prettierrc.cjs                 # Prettier配置文件
├──.stylelintrc.cjs                # Stylelint配置文件
├── postcss.config.cjs             # PostCSS配置文件
├──.env.development                # 开发环境变量配置
├──.env.production                 # 生产环境变量配置
├──.env.test                       # 测试环境变量配置
├──.env                            # 环境变量配置模板
├── .gitignore                     # Git忽略文件配置
├──.husky                          # Husky配置目录
│   ├── commit-msg                 # 提交信息校验脚本
│   └── pre-commit                 # 提交前校验脚本
├── README.md                      # 项目说明文档
├── build                          # vite构建相关配置目录
│   ├── getEnv.ts                  # 环境变量处理工具
│   ├── plugins.ts                 # Vite插件配置
│   └── proxy.ts                   # 代理配置文件
├── index.html                     # 项目入口HTML文件
├── package.json                   # 项目依赖配置文件
├── pnpm-lock.yaml                 # pnpm锁定文件
├── public                         # 静态资源目录
├── src                            # 项目源代码目录
│   ├── App.vue                    # 项目根组件
│   ├── api                        # API接口管理目录
│   │   ├── config                 # API配置
│   │   │   └── servicePort.ts     # 服务端口配置
│   │   ├── helper                 # API辅助工具
│   │   │   ├── axiosCancel.ts     # 请求取消处理
│   │   │   └── checkStatus.ts     # 状态码处理
│   │   ├── index.ts               # API实例配置文件
│   │   ├── interface              # 接口类型定义
│   │   │   └── index.ts           # 接口类型主文件
│   │   └── modules                # 模块化API
│   ├── assets                     # 静态资源目录
│   │   ├── fonts                  # 字体文件
│   │   ├── iconfont               # 图标字体
│   │   │   ├── iconfont.scss      # 图标字体样式
│   │   │   └── iconfont.ttf       # 图标字体文件
│   │   ├── icons                  # SVG图标
│   │   ├── images                 # 图片资源
│   │   ├── json                   # JSON数据文件
│   │   └── mock                   # Mock数据
│   │       └── Easy-Mock-API.zip  # EasyMock API数据包
│   ├── components                 # 公共组件目录
│   │   ├── ECharts                # ECharts图表组件
│   │   ├── ErrorMessage           # 错误信息组件
│   │   ├── Grid                   # 网格布局组件
│   │   ├── ImportExcel            # Excel导入组件
│   │   ├── Loading                # 加载组件
│   │   └── locale                 # 组件本地化配置
│   │       ├── en.ts              # 英文语言包
│   │       └── zh.ts              # 中文语言包
│   ├── config                     # 项目配置目录
│   │   ├── index.ts               # 配置主文件
│   │   └── nprogress.ts           # 进度条配置
│   ├── directives                 # 自定义指令目录
│   │   ├── index.ts               # 指令主文件
│   │   └── modules                # 指令模块
│   ├── enums                      # 枚举定义目录
│   │   └── httpEnum.ts            # HTTP相关枚举
│   ├── hooks                      # 组合式函数目录
│   │   ├── interface              # 类型定义
│   │   │   └── index.ts           # 类型定义主文件
│   ├── languages                  # 多语言配置目录
│   │   ├── index.ts               # 多语言主文件
│   │   └── modules                # 语言模块
│   ├── layouts                    # 布局组件目录
│   │   ├── LayoutClassic          # 经典布局
│   │   ├── LayoutColumns          # 列式布局
│   │   ├── LayoutTransverse       # 横向布局
│   │   ├── LayoutVertical         # 纵向布局
│   │   ├── components             # 布局子组件
│   │   ├── index.vue              # 布局主文件
│   │   ├── indexAsync.vue         # 异步布局主文件
│   │   └── locale                 # 语言包
│   ├── main.ts                    # 项目入口文件
│   ├── routers                    # 路由配置目录
│   │   ├── index.ts               # 路由主文件
│   │   └── modules                # 路由模块
│   │       ├── dynamicRouter.ts   # 动态路由配置
│   │       └── staticRouter.ts    # 静态路由配置
│   ├── stores                     # 状态管理目录
│   │   ├── helper                 # 状态管理辅助工具
│   │   │   └── persist.ts         # 持久化配置
│   │   ├── index.ts               # 状态管理主文件
│   │   ├── interface              # 状态管理类型定义
│   │   │   └── index.ts           # 状态管理类型主文件
│   │   └── modules                # 状态管理模块
│   ├── styles                     # 样式目录
│   │   ├── common.scss            # 公共样式
│   │   ├── element-dark.scss      # Element Plus 暗黑主题样式
│   │   ├── element.scss           # Element Plus 默认样式
│   │   ├── reset.scss             # 样式重置
│   │   ├── theme                  # 主题配置
│   │   └── var.scss               # 全局变量
│   ├── typings                    # 类型定义目录
│   │   ├── global.d.ts            # 全局类型定义
│   │   ├── utils.d.ts             # 工具类型定义
│   │   └── window.d.ts            # Window 对象类型扩展
│   ├── utils                      # 工具函数目录
│   ├── views                      # 页面视图目录
│   │   ├── locale                 # 多语言示例页面
│   │   │   ├── en.ts              # 英文语言包
│   │   │   └── zh.ts              # 中文语言包
│   └── vite-env.d.ts              # Vite 环境变量类型定义
├── tsconfig.json                  # TypeScript 配置文件
└── vite.config.ts                 # Vite 配置文件
```

# 项目规范
## 类型定义规范
```markdown
├── src                            # 项目源代码目录
│   ├── api                        # API接口管理目录
│   │   ├── config                 # API配置
│   │   │   └── servicePort.ts     # 服务端口配置
│   │   ├── helper                 # API辅助工具
│   │   │   ├── axiosCancel.ts     # 请求取消处理
│   │   │   └── checkStatus.ts     # 状态码处理
│   │   ├── index.ts               # API实例配置文件
│   │   ├── interface              # 接口类型定义
│   │   │   └── index.ts           # 接口类型主文件
│   │   └── modules                # 模块化API
```

在**/api/interface/index.ts** 需要对入参及出参的数据类型进行定义，如下所示：

```tsx
// 登录模块
export namespace Login {
  export interface ReqLoginForm {
    username: string; // 用户名
    password: string; // 密码
    [key: string]: any; // 扩展
  }
  export interface ResLogin {
    access_token: string; // token
    [key: string]: any;
  }
}
```

接口根据模块设计，在/modules文件夹下定义模块文件夹

例如：在/modules/login.ts，定义一个用户登录接口，要求该接口入参( ReqLoginForm )需要username和password，出参 ( ResLogin ) 定义了登录成功后返回的 Token 

```tsx
import { Login } from "@/api/interface/index";
/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: Login.ReqLoginForm): Promise<{ data: any{} }> => {
  return http.post<Login.ResLogin>(`/login`, params, { loading: false });
};

```

![画板](https://cdn.nlark.com/yuque/0/2025/jpeg/613636/1743487394185-2c129e28-3519-428b-b4d3-fffc9aa76e10.jpeg)

## 代码编写规范
项目配置**eslint**、**prettierrc**等代码风格和要求，可在对应的文件下设置和拓展，**作为一个约束作用**，

并在打包和提交代码时会做强制的代码规范的校验，**未通过校验会直接中断**

## 提交规范
项目添加了husky钩子，每次提交代码都会进行对提交语句的规范验证，**未通过验证会直接中断提交**

```markdown
本地初始化husky

```
  pnpm prepare
```
```
  type - 提交类型
      feat：新功能（feature）
      fix：修补bug
      docs：文档（documentation）
      style： 格式（不影响代码运行的变动）
      refactor：重构（即不是新增功能，也不是修改bug的代码变动）
      test：增加测试
      chore：构建过程或辅助工具的变动

  user - 提交人
  story - tapd故事id
  bug - tapd缺陷id

  e.g:   git commit -m "fix: xxxxxx --user=xxx --story=xxx" || git commit -m "fix: xxxxx --user=xxx --bug=xxx"
```
```

+ 错误的提交方式

```markdown
git commit -m 'save'
```

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743415263990-24cb9356-50c1-4af7-8833-76a43e0fe643.png)

```markdown
git commit -m 'feat: save'
```

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743415263929-35771191-26a5-4aaf-8b04-d41ce2743e11.png)

```markdown
git commit -m 'feat: save --user=xxx'
```

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743415263936-383bdbe4-baf7-469c-a16a-cd955b3273c0.png)

+ 正确的提交方式

```markdown
git commit -m 'feat: save --user=xxx --story=xxx'
```

![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743415263744-020f3e78-704a-4306-bac5-77ee6ec208ab.png)

## 分支管理策略
### <font style="color:rgb(37, 41, 51);">分支分类</font>
#### Git主分支（保留分支）：master、develop
主要分支：Master和Develop。master用于正式发布，develop用于日常开发。

如果想正式对外发布，就在Master分支上，对Develop分支进行"合并"（merge）

```plain
// 切换到 Master 分支
git checkout master

// 对 Develop 分支进行合并
git merge --no-ff develop
```

> --no-ff参数是什么意思？默认情况下，Git执行"快进式合并"（fast-farward merge），会直接将Master分支指向Develop分支。
>
> ![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743476652254-bbfc4890-0ebb-4b7b-9d0a-e1f468649e34.png)
>
> 使用--no-ff参数后，会执行正常合并，在Master分支上生成一个新节点。为了保证版本演进的清晰，建议采用这种做法。
>
> ![](https://cdn.nlark.com/yuque/0/2025/png/613636/1743476672395-650ceed5-31b6-42a6-ac59-4c88c40b7b5d.png)
>



#### Git辅助分支（临时分支）：feature、release、fixbug
除了常设分支以外，还有一些临时性分支，用于应对一些特定目的的版本开发。临时性分支主要有三种：

+ 功能（feature）分支，<font style="color:rgb(37, 41, 51);">是为了开发某种特定功能，从Develop分支上面分出来，</font>**<font style="color:rgb(37, 41, 51);">开发完成后，再并入Develop</font>**<font style="color:rgb(37, 41, 51);">。 功能分支的名字，可以采用feature-*的形式命名</font>
+ 预发布（release）分支，<font style="color:rgb(37, 41, 51);">发布正式版本之前（即合并到Master分支之前），我们可能需要有一个预发布的版本进行测试。从Develop分支上面分出来的，</font>**<font style="color:rgb(37, 41, 51);">预发布结束以后，必须合并进Develop和Master分支</font>**<font style="color:rgb(37, 41, 51);">。它的命名，可以采用release-*的形式。</font>
+ 修补bug（fixbug）分支，<font style="color:rgb(37, 41, 51);">从Master分支上面分出来的。</font>**<font style="color:rgb(37, 41, 51);">修补结束以后，再合并进Master和Develop分支</font>**<font style="color:rgb(37, 41, 51);">。它的命名，可以采用fixbug-*的形式</font>

<font style="color:rgb(37, 41, 51);">这三种分支都属于</font>**<font style="color:rgb(37, 41, 51);">临时性需要，使用完以后应该删除</font>**<font style="color:rgb(37, 41, 51);">，使得代码库的常设分支始终只有Master和Develop。</font>

## <font style="color:rgb(37, 41, 51);">版本规范</font>
版本号通常由三个部分组成：主版本号（Major）、次版本号（Minor）和补丁版本号（Patch），

格式:  主版本号.次版本号.补丁版本号 

+ 主版本号：当项目整体重写，或出现不向后兼容的改变时，增加主版本号。当主版本号为 0 时表示软件还处于开发阶段。
+ 次版本号：表示功能迭代，当出现新功能需求时，增加次版本号。
+ 补丁版本号：表示小修改，如修复 Bug，当修复完Bug时，增加补丁版本号。





