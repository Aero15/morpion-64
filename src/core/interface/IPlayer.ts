import type { PlayerType } from "$core/enums/PlayerType";

export default interface IPlayer {
    get id(): number
    get name(): string
    get symbol(): string
    get color(): string
    get type(): PlayerType

    set id(id: number)
    set name(name: string)
    set symbol(symbol: string)
    set color(color: string)
    set type(type: PlayerType)
}