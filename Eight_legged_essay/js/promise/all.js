let promiseArr = [];
for ( let i = 0; i < 5; i++) {
    promiseArr.push(() => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(i);
            resolve(i);
        }, 1000 * i);
    }));
}

function promiseAll (promiseList) {
    let results = [],
        promiseCount = 0;
    return new Promise(function(resolve, reject) {
      for (let promiseItem of promiseList) {
        promiseItem().then(function(res) {
            promiseCount++;
            results.push(res);
            if (promiseCount === promiseList.length) {
                return resolve(results);
            }
        }, function(err) {
          return reject(err);
        });
      }
    });
}

promiseAll(promiseArr).then(() => {
    console.log('over');
});