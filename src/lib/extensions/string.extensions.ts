interface String {
    empty: string;
    format(template: string, ...params: any[]): string;
    isNullOrEmpty(): boolean;
}

String.prototype.empty = "";

String.prototype.format = function (template: string, ...params: string[]): string {
    params.forEach((element, index) => {
        template = template.replace(`{${index}}`, element);
    });
    return template;
};

String.prototype.isNullOrEmpty = function (): boolean {
    return !this || this.length === 0;
};
