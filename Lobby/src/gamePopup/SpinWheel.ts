class SpinWheel extends GenericPo{
	private wheel: Wheel;
	private wheelContainer: egret.DisplayObjectContainer;
	private doctorHead: egret.Bitmap;
	private leftEye: egret.Bitmap;
	private rightEye: egret.Bitmap;
	private doctorArm: egret.Bitmap;
	private doctorHand: egret.Bitmap;
	private wheelUI: egret.DisplayObjectContainer;
	private wheelRotate: number = 0;
	private holder: egret.Bitmap;
	private flagContainer: egret.DisplayObjectContainer;
	private flag: egret.Bitmap;
	private coinsIcon: egret.DisplayObjectContainer;
	private winText: egret.TextField;
	private coinsNumber: egret.TextField;
	private coinsScale: number;
	private coinsText: egret.TextField;
	private collectBtn:egret.DisplayObjectContainer;
	private timer: egret.Timer;
	private coinsTimer: egret.Timer;
	private moveCount: number;
	private coins: Array<number>;
	private randomCoinsArray: Array<number>;
	private spinBtn: egret.DisplayObjectContainer;
	private spinBtnClicked: boolean;
	private spinOver: boolean;
	public static SpinWheelModel: Object = {RANDOM: "RANDOM", COINS: "COINS", PO_COINS: "PO_COINS" };
	private spinWheelPrice: egret.TextField;

	protected static get classAssetName() {
		return "wheel";
	}

	public constructor() {
		super();

		this.cannotQuick = true;
	}

	protected init() {
		this.bgAssetName = "spin_wheel_json.bg_lights_wheel";
		this.closeButtonAssetName = "";

		super.init();

		// init datas
		this.spinBtnClicked = false;
		this.spinOver = false;
		this.moveCount = 0;
		this.wheel = new Wheel();
		let scaleLevel = 0;
		let maxBonus = 0;
		if (Wheel.modal === SpinWheel.SpinWheelModel["COINS"]) {
			let item: Array<ItemVo> = this.wheel.purChaseProduct.itemFilter({"type": "wheel"});
			this.coins = (item && item.length>0) ? item[0].get("coins") : new Array<number>(0);
			maxBonus = this.wheel.product.getMaxCoins();
			scaleLevel = maxBonus.toString().length - 3;
		}
		else if (Wheel.modal === SpinWheel.SpinWheelModel["PO_COINS"]) {
			// this.coins = Congratulations.buyingPoWheel;
			maxBonus = this.wheel.product.getMaxCoins();
			scaleLevel = maxBonus.toString().length - 3;
		}
		else {
			this.coins = this.wheel.bonus.getRandomBonus() || new Array<number>(0);
			maxBonus = this.wheel.bonus.get("randomMax");
			scaleLevel = maxBonus.toString().length - 3;
		}

		// wheel container
		this.wheelContainer = new egret.DisplayObjectContainer();
		this.wheelContainer.width = 909;
		this.wheelContainer.height = 896;
		this.wheelContainer.anchorOffsetX = 455;
		this.wheelContainer.anchorOffsetY = 448;
		Com.addObjectAt(this, this.wheelContainer, 455, 448);

		// stage
		Com.addBitmapAt(this.wheelContainer, "spin_wheel_json.stage", -237, 992);

		// wheel ui
		this.wheelUI = new egret.DisplayObjectContainer();
		this.wheelUI.width = this.wheelUI.height = 812;
		this.wheelUI.anchorOffsetX = this.wheelUI.anchorOffsetY = 406;
		this.wheelUI["_rotation"] = 0;
		Com.addObjectAt(this.wheelContainer, this.wheelUI, 787, 667);

		// wheel
		Com.addBitmapAt(this.wheelUI, "spin_wheel_json.wheel", 0, 0);

		this.randomCoinsArray = new Array<number>(length);
		// wheel data
		let textSize = 64 - Math.max((maxBonus.toString().length - 6), 0) * 4;
		for (let i = 0; i < 16; i++) {
			if (i >= this.coins.length) {
				let index = Math.floor(Math.random() * this.coins.length - 1);
				this.randomCoinsArray[i] = this.coins[index < 0 ? 0 : index];
			} else {
				this.randomCoinsArray[i] = this.coins[i];
			}
			let isMax = this.randomCoinsArray[i] === Number(maxBonus);

			let bmtContainer = new egret.DisplayObjectContainer();
			bmtContainer.width = 406;
			bmtContainer.height = 72;
			bmtContainer.anchorOffsetX = 406;
			bmtContainer.anchorOffsetY = 36;
			bmtContainer.rotation = -i * 22.5;

			let text = Com.addLabelAt(bmtContainer, 15, 4, 265, 72, textSize, false, false);
			text.fontFamily = "Righteous";
			text.textAlign = "left";
			text.textColor = isMax ? 0xFFFF00 : 0xFFFFFF;
			text.stroke = 3;
			text.strokeColor = 0x000000;
			text.setText( Utils.formatCoinsNumber(this.randomCoinsArray[i]) );

			Com.addObjectAt(this.wheelUI, bmtContainer, 406, 406);
		}

		// wheel bg
		Com.addBitmapAt(this.wheelContainer, "spin_wheel_json.Wheel_frame", 335, 221);

		// holder
		this.holder = Com.addBitmapAt(this.wheelContainer, "spin_wheel_json.stopper_ticker", 358, 665);
		this.holder.anchorOffsetX = 24;
		this.holder.anchorOffsetY = 37;
		Com.addBitmapAt(this.wheelContainer, "spin_wheel_json.stopper_body", 322, 586);

		// spin btn
		this.spinBtn = new egret.DisplayObjectContainer();
		this.spinBtn.width = 247;
		this.spinBtn.height = 247;
		this.spinBtn.anchorOffsetX = this.spinBtn.width >> 1;
		this.spinBtn.anchorOffsetY = this.spinBtn.height >> 1;
		this.spinBtn.touchEnabled = true;
		this.spinBtn.once(egret.TouchEvent.TOUCH_TAP, this.startSpinWheel, this);
		Com.addBitmapAt(this.spinBtn, "spin_wheel_json.spin_txt", 0, 0);
		Com.addObjectAt(this.wheelContainer, this.spinBtn, 775, 665);

		// spin btn text
		// Com.addBitmapAt(this.spinBtn, "spin_wheel_" + GlobelSettings.language + "_json.spin_text", 0, 0);

		/**
		 * flag container, after spin wheel, show this container
		 */
		this.flagContainer = new egret.DisplayObjectContainer();
		this.flagContainer.visible = false;

		// flag
		this.flag = Com.addBitmapAt(this.flagContainer, "wheel_flag_json.Group-3", 0, 0);
		this.flag.height = 0;

		// win text
		this.winText = Com.addTextAt(this.flagContainer, 308, 337, 432, 100, 72, true, true);
		this.winText.fontFamily = "Righteous";
		this.winText.text = MuLang.getText("SPIN_WHEEL_FLAG_TITLE", MuLang.CASE_UPPER);
		this.winText.anchorOffsetX = 216;
		this.winText.anchorOffsetY = 50;
		this.winText.scaleX = this.winText.scaleY = 0;
		this.winText.verticalAlign = "middle";
		this.winText.stroke = 4;
		this.winText.strokeColor = 0x0037AD;

		// win coins number
		this.coinsNumber = Com.addTextAt(this.flagContainer, 306, 452, 492, 121, 90, true, true);
		this.coinsNumber.fontFamily = "Righteous";
		this.coinsNumber.anchorOffsetX = 246;
		this.coinsNumber.anchorOffsetY = 60;
		this.coinsNumber.scaleX = this.coinsNumber.scaleY = 0;
		this.coinsNumber.verticalAlign = "middle";
		this.coinsNumber.stroke = 4;
		this.coinsNumber.strokeColor = 0x0037AD;

		// win text
		this.coinsText = Com.addTextAt(this.flagContainer, 308, 567, 432, 100, 64, true, true);
		this.coinsText.fontFamily = "Righteous";
		this.coinsText.text = MuLang.getText("SPIN_WHEEL_FLAG_TEXT", MuLang.CASE_UPPER);
		this.coinsText.anchorOffsetX = 216;
		this.coinsText.anchorOffsetY = 50;
		this.coinsText.scaleX = this.coinsText.scaleY = 0;
		this.coinsText.verticalAlign = "middle";
		this.coinsText.stroke = 4;
		this.coinsText.strokeColor = 0x0037AD;

		// collect btn
		this.collectBtn = new egret.DisplayObjectContainer();
		this.collectBtn.touchEnabled = true;
		this.collectBtn.once(egret.TouchEvent.TOUCH_TAP, this.requestCollectCoins, this);
		Com.addObjectAt(this.flagContainer, this.collectBtn, 121, 667);

		// collect btn bg
		Com.addBitmapAt(this.collectBtn, "wheel_flag_json.button", 0, 0);

		// collect text
		let collectText = Com.addTextAt(this.collectBtn, 0, 0, 370, 121, 80, false, false);
		collectText.fontFamily = "Righteous";
		collectText.text = MuLang.getText("SPIN_WHEEL_FLAG_BTN_TEXT", MuLang.CASE_UPPER);
		collectText.textColor = 0xFFFFFF;
		collectText.stroke = 3;
		collectText.strokeColor = 0x0037AD;
		collectText.verticalAlign = "middle";

		// coins icon
		this.coinsIcon = new egret.DisplayObjectContainer();
		Com.addObjectAt(this.flagContainer, this.coinsIcon, 276, 983);
		// coins
		Com.addBitmapAt(this.coinsIcon, "wheel_flag_json.pile_coins01", 0, 59);
		Com.addBitmapAt(this.coinsIcon, "wheel_flag_json.pile_coins02", 345, 117);
		Com.addBitmapAt(this.coinsIcon, "wheel_flag_json.pile_coins03", 160, 47);
		Com.addBitmapAt(this.coinsIcon, "wheel_flag_json.pile_coins04", 210, 3);
		this.coinsIcon.anchorOffsetX = 354;
		this.coinsIcon.anchorOffsetY = 139;
		this.coinsIcon.alpha = 0;

		this.flagContainer.mask = new egret.Rectangle(-300, 0, 1523, 0);
		this.flagContainer.anchorOffsetX = 307;
		Com.addObjectAt(this, this.flagContainer, 1230, 0);

		// start animations
		this.startAnimations();
	}

	/**
	 * start animation
	 */
	private startAnimations():void {
		if (!this.spinBtnClicked) {
			egret.Tween.get(this.spinBtn, {loop: true})
				.to({scaleX: 0.9, scaleY: 0.9}, 750, egret.Ease.sineOut)
				.to({scaleX: 1, scaleY: 1}, 750, egret.Ease.sineOut);
		}
	}

	/**
	 * wheel start spin
	 */
	private startSpinWheel(e: egret.TouchEvent):void {
		this.spinBtnClicked = true;

		if (Wheel.modal === SpinWheel.SpinWheelModel["COINS"] || Wheel.modal === SpinWheel.SpinWheelModel["PO_COINS"]) { 
			let dataObject: Object =  {json: JSON.stringify({"debug":{},"seed": Math.floor( Math.random() * 89999999 ) + 10000000, "fb": PlayerConfig.player("facebook.id")})};
			new DataServer().getDataFromUrl( eval("API_HOST") + "/cmd.php?action=collect_purchased_wheel", this.getWheelResult, this, true, dataObject, this.getDataFailed );
		} else {
			if (Wheel.sector === -1) {
				let data = {json: JSON.stringify({debug: {}, fb: PlayerConfig.player("facebook.id"), seed: new Date().valueOf()})};
				new DataServer().getDataFromUrl(PlayerConfig.config("http") + "://" + PlayerConfig.config("host") + "/cmd.php?action=collect_bonus", this.updateBonusData.bind(this), this, true, data, null);
			} else {
				this.runWheelTo(Wheel.sector);
			}
		}
	}

	private updateBonusData( dataStr: string ){
		let data: Object = JSON.parse(dataStr);

		Wheel.sector = Number(data["sector"]);
		Wheel.spinWheelCoinsNumber = Number(data["reward"]["value"]);

		this.runWheelTo( Wheel.sector );
	}

	private getWheelResult( data: string ): void{
		let ob: Object = JSON.parse( data );
		this.runWheelTo(ob["sector"]);
		Wheel.spinWheelCoinsNumber = ob["reward"]["value"];
		SoundManager.play("wheel_running_mp3");
	}

	private getDataFailed(message: string){
	}

	private runWheelTo(sector: number): void{
		Wheel.sector = -1;
		Wheel.hasPurchase = false;
		let tween = egret.Tween.get(this.wheelUI, {onChange: this.onWheelRotate, onChangeObj: this});
		tween.wait(50);
		tween.to({rotation: 1080 + sector * 22.5, _rotation: 1080 + sector * 22.5}, 6000 + sector * 250, egret.Ease.sineOut);
		tween.call(this.endSpinWheel, this, [sector]);
	}

	/**
	 * on wheel rotate
	 */
	private onWheelRotate(): void {
		if (this.wheelUI["_rotation"] >= this.wheelRotate * 22.5 + 11.25) {
			this.wheelRotate++;

			egret.Tween.removeTweens(this.holder);
			egret.Tween.get(this.holder).to({rotation: -10}, 60).to({rotation: 0}, 60);
		}
	}

	/**
	 * wheel spin end
	 */
	private endSpinWheel(index: number):void {
		let shape = new egret.Shape();
		let graphics = shape.graphics;
		graphics.beginFill(0x000000, 0.4);
		graphics.drawRoundRect(0, 0, 896, 896, 896, 896);
		graphics.endFill();
		shape.alpha = 0;
		Com.addObjectAt(this.wheelContainer, shape, 335, 221);

		egret.Tween.get(shape).to({alpha: 1}, 1000);
		egret.Tween.get(this.wheelContainer).to({scaleX: 0.9, scaleY: 0.9}, 1000);
 
		this.spinOver = true;

		this.flagContainer.visible = true;
		this.coinsNumber.text = Utils.formatCoinsNumber(Wheel.spinWheelCoinsNumber);
		this.coinsScale = 1.6 - Math.max(Wheel.spinWheelCoinsNumber.toString().length - 3, 0) * 0.1;
		egret.Tween.get(this.flag)
			.to({skewX: 10, height: 281}, 250)
			.to({skewX: -10, height: 562}, 250)
			.to({skewX: 10, height: 843}, 250)
			.to({skewX: 0, height: 1123}, 250);
		egret.Tween.get(this.flagContainer.mask).to({height: 1123}, 1600);
		egret.Tween.get(this.winText).wait(1000).to({scaleX: 1, scaleY: 1}, 300, egret.Ease.backInOut);
		egret.Tween.get(this.coinsText).wait(1000).to({scaleX: 1, scaleY: 1}, 300, egret.Ease.backInOut);
		egret.Tween.get(this.coinsIcon).wait(1000).to({alpha: 1}, 500);
		this.startCoinsTextAnimation(true);
		this.startCoinsAnimation();

		SoundManager.play("win_wheel1_mp3");
	}

	/**
	 * coins text animation
	 */
	private startCoinsTextAnimation(scale: boolean):void {
		egret.Tween.get(this.coinsNumber)
			.to({scaleX: scale ? this.coinsScale : (this.coinsScale-0.1), scaleY: scale ? this.coinsScale : (this.coinsScale-0.1)}, 400, egret.Ease.sineOut)
			.call(this.startCoinsTextAnimation, this, [!scale]);
	}

	/**
	 * coins rain
	 */
	private startCoinsAnimation():void {
		let coinsAnimation = function() {
			let coin = new Coin();
			coin.scaleX = coin.scaleY = 0.4 + Math.random()/4;
			coin.rotation = Math.floor((Math.random()-0.5) * 60);
			egret.Tween.get(coin)
				.to({y: Math.floor(Math.random() * 100 + 700)}, Math.floor(Math.random()*200+1200))
				.call(function(){
					this.parent.removeChild(this);
				}, coin);
			coin.play(-1);
			Com.addObjectAt(this.flagContainer, coin, Math.floor(Math.random() * 414), 0);
		}.bind(this);

		if (typeof this.coinsTimer==="undefined" || this.coinsTimer===null) {
			this.coinsTimer = new egret.Timer(200, 0);
			this.coinsTimer.addEventListener(egret.TimerEvent.TIMER, coinsAnimation, this);
			this.coinsTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, coinsAnimation, this);
			this.coinsTimer.start();
		}
	}

	/**
	 * collect coins
	 */
	private requestCollectCoins():void {
		UserVo.addCoins( Wheel.spinWheelCoinsNumber );
		Trigger.flyingCoins(40, new egret.Point(1080, 553) );
		TweenerTool.tweenTo( this, { alpha: 1 }, 500, 0, this.closeSpinWheel.bind(this) );
	}

	/**
	 * close popup
	 */
	private closeSpinWheel():void {
		if (typeof this.timer !== "undefined" && this.timer !== null) {
			this.timer.stop();
			this.timer = null;
		}

		if (typeof this.coinsTimer !== "undefined" && this.coinsTimer !== null) {
			this.coinsTimer.stop();
			this.coinsTimer = null;
		}

		this.dispatchEvent( new egret.Event( GenericModal.CLOSE_MODAL ) );
	}

	/**
	 * set property
	 */
	public set(property: string, value: any):void {
		this[property] = value;
	}
}