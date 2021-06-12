## 关于模块
Node 中，每个文件模块都是一个对象，它的定义如下：
```
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

module.exports = Module;

var module = new Module(filename, parent);
```

所有的模块都是 Module 的实例。可以看到，当前模块（module.js）也是 Module 的一个实例。

## 模块加载

1、先计算模块路径
2、如果模块在缓存里面，取出缓存
3、加载模块
4、输出模块的 exports 属性即可

```
// require 其实内部调用 Module._load 方法
Module._load = function(request, parent, isMain) {
  //  计算绝对路径
  var filename = Module._resolveFilename(request, parent);

  //  第一步：如果有缓存，取出缓存
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;

  // 第二步：是否为内置模块
  if (NativeModule.exists(filename)) {
    return NativeModule.require(filename);
  }

  /********************************这里注意了**************************/
  // 第三步：生成模块实例，存入缓存
  // 这里的Module就是我们上面的1.1定义的Module
  var module = new Module(filename, parent);
  Module._cache[filename] = module;

  /********************************这里注意了**************************/
  // 第四步：加载模块
  // 下面的module.load实际上是Module原型上有一个方法叫Module.prototype.load
  try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete Module._cache[filename];
    }
  }

  // 第五步：输出模块的exports属性
  return module.exports;
};
```

## 模块导出

node 导出模块有两种方式:
- exports.xxx=xxx 
- Module.exports={}

exports 其实就是 module.exports

module.exports vs exports

很多时候，你会看到，在Node环境中，有两种方法可以在一个模块中输出变量：

方法一：对module.exports赋值：
```
// hello.js

function hello() {
    console.log('Hello, world!');
}

function greet(name) {
    console.log('Hello, ' + name + '!');
}

module.exports = {
    hello: hello,
    greet: greet
};
```

方法二：直接使用exports：
```
// hello.js

function hello() {
    console.log('Hello, world!');
}

function greet(name) {
    console.log('Hello, ' + name + '!');
}

function hello() {
    console.log('Hello, world!');
}

exports.hello = hello;
exports.greet = greet;
```
但是你不可以直接对exports赋值：
```
// 代码可以执行，但是模块并没有输出任何变量:
exports = {
    hello: hello,
    greet: greet
};
```
如果你对上面的写法感到十分困惑，不要着急，我们来分析Node的加载机制：

首先，Node会把整个待加载的hello.js文件放入一个包装函数load中执行。在执行这个load()函数前，Node准备好了module变量：
```
var module = {
    id: 'hello',
    exports: {}
};
```
load()函数最终返回module.exports：
```
var load = function (exports, module) {
    // hello.js的文件内容
    ...
    // load函数返回:
    return module.exports;
};

var exportes = load(module.exports, module);
```
也就是说，默认情况下，Node准备的exports变量和module.exports变量实际上是同一个变量，并且初始化为空对象{}，于是，我们可以写：
```
exports.foo = function () { return 'foo'; };
exports.bar = function () { return 'bar'; };
```
也可以写：
```
module.exports.foo = function () { return 'foo'; };
module.exports.bar = function () { return 'bar'; };
```
换句话说，Node默认给你准备了一个空对象{}，这样你可以直接往里面加东西。

但是，如果我们要输出的是一个函数或数组，那么，只能给module.exports赋值：

`module.exports = function () { return 'foo'; };`
给exports赋值是无效的，因为赋值后，module.exports仍然是空对象{}。

结论
如果要输出一个键值对象{}，可以利用exports这个已存在的空对象{}，并继续在上面添加新的键值；

如果要输出一个函数或数组，必须直接对module.exports对象赋值。

所以我们可以得出结论：直接对module.exports赋值，可以应对任何情况：
```
module.exports = {
    foo: function () { return 'foo'; }
};
```
或者：

`module.exports = function () { return 'foo'; };`
最终，我们强烈建议使用module.exports = xxx的方式来输出模块变量，这样，你只需要记忆一种方法。