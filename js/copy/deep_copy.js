function deepCopy (obj) {
    let output;
    if (obj instanceof Array) {
        output = [];
        obj.forEach(item => {
            output.push(deepCopy(item));
        })
    } else if (obj instanceof Object) {
        output = {};
        Object.entries(obj).forEach(item => {
            output[item[0]] = deepCopy(item[1]);
        })
    } else {
        output = obj;
    }
    
    return output;
}