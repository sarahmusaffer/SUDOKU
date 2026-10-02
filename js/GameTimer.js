class GameTimer {
    constructor() {
        this.seconds = 0;
        this.timer = null;
    }

    start() {
        const current = this;
        this.timer = setInterval(function () {
            current.seconds++;
            let hours = Math.floor(current.seconds / 3600);
            let minutes = Math.floor((current.seconds % 3600) / 60);
            let remainingSeconds = current.seconds % 60;
        }, 1000);
    }

    stop() {
        clearInterval(this.timer);
    }

    reset() {
        this.stop();
        this.seconds = 0;
    }

    getSeconds() {
        return this.seconds;
    }
}

export default GameTimer;
