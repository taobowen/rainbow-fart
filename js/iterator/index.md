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