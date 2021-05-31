function debounce (fuc, delay) {
    let timer;
    return function () {
        let arg = arguments,
            _this = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fuc.apply(_this, ...arg);
            clearTimeout(timer);
        }, delay);
    }
}