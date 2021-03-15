class DefaultBankHourlyBonusBar extends CollectHourlyBonusBar{

	public constructor() {
		super();

		Com.addBitmapAt( this, "defaultBank_json.dinero_free_bonus_bg", 0, 0 );

		this.coin = new Coin;
		this.coin.scaleX = this.coin.scaleY = 0.5;
		Com.addObjectAt( this, this.coin, 15, 38 );
		this.coin.play( -1 );

		this.titleTx = Com.addTextAt( this, 100, 10, 300, 40, 40 );
		this.titleTx.text = MuLang.getText( "free_bonus" );
		this.coinsTx = Com.addTextAt( this, 100, 54, 300, 32, 32 );
	}
}