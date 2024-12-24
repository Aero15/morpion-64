
export default class Timer {
    private _seconds: number = $state(0);
    private _handle: any = null;
    private _isRunning: boolean = $state(false);

    get seconds(): number {
        return this._seconds;
    }

    get isRunning(): boolean {
        return this._isRunning;
    }

    start(): void {
        this._seconds = 0;
        this.resume();
    }

    resume(): void {
        this._handle = setInterval(() => {
            this._seconds++;
        }, 1000);
        this._isRunning = true;
    }

    stop(): void {
        clearInterval(this._handle);
        this._handle = null;
        this._isRunning = false;
    }
}