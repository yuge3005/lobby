class DefaultBank extends GenericPo{

	private coinsBankLayer: CoinsBankLayer;
	private chipsBankLayer: ChipsBankLayer;

	private coinsBankBtn: TouchDownButton;
	private chipsBankBtn: TouchDownButton;

	protected static get classAssetName(){
		return "defaultBank";
	}

	public static needZoomOut: boolean = false;

	public constructor( configUrl: string = null ) {
		super( configUrl );
	}

	protected init(){

		this.bg = Com.addBitmapAt( this, "defaultBank_json.coins_bg", 0, 0 );
		this.anchorOffsetX = this.bg.width;
		this.anchorOffsetY = this.bg.height;
		this.bg.scaleX = this.bg.scaleY = 2;

		this.closeButton = Com.addDownButtonAt( this, "defaultBank_json.btn_close", "defaultBank_json.btn_close", ( this.bg.width << 1 ) - 58, -35, this.onClose, true );

		this.coinsBankBtn = Com.addDownButtonAt( this, "defaultBank_json.coins_" + GlobelSettings.language, "defaultBank_json.coins_" + GlobelSettings.language, 10, 27, this.switchTocoinsBank.bind(this), true );
		this.chipsBankBtn = Com.addDownButtonAt( this, "defaultBank_json.dinero_" + GlobelSettings.language, "defaultBank_json.dinero_" + GlobelSettings.language, 380, 27, this.switchTochipsBank.bind(this), true );
		this.buildCurrentBankType( GlobelSettings.bankOpenType );

		Com.addBitmapAt( this, "defaultBank_json.title_line", 350, 21 );
		Com.addBitmapAt( this, "defaultBank_json.title_line", 710, 21 );

		this.inited = true;
		this.dispatchEvent( new egret.Event( GenericModal.GENERIC_MODAL_LOADED ) );

		GlobelSettings.bonusUI = new DefaultBankHourlyBonusBar;
		Com.addObjectAt( this, GlobelSettings.bonusUI, 761, 21 );
	}

	private buildCurrentBankType( type: number ){
		if( type == 0 ) this.showCoinsBank();
		else this.showChipsBank();
	}

	private showCoinsBank(){
		if( this.chipsBankLayer ) this.chipsBankLayer.visible = false;
		if( !this.coinsBankLayer ){
			this.coinsBankLayer = new CoinsBankLayer;
			Com.addObjectAt( this, this.coinsBankLayer, 0, 0 );
		}
		this.coinsBankLayer.visible = true;
		this.coinsBankBtn.enabled = false;
		this.chipsBankBtn.enabled = true;
		this.bg.texture = RES.getRes( "defaultBank_json.coins_bg" );
	}

	private showChipsBank(){
		if( this.coinsBankLayer ) this.coinsBankLayer.visible = false;
		if( !this.chipsBankLayer ){
			this.chipsBankLayer = new ChipsBankLayer;
			Com.addObjectAt( this, this.chipsBankLayer, 0, 0 );
		}
		this.chipsBankLayer.visible = true;
		this.coinsBankBtn.enabled = true;
		this.chipsBankBtn.enabled = false;
		this.bg.texture = RES.getRes( "defaultBank_json.dinero_bg" );
	}

	private switchTocoinsBank( event: egret.TouchEvent ){
		this.showCoinsBank();
	}

	private switchTochipsBank( event: egret.TouchEvent ){
		this.showChipsBank();
	}
}

class CoinsBankLayer extends egret.DisplayObjectContainer{
	public constructor() {
		super();

		let products: Array<Object> = GlobelSettings.bank;

		for( let i: number = 0; i < products.length; i++ ){
			let bankItem: BankCoinItem = new BankCoinItem( i, products[i] );
			Com.addObjectAt( this, bankItem, 45, 145 * ( 6 - i ) );
			bankItem.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
		}

		this.cacheAsBitmap = true;
	}

	private onTap( event: egret.TouchEvent ): void {
		let ev: egret.Event = new egret.Event( GenericModal.MODAL_COMMAND );
		ev["product_hash"] = event.target.hash;
		ev["buy_type"] = 0;
		ev["cmd"] = "buyBankProduct";
		this.parent.dispatchEvent( ev );
	}
}

class ChipsBankLayer extends egret.DisplayObjectContainer{
	public constructor() {
		super();

		let products: Array<Object> = GlobelSettings.chipBank;

		for( let i: number = 0; i < products.length; i++ ){
			let bankItem: BankChipItem = new BankChipItem( i, products[i] );
			Com.addObjectAt( this, bankItem, 56 + 512 * i, 159 );
			bankItem.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
		}

		this.cacheAsBitmap = true;
	}

	private onTap( event: egret.TouchEvent ): void {
		let ev: egret.Event = new egret.Event( GenericModal.MODAL_COMMAND );
		ev["product_hash"] = event.target.hash;
		ev["buy_type"] = 1;
		ev["cmd"] = "buyBankProduct";
		this.parent.dispatchEvent( ev );
	}
}

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
		Com.addObjectAt( this, deleteLine, 235, 100 );

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

		if( Number( data["total_pieces"] ) ){
			let puzzleBg: egret.Bitmap = Com.addBitmapAt( this, "defaultBank_json.loyalty_points_bg", 1023 - 215, 6 );
			puzzleBg.width = 217;
			let puzzle: egret.Bitmap = Com.addBitmapAt( this, "defaultBank_json.icon_collection", 847, 15 );
			puzzle.scaleX = puzzle.scaleY = 0.7;
			Com.addBitmapAtMiddle( this, "defaultBank_json.puzzle_number_" + data["total_pieces"], 963, 95 );
		}

		this.hash = data["hash"];
	}
}

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
		this.titleTx.fontFamily = "Righteous";
		this.titleTx.text = MuLang.getText( "free_bonus" );
		this.coinsTx = Com.addTextAt( this, 100, 54, 300, 32, 32 );
		this.coinsTx.textColor = 0xFFF94E;
		this.coinsTx.fontFamily = "Righteous";

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
			else{
				let hourlyBonuses: Array<number> = PlayerConfig.player( "bonus.hourly_bonuses" );
				let bonus: number = hourlyBonuses[PlayerConfig.player("score.level")];

				this.coinsTx.text = Utils.formatCoinsNumber( bonus );
			}
		}
	}

	private onTap( event: egret.TouchEvent ){
		let ev: egret.Event = new egret.Event( GenericModal.MODAL_COMMAND );
		ev["cmd"] = "collect_bonus";
		this.parent.dispatchEvent( ev );

		this.touchEnabled = false;
	}
}