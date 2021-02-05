
class HourlyBonusBar extends egret.DisplayObjectContainer {
    private _enabled: boolean;
    // private bonus: BonusVo;
    private collectTimes: number;
    private hourlyBonus: Object;
	private levelUpBonus: Object;
	private timeNextBonus: number;
	private secondsTimer: egret.Timer;

    private hourlyPoint: egret.DisplayObjectContainer;
    private points: Array<egret.Bitmap>;
    private hourlyOverplus: egret.Timer;
    private hourlyOverplusText: egret.TextField;
    private collectHourlyBtn: egret.DisplayObjectContainer;
    private collectText: egret.TextField;

    constructor() {
        super();

        this.touchEnabled = true;

        // this.bonus = new Wheel().bonus;
        // this.hourlyBonus = this.bonus.get("hourlyBonuses");
		// this.levelUpBonus = this.bonus.get("levelUpBonus");
		// this.collectTimes = this.bonus.get("hourlyBonusCount") || 0;
		// this.timeNextBonus = this.bonus.get("timeNextBonus");

        // wheel bg
        Com.addBitmapAt(this, "lobby_json.icon_wheel", 90, 0);

        // mask bg
        Com.addBitmapAt(this, "lobby_json.wheel_cover", 0, 125);

        // hourly point
        this.hourlyPoint = new egret.DisplayObjectContainer();
        Com.addObjectAt(this, this.hourlyPoint, 86, 131);
        // points
        Com.addBitmapAt(this.hourlyPoint, "lobby_json.wheel_light_bg", 0, 3);
        this.points = new Array<egret.Bitmap>(5);
        for (let i = 0; i < 5; i++) {
            this.points[i] = Com.addBitmapAt(this.hourlyPoint, "lobby_json.wheel_light", i * 58 - 3, 0);
        }
        // hourly overplus
        Com.addBitmapAt(this.hourlyPoint, "lobby_json.wheel_time_bg", 1, 35);
        this.hourlyOverplusText = Com.addTextAt(this.hourlyPoint, 25, 114, 245, 47, 32, false, false);
        this.hourlyOverplusText.fontFamily = "Righteous";
        this.hourlyOverplusText.verticalAlign = "middle";
        this.hourlyOverplusText.stroke = 2;
        this.hourlyOverplusText.strokeColor = 0x025416;

        // collect btn
        this.collectHourlyBtn = new egret.DisplayObjectContainer();
        Com.addObjectAt(this, this.collectHourlyBtn, 90, 142);
        // bg
        Com.addBitmapAt(this.collectHourlyBtn, "lobby_json.btn_collect", 0, 0);
        // collect text
        this.collectText = Com.addTextAt(this.collectHourlyBtn, 0, 0, 289, 70, 42, false, false);
        this.collectText.fontFamily = "Righteous";
        this.collectText.verticalAlign = "middle";
        this.collectText.stroke = 2;
        this.collectText.strokeColor = 0x025416;
        this.collectText.text = MuLang.getText( "collect", MuLang.CASE_UPPER );

        this.setPointsStatus();
        this.enabled = this.leftTime < 0;

        // seconds timer
        this.secondsTimer = new egret.Timer(1000, 0);
        this.secondsTimer.addEventListener(egret.TimerEvent.TIMER, this.onSecondsTimer, this);
        this.secondsTimer.start();

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouched, this);

        // set spin bar instance in Trigger
        Trigger.instance["spinBar"] = this;
    }

    /**
     * on seconds timer
     */
    private onSecondsTimer(): void {
        if (this.leftTime <= 0) {
            this.enabled = true;
        } else {
            this.hourlyOverplusText.text = Utils.secondToHour(this.leftTime);
        }
    }

    /**
     * set points status
     */
    private setPointsStatus(){
		for( let i:number = 0; i < this.points.length; i++ ){
			if( i < this.collectTimes ) this.points[i].visible = true;
			else this.points[i].visible = false;
		}
	}

    /**
     * hourly bonus left time
     */
    private get leftTime(){
		return Math.max( 0, Math.floor( this.timeNextBonus - new Date().getTime() / 1000 ) );
	}

    /**
     * on touched
     */
    private onTouched(e: egret.TouchEvent): void {
        e.stopImmediatePropagation();

        // if (this.enabled) {
        //     if (this.collectTimes < 4) {
        //         this.showBank();
        //     } else {
        //         Wheel.modal = SpinWheel.SpinWheelModel["RANDOM"];
		//         Trigger.insertModel(SpinWheel);
        //     }
        // } else {
        //     if (Boolean(UserVo.get("blockPurchase"))) {
        //         this.showBank();
        //     } else {
        //         Wheel.modal = SpinWheel.SpinWheelModel["COINS"];
		// 		Trigger.insertInstance(new SpinWheelVIP());
        //     }
        // }
    }

    /**
     * update bonus data
     */
    public updateBonusData(data: any): void {
        let update = data["update"];
        // PlayerConfig.player("bonus.hourly_bonus_count", update["bonus"]["hourly_bonus_count"]);
        // PlayerConfig.player("bonus.random", update["bonus"]["random"]);
        // PlayerConfig.player("bonus.time_next_bonus", Number(update["bonus"]["time_next_bonus"]));
        // PlayerConfig.player("score.coins", update["score"]["coins"]);
        // Wheel.updateBonus(PlayerConfig.player("bonus"));

        this.timeNextBonus = Number(update["bonus"]["time_next_bonus"]);
        // this.bonus.update("timeNextBonus", Number(update["bonus"]["time_next_bonus"]));

        this.enabled = false;
        if (this.collectTimes < 4) {
            let rewardItems = data["reward_items"];
            if (rewardItems) {
                // ExtendItemVo.showItems(rewardItems, new egret.Point(965, 860));
            }
            
            this.points[this.collectTimes].visible = true;
            this.collectTimes++;
        } else {
            this.collectTimes = 0;
            this.setPointsStatus();

            // Wheel.sector = Number(data["sector"]);
            // Wheel.spinWheelCoinsNumber = Number(data["reward"]["value"]);
        }

        if (data["mission_value"]) {
            // MissionVo.checkFinish(Number(data["mission_value"]));
        }
    }

    /**
     * show bank
     */
    private showBank(): void {
        // this.dispatchEvent(new egret.Event(Lobby.SHOW_BANK));
    }

	public get enabled(){
		return this._enabled;
	}

	public set enabled(value: boolean){
		this._enabled = value;
        this.hourlyPoint.visible = !value;
        this.collectHourlyBtn.visible = value;

		if (value) {
			if( this.collectTimes < 4 ){
				this.collectText.text = MuLang.getText( "collect", MuLang.CASE_UPPER );
			} else {
				this.collectText.text = MuLang.getText( "spin_wheel", MuLang.CASE_UPPER );
			}
		} else this.hourlyOverplusText.visible = true;
	}
}