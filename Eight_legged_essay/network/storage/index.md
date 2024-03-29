## 客户端存储

### cookie

#### 概念
即HTTP cookie，最初用于在客户端存储会话信息，服务器在响应HTTP请求时，通过发送set-cookie HTTP头部包含会话信息

#### 存储位置
客户端机器

#### 构成

- 名称
- 值
- 域：cookie有效的域
- 路径：cookie有效的路径
- 过期时间：默认情况下浏览器会话结束后会删除所有cookie，不过也可以设置删除cookie的时间。
- 安全标志

#### 限制

- cookie与特定域绑定，cookie中存储的信息只对被认可的接受者开放，不被其他域访问
- cookie数量不能超过300，大小不超过4kb
- 每个域名对应的cookie数量大小也有限制

### sessionStorage

#### 特点
- 存储会话数据，数据只会存储到浏览器关闭，但数据不受浏览器刷新影响。
- sessionStorage主要用于存储只在会话期间有效的小块数据。
- sessionStorage的作用范围限制在单个窗口或标签页中，不同页面之间的sessionStorage数据是隔离的
- sessionStorage的容量限制较小，通常在2MB左右。

### localStorage

#### 特点
- 跨会话持久存储数据
- 要访问同一个localStorage对象，页面必须来自同一个域、在相同的端口上使用相同协议
- 存储在localStorage中的数据会保留到通过js删除或者用户清除浏览器缓存，不会受页面刷新影响，也不会因关闭窗口、标签页或重新启动浏览器而丢失。
- localStorage的容量限制在5MB到10MB