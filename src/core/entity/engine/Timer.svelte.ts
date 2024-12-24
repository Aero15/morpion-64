
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

    get seconds(): number {
        return this._seconds;
    }

    isRunning(): boolean {
        return this._handle !== null;
    }
}