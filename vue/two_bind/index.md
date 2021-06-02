## 双向绑定

简单的来讲
从视图层到数据层通过事件监听触发
从数据层到视图层通过Object.defineProperty中设置的set触发

### 上代码

[vue2简化版双向绑定](./simple.html)
[vue2详细版双向绑定](./detail.md)

但是Object.defineProperty中设置的set并不能监听对象新增属性、删除属性的行为，因此在Vue2中只能通过vue.set和vue.delete弥补。
所以到了vue3，双向绑定已经改成了代理Proxy的形式

### 上代码

[vue3版双向绑定](./vue3.html)

### 详细版的vue双向绑定

