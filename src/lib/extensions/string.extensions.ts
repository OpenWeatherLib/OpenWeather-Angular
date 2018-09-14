interface String {
    empty: string;
    isNullOrEmpty(): boolean;
}

String.prototype.empty = "";

String.prototype.isNullOrEmpty = function (): boolean {
    return !this || this === this.empty();
}