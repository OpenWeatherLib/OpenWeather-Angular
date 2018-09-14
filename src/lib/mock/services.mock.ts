declare var jasmine;

export default class MockServices {
    static substitute<T>(type: { new(...x): T }): jasmine.SpyObj<T> {
        const obj = type.prototype;

        const objPropertyNames = Object.getOwnPropertyNames(obj);
        const methods = objPropertyNames.filter(key => typeof obj[key] === "function");

        return jasmine.createSpyObj(
            obj.constructor.name,
            methods
        );
    }
}
