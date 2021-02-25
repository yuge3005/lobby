class TouchDownButton extends egret.DisplayObjectContainer {

	private upState: egret.Bitmap;

	private downState: egret.Bitmap;

	public disabledFilter: egret.ColorMatrixFilter;

	public get enabled(){
		return this.touchEnabled;
	}
	public set enabled( value : boolean ){
		this.touchEnabled = value;
		if( value ){
			this.upState.filters = [];
		}
		else{
			if( this.contains( this.downState ) )this.removeChild(this.downState);
			this.addChild( this.upState );
			this.upState.filters = this.disabledFilter ? [this.disabledFilter] : [ MatrixTool.colorMatrix( 0.5, 0.1, 1 ) ];
		}
	}

	public constructor( upState: string, downState: string ) {
		super();

		this.upState = Com.createBitmapByName( upState );
		this.downState = Com.createBitmapByName( downState );

		this.addChild( this.upState );
		mouse.setButtonMode( this, true );

		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}

	private onTouchBegin(event:egret.TouchEvent){
		if( this.contains( this.upState ) )this.removeChild(this.upState);
		this.addChild( this.downState );
		this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}

	private onTouchEnd(event:egret.TouchEvent){
		if( this.contains( this.downState ) )this.removeChild(this.downState);
		this.addChild( this.upState );
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
	}

	private onTouchTap(event:egret.TouchEvent){
		SoundManager.play( "open_list_mp3" );
	}
}