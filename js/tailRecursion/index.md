## 尾调用
外部函数的返回值是一个内部函数的返回值。

### 条件
1. 代码在严格模式下执行
2. 外部函数的返回值是对尾调用函数的调用
3. 尾调用函数返回后不需要执行额外的操作
4. 尾调用函数不是引用外部函数作用域中的闭包

### 计算n的阶乘

#### 普通递归
```
function factorialN (n) {
    return n === 0 ? 1 : n * factorialN(n - 1);
}
```

#### 尾调用优化后的递归

```
function nVal (n, total) {
    if (n === 1) {
        return total;
    }
    return nVal(n - 1, n * total)
}

function factorialN (n) {
    return nVal(n, 1);
}
```