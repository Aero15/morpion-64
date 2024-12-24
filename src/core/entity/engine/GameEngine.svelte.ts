import { PlayerType } from "$core/enums/PlayerType";
import GameBoard from "$core/entity/board/GameBoard.svelte";
import type Player from "$core/entity/player/Player.svelte";
import type IWinnerInfo from "$core/interface/IWInnerInfo";
import type Point from "$core/entity/board/Point.svelte";
import PlayerList from "./PlayerList.svelte"
import { Score } from "$core/enums/Score";
import Timer from "./Timer.svelte";
import { getRandomFrom } from "$core/helpers/Array.svelte";

export default class GameEngine {
    private _board: GameBoard;
    private _players: PlayerList;
    private _timer: Timer;
    private _startTime: Date;
    private _endTime?: Date = $state(undefined);
    private _eraserEnabled: boolean = $state(false);
    private _winnerInfo: IWinnerInfo | undefined = $state(undefined);
  
    constructor(
        playerList: Player[],
        boardWidth: number = 3,
        boardHeight: number = 3
    ) {
        // Check board dimensions
        if (boardWidth < 3 || boardWidth > 8 || boardHeight < 3 || boardHeight > 8) {
            throw new Error("Les dimensions du plateau doivent être comprises entre 3 et 50.");
        }
    
        // Add players
        this._players = new PlayerList();
        for (const player of playerList) {
            this._players.addPlayer(player);
        }
        this._players.shuffle();
    
        // Init board
        this._board = new GameBoard(boardHeight, boardWidth);
        this._startTime = new Date();
        this._timer = new Timer();

        // Let the first player play if it's a bot
        if (this._players.getCurrentPlayer()?.type === PlayerType.Bot) {
            this._players.getCurrentPlayer()?.play(this);
        }
    }

    get board(): GameBoard {
        return this._board;
    }

    get players(): PlayerList {
        return this._players;
    }

    get timer(): Timer {
        return this._timer;
    }

    get startTime(): Date {
        return this._startTime;
    }

    get endTime(): Date | undefined {
        return this._endTime;
    }

    get eraserEnabled(): boolean {
        return this._eraserEnabled;
    }

    set eraserEnabled(enabled: boolean) {
        this._eraserEnabled = enabled;
    }

    get winnerInfo(): IWinnerInfo | undefined {
        return this._winnerInfo;
    }

    // Play move (place or erase) at position
    playMoveAt(position: Point): void {
        if (this.eraserEnabled) {
            this.eraseAt(position)
        } else {
            this.placeAt(position)
        }

        this.eraserEnabled = false
    }
  
    // Place symbol at position
    placeAt(position: Point): void {
        const player = this._players.getCurrentPlayer();
        if (player) {
            const { symbol, color } = player;
            this._board.placeSymbolAt(position, symbol, color);
            player.addScore(Score.Draw);
        }

        this.afterPlayerMove(position);
    }

    // Erase symbol at position
    eraseAt(position: Point): void {
        // TODO: Remove points from the player losing his cell

        this._board.setEmptyAt(position);

        const player = this._players.getCurrentPlayer();
        if (player) {
            player.addScore(Score.Erase);
        }

        this.afterPlayerMove(position);
    }

    stop(): void {
        this._endTime = new Date();
        this._timer.stop();
    }

    // Display hint  
    showHint(): void {
        // Remove all highlight
        this._board.clearHighlight()

        // Get current player to calculate a strategic position for him
        let player = this._players.getCurrentPlayer()!
        let { symbol, color } = player
        let strategicPositions = this._board.findStrategicPositions(symbol, color)
        let { oneSymbolPositions, twoSymbolsPositions } = strategicPositions;

        // If there is a strategic position to complete an alignment of 2 existing symbols
        if (twoSymbolsPositions.length > 0) {
            let position = getRandomFrom<Point>(twoSymbolsPositions);
            let x = $state.snapshot(position.x)
            let y = $state.snapshot(position.y)
            this._board.setHighlightedAt(x, y, true)
            return;
        }

        // If there is a strategic position to complete an alignment of 1 existing symbol
        if (oneSymbolPositions.length > 0) {
            let position = getRandomFrom<Point>(oneSymbolPositions);
            let x = $state.snapshot(position.x)
            let y = $state.snapshot(position.y)
            this._board.setHighlightedAt(x, y, true)
            return;
        }

        // Get a random empty position
        let positions = this._board.getEmptyPositions()
        let position = getRandomFrom<Point>(positions);
        let x = $state.snapshot(position.x)
        let y = $state.snapshot(position.y)
        this._board.setHighlightedAt(x, y, true)
    }

    // Callback after player move
    private afterPlayerMove(position: Point): void {
        if (!this.timer.isRunning()) {
            this.timer.start();
        }

        // Remove highlight (if any, like hints)
        this._board.clearHighlight();

        // Search for winner after the move
        this._winnerInfo = this._board.findWinner();

        // If there is a winner or if there are no more empty cells
        if (this.winnerInfo || this._board.getEmptyPositions().length === 0) {
            // Stop game
            this.stop();

            // If there is a winner
            if (this.winnerInfo) {
                // Highlight winning positions
                const { positions } = this.winnerInfo;
                for (const position of positions) {
                    const { x, y } = position;
                    this._board.setHighlightedAt(x, y, true);
                }

                // Add points to winner
                const player = this._players.getCurrentPlayer();
                if (player) {
                    player.addScore(Score.Win);
                }
            }
            
            return
        }

        // If the game is over (when user changes page)
        if (this._endTime !== undefined) {
            return
        }

        // Switch to next player
        const player = this._players.switchToNextPlayer()

        // Leave if there is no player to play
        if (!player) {
            return
        }

        // Let the bot play if it's his turn
        if (player.type === PlayerType.Bot) {
            player.play(this);
        }
    }
}