## 异步函数的返回值
异步函数如果使用return关键字返回了值（没有return返回undefined）,这个值会被Promise.resolve()包装成一个期约对象。异步函数始终返回期约对象。

```
async function fuc() {
    return 3;
}
fuc().then(console.log) // 3
```

那么既然包装成期约对象，如果异步函数抛错，也能捕捉到：

```
async function fuc() {
    throw 2;
    return 3;
}
fuc().catch(console.log) // 2
```

## await

await关键字会暂停执行异步函数后面的代码，js运行时在碰到关键字时，会记录在哪里暂停执行。等到await右边的值可用了，js运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。
因此，就算await后面跟着一个立即可用的值，函数的其余部分也会被异步求值。

```
async function foo() {
    console.log(2)
    console.log(await Promise.resolve(8));
    console.log(9)
}

async function bar() {
    console.log(4);
    console.log(await 6);
    console.log(7);
}

console.log(1);
foo();
console.log(3);
bar();
console.log(5);

// 1 
// 2
// 3
// 4
// 5
// 6
// 7
// 8
// 9
```

## async/await实现Promise.all

```
let promiseArr = [new Promise((resolve, reject) => {
    this.setTimeout(() => {
        console.log(2);
        resolve();
    }, 2000);
}), new Promise((resolve, reject) => {
    this.setTimeout(() => {
        console.log(3);
        resolve();
    }, 3000);
}), new Promise((resolve, reject) => {
    this.setTimeout(() => {
        console.log(1);
        resolve();
    }, 1000);
})]


async function promiseAll (promiseArr) {
    let output = [];
    promiseArr.forEach(promiseItem => {
        output.push(new Promise((resolve, reject) => {
            promiseItem.then(() => resolve());
        })); 
    });
    for (let promiseItem of output) {
        await promiseItem;
    }
}

promiseAll(promiseArr).then(() => {
    console.log('finish');
})
```