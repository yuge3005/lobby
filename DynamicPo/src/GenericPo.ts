class GenericPo extends GenericModal{

	protected bgAssetName: string;
	protected bg: egret.Bitmap;
	protected closeButtonAssetName: string;
	protected closeButton: ScaleAbleButton;
	protected closeButtonOffset: egret.Point;

	public constructor(configUrl: string = null ) {
		super( configUrl );
	}

	protected init(){
		this.bg = Com.addBitmapAt( this, this.bgAssetName, 0, 0 );
		if( !this.closeButtonOffset ) this.closeButtonOffset = new egret.Point( 0, 0 );

		this.anchorOffsetX = this.bg.width >> 1;
		this.anchorOffsetY = this.bg.height >> 1;

		this.closeButton = Com.addButtonAt( this, this.closeButtonAssetName, this.bg.width + this.closeButtonOffset.x, this.closeButtonOffset.y, this.onClose, 1.4, 1.2 );

		super.init();
	}

	protected onClose( event: egret.TouchEvent ){
		this.dispatchEvent( new egret.Event( GenericModal.CLOSE_MODAL ) );
		SoundManager.play( "close_list_mp3" );
	}
}