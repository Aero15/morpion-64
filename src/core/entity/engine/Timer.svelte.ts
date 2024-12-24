
export default class Timer {
    private _seconds: number = $state(0);
    private _handle: any = null;

    start(): void {
        this._handle = setInterval(() => {
            this._seconds++;
        }, 1000);
    }

    stop(): void {
        clearInterval(this._handle);
    }

    getElapsedTime(): { hours: number, minutes: number, seconds: number } {
        const hours = Math.floor(this._seconds / 3600);
        const minutes = Math.floor((this._seconds % 3600) / 60);
        const seconds = this._seconds % 60;
        return { hours, minutes, seconds };
    }

    isRunning(): boolean {
        return this._handle !== null;
    }
}