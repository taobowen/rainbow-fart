**什么是xss攻击？**

XSS，即（Cross Site Scripting）中文名称为“跨站脚本攻击”。
XSS的重点不在于跨站攻击而在于脚本攻击。攻击者可以利用 web应用的漏洞或缺陷之处，向页面注入恶意的程序或代码，以达到攻击的目的。
通俗的来说就是我们的页面在加载并且渲染绘制的过程中，如果加载并执行了意料之外的程序或代码（脚本、样式），就可以认为是受到了 XSS攻击。

**XSS的危害**

- 通过 document.cookie 盗取 cookie中的信息

- 使用 js或 css破坏页面正常的结构与样式

- 流量劫持（通过访问某段具有 window.location.href 定位到其他页面）

- dos攻击：利用合理的客户端请求来占用过多的服务器资源，从而使合法用户无法得到服务器响应。并且通过携带过程的 cookie信息可以使服务端返回400开头的状态码，从而拒绝合理的请求服务。

- 利用 iframe、frame、XMLHttpRequest或上述 Flash等方式，以（被攻击）用户的身份执行一些管理动作，或执行一些一般的如发微博、加好友、发私信等操作，并且攻击者还可以利用 iframe，frame进一步的进行 CSRF 攻击。

- 控制企业数据，包括读取、篡改、添加、删除企业敏感数据的能力。

**XSS攻击分类**

XSS 根据攻击是否持久，可以分为 “反射型XSS”与“存储型XSS”两种。
“反射型XSS”攻击者通过包装特定的连接，并将链接发送给实际的用户来进行攻击。
“反射型XSS”攻击一般是利用前端代码的漏洞或缺陷，比如使用 Eval来解析执行动态传入的数据，或者是一些被后端接受处理后再返回前端展示的 URL参数等，其操作手法很类似于钓鱼攻击。
“存储型XSS”攻击是通过表单提交，抓包工具，直接调用接口等形式向后端数据库注入数据。一旦被注入成功，并在输出的页面上没有做任何防范措施，那么所有访问这个页面的用户都会被攻击。
总的来说，“反射型XSS”是一种局部非持久的针对性攻击，而“存储型XSS”就要严重的多，它是一个全面大范围可持久型的攻击。

**xss攻击示例**

**反射型攻击 - 前端URL参数解析**

正常页面链接：
`http://xss-example.com/index.html?data={}`

攻击者包装后的链接（data可能是需要Eval解析的Json数据）:
`http://xss-example.com/index.html?data=alert(documet.cookie)`

前端会被攻击的代码：
`var data = eval('('+ getUrlParams('data') +')');`

PS：当然在实际情况下，攻击者是不会把攻击代码这么明显的暴漏出来，一般都会经过编码。
`http://xss-example.com/index.html?data=\u0061\u006c\u0065\u0072\u0074(1)`

如果你认为在解析 URL参数时不使用 Eval 便能保证安全，那就大错特错了，因为攻击者往往会主动的帮你执行 eval。
`http://xss-example.com/index.html?url=http://exmaple.com`

然后前端代码去解析并埋入一个 <a> 标记中。
```
var _href = getUrlParams('url');
$('a').attr('href', _href);
```
但是，现在如果攻击者利用了您这个功能包装了这样的一条链接呢？
`http://xss-example.com/index.html?url=javascript:eval(alert(document.cookie));`

编码之后：
`http://xss-example.com/index.html?url=javascript:\u0065\u0076\u0061\u006c(\u0061\u006c\u0065\u0072\u0074(document.cookie));`

**反射型攻击 - 后端URL参数解析**

现在有这样一个链接，URL参数会被后端的程序解析并返回给前端页面。
`http://xss-example.com/index.html?name="xiaoming";`

后端代码示例：
```
app.get('index.html', function (req, res) {
    res.send(req.query.name);
})
```
如果现在用户访问的是这样的连接，有会怎么样呢？
`http://xss-example.com/index.html?name=<script>alert(document.cookie)</script>`

此时一个脚本标记就会被后端代码重新下发给前端，然后前端将其加入页面中，便会触发攻击行为。
当然，实际中并没有这么可怕，因为 web程序本身就已经很好的进行了阻拦过滤，但是经过我的实际测试发现 Firefox与老版本的IE依然有这些问题，只有 Chrome 与新版本的IE进行了阻止。
如果你想再Chrome与新版本的IE浏览器中看到实际可产生的效果，可以通过设置 HTTP 的 Header头来关闭浏览器自动阻拦与过滤XSS功能。
```
app.get('index.html', function (req, res) {
    res.set('X-XSS-Protection', 0); //此处是关键
    res.send(req.query.name);
});
```

**注入型攻击 - 留言评论**

注入型攻击常见的地方就是留言评论或者是含有表单提交的地方。
例如下面我们就以要给留言评论为例子来说明注入型攻击：

首先，攻击者向一个textarea输入以下内容：
`<script>alert(document.cookie)</script>`

然后，前端调用 ajax 向后端传值
```
$('.send').click(function(){
    $.post('message.htm',{'msg':$('textarea').val()},function(){});
});
```
接着，后端接收值写入数据库，同时又返回给前端展示。
```
app.post('message.htm',function(req,res,next){    //写入数据库
    //...
    //响应前端
     res.json({
        test: req.body.msg
     })

});
```
最终当前端原样展示之前输入的攻击代码时，页面便发生了存储型攻击。

不论是反射型攻击还是存储型，攻击者总需要找到两个要点，即“输入点”与"输出点"，也只有这两者都满足，XSS攻击才会生效。“输入点”用于向 web页面注入所需的攻击代码，而“输出点”就是攻击代码被执行的地方。

大致上，攻击者进行XSS攻击要经过以下几个步骤：
![image](https://user-images.githubusercontent.com/46807600/58534132-fd303180-821c-11e9-8a52-5d6b257c493b.png)
首先是分析程序寻找漏洞，然后构建攻击代码，比如上面作为留言内容的 script 标签，实际上可以执行前端JS代码，远程加载JS脚本CSS样式文件的 HTML标签也非常多，比如：
`#当图片不存在时，必然触发 事件<img src="null" ='alert(document.cookie)' /> #加载远程CSS文件，破坏当前页面的样式<link href="test.css"> #点击的时候<a ="alert(document.cookie)" onmouseover onmouseout></a>#鼠标移动的时候<div onmouseover=‘do something here’> #破坏页面样式<style>*{font-size:100px}</style>#利用IE7-的 css expression表达式的行为。<div style="width:expression(alert('XSS'))">`
当代码注入成功后，攻击者往往就需要去寻找所注入代码的输出点，例如百度网盘之前就有一个修改昵称的 XSS漏洞，虽然前端设置了字符长度为10个字符，但是攻击者通过使用抓包工具构建了一个  的执行脚本，并成功的注入到了数据库，后面测试发现，最终攻击的输出位置处于用户分享资源给其它好友时，展开好友列表的时刻。

**如何规避xss攻击？**

实际上简单的通过正则判断 script、link、style、img 等HTML标记并不可取，因为，首先输入点的情况变化多样，很难把所有的 html标记的特性都考虑进来，其次对html标记的限制，也会让产品的可用性大大降低（比如有些特殊的关键字会被程序阻止，使得用户使用非常不便），最后这种判断本身也不安全，比如攻击者会在关键字中插入空格、制表符以及其它HTML实体编码来躲避侦测。

既然我们前面说到攻击必须有两个要点：“输入点”，“输出点”，所以防御的时候，我们只要做好这两个点的控制，就基本上可以万无一失！

- 对输入内容的特定字符进行编码，例如表示 html标记的 < > 等符号。

- 对重要的 cookie设置 httpOnly, 防止客户端通过document.cookie读取 cookie，此 HTTP头由服务端设置。

- 将不可信的值输出 URL参数之前，进行 URLEncode操作，而对于从 URL参数中获取值一定要进行格式检测（比如你需要的时URL，就判读是否满足URL格式）。

- 不要使用 Eval来解析并运行不确定的数据或代码，对于 JSON解析请使用 JSON.parse() 方法。

- 后端接口也应该要做到关键字符过滤的问题。

就目前而言，应对XSS攻击的主要手段还是编码与过滤两种，编码用于将特殊的符号 "<、>、&、'、""进行转义，而过滤则是阻止特定的标记、属性、事件。
如果你不愿意为了严格的安全而限制产品本身的灵活，那么我更建议采用“编码”的方案。

首先看下京东的搜索功能：
![image](https://user-images.githubusercontent.com/46807600/58534270-6021c880-821d-11e9-8e8a-064e86784d65.png)
接着，再看下知乎提交评论时接口的数据：
![image](https://user-images.githubusercontent.com/46807600/58534285-6c0d8a80-821d-11e9-93bb-cf3534fbc5b6.png)
最后，我们再看下知乎时如何展示提交后的评论：
![image](https://user-images.githubusercontent.com/46807600/58534298-77f94c80-821d-11e9-9d88-b0d17b3a4460.png)
实际上实现上述的编码功能非常简单，我们可以对照 HTML实体编码表 来进行正则匹配替换。
```
function encode(str) {    if (!str || str.length === 0) return '';
    str = str.replace(/>/gm, '&gt;');
    str = str.replace(/</gm, '&lt;');
    str = str.replace(/"/gm, '&quot;');
    str = str.replace(/'/gm, '&apos;');    return str;
}
```
当然在实际应用中很难避免自己写的匹配规则就能万无一失，并且XSS攻击又一直是在变化的过程中，因此个人更推荐使用第三方专门防御XSS攻击的库。
前面都是针对输入点的防御说明，在输出的情况下，前端开发人员应当要对自己采用的输出方法与输出方式要有一定的了解：

**原生JS中**
- innerHTML：安全，但是IE8下危险（IE8支持可见的含有defers属性的script标记，例如：_）
- appendChild, insertBefored等：危险
- innertext：安全
**总结**
首先我们了解了 XSS的定义，XSS即跨站点脚本攻击，只要浏览器加载，解析，执行了意料之外的JS，CSS等都可以被认为是受到了 XSS攻击，而 XSS攻击的分类主要有“反射型”与“存储型”两种。
“反射型”攻击者通过包装改造URL参数，然后利用前端代码的缺陷或漏洞来攻击，它更偏向与前端层面，并且在实际攻击中攻击者会根据 HTML实体编码、URL编码、uniocde编码等进行编码然后欺骗用户点击访问。而“存储型”攻击者则会通过抓包工具或者是直接调用接口的方式想尽一切办法来向后端数据库注入数据。
XSS攻击有两个要点，一个是“输入点”，针对输入点我们可以对关键的特殊的字符进行编码，而在“输出点”我们要对自己采用的输出方式以及方法要有一定的安全风险认知。