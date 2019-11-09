/*eslint-disable prefer-rest-params */

import "reflect-metadata";

import { ValidationRequiredType } from "@lib/enums";
import { any } from "@lib/helper";

const requiredMetadataKey = Symbol("required");

export const required = <T>(type: ValidationRequiredType, prohibitedValues: T[] = []): any => (target: object, propertyKey: string | symbol, parameterIndex: number): void => {
    const existingRequiredParameters: any[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push({ index: parameterIndex, type: type, prohibitedValues: prohibitedValues });
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
};

export const validate = <T>(defaultReturnValue: T): any => (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>): any => {
    const method: Function = descriptor.value;

    descriptor.value = function (): any {
        const requiredParameters: any[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
        if (requiredParameters) {
            for (const parameter of requiredParameters) {
                const index = parameter.index;
                const type = parameter.type;
                const prohibitedValues = parameter.prohibitedValues;

                if (index >= arguments.length) {
                    console.error(`Missing required argument at ${propertyName} with parameter ${JSON.stringify(parameter)}`);
                    return defaultReturnValue;
                } else {
                    const argumentValue = arguments[index];
                    if (argumentValue === undefined || argumentValue === null) {
                        console.error(`Missing required argument undefined|null at ${propertyName} with parameter ${JSON.stringify(parameter)}.`);
                        return defaultReturnValue;
                    } else {
                        if (type === ValidationRequiredType.Array && !any(argumentValue)) {
                            console.error(`Missing required argument for array at ${propertyName} with parameter ${JSON.stringify(parameter)}.`);
                            return defaultReturnValue;
                        } else if (type === ValidationRequiredType.Enum && prohibitedValues.some(x => x === argumentValue)) {
                            console.error(`Missing or invalid required argument for enum at ${propertyName} with parameter ${JSON.stringify(parameter)}.`);
                            return defaultReturnValue;
                        } else if (type === ValidationRequiredType.Int && prohibitedValues.some(x => x === argumentValue)) {
                            console.error(`Missing or invalid required argument for int at ${propertyName} with parameter ${JSON.stringify(parameter)}.`);
                            return defaultReturnValue;
                        } else if (type === ValidationRequiredType.String && (argumentValue === "" || prohibitedValues.some(x => x === argumentValue))) {
                            console.error(`Missing or invalid required argument for string at ${propertyName} with parameter ${JSON.stringify(parameter)}.`);
                            return defaultReturnValue;
                        }
                    }
                }
            }
        }

        return method.apply(this, arguments);
    };
};
