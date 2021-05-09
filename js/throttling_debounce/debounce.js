function debounce (func, time) {
    let timeTag;
    return () => {
        if (!timeTag) {
            func(...arguments);
            timeTag = setTimeout(() => {
                timeTag = null;
            }, time)
            return;
        }

        timeTag = setTimeout(() => {
            timeTag = null;
        }, time)
    }
}