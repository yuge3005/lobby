
class PoLimitVo {
    protected id: number;
    protected type: string;
    protected className: string;
    protected productId: number;
    private expiredTime: number;
    private cooldownTime: number;
    private expiredTimer: egret.Timer;
    private cooldownTimer: egret.Timer;
    public get can() {
        let current = new Date().valueOf();
        return this.expiredTime > current;
    }

    constructor(id: number, type: string, className: string, productId: number, expiredTime: number, cooldownTime: number) {
        if (className === "") return;
        let currentTime = new Date().valueOf();
        this.id = id;
        this.type = type;
        this.className = className;
        this.productId = productId;
        this.expiredTime = expiredTime > 0 ? currentTime + expiredTime * 1000 : 0;
        this.cooldownTime = currentTime + cooldownTime * 1000;

        this.restartTimer();
    }

    /**
     * update limit
     */
    private updatePoLimit(data: any) {
        data = typeof data === "string" ? JSON.parse(data) : data;

        if (data["timer_seconds"]) {
            let time = Number(data["time"]);
            let currentTime = new Date().valueOf();
            this.expiredTime = currentTime + (Number(data["expired_time"]) - time) * 1000;
            this.cooldownTime = currentTime + (Number(data["cooldown_end_time"]) - time) * 1000;

            this.restartTimer();
        } else {
            this.stopTimer();

            this.expiredTime = 1;
        }
    }

    /**
     * stop timer
     */
    private stopTimer(): void {
        if (this.expiredTimer) {
            this.expiredTimer.stop();
            this.expiredTimer = null;
        }

        if (this.cooldownTimer) {
            this.cooldownTimer.stop();
            this.cooldownTimer = null;
        }
    }

    /**
     * restart timer
     */
    private restartTimer(): void {
        this.stopTimer();

        // current time
        let currentTime = new Date().valueOf();

        console.log(this.expiredTime);
        console.log(currentTime);

        if (this.expiredTime > currentTime) {
            console.log("expired");// expired timer
            this.expiredTimer = new egret.Timer(1000, 0);
            this.expiredTimer.addEventListener(egret.TimerEvent.TIMER, this.expiredTimerTick, this);
            this.expiredTimer.start();
        } else {
            if (Lobby.getInstance()) {
                Lobby.getInstance().topBar.poOverplusOver();
            }
        }

        if (this.cooldownTime > currentTime) {
            console.log("cooldown")// cooldown timer
            this.cooldownTimer = new egret.Timer(1000, 0);
            this.cooldownTimer.addEventListener(egret.TimerEvent.TIMER, this.cooldownTimerTick, this);
            this.cooldownTimer.start();
        } else {
            this.sendRefreshLimitRequest();
        }      
    }

    private expiredTimerTick( event: egret.TimerEvent ){
        let time = Math.floor((this.expiredTime - new Date().valueOf()) / 1000);
        if (time > 0) {
            if (Lobby.getInstance()) {
                Lobby.getInstance().topBar.updateOverplusText(time);
            }
            if (Trigger.instance["currentPo"]) {
                Trigger.instance["currentPo"]["updateDealOverplusText"](time);
            }
        } else {
            this.expiredTime = 0;
            if (this.expiredTimer) {
                this.expiredTimer.stop();
                this.expiredTimer = null;
                if (Lobby.getInstance()) {
                    Lobby.getInstance().topBar.poOverplusOver();
                }
                if (Trigger.instance["currentPo"]) {
                    Trigger.instance["currentPo"]["poOverplusOver"]();
                }
            }
        }
    }

    private cooldownTimerTick( event: egret.TimerEvent ){
        if (new Date().valueOf() > this.cooldownTime) {
            if (this.cooldownTimer) {
                this.cooldownTimer.stop();
                this.cooldownTimer = null;

                this.sendRefreshLimitRequest();
            }
        }
    }

    /**
     * send refresh limit request
     */
    private sendRefreshLimitRequest(): void {
        let data = {"product_id": this.productId, "id": this.id, "type": this.type};
        new DataServer().getDataFromUrl(eval("API_HOST") + "/cmd.php?action=get_po_timer", this.updatePoLimit, this, true, data);
    }
}