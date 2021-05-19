给定一个promise数组
实现promise的串行
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
```

上代码：

- [串行promise](./serial.js)




