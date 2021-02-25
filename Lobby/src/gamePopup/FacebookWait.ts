class FacebookWait extends GenericPo{
	private coin: egret.Bitmap;
	private topText: egret.TextField;
	private bottomText: egret.TextField;
	private paymentData: Object;
	private successCallBack: Function;

	protected static get classAssetName() {
        return "facebook_wait";
    }

	public constructor() {
		super();
	}

	protected init(){
		this.bgAssetName = "facebook_wait_json.bg";
        this.closeButtonAssetName = "";

		super.init();

		// top text
		this.topText = Com.addTextAt(this, 75, 125, 500, 80, 48, false, true);
		this.topText.textAlign = "center";
		this.topText.textColor = 0x321df9;
		this.topText.stroke = 2;
		this.topText.fontFamily = "Righteous";
		this.topText.strokeColor = 0xffffff;
		this.topText.text = MuLang.getText("FACEBOOK_WAIT_TITLE", MuLang.CASE_UPPER);

		// coin
		this.coin = Com.addBitmapAt(this, "facebook_wait_json.coin", 326, 324);
		this.coin.anchorOffsetX = this.coin.anchorOffsetY = 102;

		this.startCoinsAnimation();

		// bottom text
		this.bottomText = Com.addTextAt(this, 40, 444, 560, 100, 32, false, false);
		this.bottomText.textAlign = "center";
		this.bottomText.textColor = 0xffffff;
		this.bottomText.fontFamily = "Righteous";
		this.bottomText.text = MuLang.getText("FACEBOOK_WAIT_FOOT", MuLang.CASE_UPPER);
	}

	/**
	 * 金币旋转动画
	 */
	private startCoinsAnimation():void {
		egret.Tween.get(this.coin, { loop: true }).to({ rotation: 360 }, 3600);
		
		egret.setTimeout(function () {
			this.changeFacebookWaitStatus();
		}, this, 2000);
	}

	/**
	 * 改变状态
	 */
	private changeFacebookWaitStatus():void {
		if (this.coin) {
			egret.Tween.removeTweens(this.coin);
			this.coin.rotation = 0;
		}
		if (this.topText) this.topText.text = MuLang.getText("FACEBOOK_WAIT_CONGRATULATIONS_TITLE", MuLang.CASE_UPPER);
		if (this.bottomText) this.bottomText.text = MuLang.getText("FACEBOOK_WAIT_CONGRATULATIONS_FOOT", MuLang.CASE_UPPER);
	}

	public paymentWait( paymentData: Object, successCallBack: Function ){
		this.paymentData = paymentData;
		this.successCallBack = successCallBack;
		let http = new Http().instance("api.php?command=check_transaction", "POST", JSON.stringify(paymentData), true, this.transactionFeedback.bind(this) );
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http.send();
	}

	private transactionFeedback( feedbackData ) {
		feedbackData = typeof feedbackData === "string" ? (feedbackData === "" ? {} : eval("(" + feedbackData + ")")) : feedbackData;
		if (feedbackData["status"] == 1) {
			LoyaltyVo.updateData(feedbackData);
			if (this.successCallBack) this.successCallBack(feedbackData);
		}
		else if( feedbackData["status"] == 0 ){
			let tw: egret.Tween = egret.Tween.get( this );
			tw.wait( 1000 );
			tw.call( () => { this.paymentWait( this.paymentData, this.successCallBack ) } );
		}
		else throw new Error( "Payment exception" );
	}
}