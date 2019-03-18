# 前端常见跨域解决方案

## 什么是跨域？
跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的。

广义的跨域：
* 资源跳转：A链接，重定向，表单提交；
* 资源嵌入：&lt;link&gt;,&lt;script&gt;,&lt;img&gt;,&lt;frame&gt;等dom标签，还有样式中background:url()等；
* 脚本请求：js发起的ajax请求，dom和js对象的跨域操作等。

我们通常说的跨域都是狭义的，是由浏览器同源策略限制的一类请求场景。

### 同源策略
同源策略（SOP: Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也是最基本的安全功能，如果少了同源策略，浏览器很容易受到XSS和CSRF等攻击。所谓同源是指“协议+域名+端口”三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

同源策略限制以下几种行为：
* Cookie,LocalStorage和IndexDB无法读取。
* DOM和Js对象无法获得。
* AJAX请求不能发送。

## 常见跨域场景
<table>
    <tr>
        <td>URL</td>
        <td>说明</td>
        <td>是否允许通信</td>
    </tr>
    <tr>
        <td>http://www.domain.com/a.js</td>
        <td rowspan="3">同一域名，不同文件或路径</td>
        <td rowspan="3">允许</td>
    </tr>
    <tr>
        <td>http://www.domain.com/b.js</td>
    </tr>
    <tr>
        <td>http://www.domain.com/lab/c.js</td>
    </tr>
    <tr>
        <td>http://www.domain.com:8000/a.js</td>
        <td rowspan="2">同一域名，不同端口</td>
        <td rowspan="2">不允许</td>
    </tr>
    <tr>
        <td>http://www.domain.com/b.js</td>
    </tr>
    <tr>
        <td>http://www.domain.com/a.js</td>
        <td rowspan="2">同一域名，不同协议</td>
        <td rowspan="2">不允许</td>
    </tr>
    <tr>
        <td>https://www.domain.com/b.js</td>
    </tr>
    <tr>
        <td>http://www.domain.com/a.js</td>
        <td rowspan="2">域名与域名对应相同ip</td>
        <td rowspan="2">不允许</td>
    </tr>
    <tr>
        <td>http://192.168.4.12/b.js</td>
    </tr>
    <tr>
        <td>http://www.domain.com/a.js</td>
        <td rowspan="3">主域相同，子域不同</td>
        <td rowspan="3">不允许</td>
    </tr>
    <tr>
        <td>http://x.domain.com/b.js</td>
    </tr>
    <tr>
        <td>http://domain.com/c.js</td>
    </tr>
    <tr>
        <td>http://www.domain1.com/a.js</td>
        <td rowspan="2">不同域名</td>
        <td rowspan="2">不允许</td>
    </tr>
    <tr>
        <td>http://www.domain2.com/b.js</td>
    </tr>
</table>

## 跨域解决方案
### 通过JSONP跨域
通常为了减轻web服务器的负载，我们把js、css、img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信。

* 原生JS前端实现：
```javascript
    var script = document.createElement('script');
    script.type = "text/javascript";
    // 传参并指定回调执行函数为onBack
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=onBack';
    document.head.appendChild(script);
    // 回调执行函数
    function onBack(res) {
        alert(JSON.stringify(res));
    }
```

* jQuery AJAX 实现
```javascript
$.ajax({
    url: 'http://www.domain2.com:8080/login',
    type: 'get',
    dataType: 'jsonp',    // 请求方式为jsonp
    jsonpCallback: 'onBack',     // 自定义回调函数名
    data: {}
});
```

* vue.js实现
```javascript
this.$http.jsonp('http://www.domain2.com:8080/login',{
    params: {},
    jsonp: 'onBack'
}).then(res)=>{
    console.log(res);
}
```

* 后端Node.js代码示例
```javascript
var querystring = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req,res) {
    var params = qs.parse(req.url.split("?")[1]);
    var fn = params.callback;
```
