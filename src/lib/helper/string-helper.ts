export const format = (template: string, ...params: string[]): string => {
    params.forEach((element, index) => {
        template = template.replace(`{${index}}`, element);
    });
    return template;
};

export const isNullOrEmpty = (value: string): boolean => !value || value.length === 0;
