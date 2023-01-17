class Timer {
    startTime = 0;
    endTime = 0;

    start() {
        this.startTime = (new Date()).getTime();
    }

    stop() {
        this.endTime = (new Date()).getTime();
    }

    get timeElapsed() {
        return this.endTime - this.startTime;
    }
}