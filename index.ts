import * as Packer from './packer'
import { Rect } from './rect'

function shuffle(array: Rect[]) {
    for (let i = 0; i < array.length; ++i) {
        const swap_with = (Math.random() * array.length) | 0
        const temp = array[i]
        array[i] = array[swap_with]
        array[swap_with] = temp
    }
}

const input: Rect[] = [
    new Rect(4, 2),
    new Rect(4, 2),
    new Rect(4, 2),
    new Rect(4, 2),
    new Rect(4, 2),
    new Rect(4, 2),
    new Rect(5, 1),
    new Rect(5, 1),
    new Rect(5, 1),
    new Rect(5, 1),
    new Rect(1, 5),
    new Rect(1, 5),
    new Rect(1, 5),
]
shuffle(input)

const field_rect = new Rect(10, 10)
const field = new Packer.Field(field_rect)
input.forEach(r => {
    field.insert(r)
})

function print_rects(rects: Rect[]) {
    const chars: string[][] = []
    for (let j = 0; j < field_rect.height; ++j) {
        chars[j] = new Array<string>(field_rect.width)
        chars[j].fill(' ', 0, field_rect.width)
    }
    const symbols: string[] = [ 'x', 'o', '+', '.', '=', 'W', 'm', '8' ]
    let symbol_index = 0

    rects.forEach(r => {
        for (let i = 0; i < r.width; ++i) {
            for (let j = 0; j < r.height; ++j) {
                chars[j + r.top][i + r.left] = symbols[symbol_index]
            }
        }
        symbol_index = (symbol_index + 1) % symbols.length
    })
    
    for (let j = 0; j < field_rect.height; ++j) {
        console.log(JSON.stringify(chars[j]))
    }
}

console.log('----- Children -----')
print_rects(field.children)

console.log('----- Free rec -----')
print_rects(field.free)
