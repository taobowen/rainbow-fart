关于this的取值可以有四种：
- 如果是该函数是一个构造函数，this指针指向一个新的对象
- 在严格模式下的函数调用下，this指向undefined
- 如果是该函数是一个对象的方法，则它的this指针指向这个对象
- 箭头函数的this取决于指针函数定义的上下文环境，和函数本身在哪调用的没有一点关系

改变函数中this的取值也有三种：
- apply
- call
- bind

前两个都是一次性的设置函数中的this并调用，只是传参形式有所不同，最后一个则是永久改变函数this，返回的是个新函数


## Example1
```
this.tag = 1;
let pointFuc = () => {
    return this.tag;
},
    testObject = {
        tag: 2
    };
testObject.objectFuc = pointFuc;

console.log(pointFuc()); // 1
console.log(testObject.objectFuc()); // 1
```

两者都会返回1

## Example2

```
this.tag = 1;
function Constructor (fuc) {
    this.tag = 2;
    fuc()
}

let testObject = {
        tag: 3
    };

testObject.objectFuc = Constructor;

testObject.objectFuc(() => {
    console.log(this.tag);
})

Constructor(() => {
    console.log(this.tag);
})

new Constructor(() => {
    console.log(this.tag);
})
```

返回值都是1

## 箭头函数的特殊性质

- 箭头函数不能用作构造器，和 new一起用会抛出错误。
- 箭头函数没有prototype属性。
- yield 关键字通常不能在箭头函数中使用（除非是嵌套在允许使用的函数内）。因此，箭头函数不能用作函数生成器。
- 因为箭头函数本身是没有this的，所以bind、apply、call无法更改箭头函数的this指向
