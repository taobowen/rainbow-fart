类可以看做实现构造函数和原型链操作的语法糖

## constructor
constructor在通过new生成实例时默认调用，如果类中没有定义constructor，那么这个方法会被默认添加，因此任何一个类都有constructor方法。
实例中的属性都在constructor中定义，类的所有方法都定义在类的prototype属性上，但是不可枚举。
类的方法中的this指向的是类的实例对象。

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

## 静态方法

static关键字定义静态方法，静态方法不能在实例中调用，只能通过类本身来调用。

```
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    static displayName = "Point";

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.hypot(dx, dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10,10);
p1.displayName;
// undefined
p1.distance;
// undefined

console.log(Point.displayName);
// "Point"
console.log(Point.distance(p1, p2));
// 7.0710678118654755
```

静态方法或原型方法中this的指向和对象中类似，在类中调用静态或原型方法时this指向类本身，否则指向undefined

## 继承

class通过extends实现继承，如果子类中定义了构造函数，那么它必须先调用 super() 才能使用 this，super 关键字也用于调用父类构造函数上的方法。

```
class A {
    constructor () {
        console.log('A');
    }
}
class B extends A {
    constructor () {
        super ();
    }
}
```

整个继承过程的底层操作如下：
```
class A {}
class B {}
Object.setPrototypeOf(B, A);
Object.setPrototypeOf(B.prototype, A.prototype);

const b = new B();
```
因此对于上述例子存在：
```
B.__proto__ === A // ture
B.prototype.__proto__ === A.prototype // true
```
并且上述代码中A只要是一个有prototype属性的函数，就能被B继承。

function A () {
    this.a = 1;
}

let B = {
    b: 1,
}

A.prototype = B;

## super

上面示例中super调用的是A的构造函数，但是内部的this指向的是B，即super()在这等价于A.prototype.constructor.call(this)
因此，super作为函数调用时，代表父类的构造函数。


- super作为对象时在普通方法中指向父类的原型对象；在静态方法中指向父类
```
class A {
    p () {
        return 2;
    }
}

class B extends A {
    constructor () {
        super();
        console.log(super.p()); // 2
    }
}
```
上面的super.p()等价于A.prototype.p()
由于super指向父类的原型对象，所以定义在父类实例上的方法或属性是无法通过super调用的。

- 通过super调用父类的方法时，super会绑定子类的this
```
class A {
    constructor () {
        this.x = 1;
    }
    print () {
        console.log(this.x);
    }
}

class B extends A {
    constructor () {
        super();
        this.x = 2;
    }
    m () {
        super.print();
    }
}
let b = new B();
b.m(); // 2
```

- 当对super某个属性赋值时，这是super就是this，赋值的属性就会变成子类实例的属性

- 如果super作为对象用在静态方法中，super指向的是父类
```
class Parent {
    static myMethod (msg) {
        console.log('static', msg.toString());
    }

    myMethod (msg) {
        console.log('instance', msg);
    }
}
class Child extends Parent {
    static myMethod (msg) {
        super.myMethod(msg);
        console.log(super.myMethod === Parent.myMethod) // true
    }

    myMethod(msg) {
        super.myMethod(msg);
    }
}

Child.myMethod (1) // static 1
let child = new Child();
child.myMethod(2); // instance 2
```