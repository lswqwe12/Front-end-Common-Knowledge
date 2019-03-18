// JavaScript中,万物皆对象。但对象也是有区别的。分为普通对象和函数对象。
// Object,Function是Js自带的函数对象，下面举例说明。

var o1 = {};
var o2 = new Object();
var o3 = new f1();

function f1(){};
var f2 = function(){};
var f3 = new Function('str','console.log(str)');

console.log(typeof Object);
console.log(typeof Function);

console.log(typeof f1);
console.log(typeof f2);
console.log(typeof f3);

console.log(typeof o1);
console.log(typeof o2);
console.log(typeof o3);

// 可以发现。凡是通过new Function()创建的对象都是函数对象，其他的都是普通对象。
// f1, f2归根结底都是通过new Function()的方式进行创建的。FunctionObject也是通过New Function()创建的。

// ---------------------------------------------------
// 我们先看一下构造函数。
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        alert(this.name);
    }
}
var person1 = new Person("Zaxlct", 28, "Software Engineer");
var person2 = new Person("Mick", 23, "Doctor");

// 上面的例子中, person1和person2都是Person的实例。这两个实例有一个Constructor(构造函数)属性
// 该函数(是一个指针)指向Person，即如下所示：

console.log(person1.constructor == Person);
console.log(person2.constructor == Person);

// person1和person2都是构造函数。Person的实例。
// 实例的构造函数属性(constructor)指向构造函数。

// ---------------------------------------------------
// 原型对象：在JS中，每当定义一个对象（函数也是对象）的时候，对象中都会包含一些预定义的属性。
// 其中每个对象都有一个prototype属性。这个属性指向函数的原型对象。

function Person(){}
Person.prototype.name = 'Zaxlct';
Person.prototype.age = 28;
Person.prototype.job = 'Software Engineer';
Person.prototype.sayName = function(){
    console.log(this.name);
}

var person1 = new Person();
person1.sayName(); 

var person2 = new Person();
person2.sayName();

console.log(person1.sayName == person2.sayName);

// 我们得到了本文第一个定律。
// 每个对象都有__proto__属性，但只有函数对象才有prototype属性。
// 接下来介绍原型对象。

Person.prototype = {
    name: 'Zaxlct',
    age: 28,
    job: 'Software Engineer',
    sayName: function(){
        console.log(this.name);
    }
}

// 原型对象。顾名思义，它就是一个普通对象。原型对象就是Person.prototype
// 上面我们给原型对象添加了四个属性。name,age,job,sayName。其实他还有一个默认属性constructor指向Person；

person1.constructor == Person;
Person.prototype.constructor == Person;

// person1有constructor属性是因为person1是Person的实例，Person.prototype有constructor属性是因为
// Person.prototype也是Person的实例
console.log("---------------------------------");
function Person(){};
console.log(Person.prototype);
console.log(typeof Person.prototype);
console.log(typeof Function.prototype);
console.log(typeof Object.prototype);
console.log(typeof Function.prototype.prototype);

// 原型对象用途主要是用于继承
console.log("----------------------------------")
var Person = function(name){
    this.name = name;
}
Person.prototype.getName = function(){
    return this.name;
}
var person1 = new Person('Mick');
console.log(person1.getName());

// 从这个例子可以看出，通过给Person.prototype设置了一个函数对象的属性，
// 那么Person的实例出来的普通对象就继承了这个属性。怎么实现继承就涉及到下面的原型链。
// 关于上面两个this的指向，当函数执行时，都指向person1了。