interface String {
    empty: string;
    format(template: string, ...params: any[]): string;
    isNullOrEmpty(): boolean;
}

String.prototype.empty = "";

String.prototype.format = (template: string, ...params: string[]): string => {
    params.forEach((element, index) => {
        template = template.replace(`{${index}}`, element);
    });
    return template;
};

String.prototype.isNullOrEmpty = (): boolean => !this || this.length === 0;
