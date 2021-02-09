class CoinsBar extends egret.DisplayObjectContainer{

	private coinsText: TextLabel;

	public constructor() {
		super();

        Com.addBitmapAt(this, "lobby_json.number_bg", 5, 9);
        this.coinsText = Com.addLabelAt(this, 85, 14, 272, 72, 52, false, false);
        this.coinsText.fontFamily = "Righteous";
        this.coinsText.stroke = 2;
        this.coinsText.strokeColor = 0x9D7806;
        // coin icon
        let coinIcon = Com.addBitmapAt(this, "lobby_json.icon_coin", 0, 0);
        coinIcon.touchEnabled = true;
        coinIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBank, this);

        this.onCoinsChanged(Number(UserVo.get("coins")));
	}

    private onCoinsChanged(coins: number): void {
		this.coinsText.setText( Utils.formatCoinsNumber(coins) );
    }

    private showBank( event: egret.TouchEvent ): void {
        Trigger.instance.showBank();
    }
}