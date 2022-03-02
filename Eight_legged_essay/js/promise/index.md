## promise串行
给定一个promise数组，实现promise的串行
```
let promiseArr = [];
for ( let i = 0; i < 5; i++) {
    promiseArr.push(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(i);
        }, 1000 * i);
    }));
}

function chainPromise(promiseList) {
    // 串行执行promise函数，并且输出值
}

chainPromise(promiseArr).then(() => {
    console.log('over');
});

// 预计输出如下:
// 0    (立即输出)
// 1    (1秒后输出)
// 2    (2秒后输出)
// 3    (3秒后输出)
// 4    (4秒后输出)
// over
```

上代码：

- [串行promise](./serial.js)

## promise.all

```
let promiseArr = [];
for ( let i = 0; i < 5; i++) {
    promiseArr.push(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(i);
            resolve(i);
        }, 1000 * i);
    }));
}

function promiseAll(promiseList) {
    // 串行执行promise函数，并且输出值
}

promiseAll(promiseArr).then(() => {
    console.log('over');
});

// 预计输出如下:
// 0    (立即输出)
// 1    (1秒后输出)
// 2    (1秒后输出)
// 3    (1秒后输出)
// 4    (1秒后输出)
// over
```

上代码：

- [promise.all](./all.js)

### promise.race

```
let promiseArr = [];
for ( let i = 0; i < 5; i++) {
    promiseArr.push(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(i);
            resolve(i);
        }, 1000 * i);
    }));
}

function promiseRace(promiseList) {
    // 串行执行promise函数，并且输出值
}

promiseRace(promiseArr).then(() => {
    console.log('over');
});

// 预计输出如下:
// 0    (立即输出)
// over (立即输出)
// 1    (1秒后输出)
// 2    (1秒后输出)
// 3    (1秒后输出)
// 4    (1秒后输出)
```

上代码：

- [promise.race](./race.js)
