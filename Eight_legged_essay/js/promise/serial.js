
let promiseArr = [];
for ( let i = 0; i < 5; i++) {
    promiseArr.push(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(i);
        }, 1000 * i);
    }));
}

function chainPromise(promiseList) {
    return promiseList.reduce((total, item) => {
        if (total) {
            return new Promise((resolve, reject) => {
                total.then((val) => {
                    item().then((val) => {
                        console.log(val);
                        resolve(val);
                    })
                });
            })
            
        } else {
            return new Promise((resolve, reject) => {
                item().then((val) => {
                    console.log(val);
                    resolve(val);
                })
            })
        }
        
    }, null)
}

chainPromise(promiseArr).then(() => {
    console.log('over');
});






