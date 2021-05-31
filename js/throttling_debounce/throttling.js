function throttling (fuc, delay) {
    let lastTime;
    return () => {
        let newTime = Date.now(),
            _this = this;
        if (!lastTime || newTime - lastTime > delay) {
            lastTime = Date.now();
            fuc.apply(_this, ...arguments);
        }
    }
}