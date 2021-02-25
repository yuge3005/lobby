class New_year_po_2019 extends TimerPo{

	protected static get classAssetName(){
		return "Standard_35_" + GlobelSettings.language;//subclass must override
	}

	public constructor( configUrl: string ) {
		super( configUrl );
	}

	protected init(){
		this.bgAssetName = "random_35_" +  GlobelSettings.language.toUpperCase() + "_png";
		
		super.init();

		let closeBtnRect: egret.Rectangle = new egret.Rectangle( 824, 84, 38, 38 );//range of close button
		let comfirmBtnRect: egret.Rectangle = new egret.Rectangle( 332, 622, 238, 87 );//range of comfirm button

		let coinRect: egret.Rectangle = new egret.Rectangle( 297, 310, 410, 45 );
		let coinColor: number = 0xffe25a;

		let priceRect: egret.Rectangle = new egret.Rectangle( 250, 475, 425, 45 );
		let priceColor: number = 0xFFFFFF;

		let disCountRect: egret.Rectangle = new egret.Rectangle( 397, 370, 225, 35 );
		let disCountColor: number = 0xcacaca;

		Com.addObjectAt( this, this.showLoyaltyPrivileges(), 710, 350 );

		let forOnlyRect: egret.Rectangle = new egret.Rectangle( 250, 425, 425, 35 );
		let forOnlyColor: number = 0xffe25a;

		let alphaCloseBtn: egret.Shape = this.createAlphaButton( closeBtnRect, this.onClose );
		let comfirmBtn: egret.Shape = this.createAlphaButton( comfirmBtnRect, this.buyProduct );

		let product: Object = GlobelSettings[egret.getQualifiedClassName( this )];
		
		let loyaltyLevel: number = LoyaltyVo.data["loyalty_level"];
		let loyaltyArr: Array<Object> = LoyaltyVo.data["privileges"];
		
		let coinstxt: egret.TextField = this.createText( coinRect, coinColor, true );
		coinstxt.text = Utils.formatCoinsNumber(Number(product["items"][0].after_discount_coins));
		coinstxt.stroke = 2;
		coinstxt.strokeColor = 0;

		let coinsText1: egret.Bitmap = this.createCoinsTest( coinRect, coinColor, coinstxt, 25, true );

		let disCount: egret.TextField = this.createText( disCountRect, disCountColor );
		disCount.text =	Utils.formatCoinsNumber(Number(product["items"][0].base_coins));
		disCount.stroke = 2;
		disCount.strokeColor = 0;

		let coinsText2: egret.Bitmap = this.createCoinsTest( disCountRect, disCountColor, disCount, 25 );

		this.createDisCountLine( disCount );

		let lanObj: Object = { en: "FOR ONLY", es: "POR SOLO", pt: "POR APENAS" };

		let forTx: egret.TextField = this.createText( forOnlyRect, forOnlyColor, true );
		forTx.text = lanObj[GlobelSettings.language];

		let pricetxt: egret.TextField = this.createText( priceRect, priceColor, true, true );
		let currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
		pricetxt.text = (currencyIsBrl ? "R$" : "$") + product["price"] * (currencyIsBrl ? 4 : 1);
		// pricetxt.text = "R$" + product["price"];

		coinstxt.text =  Utils.formatCoinsNumber( Math.round( Number(product["items"][0].after_discount_coins) * ( 1 + Number(loyaltyArr[loyaltyLevel]["purchase_bonus"]) ) ) );

		// this.timerTxt = Com.addTextAt( this, 330, 210, 260, 26, 26, false, true );
		// this.timerTxt.text = "00:00:00";
		let loyaltyPointTxt: egret.TextField = Com.addTextAt( this, 342, 574, 260, 21, 21, false, true );
		loyaltyPointTxt.textAlign = "center";
		loyaltyPointTxt.filters = [ new egret.DropShadowFilter(1,90,0,1,4,3,2,2) ];
		loyaltyPointTxt.text = "+" + this.getLoyaltyPoints( product["loyalty_base_point"] );// + ( GlobelSettings.language == "en" ? " loyalty points" : ( GlobelSettings.language == "es" ? " puntos de fidelidad" : " pontos de fidelidade" ) );

		this.addEventListener( egret.Event.REMOVED_FROM_STAGE, this.onRemove, this );
	}

	// private timerTxt: egret.TextField;

	// protected updateDealOverplusText(time: number): void {
		// if( this.timerTxt ) this.timerTxt.text = Utils.secondToHour( time );
	// }

	protected poOverplusOver(): void {
		this.onClose(null);
	}

	private onRemove(){
		this.removeChildren();
		// this.addChild( this.bg );
		// this.addChild( this.closeButton );
	}

	private buyProduct( event: egret.Event ){
		let ev: egret.Event = new egret.Event( GenericModal.MODAL_COMMAND );
		ev["cmd"] = "buyProduct";
		this.dispatchEvent( ev );
	}

	private createAlphaButton( rect: egret.Rectangle, fun: Function ): egret.Shape{
		let btn: egret.Shape = new egret.Shape;
		btn.graphics.beginFill( 0xFFFFFF, 0.0 );
		btn.graphics.drawRect( rect.x, rect.y, rect.width, rect.height );
		btn.graphics.endFill();
		btn.touchEnabled = true;
		mouse.setButtonMode( btn, true );
		this.addChild( btn );
		btn.addEventListener( egret.TouchEvent.TOUCH_TAP, fun, this );
		return btn;
	}

	private createText( rect: egret.Rectangle, color: number, useFilters: boolean = false, bold: boolean = false ): egret.TextField{
		let txt: egret.TextField = Com.addTextAt( this, rect.x, rect.y, rect.width, rect.height, rect.height, false, bold );
		txt.textColor = color;
		txt.verticalAlign = "middle";
		if( !bold )txt.bold = true;
		if( useFilters )txt.filters = [ new egret.DropShadowFilter(1,90,0x333333,1,4,3,2,2) ];
		return txt;
	}

	private createCoinsTest( rect: egret.Rectangle, color: number, txt: egret.TextField, size: number, dropShaddow: boolean = false ): egret.Bitmap{
		let bitmap: egret.Bitmap = Com.addBitmapAt( this, "Po_icons_json.coin", rect.x + ( rect.width - txt.textWidth ) * 0.5 - 88, rect.y + rect.height * 0.5 );
		bitmap.anchorOffsetY = bitmap.height >> 1;
		if( !dropShaddow ) bitmap.filters = [MatrixTool.colorMatrix(0.33, 0.33, 1)];
		return bitmap;
	}

	private createDisCountLine( disCount: egret.TextField ){
		let lineSp: egret.Shape = new egret.Shape;
		lineSp.x = disCount.x;
		lineSp.y = disCount.y;
		lineSp.graphics.lineStyle( 2, 0xFF0000 );
		lineSp.graphics.moveTo( disCount.width - disCount.textWidth >> 1, 0 );
		lineSp.graphics.lineTo( disCount.width + disCount.textWidth >> 1, disCount.height );
		this.addChild( lineSp );
	}
}