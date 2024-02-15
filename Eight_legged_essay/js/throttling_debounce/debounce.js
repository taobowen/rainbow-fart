function debounce (fuc, delay) {
    let timer;
    return function () {
        let arg = arguments,
            _this = this;
        if (timer) {
            timer = null;
        }
        timer = setTimeout(() => {
            fuc.apply(_this, arg);
            timer = null
        }, delay);
    }
}