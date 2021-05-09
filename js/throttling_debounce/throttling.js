function throttling (func, time) {
    let lastTime,
    return () => {
        if (!lastTime) {
            lastTime = Date.now();
            func(...arguments);
            return;
        }

        let newTime = Date.now();

        if (newTime - lastTime >= time) {
            func(...arguments);
            lastTime = newTime;
        }
    }
}