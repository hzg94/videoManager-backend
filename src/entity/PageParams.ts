

export class PageParams {
    current: number
    size: number

    constructor(current: number, size: number) {
        this.current = current
        this.size = size
    }

    getOffset() {
        return (this.current - 1) * this.size
    }

}