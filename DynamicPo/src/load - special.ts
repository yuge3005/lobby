class SupportAndContact extends GenericPo{

	protected static get classAssetName(){
		return "Standard_33_" + GlobelSettings.language;//subclass must override
	}

	public constructor( configUrl: string ) {
		super( configUrl );
	}

	protected init(){
		this.bgAssetName = "random_33_" +  GlobelSettings.language.toUpperCase() + "_png";
		
		super.init();

		let closeBtnRect: egret.Rectangle = new egret.Rectangle( 518, 32, 45, 45 );//range of close button
		let comfirmBtnRect: egret.Rectangle = new egret.Rectangle( 25, 300, 250, 55 );//range of comfirm button
		let addiBtnRect: egret.Rectangle = new egret.Rectangle( 282, 300, 250, 55 );//range of comfirm button

		let alphaCloseBtn: egret.Shape = this.createAlphaButton( closeBtnRect, this.onClose );
		let comfirmBtn: egret.Shape = this.createAlphaButton( comfirmBtnRect, this.onComfirm );
		let addiBtn: egret.Shape = this.createAlphaButton( addiBtnRect, this.onAddi );


		this.addEventListener( egret.Event.REMOVED_FROM_STAGE, this.onRemove, this );
	}

	private onComfirm( event: egret.TouchEvent ){
		let lan: Object = { en: "Dr. Bingo: Support Request", es: "Dr. Bingo: Solicitud a Atención al Cliente", pt: "Dr. Bingo: Solicitações do Suporte" };
		let facebookId = PlayerConfig.player( "facebook_id" );
		let locale:String = GlobelSettings.language;
		window.open( "mailto:Financial@doutorbingo.com&subject=" + lan[locale.substr(0,2)] + "-" + facebookId, "_blank" );
	}

	private onAddi(){
		window.parent.location.href = "https://www.doutorbingo.com";
	}

	private onRemove(){
		this.removeChildren();
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
}