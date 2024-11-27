import type { Color } from "$core/enums/Color";
import type { PlayerType } from "$core/enums/PlayerType";

export default interface IPlayer {
    get id(): number
    get name(): string
    get symbol(): string
    get color(): Color | string
    get type(): PlayerType

    set id(id: number)
    set name(name: string)
    set symbol(symbol: string)
    set color(color: Color | string)
    set type(type: PlayerType)
}