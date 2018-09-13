// Great Help: https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md

import "reflect-metadata";

const propJsonKeyMetadataKey = Symbol("propJsonKey");

/**
 * sets jsonKey values to convert from received json on class
 * @param parent
 * @param key
 */
function classJsonKey(parent: string, key: string) {
  return (target: any) => {
    target.prototype.jsonKey.parent = parent;
    target.prototype.jsonKey.key = key;
  };
}

/**
 * sets jsonKey values to convert from received json on property
 * @param parent
 * @param key
 */
function propJsonKey(parent: string, key: string) {
  return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
    let existingParameters: {}[] = Reflect.getOwnMetadata(propJsonKeyMetadataKey, target, propertyKey) || [];
    existingParameters.push({ parent: parent, key: key });
    Reflect.defineMetadata(propJsonKeyMetadataKey, existingParameters, target, propertyKey);
  }
}
