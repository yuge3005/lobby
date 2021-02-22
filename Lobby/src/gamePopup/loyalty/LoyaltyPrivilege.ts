
class LoyaltyPrivilege extends egret.DisplayObjectContainer {
    public static TEXT_ANIMATION_OVER: string = "TEXT_ANIMATION_OVER";

    private langResource: string;
    private _start: number = 0;
    private _end: number = 0;
    private coinIcon: egret.Bitmap;
    private coinText: egret.TextField;
    private coinsTimer: egret.Timer;

    constructor() {
        super();

        this.width = this.height = 438;
        this.anchorOffsetX = this.anchorOffsetY = 219;
        this.langResource = "loyalty_privilege_json";

        // loyalty data
        let loyaltyData = LoyaltyVo.data;
        let loyaltyLevel = Number(loyaltyData["loyalty_level"]) === 7 ? 6 : Number(loyaltyData["loyalty_level"]);

        // bg
        Com.addBitmapAt(this, this.langResource + ".light_bg", 0, 0);

        // icon bg
        Com.addBitmapAt(this, this.langResource + ".icon_bg", 124, 114);

        // loyalty level icon
        Com.addBitmapAt(this, "loyalty_level_icon_json." + loyaltyLevel, 117, 110);

        //arrows
        let arrowsPosition = [{ "x": 72, "y": 262 }, { "x": 256, "y": 114 }, { "x": 319, "y": 212 }];
        for (let i = 0; i < 3; i++) {
            let arrow = Com.addBitmapAt(this, this.langResource + ".arrow_up", arrowsPosition[i]["x"], arrowsPosition[i]["y"]);
            egret.setTimeout(function (arrow) {
                egret.Tween.get(arrow, { loop: true }).set({alpha: 0, anchorOffsetY: 0}).to({anchorOffsetY: 50, alpha: 1}, 200).to({anchorOffsetY: 150, alpha: 0}, 300);
            }.bind(this, arrow), this, 150 * i);
        }

        // coin icon
        this.coinIcon = Com.addBitmapAt(this, "lobby_json.icon_coin", 13, 336);
        this.coinIcon.scaleX = this.coinIcon.scaleY = .8;
        this.coinIcon.visible = false;

        // coin text
        this.coinText = Com.addTextAt(this, 100, 344, 328, 60, 42, false, false);
        this.coinText.fontFamily = "Righteous";
        this.coinText.verticalAlign = "middle";
        this.coinText.textColor = 0xFFFF00;
        this.coinText.visible = false;

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.startTextAnimation, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }

    /**
     * coins animation
     */
    public coinsAnimation(start: number, end: number): void {
        this._start = start;
        this._end = end;
    }

    /**
     * start text animation
     */
    private startTextAnimation(): void {
        if (this._start && this._end) {
            this.coinIcon.visible = this.coinText.visible = true;
            this.coinText.text = Utils.formatCoinsNumber(this._start);
            this.coinText.size = 42 - Math.max(this.coinText.text.length - 8, 0) * 4;

            let count = 15, step = (this._end - this._start) / count;

            this.coinsTimer = new egret.Timer(100, count);
            this.coinsTimer.addEventListener(egret.TimerEvent.TIMER, function(s: number) {
                this._start += s;
                this.coinText.text = Utils.formatCoinsNumber(this._start);
                this.coinText.size = 42 - Math.max(this.coinText.text.length - 8, 0) * 4;
            }.bind(this, step), this);
            this.coinsTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function() {
                this.coinText.text = Utils.formatCoinsNumber(this._end);
                this.coinText.size = 42 - Math.max(this.coinText.text.length - 8, 0) * 4;

                this.dispatchEvent(new egret.Event(LoyaltyPrivilege.TEXT_ANIMATION_OVER));
            }, this);
            
            egret.setTimeout(function() {
                this.coinsTimer.start();
            }, this, 300);
        }
    }

    /**
     * on remove
     */
    private onRemove(): void {
        if (this.coinsTimer) {
            this.coinsTimer.stop();
            this.coinsTimer = null;
        }
    }
}