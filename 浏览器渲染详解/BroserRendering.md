# 浏览器如何渲染页面

## 概念解析
* DOM Tree：浏览器将HTML解析成树形的数据结构。
* CSS Rule Tree：浏览器将CSS解析成树形的数据结构。
* Render Tree：DOM和CSSOM合并后生成Render Tree。
* layout：有了Render Tree，浏览器已经能知道网页中有哪些节点，各个节点的CSS定义以及他们的从属关系，从而去计算出每个节点在屏幕中的位置。
* painting：按照算出来的规则，通过显卡，把内容画到屏幕上。
* reflow：当浏览器发现某个部分发生了点变化影响了布局，需要倒回去重新渲染，称这个回退的过程叫做reflow。reflow会从&lt;html&gt;这个root frame开始递归往下，依次计算所有的节点几何尺寸和位置。
* repaint：改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸没有变。

## 浏览器解析
1. 浏览器通过请求的URL进行域名解析，向服务器发起请求，接收文件（HTML、CSS、JS、Images等等）。
2. HTML文件加载后，开始构建DOM Tree。
3. CSS样式文件加载后，开始解析和构建CSS Rule Tree。
4. JavaScript脚本文件加载后，通过DOM API和CSSOM API来操作DOM Tree和CSS Rule Tree。

## 浏览器渲染
1. 浏览器引擎通过DOM Tree和CSS Rule Tree构建Rendering Tree
2. Rendering Tree并不与DOM Tree对应，比如像&lt;head&gt;标签内容或带有display:none;的元素节点并不包括在Rendering Tree中。
3. 通过CSS Rule Tree匹配DOM Tree进行定位坐标和大小，是否换行，以及position、overflow、z-index等等属性，这个过程被称为Flow或Layout。
4. 最终通过调用Native GUI的API绘制网页画面的过程称为Paint。

## 浏览器渲染流程图
### webkit内核浏览器渲染
![webkit内核浏览器渲染](./Webkit.png)
### Geoko内核浏览器渲染
![Geoko内核浏览器渲染](./Geoko.jpg)

## 优化浏览器渲染
1. 创建有效的HTML和CSS，不要忘记指定文档编码，比如&lt;meta charset="utf-8"&gt;。
2. CSS样式应当包含在&lt;head&gt;中，JavaScript脚本出现在&lt;body&gt;末尾。
3. 减少CSS嵌套层级和选择适当的选择器。
4. 不要通过JS逐条修改DOM的样式，提前定义好CSS的Class进行操作。
5. 尽量减少将DOM节点属性值放在循环当中，会导致大量读写此属性值。
6. 尽可能地为产生动画的HTML元素使用fixed或absolute的position，那么修改他们的CSS是不会reflow的。