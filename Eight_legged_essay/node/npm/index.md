## 初始化
`npm init`
填写基础信息
```
package name: (cli) gogocode-cli
version: (1.0.0) 
description: my-first-cli
entry point: (index.js) 
keywords: npm cli
author: tbw
```

## npm包的结构

- bin 执行命令行的代码
- lib 源码
- dist 编译之后的代码
- package.json 基本配置文件

## 配置cli命令行

在package.json文件下配置bin字段，如：
```
{
     "name": "test",
     "version": "1.0.0",
     "bin":{
         "output-cli":"index.js"  
     }
}
```
当我们在对应目录下输入output-cli命令时，会执行bin文件夹下的index.js文件

注意对应的index.js文件头部要加上这行脚本声明环境变量`#!/usr/bin/env node`

### npm link
npm link命令可以将一个任意位置的npm包链接到全局执行环境，从而在任意位置使用命令行都可以直接运行该npm包。
- 为npm包目录创建软链接，将其链到全局文件夹{prefix}/lib/node_modules/<package>
- 为可执行文件(bin)创建软链接，将其链到{prefix}/bin/{name}

## 发布

npm pulish

## 添加typescript

### 安装typescript

`npm i typescript -D`

### 配置tsconfig.json

通过命令行自动生成

`npx tsc --init`

配置示例如下：
```
{
  "compilerOptions": {
      "module": "commonjs",   //指定生成哪个模块系统代码
      "target": "es6",        //目标代码类型
      "noImplicitAny": false, //在表达式和声明上有隐含的'any'类型时报错。
      "sourceMap": true,     //用于debug   
      "rootDir": "lib",      
      "outDir": "./dist",     //重定向输出目录。   
      "watch": true            //在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。
  },
  "include": [
    "lib"
  ],
  "exclude":[
      "static",
      "node_modules"
  ]
}
```

### 添加编译三方包

- 添加ts-node: npm install ts-node -D，在node中使用它来实现实时编译和运行
- 添加nodemon: npm install nodemon -D，只要文件被改变，就会调用ts-node

### 设置 ts 编译命令

使用tsc，如：
```
"scripts": {
    "build": "tsc --build"
}
```

## 持续集成
添加 CI（持续集成）

1. 登录 Travis CI
2. 点击 “Sign in with Github”
3. 勾选需要持续集成的项目

在项目添加 travis 的配置文件
.travis.yml

```
language : node_js
node_js :
 - stable
install:
 - npm install
script:
 - npm test
```

将配置推送到 Github 的远程仓库。查看 travis 构建状态。

## 推荐三方库

### 构建复杂命令行

- commander
- terminal-kit

### 测试框架和断言

- mocha
- chai

### 测试代码覆盖率

- istanbul
- coveralls
