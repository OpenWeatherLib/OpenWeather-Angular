export const substitute = <T>(type: new (...x: any) => T): any => {
    const mockObj: any = {};
    const obj: any = type.prototype;
    Object
        .getOwnPropertyNames(obj)
        .filter(key => typeof obj[key] === "function")
        .forEach(x => mockObj[x] = jest.fn());

    return mockObj;
};
