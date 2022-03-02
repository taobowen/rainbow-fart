## 尾调用
外部函数的返回值是一个内部函数的返回值。

### 条件
1. 代码在严格模式下执行
2. 外部函数的返回值是对尾调用函数的调用
3. 尾调用函数返回后不需要执行额外的操作
4. 尾调用函数不是引用外部函数作用域中的闭包

### 优点
函数调用会在内存形成一个“调用帧”，保存调用位置和内部变量等信息。由于尾调用是函数最后一步操作，所以不需要保留外层函数调用帧，这样每次执行时调用帧只有一项，大大节省内存

### 计算n的阶乘

#### 普通递归
```
function factorialN (n) {
    return n === 0 ? 1 : n * factorialN(n - 1);
}
```

#### 尾调用

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

### 斐波那契数列

#### 普通递归
```
function fib(n) {
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}
```

#### 尾调用
```
function fiber (a, b, n) {
    if (n === 0) {
        return a;
    }
    return fiber(b, a + b, n - 1);
}
function fib(n) {
    return fiber(0, 1, n);
}
```