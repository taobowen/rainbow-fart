function newObject (fuc) {
    let initObject = Object.create(fuc.protoType);

    let newObject = fuc.bind(initObject)();
        
    return newObject ? newObject : initObject;
}