class DefaultBank extends GenericPo{

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

		this.closeButton = Com.addDownButtonAt( this, "defaultBank_json.btn_close", "defaultBank_json.btn_close", ( this.bg.width << 1 ) - 45, -45, this.onClose, true );

		this.inited = true;
		this.dispatchEvent( new egret.Event( GenericModal.GENERIC_MODAL_LOADED ) );
	}
}