## webpack优化

### 性能数据分析工具

- webpack-chart: webpack stats 可交互饼图。
- webpack-visualizer: 可视化并分析你的 bundle，检查哪些模块占用空间，哪些可能是重复使用的。
- webpack-bundle-analyzer：一个 plugin 和 CLI 工具，它将 bundle 内容展示为一个便捷的、交互式、可缩放的树状图形式。
- webpack bundle optimize helper：这个工具会分析你的 bundle，并提供可操作的改进措施，以减少 bundle 的大小。
- bundle-stats：生成一个 bundle 报告（bundle 大小、资源、模块），并比较不同构建之间的结果。
- speed-measure-webpack-plugin，打包速度分析

### 编译速度优化
1. 缩小构建目标/减少文件搜索范围

1.1 合理配置扩展名搜索规则，加快搜索效率
```
resolve: {
    // 引入的默认后缀名,一个个找,排序策略: 文件多的放前面,比如.ts
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
}
```

1.2 使用alias添加别名，加快查找模块速度
1.3 合理配置exclude、include

3. 使用缓存，babel-loader、cache-loader，在重新打包的时候利用缓存，提高打包速度，不过webpack5内置了缓存功能

4. 使用多线程/多进程构建，thread-loader、HappyPack，加快打包速度，建议在大型项目中使用

5. 预编译资源模块，三方库代码分离，DllPlugin、DllReferencePlugin，每次更改我本地代码的文件的时候，webpack只需要打包我项目本身的文件代码，而不会再去编译第三方库。

### 编译体积优化

1. 优化压缩css，清除无用css，optimize-css-assets-webpack-plugin
2. 优化和压缩js，terser-webpack-plugin，webpack5自带 
3. 图片优化，image-webpack-loader，图片资源体积压缩；webpack-spritesmith，雪碧图，减少资源请求数。
4. lodash按需引入，lodash作为项目中常用的三方工具库，伴随着强大功能的同时也带来了打包体积过大的困扰。可以通过以下方式解决：
- lodash-webpack-plugin，babel-plugin-lodash，去除未引入的模块，类似tree-shaking
- 改用lodash-es，es6模块化的版本，默认支持tree-shaking

