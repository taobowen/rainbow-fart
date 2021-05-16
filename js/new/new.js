function newObject (fuc) {
    let initObject = new Object();
    
    Object.setPrototypeOf(object, fuc.protoType);

    let newObject = fuc.bind(initObject)();
        
    return newObject ? newObject : initObject;
}