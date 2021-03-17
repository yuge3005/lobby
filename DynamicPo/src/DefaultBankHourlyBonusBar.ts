class DefaultBankHourlyBonusBar extends CollectHourlyBonusBar{

	private coinsChangeingAnimation: boolean;

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

		this.touchChildren = false;
		this.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
	}

	public timerStaus( time: number, status: number ){
		if( this.coinsChangeingAnimation ) return;

		if( time > 0 ) this.coinsTx.text = Utils.secondToHour( time );
		else{
			if( !this.touchEnabled ) this.touchEnabled = true;

			if( status == PlayerConfig.player( "bonus.hourly_bonus_count_max" ) ){
				this.coinsTx.text = GlobelSettings.language == "en" ? "FREE SPINS" : ( GlobelSettings.language == "es" ? "JUGADAS GRATIS": "JOGADA GRÁTIS" );
			}

			let hourlyBonuses: Array<number> = PlayerConfig.player( "bonus.hourly_bonuses" );
			let bonus: number = hourlyBonuses[PlayerConfig.player("score.level")];

			this.coinsTx.text = Utils.formatCoinsNumber( bonus );
		}
	}

	private onTap( event: egret.TouchEvent ){
		let ev: egret.Event = new egret.Event( GenericModal.MODAL_COMMAND );
		ev["cmd"] = "collect_bonus";
		this.parent.dispatchEvent( ev );
	}
}