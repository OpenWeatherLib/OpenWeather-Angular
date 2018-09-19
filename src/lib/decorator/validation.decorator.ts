import "reflect-metadata";

import { ValidationRequiredType } from "@lib/enums";

const requiredMetadataKey = Symbol("required");

export function required(type: ValidationRequiredType) {
    return (target: Object, propertyKey: string | symbol, parameterIndex: number) => {
        const existingRequiredParameters: any[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
        existingRequiredParameters.push({ index: parameterIndex, type: type });
        Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
    };
}

export function validate<T>(defaultReturnValue: T) {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) => {
        const method = descriptor.value;

        descriptor.value = function () {
            const requiredParameters: any[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
            if (requiredParameters) {
                for (const parameters of requiredParameters) {
                    if (parameters.index >= arguments.length) {
                        console.error(`Missing required argument at ${propertyName}.`);
                        return defaultReturnValue;
                    } else {
                        const argumentValue = arguments[parameters.index];
                        if (argumentValue === undefined || argumentValue === null) {
                            console.error(`Missing required argument undefined|null at ${propertyName}.`);
                            return defaultReturnValue;
                        } else {
                            if (parameters.type === ValidationRequiredType.String && argumentValue === "") {
                                console.error(`Missing required argument for string at ${propertyName}.`);
                                return defaultReturnValue;
                            } else if (parameters.type === ValidationRequiredType.Array && argumentValue.length === 0) {
                                console.error(`Missing required argument for array at ${propertyName}.`);
                                return defaultReturnValue;
                            }
                        }
                    }
                }
            }

            return method.apply(this, arguments);
        };
    };
}
