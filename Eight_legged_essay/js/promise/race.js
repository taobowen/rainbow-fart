function promiseRace(promiseList) {
    let resolveNum = 0;
    return new Promise((resolve, reject) => {
        promiseList.forEach(item => {
            item().then(() => {
                resolveNum ++;
                if (resolveNum === 1) {
                    resolve();
                }
            }, () => {
                resolveNum ++;
                if (resolveNum === 1) {
                    reject();
                }
            })
        })
    })
}

let promiseArr = [];
for ( let i = 0; i < 5; i++) {
    promiseArr.push(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(i);
            resolve(i);
        }, 1000 * i);
    }));
}

promiseRace(promiseArr).then(() => {
    console.log('over');
});