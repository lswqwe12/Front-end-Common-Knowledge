# Call，Apply，Bind方法的区别
## Call详解
### Call的基本使用
首先看一个slice方法的例子：

> <pre>var ary = [12,23,34];
ary.slice();</pre>

以上两行简单代码的执行过程为：ary这个Array的实例，要调用slice()方法，先在实例中查找是否存在slice()方法，若没有则通过原型链的查找机制，向上找到Array.prototype中的slice()方法，让这个slice()方法执行，再执行slice()方法的过程中才把ary数组进行了截取。
当知道了一个对象调用方法会有一个查找过程之后，再看下面的代码：

> <pre>var obj = {name:"Yuri"};
function fn() {
    console.log(this);
    console.log(this.name);   
}
fn();  // this --> window
// obj.fn(); // Uncaught TypeError: obj.fn is not a function
fn.call(obj);</pre>

<strong>call方法的作用：</strong>首先寻找call方法，最后通过查找原型链在Function的原型中(Function.prototype)找到call方法，然后让call方法执行，在执行call方法的时候，让fn方法中的this变为第一个参数值obj，最后再把fn这个函数执行。

### call方法原理
通过下面的例子：

> <pre>function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
fn1.call(fn2); // 1</pre>

首先fn1通过原型链查找机制找到Function.prototype上的call方法，并且让call方法执行，此时call这个方法中的this指向fn1，在call方法代码执行的过程中，首先让fn1中的"this"关键字指向fn2，再让this原本指向的方法（fn1）执行。

再看下面的例子：
> <pre>function fn1() {
    console.log(1);
}
function fn2() {
    console.log(2);
}
fn1.call.call(fn2); // 2</pre>

首先fn1通过原型链找到Function.prototype上的call方法，然后再让call方法通过原型再找到Function原型上的call（因为call本身的值也是一个函数，所以同样可以让Function.prototype），在第二次找到call的时候再让方法执行，方法中的this是fn1.call，首先让这个方法中的this变为fn2，然后再让fn1.call执行。
这里可以先将fn1.call看做一个整体test，则fn1.call.call(fn2)变为test.call(fn2)，这个call方法中的this原本指向的是test，执行后this指向fn2，但执行this原本指向（即test）的方法。之后再看fn1.call，到这一步，this在上一步已经指向了fn2，这里执行call之后，this指向fn1，但是执行this原本指向的方法，即执行fn2的方法。

## call，apply，bind的区别
call在给fn传递参数的时候，是一个个的传递值的，而apply不是一个个传的，而是把要给fn传递的参数值同一个的放在一个数组中进行操作，也相当于一个个的给fn的形参赋值。
bind方法和apply、call稍有不同，bind方法是事先把fn的this改变为我们要想要的结果，并且把对应的参数值准备好，以后要用到了，直接的执行即可，也就是说bind同样可以改变this的指向，但和apply、call不同就是不会马上的执行。如下例所示：

> <pre>function fn(num1, num2) {
    console.log(num1 + num2);
    console.log(this);
}
fn.call(obj,100,200);
fn.apply(obj,[100,200]);
var tempFn = fn.bind(obj,1,2);
tempFn();</pre>

## 应用
### 求数组最大值最小值

> <pre>var max = Math.max.apply(null,ary);
var min = Math.min.apply(null,ary);
console.log(min,max);</pre>

### 求平均数
例如某项比赛要求打分后去掉一个最高分和最低分，剩下分数求平均数。有人可能会想到写一个方法接收所有的分数，然后用函数的内置属性arguments，把arguments调用sort方法排序后进行操作……但是arguments并不是真正的数组对象，它只是伪数组集合。所以直接调用sort()方法会报错。
这时候可以想到先将arguments转换为一个真正的数组，然后再进行操作。

> <pre>function avgFn(){
    // 将类数组转换为数组，把arguments克隆一份一模一样的数组出来。
    var ary = [];
    for(var i=0; i<arguments.length; i++){
        ary[ary.length] = arguments[i];
    }
    // 给数组排序，去掉开头和结尾，剩下的求平均数
    ary.sort(function(a,b){
        return a-b;
    });
    ary.shift();
    ary.pop();
    return (eval(ary.join("+")) / ary.length).toFixed(2);
}
var res = avgFn(9.8,9.7,10,9.9,9.0,9.8,3.0);
console.log(res);</pre>

可以发现这里面argFn()方法中将arguments克隆岛了ary中，JS里面可以用什么参数都不传的slice()方法克隆当前数组。

> var ary = Array.prototype.slice.call(arguments);
> var ary = [].slice.call(arguments);

