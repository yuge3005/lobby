
class PopupLimitVo extends PoLimitVo {
    private startTime: number;
    private startTimer: egret.Timer;
    private endTime: number;
    private endTimer: egret.Timer;

    public get can() {
        let current = new Date().valueOf();
        return current >= this.startTime && current < this.endTime;
    }

    constructor(className: string, productId: number, startTime: number, endTime: number) {
        super("", null, null, null);

        this.className = className;
        this.productId = productId;
        this.startTime = startTime;
        this.endTime = endTime;

        this.createTimer();
    }


    /**
     * create timer
     */
    private createTimer(): void {
        let current = new Date().valueOf();

        if (this.endTime > current) {
            this.endTimer = new egret.Timer(1000, Math.floor((this.endTime - current) / 1000));
            this.endTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timeLimitOver, this);
            this.endTimer.start();
        } else this.timeLimitOver();
    }

    /**
     * time limit over
     */
    private timeLimitOver(): void {
        if (Trigger.instance["currentPo"]) {
            if (Trigger.instance["currentPo"] instanceof eval(this.className)) Trigger.instance.closeCurrentPo();
        }
    }
}