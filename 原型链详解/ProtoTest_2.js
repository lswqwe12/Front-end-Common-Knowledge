// Js在创建对象的时候，不管是普通对象还是函数对象，都有一个__proto__的内置属性，用于指向创建它的构造函数的原型对象。
// 即对象person1有一个__proto__属性，创建它的构造函数是Person，构造函数的原型对象是Person.prototype，所以
function Person(name,age,job){
    this.name = name;
    this.age = age;
    this.job = job;
}

function Person(){}
var person1 = new Person();
console.log(Person.prototype.constructor == Person);
console.log(person1.__proto__ == Person.prototype);
console.log(person1.constructor == Person);

// 可以发现，这个连接存在于实例（person1）与构造函数（Person）的原型对象（Person.prototype）之间。
// 而不是存在于实例与构造函数之间。

// 构造器：
// 对于JS，创建一个对象var obj = {}等同于下面这样var obj = new Object()

var obj = {};
var obj = new Object();
console.log("------------------------------------------")
// obj是构造函数(Object)的一个实例，所以

console.log(obj.constructor == Object);
console.log(obj.__proto__ === Object.prototype);

// 整理一下，person1.__proto__ === person1的构造函数.prototype
// 因为 person1的构造函数 === Person
// 所以 person1.__proto__ === Person.prototype

// 对于Person.__proto__，因为Person的构造函数 === Function
// 所以 Person.__proto__ === Function.prototype

// 对于Person.prototype.__proto__，由于Person.prototype是一个普通对象
// 一个普通对象的构造函数 === Object
// 所以 Person.prototype.__proto__ === Object.prototype

// 对于Object.__proto__，因为Object和Person一样都是构造函数，所以
// Object.__proto__ === Function.prototype

// 对于Object.prototype.__proto__，比较特殊，为null，null位于原型链顶端