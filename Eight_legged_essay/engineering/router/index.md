SPA 是 single page web application 的简称，译为单页Web应用。
简单的说 SPA 就是一个WEB项目只有一个 HTML 页面，一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转。
取而代之的是利用 JS 动态的变换 HTML 的内容，从而来模拟多个视图间跳转。
路由就是实现SPA的核心思想

## hash路由

### 原理
由于 hash 值的变化不会导致浏览器像服务器发送请求，而且 hash 的改变会触发 hashchange 事件，浏览器的前进后退也能对其进行控制，通过 hashchange 监听 hash 变化，并定义 hash 变化时的回调函数

## history路由

### 原理
总的来说就是利用下面三个方法：
```
history.pushState();         // 添加新的状态到历史状态栈
history.replaceState();      // 用新的状态代替当前状态
history.state                // 返回当前状态对象
```
对于单页应用的 history 模式而言，url 的改变只能由下面四种方式引起：

- 点击浏览器的前进或后退按钮
- 点击 a 标签
- 在 JS 代码中触发 history.pushState 函数
- 在 JS 代码中触发 history.replaceState 函数

接下来只需要：
1. 监听 popstate 用于处理前进后退时调用对应的回调函数
2. 全局阻止A链接的默认事件，获取A链接的href属性，并调用 history.pushState 方法
3. 创建一个路由对象, 实现 register 方法用于注册每个 location.pathname 值对应的回调函数，并处理异常情况

### 注意
history 在修改 url 后，虽然页面并不会刷新，但我们在手动刷新，或通过 url 直接进入应用的时候，
服务端是无法识别这个 url 的。因为我们是单页应用，只有一个 html 文件，服务端在处理其他路径的 url 的时候，就会出现404的情况。
所以，如果要应用 history 模式，需要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回单页应用的 html 文件。

## hash 模式相比于 history 模式的优点：

兼容性更好，可以兼容到IE8
无需服务端配合处理非单页的url地址

hash 模式相比于 history 模式的缺点：

看起来更丑。
会导致锚点功能失效。
相同 hash 值不会触发动作将记录加入到历史栈中，而 pushState 则可以。