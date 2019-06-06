declare var jasmine;

export const substitute = <T>(type: new (...x: any[]) => T): jasmine.SpyObj<T> =>
    jasmine.createSpyObj(
        type.prototype.constructor.name,
        Object.getOwnPropertyNames(type.prototype).filter(key => typeof type.prototype[key] === "function"));
