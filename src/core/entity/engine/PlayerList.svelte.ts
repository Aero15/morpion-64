import type Player from "../player/Player.svelte";

export default class PlayerList {
    private _players: Player[] = $state([]);
    private _currentTurn: number = $state(0);

    addPlayer(player: Player): void {
        this._players.push(player);
    }

    getPlayerbyId(id: number): Player | undefined {
        return this._players
            .find(player => player.id === id);
    }

    removePlayerById(id: number): void {
        this._players = this._players
            .filter(player => player.id !== id)
    }

    shuffle(): void {
        for (let i = this._players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._players[i], this._players[j]] = [this._players[j], this._players[i]];
        }
    }

    getCurrentPlayer(): Player | null {
        return this._players.length > 0 ? this._players[this._currentTurn] : null;
    }

    // Return the current turn index
    get currentTurn(): number {
        return this._currentTurn;
    }

    get players(): Player[] {
        return this._players;
    }
  
    // Pass to the next player
    switchToNextPlayer(): Player | null {
        if (this._players.length === 0)
            return null;
    
        this._currentTurn = (this._currentTurn + 1) % this._players.length;
        return this.getCurrentPlayer();
    }
}