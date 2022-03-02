## 常用配置
### 热更新
   热更新一共有三种配置方式：
   - webpack's Watch Mode
   - webpack-dev-server
   - webpack-dev-middleware
   第一种需要通过刷新浏览器才能应用代码中的更新，不推荐；第二种，是基于第三种的封装，如果没有自定义设置的需求，可以使用

### 清理dist
   设置output:{clean: true}，在每次构建前清理 /dist 文件夹，这样只会生成用到的文件。

### 源码映射
   举个栗子，报错时控制台能显示出出错的具体是哪一行代码，配置devtool: 'inline-source-map'

### 开发/生产环境配置分离
   在开发环境中，我们需要：强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。而生产环境目标则转移至其他方面，关注点在于压缩 bundle、更轻量的 source map、资源优化等，通过这些优化方式改善加载时间。
   具体实现方法：webpack-merge

### TreeShaking
   移除 JavaScript 上下文中的未引用代码。在项目的 package.json 文件中，添加 "sideEffects" 属性。

### 引用全局变量、导入全局模块
   使用ProvidePlugin
   

## 常用插件

### HtmlWebpackPlugin
会用新生成的 index.html 文件，替换我们的原有文件，并将所有的 bundle 自动添加到 html 中。

### MiniCssExtractPlugin
将 CSS 从主应用程序中分离，将 CSS 以<link>的方式通过 URL 的方式引入进来

### SplitChunksPlugin
可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。

### ProvidePlugin
引用全局变量

## 有助于理解原理的概念

### manifest
当编译器(compiler)开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为 "Manifest"，当完成打包并发送到浏览器时，会在运行时通过 Manifest 来解析和加载模块。无论你选择哪种模块语法，那些 import 或 require 语句现在都已经转换为 __webpack_require__ 方法，此方法指向模块标识符(module identifier)。通过使用 manifest 中的数据，runtime 将能够查询模块标识符，检索出背后对应的模块。

### runtime
runtime，以及伴随的 manifest 数据，主要是指：在浏览器运行时，webpack 用来连接模块化的应用程序的所有代码。runtime 包含：在模块交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。

## 基础优化配置

### bundle分析

- webpack-chart: webpack stats 可交互饼图。
- webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- webpack-bundle-analyzer：一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。
- webpack bundle optimize helper：这个工具会分析你的 bundle，并提供可操作的改进措施，以减少 bundle 的大小。
- bundle-stats：生成一个 bundle 报告（bundle 大小、资源、模块），并比较不同构建之间的结果。

### 预获取和预加载

- prefetch(预获取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。
- prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。
- prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

### 动态导入

第一种，也是推荐选择的方式，使用import()。
第二种，使用 webpack 特定的 require.ensure

### 缓存
将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法

## 拓展

### PWA
渐进式应用，从电脑端到移动端，从在线到离线，在不同层次的环境下保证页面的正常显示

## 踩坑记录

- 目前webpack-dev-server与webpack5还不兼容，建议使用webpack-dev-middleware
- 使用react、vue框架将js挂载到HTML根节点时，注意在HtmlWebpackPlugin里配置自定义模板