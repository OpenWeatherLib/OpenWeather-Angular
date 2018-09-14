interface String {
    empty: string;
    isNullOrEmpty(): boolean;
    format(template: string, ...params: any[]): string;
}

String.prototype.empty = "";

String.prototype.isNullOrEmpty = function (): boolean {
    return !this || this === this.empty();
}

String.prototype.format = function (template: string, ...params: string[]): string {
    params.forEach((element, index) => {
        template = template.replace(`{${index}}`, element);
    });
    return template;
}