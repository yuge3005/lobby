class Congratulations extends GenericPo {
	private normalBonus: number = 0;
	private coinsNumber: egret.TextField;
	private chipsNumber: egret.TextField;
	private collected: boolean = false;

	private iconBitmap: egret.Bitmap;
	private textTimer: egret.Timer;
	private gap: number;
	private animation: LoyaltyPrivilege;

	public static type: number;
	public static coins: number;
	public static chips: number;

	private collectButton: egret.DisplayObjectContainer;

	public static buyingPoWheel: Array<number>;

	protected static get classAssetName() {
		return "congratulations";
	}

	public constructor() {
		super();

		this.cannotQuick = true;
	}

	protected init() {
		this.bgAssetName = "congratulations_json.bg";
		this.closeButtonAssetName = "";

		super.init();
		
		// success text
		let successText = Com.addTextAt(this, 187, 268, 278, 66, 72, true, false);
		successText.textColor = 0x321DF9;
		successText.fontFamily = "Righteous";
		successText.stroke = 2;
		successText.strokeColor = 0xFFFFFF;
		successText.text = MuLang.getText("CONGRATULATIONS_TITLE");

		// success content
		let successContent = Com.addTextAt(this, 0, 340, 666, 100, 42, false, false);
		successContent.lineSpacing = 4;
		successContent.textColor = 0xFFFFFF;
		successContent.fontFamily = "Righteous";
		successContent.text = MuLang.getText("CONGRATULATIONS_CONTENT");

		// coins number
		this.coinsNumber = Com.addTextAt(this, 20, 440, 720, 60, 56, true, false);
		this.coinsNumber.fontFamily = "Righteous";
		this.coinsNumber.textColor = 0xF5DC00;
		this.coinsNumber.stroke = 2;
		this.coinsNumber.strokeColor = 0x000000;

		// btn container		
		let btnContainer = new egret.DisplayObjectContainer();
		btnContainer.width = 320;
		btnContainer.height = 82;
		btnContainer.anchorOffsetX = 160;
		btnContainer.anchorOffsetY = 82;
		Com.addObjectAt(this, btnContainer, 326, 605);
		this.collectButton = btnContainer;

		// btn
		let btn = Com.addDownButtonAt(btnContainer, "congratulations_json.btn", "congratulations_json.btn", 0, 0, this.collectCoins.bind(this), true );
		// btn text
		let btnText = Com.addTextAt(btnContainer, 10, 5, 300, 72, 44, false, false);
		btnText.textColor = 0xFFFFFF;
		btnText.fontFamily = "Righteous";
		btnText.text = MuLang.getText("CONGRATULATIONS_BTN_TEXT", MuLang.CASE_UPPER);
		btnText.textAlign = "center";
		btnText.verticalAlign = "middle";
		btnText.stroke = 2;
		btnText.strokeColor = 0x000000;

		this.scaleX = this.scaleY = 0.65;

		setTimeout( this.afterInit.bind(this), 100 );
	}

	private afterInit(): void{
		this.countTimer();
		this.buildIcon();
	}

	private countTimer(){
		let loyaltyData = LoyaltyVo.data;
		let dailyBonusMultiple = Number(loyaltyData["privileges"][Number(loyaltyData["loyalty_level"])]["purchase_bonus"]) || 0;
		this.normalBonus = Math.floor(Congratulations.coins / (1 + dailyBonusMultiple));
		this.gap = (Congratulations.coins - this.normalBonus) / 40;
		this.coinsNumber.text = Utils.formatCoinsNumber(this.normalBonus);

		if (Number(loyaltyData["loyalty_level"]) > 0) {
			// loyalty privilege animation
			if( !this.animation ){ 
				this.animation = new LoyaltyPrivilege();
				Com.addObjectAt(this, this.animation, 490, 365);
			}
			
			this.clearTextTimer();
			// text timer
			this.textTimer = new egret.Timer(50, 40);
			this.textTimer.addEventListener(egret.TimerEvent.TIMER, this.onTextTimer, this);
			this.textTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTextTimerComplete, this);
			this.textTimer.start();
		}
	}

	private onTextTimer( event: egret.TimerEvent ): void{
		this.normalBonus += this.gap;
		this.coinsNumber.text = Utils.formatCoinsNumber(Math.floor(this.normalBonus));
	}

	private onTextTimerComplete( event: egret.TimerEvent ): void{
		if ( this.animation.parent) this.animation.parent.removeChild( this.animation );
		this.normalBonus = Congratulations.coins;
		this.coinsNumber.text = Utils.formatCoinsNumber(Math.floor(this.normalBonus));
	}

	private buildIcon(){
		let gapSpace: number = 20;
		if( Congratulations.type == 0 ){
			this.iconBitmap = Com.addBitmapAt( this, "congratulations_json.coin_icon", 95, 430 );
		}
		else if( Congratulations.type == 1 ){
			this.iconBitmap = Com.addBitmapAt( this, "congratulations_json.icon_dinero", 65, 430 );
		}
		else if( Congratulations.type == 2 ){
			this.iconBitmap = Com.addBitmapAt( this, "congratulations_json.coin_icon", 95, 430 );
			let icon2 = Com.addBitmapAt( this, "congratulations_json.icon_dinero", 95, 520 );
			// coins number
			let number2 = Com.addTextAt(this, 20, 530, 720, 60, 56, true, false);
			number2.fontFamily = "Righteous";
			number2.textColor = 0xF5DC00;
			number2.stroke = 2;
			number2.strokeColor = 0x000000;
			number2.text = Utils.formatCoinsNumber( Congratulations.chips );
			let width2: number = icon2.width + number2.textWidth + gapSpace;
			icon2.x = this.bg.width - width2 >> 1;
			number2.x = ( this.bg.width + icon2.width - number2.width + gapSpace ) * 0.5;
			this.collectButton.y += 90;
			this.chipsNumber = number2;
		}
		else{
			console.error( "Congratulations type error" );
		}
		let totalWidth: number = this.iconBitmap.width + this.coinsNumber.textWidth + gapSpace;
		this.iconBitmap.x = this.bg.width - totalWidth >> 1;
		this.coinsNumber.x = ( this.bg.width + this.iconBitmap.width - this.coinsNumber.width + gapSpace ) * 0.5;
	}

	private clearTextTimer(): void{
		if (this.textTimer) {
			this.textTimer.stop();
			this.textTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTextTimer, this);
			this.textTimer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onTextTimerComplete, this);
			this.textTimer = null;
		}
	}

	/**
	 * collect coins
	 */
	private collectCoins( event: egret.TouchEvent ): void {
		if (this.collected) return;
		this.collected = true;

		this.clearTextTimer();

		this.normalBonus = Congratulations.coins;
		let gap = this.normalBonus / 40;

		if (Congratulations.type === 0) {
			Trigger.flyingCoins(40, new egret.Point(1250,780) );
			UserVo.addCoins( this.normalBonus )
		}
		else if (Congratulations.type === 1) {
			Trigger.flyingDinero( 20, new egret.Point(1230,780) );
			UserVo.addDineros( this.normalBonus );
		}
		else if (Congratulations.type === 2) {
			UserVo.addCoins( Congratulations.coins );
			Trigger.flyingCoins(40, new egret.Point(1250,780) );
			UserVo.addDineros( Congratulations.chips );
			Trigger.flyingDinero( 20, new egret.Point(1230,880) );
		}
		else{
			console.error( "congratulations type error" );
		}
		
		// bonus text timer
		let bonusTextTimer = new egret.Timer(50, 40);
		bonusTextTimer.addEventListener(egret.TimerEvent.TIMER, function (gap: number, event: egret.TimerEvent ) { 
			this.normalBonus -= gap;
			this.coinsNumber.text = Utils.formatCoinsNumber(Math.floor(this.normalBonus));
			if( this.chipsNumber )this.chipsNumber.text = Utils.formatCoinsNumber(Math.floor(Congratulations.chips * ( 40 - ( event.target as egret.Timer ).currentCount ) / 40 ));
		}.bind(this, gap), this);
		bonusTextTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
			this.normalBonus = 0;
			this.coinsNumber.text = "0";
			if( this.chipsNumber )this.chipsNumber.text = "0";

			this.closePopup();
		}, this);
		bonusTextTimer.start();
	}

	/**
	 * close popup
	 */
	private closePopup():void {
		this.onClose(null);
	}

	protected onClose( event: egret.TouchEvent ): void{
		if( Congratulations.buyingPoWheel ){
			Wheel.modal = SpinWheel.SpinWheelModel["PO_COINS"];
			Trigger.insertInstance( new SpinWheel );
		};
		super.onClose(null);
	}

	public static checkPoItemsWheel( poItems: Array<Object> ): Array<number>{
		for( let i: number = 0; i < poItems.length; i++ ){
			if( poItems[i]["type"] == "wheel" && poItems[i]["coins"] ) return poItems[i]["coins"];
		}
		return null;
	}
}