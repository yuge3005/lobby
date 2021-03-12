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
			if( index == 5 ){
				bestTx.text = GlobelSettings.language == "en" ? "BEST OFFER" : ( GlobelSettings.language == "pt" ? "MELHOR OFERTA" : "MEJOR OFERTA" );
			}
			else if( index == 3 ){
				bestTx.text = GlobelSettings.language == "en" ? "MOST POPULAR" : ( GlobelSettings.language == "pt" ? "MAIS POPULAR" : "MÁS POPULAR" );
			}
		}

		let coinsTx: TextLabel = Com.addLabelAt( this, 230, 20, 400, 52, 52, true, true );
		coinsTx.textAlign = "left";
		coinsTx.setText( Utils.formatCoinsNumber( data["items"][0]["after_discount_coins"] ) );
		coinsTx.stroke = 4;
		coinsTx.strokeColor = 0;
		coinsTx.scaleX = 0.8;

		let oldTx: egret.TextField = Com.addTextAt( this, 235, 85, 400, 42, 40, false, true );
		oldTx.textAlign = "left";
		oldTx.textColor = 0x09366F;
		oldTx.text = ( GlobelSettings.language == "en" ? "was" : "era" ).toUpperCase() + " " + Utils.formatCoinsNumber( data["items"][0]["base_coins"] );
		oldTx.scaleX = 0.8;

		let deleteLine: egret.Shape = new egret.Shape;
		deleteLine.graphics.beginFill( 0x09366F );
		deleteLine.graphics.drawRect( 0, 0, oldTx.textWidth * oldTx.scaleX, 8 );
		deleteLine.graphics.endFill();
		Com.addObjectAt( this, deleteLine, 235, 103 );

		let extraTxShadow: egret.TextField = Com.addTextAt( this, 596, 18, 206, 36, 36, false, true );
		extraTxShadow.text = "EXTRA";
		extraTxShadow.textColor = 0;
		let extraTx: egret.TextField = Com.addTextAt( this, 594, 14, 206, 36, 36, false, true );
		extraTx.text = "EXTRA";

		let extraNumTxShadow: TextLabel = Com.addLabelAt( this, 598, 70, 206, 40, 40, false, true );
		extraNumTxShadow.setText( Math.round( data["items"][0]["coins_discount"] ) + "%" );
		extraNumTxShadow.textColor = 0;
		let extraNumTx: TextLabel = Com.addLabelAt( this, 594, 68, 206, 40, 40, false, true );
		extraNumTx.setText( Math.round( data["items"][0]["coins_discount"] ) + "%" );

		let btnBg: egret.Bitmap = Com.addBitmapAt( this, "buy_btn", 1244, 19 );
		btnBg.width = 232;

		let currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
		let priceTx: egret.TextField = Com.addTextAt( this, 1244, 57, 290, 35, 35, true, true );
		priceTx.text = ( currencyIsBrl ? "R$" : "$" ) + " " + Utils.formatCoinsNumber( data["price"] );
		priceTx.stroke = 4;
		priceTx.strokeColor = 0x0F7900;
		priceTx.scaleX = 0.8;

		let lpBg: egret.Bitmap = Com.addBitmapAt( this, "defaultBank_json.loyalty_points_bg", 1023, 6 );
		lpBg.width = 210;

		let lp: egret.Bitmap = Com.addBitmapAt( this, "defaultBank_json.loyalty_points_icon", 1032, 34 );
		lp.scaleX = lp.scaleY = 0.7;

		let lpTx: egret.TextField = Com.addTextAt( this, 1107, 48, 135, 50, 50, true, true );
		lpTx.stroke = 3;
		lpTx.strokeColor = 0xFF0000;
		lpTx.scaleX = 0.9;
		lpTx.text = "+" + Math.round( data["loyalty_base_point"] );

		if( data["total_pieces"] ){
			let puzzleBg: egret.Bitmap = Com.addBitmapAt( this, "defaultBank_json.loyalty_points_bg", 1023 - 215, 6 );
			puzzleBg.width = 217;
			let puzzle: egret.Bitmap = Com.addBitmapAt( this, "defaultBank_json.icon_collection", 847, 15 );
			puzzle.scaleX = puzzle.scaleY = 0.7;
			Com.addBitmapAtMiddle( this, "defaultBank_json.puzzle_number_" + data["total_pieces"], 963, 95 );
		}

		this.hash = data["hash"];
	}
}