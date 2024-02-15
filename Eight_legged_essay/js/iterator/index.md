## 遍历器
遍历器是一种接口，为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署Iterator接口，就可以完成遍历操作。

作用如下：
- 为各种数据结构提供一个统一的、简便的访问接口
- 使得数据结构的成员能够按某种次序排列
- 供for...of...消费

## for in 与 for of

```
let arr = [1,2,3];
arr.foo = 'hello';

for (let i in arr) {
    console.log(arr[i]); // 0,1,2,foo
}

for (let i of arr) {
    console.log(i); // 1,2,3
}
```

可见，for in循环读取键名，for of循环读取键值。for of循环调用遍历器接口，但是数组的遍历器接口只返回具有数字索引的属性

### 使用for of 的注意事项

- for of遍历set和map时，遍历的顺序是按照各个成员被添加进数据结构的数据，map结构遍历返回的是一个数组
- for of不能直接遍历普通对象，必须部署iterator接口才能使用

```
let map = new Map();
map.set('a', 1);
map.set('b', 2);

let set = new Set();
set.add(1);
set.add(2);

for (let i of map) {
    console.log(i, 'mapItem');
}

for (let i of set) {
    console.log(i, 'setItem');
}
```


为了实现可迭代，一个对象必须实现 @@iterator 方法，这意味着这个对象（或其原型链中的任意一个对象）必须具有一个键值为 Symbol.iterator 的属性。

程序员应知道一个可迭代对象可以多次迭代，还是只能迭代一次。

只能迭代一次的可迭代对象（例如 Generator）通常从它们的 @@iterator 方法中返回 this，而那些可以多次迭代的方法必须在每次调用 @@iterator 时返回一个新的迭代器。

```
function* countAppleSales() {
  const saleList = [3, 7, 5];
  for (let i = 0; i < saleList.length; i++) {
    yield saleList[i];
  }
}

const appleStore = countAppleSales(); // Generator { }
console.log(appleStore.next()); // { value: 3, done: false }
console.log(appleStore.next()); // { value: 7, done: false }
console.log(appleStore.next()); // { value: 5, done: false }
console.log(appleStore.next()); // { value: undefined, done: true }


function* counter(value) {
  let step;

  while (true) {
    step = yield value++;
    if (step) {
      value += step;
    }
  }
}

const generatorFunc = counter(0);
console.log(generatorFunc.next().value); // 0
console.log(generatorFunc.next().value); // 1
console.log(generatorFunc.next().value); // 2
console.log(generatorFunc.next().value); // 3
console.log(generatorFunc.next(10).value); // 14
console.log(generatorFunc.next().value); // 15
console.log(generatorFunc.next(10).value); // 26
```