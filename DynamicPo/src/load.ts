class New_year_popup_2019 extends GenericPo{

	protected static get classAssetName(){
		return "Standard_34_" + GlobelSettings.language;//subclass must override
	}

	public constructor( configUrl: string ) {
		super( configUrl );
	}

	protected init(){
		this.bgAssetName = "random_34_" +  GlobelSettings.language.toUpperCase() + "_png";
		
		super.init();

		let closeBtnRect: egret.Rectangle = new egret.Rectangle( 726, 99, 34, 34 );
		let comfirmBtnRect: egret.Rectangle = new egret.Rectangle( 358, 540, 208, 70 );

		let alphaCloseBtn: egret.Shape = this.createAlphaButton( closeBtnRect, this.onClose );
		let comfirmBtn: egret.Shape = this.createAlphaButton( comfirmBtnRect, this.onComfirm );

		this.addEventListener( egret.Event.REMOVED_FROM_STAGE, this.onRemove, this );
	}

	protected poOverplusOver(): void {
		this.onClose(null);
	}

	private onComfirm( event: egret.TouchEvent ){
		let trigger: Object = GlobelSettings[egret.getQualifiedClassName( this )];
		eval( "AdPopupTrigger.doWhateverYuoWant( trigger )" );
		this.onClose(null);
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