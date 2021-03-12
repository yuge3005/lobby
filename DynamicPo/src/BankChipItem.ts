class BankChipItem extends BankProductItem{

	public constructor( index: number, data: Object ) {
		super();

		Com.addBitmapAt( this, "defaultBank_json.dinero_button_bg", 0, 0 );
		Com.addBitmapAtMiddle( this, "defaultBank_json.dinero_0" + ( 3 - index ), 214, 337 );

		Com.addBitmapAt( this, "defaultBank_json.extra_bg", -18, -12 );
		let lp: egret.Bitmap = Com.addBitmapAt( this, "defaultBank_json.loyalty_points_icon", 163, 580 );
		lp.scaleX = lp.scaleY = 0.5;

		let lpTx: egret.TextField = Com.addTextAt( this, 214, 586, 128, 46, 44, false, true );
		lpTx.text = "+" + Math.round( data["loyalty_base_point"] );

		let chipsTx: egret.TextField = Com.addTextAt( this, 0, 670, 480, 60, 56, true, true );
		chipsTx.text = Utils.formatCoinsNumber( data["items"][0]["after_discount_chips"] );
		chipsTx.stroke = 5;
		chipsTx.strokeColor = 0x115F00;

		let oldTx: egret.TextField = Com.addTextAt( this, 0, 750, 480, 42, 40 );
		oldTx.bold = true;
		oldTx.textColor = 0x004800;
		oldTx.text = ( GlobelSettings.language == "en" ? "was" : "era" ).toUpperCase() + " " + Utils.formatCoinsNumber( data["items"][0]["base_chips"] );

		let deleteLine: egret.Shape = new egret.Shape;
		deleteLine.graphics.beginFill( 0x004800 );
		deleteLine.graphics.drawRect( 0, 0, oldTx.textWidth, 8 );
		deleteLine.graphics.endFill();
		Com.addObjectAt( this, deleteLine, 480 - oldTx.textWidth >> 1, 766 );

		let currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
		let priceTx: egret.TextField = Com.addTextAt( this, 0, 32, 480, 44, 44, true, true );
		priceTx.text = ( currencyIsBrl ? "R$" : "$" ) + " " + Utils.formatCoinsNumber( data["price"] );
		priceTx.stroke = 4;
		priceTx.strokeColor = 0x007F10;

		let extraTx: TextLabel = Com.addLabelAt( this, 0, 55, 130, 40, 40, false, true );
		extraTx.rotation = -45;
		extraTx.scaleX = 0.6;
		extraTx.setText( "EXTRA" );

		let extraNumTx: TextLabel = Com.addLabelAt( this, 0, 110, 260, 35, 35, false, true );
		extraNumTx.rotation = -45;
		extraNumTx.scaleX = 0.6;
		extraNumTx.setText( Math.round( data["items"][0]["chips_discount"] ) + "%" );

		this.hash = data["hash"];
	}
}