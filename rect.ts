export class Rect {
    constructor(public width: number, public height: number, public top = 0, public left = 0) {

    }

    public has_area(): boolean {
        return this.width > 0 && this.height > 0
    }
}
