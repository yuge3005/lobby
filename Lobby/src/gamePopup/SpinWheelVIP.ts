/**
 * vip spin wheel
 */
class SpinWheelVIP extends GenericPo {
	private wheel: egret.DisplayObjectContainer;
	private wheelLight: egret.Bitmap;
	private leftScreen: egret.Bitmap;
	private rightScreen: egret.Bitmap;
	private sideLights: Array<egret.DisplayObjectContainer>;
	private spinBtnClicked: boolean;
	private spinOver: boolean;
	private coins: Array<number>;
	private randomCoinsArray: Array<number>;
	private wheelData: Wheel;
	private wheelDataStrokeColor: Array<number>;
	private btnContainer: egret.DisplayObjectContainer;
	private flagContainer: egret.DisplayObjectContainer;
	private flag: egret.Bitmap;
	private coinsIcon: egret.DisplayObjectContainer;
	private spinText: egret.TextField;
	private winText: egret.TextField;
	private coinsNumber: egret.TextField;
	private coinsScale: number;
	private coinsText: egret.TextField;
	private coinsTimer: egret.Timer;
	private collectBtn: egret.DisplayObjectContainer;
	private buy: boolean = false;
	private finger: egret.Bitmap;
	private wheelRotate: number = 0;

	protected static get classAssetName() {
		return "spin_wheel_vip";
	}

	public constructor() {
		super();
	}

	protected init() {
		this.bgAssetName = "";
		this.closeButtonAssetName = "";
		
		super.init();
		this.width = 2000;
		this.height = 1125;
		this.anchorOffsetX = 1000;
		this.anchorOffsetY = 562;

		this.wheelDataStrokeColor = [0x975900, 0x038500, 0x076AD0, 0xBF3F00, 0x9F0F00, 0xA6276C, 0x975900, 0x038500, 0x076AD0, 0xBF3F00, 0xA6276C, 0x9F0F00, 0x975900, 0x038500, 0xBF3F00, 0xA6276C];

		// shape rect
		let shape = new egret.Shape();
		GraphicTool.drawRect(shape, new egret.Rectangle(-125, 0, 2250, 1125), 0x000000, false, 1);
		Com.addObjectAt(this, shape, 0, 0);

		// background image
		Com.addBitmapAt(this, "spin_wheel_vip_json.background", 311, 85);

		// background stars
		let starsPos = [{x: 421, y: 595}, {x: 477, y: 485}, {x: 588, y: 390}, {x: 1380, y: 441}, {x: 1464, y: 367}, {x: 1544, y: 589}];
		starsPos.map((pos) => {
			this.appendBackgroundStar(pos.x, pos.y);
		});

		// side light
		this.sideLights = new Array<egret.DisplayObjectContainer>(4);
		this.sideLights[0] = this.loadSideLight(206, 917, -1);
		this.sideLights[1] = this.loadSideLight(449, 917, -1);
		this.sideLights[2] = this.loadSideLight(1558, 890);
		this.sideLights[3] = this.loadSideLight(1801, 917);

		// top stage
		let topStage = new egret.DisplayObjectContainer();
		Com.addObjectAt(this, topStage, 467, 36);
		// stage bg
		Com.addBitmapAt(topStage, "spin_wheel_vip_json.ceiling", 0, 0);
		// flow light
		let flowLight = new egret.DisplayObjectContainer();
		Com.addObjectAt(topStage, flowLight, 0, 31);
		// flow mask
		let flowMask = Com.addBitmapAt(flowLight, "spin_wheel_vip_json.stage_mask", 0, 0);
		flowMask.y = flowMask.height;
		flowMask.scaleY = -1;
		flowLight.mask = flowMask;
		// flow
		let leftFlow = Com.addBitmapAt(flowLight, "spin_wheel_vip_json.flowlight", 531, 0);
		let rightFlow = Com.addBitmapAt(flowLight, "spin_wheel_vip_json.flowlight", 531, 0);
		leftFlow.anchorOffsetX = rightFlow.anchorOffsetY = 5;
		leftFlow.scaleX = leftFlow.scaleY = rightFlow.scaleX = rightFlow.scaleY = 7;
		egret.Tween.get(leftFlow, {loop: true}).set({x: 531}).to({x: -40}, 600).wait(500);
		egret.Tween.get(rightFlow, {loop: true}).set({x: 531}).to({x: 1100}, 600).wait(500);
		// top stage stars
		Com.addBitmapAt(topStage, "spin_wheel_vip_json.top_stars", 0, 31);

		// bottom stage
		let bottomStage = new egret.DisplayObjectContainer();
		Com.addObjectAt(this, bottomStage, 467, 840);
		// stage bg
		Com.addBitmapAt(bottomStage, "spin_wheel_vip_json.stage", 0, 0);
		// flow light
		let bottomFLowLight = new egret.DisplayObjectContainer();
		Com.addObjectAt(bottomStage, bottomFLowLight, 0, 0);
		// flow
		let bottomLeftFlow = Com.addBitmapAt(flowLight, "spin_wheel_vip_json.flowlight", 531, 0);
		let bottomRightFlow = Com.addBitmapAt(flowLight, "spin_wheel_vip_json.flowlight", 531, 0);
		bottomLeftFlow.anchorOffsetX = bottomRightFlow.anchorOffsetY = 5;
		bottomLeftFlow.scaleX = bottomLeftFlow.scaleY = bottomRightFlow.scaleX = bottomRightFlow.scaleY = 7;
		egret.Tween.get(bottomLeftFlow, {loop: true}).set({x: 531}).to({x: -40}, 600).wait(500);
		egret.Tween.get(bottomRightFlow, {loop: true}).set({x: 531}).to({x: 1100}, 600).wait(500);

		/**
		 * wheel container
		 */
		let wheelContainer = new egret.DisplayObjectContainer();
		Com.addObjectAt(this, wheelContainer, 617, 210);

		// wheel
		this.wheel = new egret.DisplayObjectContainer();
		this.wheel.width = this.wheel.height = 635;
		this.wheel.anchorOffsetX = this.wheel.anchorOffsetY = 317;
		this.wheel.rotation = 10;
		Com.addObjectAt(wheelContainer, this.wheel, 384, 371);

		// load wheel datas
		this.loadWheelDatas();

		// wheel frame
		let frame = Com.addBitmapAt(wheelContainer, "spin_wheel_vip_json.wheel_frame", 10, 0);
		let frameContainer = new egret.DisplayObjectContainer();
		frameContainer.width = frame.width;
		frameContainer.height = frame.height;
		Com.addObjectAt(wheelContainer, frameContainer, 10, 0);
		// frame mask
		let frameMask = Com.addBitmapAt(frameContainer, "spin_wheel_vip_json.wheel_frame", 0, 0);
		frameContainer.mask = frameMask;
		// frame scan light
		let frameScanLight = Com.addBitmapAt(frameContainer, "spin_wheel_vip_json.flowlight", 1000, 1000);
		frameScanLight.scaleX = frameScanLight.scaleY = 30;
		frameScanLight.anchorOffsetX = frameScanLight.width >> 1;
		frameScanLight.anchorOffsetY = frameScanLight.height >> 1;
		frameScanLight.rotation = 45;
		egret.Tween.get(frameScanLight, {loop: true}).set({x: 1000, y: 1000}).to({x: -500, y: -500}, 1200).wait(4000);

		// out light
		let outLight = Com.addBitmapAt(wheelContainer, "spin_wheel_vip_json.lights", 115, 5);
		egret.Tween.get(outLight, {loop: true}).to({alpha: .5}, 300, egret.Ease.backOut).to({alpha: 1}, 300, egret.Ease.backIn).wait(500);
		
		// out circle
		let outCircle = Com.addBitmapAt(wheelContainer, "spin_wheel_vip_json.halo", 382, 371);
		outCircle.anchorOffsetX = outCircle.anchorOffsetY = 365;
		egret.Tween.get(outCircle, {loop: true}).to({rotation: 359}, 4000);

		// finger
		this.finger = Com.addBitmapAt(wheelContainer, "spin_wheel_vip_json.stopper", 41, 375);
		this.finger.anchorOffsetX = 28;
		this.finger.anchorOffsetY = 41;
		Com.addBitmapAt(wheelContainer, "spin_wheel_vip_json.stopper_body", 0, 303);

		// btn container		
		this.btnContainer = new egret.DisplayObjectContainer();
		this.btnContainer.width = this.btnContainer.height = 195;
		this.btnContainer.anchorOffsetX = this.btnContainer.anchorOffsetY = 97;
		this.btnContainer.touchEnabled = true;
		this.btnContainer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buySpin.bind(this), this);
		Com.addObjectAt(wheelContainer, this.btnContainer, 381, 372);
		// spin btn bg
		Com.addBitmapAt(this.btnContainer, "spin_wheel_vip_json.spin_button", 0, 0);
		// spin text
		let currencyIsBrl: boolean = PlayerConfig.player( "facebook.currency.currency" ) === "BRL";
		let spinText = (currencyIsBrl ? " R$" : " $").concat(Wheel.getWheelData()["price"] * (currencyIsBrl ? 4 : 1 ) + "");
		this.spinText = Com.addTextAt(this.btnContainer, 31, 103, 134, 38, 28, false, false);
		this.spinText.fontFamily = "Righteous";
		this.spinText.verticalAlign = "middle";
		this.spinText.textColor = 0x000000;
		this.spinText.text = spinText;
		this.spinText.size = 28 - Math.max(spinText.length - 4, 0) * 2;
		// scan light
		let maskContiner = new egret.DisplayObjectContainer();
		maskContiner.width = maskContiner.height = 169;
		Com.addObjectAt(this.btnContainer, maskContiner, 13, 13);
		// mask
		let mask = Com.addBitmapAt(maskContiner, "spin_wheel_vip_json.mask", 0, 0);
		mask.scaleX = mask.scaleY = .9;
		maskContiner.mask = mask;
		// light
		let scanLight = Com.addBitmapAt(maskContiner, "spin_wheel_vip_json.flowlight", 300, 300);
		scanLight.scaleX = scanLight.scaleY = 7;
		scanLight.anchorOffsetX = scanLight.width >> 1;
		scanLight.anchorOffsetY = scanLight.height >> 1;
		scanLight.rotation = 45;
		egret.Tween.get(scanLight, {loop: true}).set({x: 300, y: 300}).to({x: -130, y: -130}, 800).wait(2000);

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
		Com.addBitmapAt(this.collectBtn, "wheel_flag_json.collect", 0, 0);

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
		Com.addObjectAt(this, this.flagContainer, 1030, 0);

		// doctor
		Com.addBitmapAt(this, "spin_wheel_vip_json.doctor_bottomcase", 93, 874);
		Com.addBitmapAt(this, "spin_wheel_vip_json.doctor", 147, 295);

		// close button
		this.closeButton = Com.addDownButtonAt(this, "spin_wheel_vip_json.close_button", "spin_wheel_vip_json.close_button", 1935, 64, super.onClose, true );

		// screens
		this.leftScreen = Com.addBitmapAt(this, "spin_wheel_vip_json.curtain", 0, 0);
		this.rightScreen = Com.addBitmapAt(this, "spin_wheel_vip_json.curtain", 2000, 0);
		this.rightScreen.scaleX = -1;

		this.openScreens();
	}

	/**
	 * append background star
	 */
	private appendBackgroundStar(x: number, y: number): void {
		let star = Com.addBitmapAt(this, "spin_wheel_vip_json.star", x, y);
		star.anchorOffsetX = star.anchorOffsetY = 23;
		star.alpha = 0;

		egret.setTimeout(function(star) {
			egret.Tween.get(star, {loop: true}).to({alpha: 1, rotation: 360}, 500).to({alpha: 0, rotation: 720}, 500).set({rotation: 0}).wait(1000);
		}.bind(this, star), this, Math.random() * 3000);
	}

	/**
	 * load side light
	 */
	private loadSideLight(x: number, y: number, scale: number = 1): egret.DisplayObjectContainer {
		let result = new egret.DisplayObjectContainer();
		result.width = 443;
		result.height = 408;
		result.anchorOffsetX = 398;
		result.anchorOffsetY = 367;
		result.rotation = scale === -1 ? -15: 15;
		result.scaleX = scale;
		Com.addObjectAt(this, result, x, y);

		// images
		Com.addBitmapAt(result, "spin_wheel_vip_json.spotlight", 0, 0);
		Com.addBitmapAt(result, "spin_wheel_vip_json.lightball", 369, 337);

		egret.Tween.get(result, {loop: true}).to({rotation: scale === -1 ? 15: -15}, 600, egret.Ease.sineIn).wait(500).to({rotation: scale === -1 ? -15: 15}, 600, egret.Ease.sineIn).wait(500);
		return result;
	}

	/**
	 * open screens
	 */
	private openScreens(): void {
		egret.Tween.get(this.leftScreen).wait(600).to({ x: -400, scaleX: .5}, 1200, egret.Ease.backInOut);
		egret.Tween.get(this.rightScreen).wait(600).to({ x: 2400, scaleX: -.5}, 1200, egret.Ease.backInOut);
	}

	/**
	 * load wheel datas
	 */
	private loadWheelDatas(): void {
		// wheel bg
		Com.addBitmapAt(this.wheel, "spin_wheel_vip_json.wheel_inner", 0, 0);

		// init datas
		this.spinBtnClicked = false;
		this.spinOver = false;
		this.wheelData = new Wheel();
		let maxBonus = 0, size = 0;
		if (Wheel.modal===SpinWheel.SpinWheelModel["COINS"]) {
			let item: Array<ItemVo> = this.wheelData.product.itemFilter({ "type": "wheel" });
			this.coins = (item && item.length > 0) ? item[0].get("coins") : new Array<number>(0);
			maxBonus = this.wheelData.product.getMaxCoins();
		} else {
			this.coins = this.wheelData.bonus.getRandomBonus() || new Array<number>(0);
			maxBonus = this.wheelData.bonus.get("randomMax");
		}
		size = 48 - Math.max(maxBonus.toString().length - 6, 0) * 4;

		this.randomCoinsArray = new Array<number>(length);
		for (let i = 0; i < 16; i++) {
			if (i >= this.coins.length) {
				let index = Math.floor(Math.random() * this.coins.length-1);
				this.randomCoinsArray[i] = this.coins[index < 0 ? 0 : index];
			} else {
				this.randomCoinsArray[i] = this.coins[i];
			}
			let isMax = this.randomCoinsArray[i] === Number(maxBonus);
			
			let coinsText = Com.addTextAt(this.wheel, 318, 316, 300, 48, size, true, true);
			coinsText.fontFamily = "Righteous";
			coinsText.text = Utils.formatCoinsNumber(this.randomCoinsArray[i]);
			coinsText.textAlign = "left";
			coinsText.textColor = isMax ? 0xFFFC00 : 0xFFFFFF;
			coinsText.anchorOffsetX = 300;
			coinsText.anchorOffsetY = 24;
			coinsText.stroke = 3;
			coinsText.strokeColor = this.wheelDataStrokeColor[i];
			coinsText.rotation = 22.5 * i + 11.25;
		}
	}

	/**
	 * buy spin
	 */
	private buySpin() {
		if (this.buy) {
			this.startSpinWheel();
		} else {
			egret.Tween.get(this.leftScreen).to({ x: 0, scale: 1 }, 1200, egret.Ease.backInOut);
			egret.Tween.get(this.rightScreen).to({ x: 2000, scale: -1 }, 1200, egret.Ease.backInOut);
			new Payment().buy( Wheel.getWheelData()["hash"], this.buySpinCallback.bind(this), this.openScreens.bind(this) );
		}
	}

	/**
	 * buy spin callback
	 */
	private buySpinCallback(data: Object): void {
		if (data && data["status"] == 1) {//payment success
			this.buy = true;
			this.spinText.visible = false;
			this.closeButton.visible = false;

			this.openScreens();
			egret.Tween.get(this.btnContainer, { loop: true })
				.to({ scaleX: 1.1, scaleY: 1.1 }, 750, egret.Ease.sineOut)
				.to({ scaleX: 1, scaleY: 1 }, 750, egret.Ease.sineOut);
		}
	}

	/**
	 * start spin wheel
	 */
	private startSpinWheel(): void {
		this.spinBtnClicked = true;
		this.btnContainer.touchEnabled = false;
		egret.Tween.removeTweens(this.btnContainer);
		this.btnContainer.scaleX = this.btnContainer.scaleY = 1;

		let param: Object = {"debug":{},"seed": Math.floor( Math.random() * 89999999 ) + 10000000, "fb": PlayerConfig.player("facebook.id")};
		let dataObject: Object =  {json: JSON.stringify(param)};
		new DataServer().getDataFromUrl( eval("API_HOST") + "/cmd.php?action=collect_purchased_wheel", this.getWheelResult, this, true, dataObject, this.getDataFailed );
	}

	/**
	 * get wheel result
	 */
	private getWheelResult(data: string): void{
		let ob: Object = JSON.parse( data );
		Wheel.spinWheelCoinsNumber = ob["reward"]["value"];
		this.runWheelTo( ob["sector"] );
	}

	private getDataFailed(message: string){
	}

	private runWheelTo(sector: number): void{
		if (SoundManager.soundOn) {
			let sound = <egret.Sound>RES.getRes("spin_wav");
			sound.play(0, 1);
		}

		let tween = egret.Tween.get(this.wheel, {onChange: this.onWheelRotate, onChangeObj: this});
		tween.wait(50);
		tween.to({rotation: 1080 + (15 - sector) * 22.5 + 11}, 6000 + sector * 250, egret.Ease.sineOut);
		tween.call(this.endSpinWheel, this, [sector]);
	}

	/**
	 * on wheel rotate
	 */
	private onWheelRotate(): void {
		if (this.wheel.rotation >= this.wheelRotate * 22.5 + 11.25) {
			this.wheelRotate++;
			egret.Tween.get(this.finger).to({rotation: -10}, 60).to({rotation: 0}, 60);
		}
	}

	private endSpinWheel(index: number): void {
		this.spinOver = true;
		this.btnContainer.touchEnabled = false;

		this.flagContainer.visible = true;
		this.coinsNumber.text = Utils.formatCoinsNumber(Wheel.spinWheelCoinsNumber);
		this.coinsScale = 1.6 - (Wheel.spinWheelCoinsNumber.toString().length>3?(Wheel.spinWheelCoinsNumber.toString().length-3):0)*0.1;
		egret.Tween.get(this.flag)
			.to({skewX: 10, height: 281}, 250)
			.to({skewX: -10, height: 562}, 250)
			.to({skewX: 10, height: 843}, 250)
			.to({skewX: 0, height: 1123}, 250);
		egret.Tween.get(this.flagContainer.mask).to({height: 1123}, 1600);
		egret.Tween.get(this.winText).wait(1000).to({scaleX: 0.7, scaleY: 0.7}, 300, egret.Ease.backInOut);
		egret.Tween.get(this.coinsText).wait(1000).to({scaleX: 0.75, scaleY: 0.75}, 300, egret.Ease.backInOut);
		egret.Tween.get(this.coinsIcon).wait(1000).to({alpha: 1}, 500).wait(1500).call( () => { SoundManager.play( "win_wheel2_mp3" ); } );
		this.startCoinsTextAnimation(true);
		this.startCoinsAnimation();
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
				.to({y: Math.floor(Math.random()*100 + 700)}, Math.floor(Math.random()*200+1200))
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

	private requestCollectCoins(): void {
		UserVo.addCoins( Wheel.spinWheelCoinsNumber );
		Trigger.flyingCoins(40, new egret.Point(1140, 570) );
		TweenerTool.tweenTo( this, { alpha: 1 }, 500, 0, this.closeSpinWheel.bind(this) );
	}

	private closeSpinWheel(): void {
		if (typeof this.coinsTimer !== "undefined" && this.coinsTimer !== null) {
			this.coinsTimer.stop();
			this.coinsTimer = null;
		}

		this.dispatchEvent( new egret.Event( GenericModal.CLOSE_MODAL ) );
	}
}