// Great Help: https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md

import "reflect-metadata";

const propJsonKeyMetadataKey = Symbol("propJsonKey");

/**
 * sets jsonKey values to convert from received json on property
 * @param parent
 * @param key
 */
export const propJsonKey = (parent: string, key: string): any => (target: Object, propertyKey: string | symbol, _: number) => {
  const existingParameters: {}[] = Reflect.getOwnMetadata(propJsonKeyMetadataKey, target, propertyKey) || [];
  existingParameters.push({ parent: parent, key: key });
  Reflect.defineMetadata(propJsonKeyMetadataKey, existingParameters, target, propertyKey);
};
