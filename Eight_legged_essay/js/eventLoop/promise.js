```
let promise1 = new Promise((resolve) => {
    console.log('promise1')
    resolve();
});

console.log('start');

promise1.then(() => {
    console.log('promise2')
}).then(() => {
    console.log('promise3')
}).then(() => {
    setTimeout(() => {
        console.log('setTimeout')
    })
}).then(() => {
    console.log('promise4')
})

setTimeout(() => {
    console.log('setTimeout2');
}, 0)

console.log('end');
```

promise1
start
end
promise2
promise3
setTimeout2
setTimeout
promise4
