// 所有函数对象的proto都指向Function.prototype,他是一个空函数
console.log(Number.__proto__ === Function.prototype);
console.log(Number.constructor == Function);

console.log(Boolean.__proto__ === Function.prototype);
console.log(Boolean.constructor == Function);

// Math,JSON是以对象的形式存在的，无需new，它们的proto是Object.prototype
console.log(Math.__proto__ === Object.prototype);
console.log(Math.constructor == Object);

console.log(JSON.__proto__ === Object.prototype);
console.log(JSON.constructor == Object);

console.log(Object.__proto__ === Function.prototype)
// 这说明所有的构造器都来自于Function.prototype,甚至包括根构造器Object和Function自身。
// 所有构造器都继承了Function.prototype的属性和方法，如length，call，apply，bind

// Function.prototype 是唯一一个typeof xxx.prototype为function的prototype，
// 其他的构造器的prototype都是一个对象

console.log(typeof Function.prototype);
console.log(typeof Object.prototype);
console.log(typeof Number.prototype);
console.log(typeof Boolean.prototype);
console.log(typeof String.prototype);
console.log(typeof Array.prototype);
console.log(typeof RegExp.prototype);
console.log(typeof Error.prototype);

// 知道了所有构造器（含内置的和自定义的）的__proto__都是Function.prototype,
// 那么Function.prototype的__proto__是什么？

console.log(Function.prototype.__proto__ === Object.prototype); //true

//可以发现所有的构造器也是一个普通JS对象，同时他们也继承了Object.prototype上的所有方法

console.log(Function.__proto__ == Function.prototype)

// 当我们创建一个函数时，
var Person = new Object();

// Person是Object的实例，所以Person继承了Object的原型对象Object.prototype上的所有方法。
// 所以我们可以用Person.constructor 也可以用 Person.hasOwnProperty

// 当我们创建一个数组时，
var num = new Array();
// num是Array的实例，所以num继承了Array的原型对象Array.prototype上的所有方法

// 用Object.getOwnPropertyNames可以获取所有的属性名，不包括prototype中的属性，返回一个数组
var arrayAllKeys = Array.prototype;
console.log(Object.getOwnPropertyNames(arrayAllKeys));

// 这里不包括像constructor和hasOwnPrototype等对象的方法，但是却可以使用
// 这是因为Array.prototype虽然没有这些方法，但是有原型对象__proto__

Array.prototype.__proto__ == Object.prototype;

// 所以Array.prototype继承了对象的所有方法，
// 当你用num.hasOwnPrototype()时，JS会先查一下它的构造函数(Array)的原型对象Array.prototype有没有hasOwnPrototype()方法
// 没查到的话继续查一下Array.prototype的原型对象Array.prototype.__proto__有没有这个方法

// 当我们创建一个函数的时候，
var f = new Function("x","return x*x;");
console.log(f.arguments);
console.log(f.call(window));
console.log(Function.prototype);
console.log(Object.getOwnPropertyNames(Function.prototype));

// 所有函数对象__proto__ 都指向Function.prototype，他是一个空函数
