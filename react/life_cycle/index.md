### React生命周期

**前言**

&emsp;&emsp;在初学react时经常会碰到接口调用异常、props取值异常、state取值异常等各种各样的问题，究其根本就是对react生命周期理解不到位，深入理解各种狗子函数执行顺序非常重要，所以在这做个总结。

**图解**

![image](https://user-images.githubusercontent.com/46807600/62606191-404e0580-b92e-11e9-8fb3-0a41be185d15.png)

**理解**

- 初始化阶段

  -  设置默认属性
      &emsp;&emsp;这部分就相当于ts里面的interface。
  - 设置组件初始化状态（构造函数）
      &emsp;&emsp;constructor（）函数
  - componentWillMount()
      &emsp;&emsp;组件即将被渲染到页面之前触发，此时可以进行开启定时器、向服务器发送请求等操作
  - render（）
      &emsp;&emsp;组件渲染
  - componentDidMount（）
     &emsp;&emsp;组件被挂载后触发，在这可以进行dom操作。

- 运行阶段

  - componentWillReceiveProps（）
     &emsp;&emsp;组件接到属性后触发。
  - shouldComponentUpdate（）
     &emsp;&emsp;当组件接收到新属性，或者组件的状态发生改变时触发。组件首次渲染时并不会触发
  - componentWillUpdate（）
     &emsp;&emsp;组件即将被更新时触发
  - componentDidUpdate（）
     &emsp;&emsp;组件被更新完成后触发。页面中产生了新的DOM的元素，可以进行DOM操作

- 销毁阶段

  - componentWillUnmount（）
     &emsp;&emsp;组件被销毁时触发。这里我们可以进行一些清理操作，例如清理定时器，取消Redux的订阅事件等等。