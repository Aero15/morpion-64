import { PlayerType } from "$core/enums/PlayerType";
import GameBoard from "$core/entity/board/GameBoard.svelte";
import type Point from "$core/entity/board/Point.svelte";
import type Player from "$core/entity/player/Player.svelte";
import PlayerList from "./PlayerList.svelte"

export default class GameEngine {
    private _board: GameBoard;
    private _players: PlayerList;
    private _startTime: Date;
    private _endTime?: Date = $state(undefined);
    private _eraserEnabled: boolean = $state(false);
    private _winnerSymbol: string | null = $state(null);
  
    constructor(
        playerList: Player[],
        boardWidth: number = 3,
        boardHeight: number = 3
    ) {
        // Vérification des dimensions du plateau
        if (boardWidth < 3 || boardWidth > 50 || boardHeight < 3 || boardHeight > 50) {
            throw new Error("Les dimensions du plateau doivent être comprises entre 3 et 50.");
        }
    
        // Ajout des joueurs à la liste des paricipants
        this._players = new PlayerList();
        for (const player of playerList) {
            this._players.addPlayer(player);
        }
        this._players.shuffle();
    
        // Initialisation du plateau de jeu
        this._board = new GameBoard(boardHeight, boardWidth);
        this._startTime = new Date(); // Date de début du jeu

        // Lancement de l'action du premier joueur s'il s'agit d'un ordinateur
        if (this._players.getCurrentPlayer()?.type === PlayerType.Bot) {
            this._players.getCurrentPlayer()?.play(this);
        }
    }

    // Retourne le plateau de jeu
    get board(): GameBoard {
        return this._board;
    }

    // Retourne la liste des joueurs
    get players(): PlayerList {
        return this._players;
    }

    // Retourne la date de début du jeu
    get startTime(): Date {
        return this._startTime;
    }

    // Retourne la date de fin du jeu
    get endTime(): Date | undefined {
        return this._endTime;
    }

    // Indique si le mode effaceur est activé
    get eraserEnabled(): boolean {
        return this._eraserEnabled;
    }

    // Active ou désactive le mode effaceur
    set eraserEnabled(enabled: boolean) {
        this._eraserEnabled = enabled;
    }

    get winnerSymbol(): string | null {
        return this._winnerSymbol;
    }

    playMoveAt(position: Point): void {
        if (this.eraserEnabled) {
            this.eraseAt(position)
        } else {
            this.placeAt(position)
        }

        this.eraserEnabled = false
    }
  
    // Méthode pour placer un symbole
    placeAt(position: Point): void {
        const player = this.players.getCurrentPlayer();
        if (player) {
            const { symbol, color } = player;
            this.board.placeSymbolAt(position, symbol, color);
        }

        this.afterPlayerMove(position);
    }

    eraseAt(position: Point): void {
        this.board.setEmptyAt(position);

        this.afterPlayerMove(position);
    }

    private afterPlayerMove(position: Point): void {
        // Vérifier si la position a permis de gagner la partie
        this._winnerSymbol = this.board.findWinner();

        // S'il y a un gagnant ou si il n'y a plus de cellules vides, on arrete le jeu
        if (this.winnerSymbol || this.board.getEmptyPositions().length === 0) {
            this._endTime = new Date();

            // TODO: Récupérer les positions à mettre en surbrillance
            
            return
        }

        const player = this.players.switchToNextPlayer()

        // Abandonner s'il n'y a pas de joueur à suivre
        if (!player) {
            return
        }

        if (player.type === PlayerType.Bot) {
            player.play(this);
        }
    }
}