function throttling (fuc, delay) {
    let lastTime;
    return () => {
        let newTime = Date.now(),
            _this = this;
        if (!lastTime || newTime - lastTime > delay) {
            lastTime = Date.now();
            fuc.apply(_this, arguments);
        }
    }
}


function throttling (func, delay) {
    let time = null;
    return () => {
        if (!time) {
            func.apply(this, arguments);
            time = setTimeout(() => {
                time = null;
            }, delay);
        }
    }
}