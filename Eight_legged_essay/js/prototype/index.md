整个js里面的原型，分为三大块
- 构造函数：通过new操作符创建一个个实例
- 实例：构造函数创建
- 原型对象：所有实例共享的原型对象，即构造函数的原型（prototype）

举个栗子
```
let instanceObject = new Object();
let instanceString = new String();
```
## 实例与原型对象
易知，instanceObject是实例，构造函数为Object。
对于一个实例来说可以通过instanceObject.__proto__的方式可以从实例指向原型对象
因此：`instanceObject.__proto__ === Object.prototype // true`

__proto__也可以被Object.getPrototypeOf()以及Object.setPrototypeOf()取代
```
instanceObject.__proto__ === Object.getPrototypeOf(instanceObject); // true
instanceObject.__proto__ = 1等价于Object.setPrototypeOf(instanceObject, 1); // 但是这种行为对性能的消耗比较大
```

Object.setPrototypeOf()这种行为对性能消耗比较大，通常情况下我们可以用Object.create()取代

## 原型对象与构造函数

对于构造函数Object来说可以通过prototype访问原型对象
因此：`Object.getPrototypeOf(instanceObject) === Object.prototype // true`
反过来原型对象可以通过constructor访问构造函数
`instanceObject.__proto__.constructor === Object // true`

## 实例与构造函数

实例通过instanceof操作符可以判断某个构造函数是否在它的原型链上
`instanceString instanceof Object // true`
实例通过constructor来获取它的构造函数
`instanceObject.constructor === Object // true`

## 关于校验

- instanceof：判断某个构造函数是否在它的原型链上
- hasOwnProperty：判断某个属性是否为实例的自有属性
- in：判断某个属性能否通过实例或原型访问
- isPrototypeOf：判断原型链中是否包含某个原型

## 几个比较绕的例子
```
Object.prototype.__proto__    //null
Function.prototype.__proto__  //Object.prototype
Object.__proto__              //Function.prototype
```

- 正常的原型链的末尾一般都是Object的原型对象，Object原型的原型是null
- Object在Function的原型链上，换句话说Function继承了Object
- 不管是Object、String、Number、Function本身都是构造函数，既然是函数，原型对象当然都是Function.prototype

## 判断一个变量是否为数组

1. arr instanceof Array
2. arr.constructor === Array
3. arr.push && !arr.hasOwnProperty('push')
4. Array.prototype.isPrototypeOf(arr)



