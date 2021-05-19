```
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}

async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
```

上面代码执行结果如下：

```
script start
async2 end
Promise
script end
async1 end
promise1
promise2
setTimeout
```

![image](https://user-images.githubusercontent.com/46807600/118403508-3a5b8b80-b6a1-11eb-8ed1-92ba567f62af.png)


- 在一次迭代中，事件循环将首先检查宏任务队列，如果宏任务等待，则立即开始执行宏任务。直到该任务完成（或者队列为空），事件循环将移动去处理微任务队列。如果有任务在该队列中等待，则事件循环将依次开始执行，完成一个后执行余下的微任务，直到队列中所有微任务执行完毕。
- 单词循环迭代中，最多处理一个宏任务（其余在队列中等待），而队列中的微任务都会被处理。
- 当微任务队列处理完成并清空时，事件循环会检查是否需要更新UI渲染，如果是，则会重新渲染UI视图。
