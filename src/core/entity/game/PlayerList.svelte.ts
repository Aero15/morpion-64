import type Player from "../player/Player.svelte";

export default class PlayerList {
    private _players: Player[] = $state([]);
    private _currentTurn: number = $state(0);
  
    // Ajouter un joueur à la liste
    addPlayer(player: Player): void {
        this._players.push(player);
    }
  
    // Récupérer un joueur par son id
    getPlayerbyId(id: number): Player | undefined {
        return this._players
            .find(player => player.id === id);
    }
  
    // Supprimer un joueur de la liste par son nom
    removePlayerById(id: number): void {
        this._players = this._players
            .filter(player => player.id !== id)
    }
  
    // Mélanger la liste des joueurs pour un ordre aléatoire
    shuffle(): void {
        for (let i = this._players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this._players[i], this._players[j]] = [this._players[j], this._players[i]];
        }
    }
  
    // Trouver le joueur qui doit jouer
    getCurrentPlayer(): Player | null {
        return this._players.length > 0 ? this._players[this._currentTurn] : null;
    }

    // Obtenir l'index du joueur courant
    get currentTurn(): number {
        return this._currentTurn;
    }
  
    // Passer au joueur suivant
    switchToNextPlayer(): Player | null {
        if (this._players.length === 0)
            return null;
    
        this._currentTurn = (this._currentTurn + 1) % this._players.length;
        return this.getCurrentPlayer();
    }
  
    // Optionnel : méthode pour obtenir la liste des joueurs
    list(): Player[] {
        return this._players;
    }
}