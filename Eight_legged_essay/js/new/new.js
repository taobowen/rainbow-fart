function newObject (fuc) {
    let initObject = Object.create(fuc.prototype);

    let newObject = fuc.bind(initObject)();
        
    return newObject ? newObject : initObject;
}
