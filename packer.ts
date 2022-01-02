import { Rect } from './rect'

type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
type FixedLengthArray<T extends any[]> =
    Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
    & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> }

export class Field {
    // Free spaces in this field
    free: Rect[] = []
    // Inserted children
    public readonly children: Rect[] = []
    // Which way to push children, 0 is left/top
    gravity = { x: 0, y: 1 }

    constructor(r: Rect) {
        this.push_free(r)
    }

    push_free(r: Rect) {
        if (r.has_area()) {
            this.free.push(r)
        }
    }

    split(root: Rect, child: Rect): void {
        const root_index = this.free.indexOf(root)
        this.free.splice(root_index, 1)

        if (child.width > child.height) {
            // split vertical
            this.push_free(new Rect(
                child.width,
                root.height - child.height,
                root.top,
                root.left
            ))
            this.push_free(new Rect(
                root.width - child.width,
                root.height,
                root.top,
                child.left + child.width
            ))
        }
        else {
            // split horizontal
            this.push_free(new Rect(
                root.width,
                root.height - child.height,
                root.top,
                root.left
            ))
            this.push_free(new Rect(
                root.width - child.width,
                child.height,
                child.top,
                child.left + child.width
            ))
        }
    }

    insert(child: Rect): boolean {
        const fitting_rect = this.free.find(rect => {
            return rect.width >= child.width && rect.height >= child.height
        })

        if (fitting_rect) {
            child.top = fitting_rect.top + this.gravity.y * (fitting_rect.height - child.height)
            child.left = fitting_rect.left + this.gravity.x * (fitting_rect.width - child.width)
            this.children.push(child)
            this.split(fitting_rect, child)
            return true
        }
        return false
    }
}

export class Packer {
    width: number
    height: number

    fields: FixedLengthArray<[Rect, Rect, Rect, Rect]>

    constructor(width: number, height: number) {
        /*this.width = width
        this.height = height

        this.fields[0] = {
            width: Math.floor(width / 2), 
            height: Math.floor(height / 2),
            top: height - this.height,
            left: width - this.width
        }
        this.fields[1] = {
            width: this.fields[0].width,
            height: this.fields
        }*/
    }
}
