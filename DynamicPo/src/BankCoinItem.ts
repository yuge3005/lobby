class BankCoinItem extends BankProductItem{

	public constructor( index: number, data: Object ) {
		super();

		Com.addBitmapAt( this, "defaultBank_json.bg_single_buycoins", 0, 0 );
		Com.addBitmapAtMiddle( this, "defaultBank_json.coins0" + ( 6 - index ), 120, Math.ceil( ( 5 - index ) / 3 ) % 2 == 1 ? 80 : 100 );

		Com.addBitmapAt( this, "defaultBank_json.flag_extra", 594, 0 );

		if( index == 5 || index == 3 ){
			let bestBg: egret.Bitmap = Com.addBitmapAt( this, "defaultBank_json.best", 15, 113 );
			bestBg.width = 185;
			bestBg.height = 25;

			let bestTx: egret.TextField = Com.addTextAt( this, 15, 118, 185, 18, 18, false, true );
			if( index = 5 ){
				bestTx.text = GlobelSettings.language == "en" ? "BEST OFFER" : ( GlobelSettings.language == "pt" ? "MELHOR OFERTA" : "MEJOR OFERTA" );
			}
			else if( index == 3 ){
				bestTx.text = GlobelSettings.language == "en" ? "MOST POPULAR" : ( GlobelSettings.language == "pt" ? "MAIS POPULAR" : "MÁS POPULAR" );
			}
		}

		let coinsTx: TextLabel = Com.addLabelAt( this, 230, 20, 350, 52, 52, true, true );
		coinsTx.textAlign = "left";
		coinsTx.setText( Utils.formatCoinsNumber( data["items"][0]["after_discount_coins"] ) );
		coinsTx.stroke = 4;
		coinsTx.strokeColor = 0;
	}
}