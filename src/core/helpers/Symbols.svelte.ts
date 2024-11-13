import { Symbol } from "$core/enums/Symbol";

export function randomSymbol() {
    const list = Object.values(Symbol)
    const random = Math.floor(Math.random() * list.length)
    return list[random]
}