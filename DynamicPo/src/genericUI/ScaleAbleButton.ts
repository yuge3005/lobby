class ScaleAbleButton extends egret.DisplayObjectContainer{

	protected normalScale: number;
	protected touchedScale: number;
	protected touchedFilter: egret.Filter;

	private buttonBg: egret.Bitmap;

	public constructor( textureName: string, normalScale: number, touchedScale: number, touchedFilter: egret.Filter = null ) {
		super();

		this.buttonBg = Com.addBitmapAt( this, textureName, 0, 0 );
		this.scaleX = normalScale;
		this.scaleY = normalScale;
		this.normalScale = normalScale;
		this.touchedScale = touchedScale;
		this.touchedFilter = touchedFilter;

		this.anchorOffsetX = this.buttonBg.width >> 1;
		this.anchorOffsetY = this.buttonBg.height >> 1;

		this.touchEnabled = true;
		mouse.setButtonMode( this, true );

		this.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.onMouseOver, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}

	private onMouseOver(event:egret.TouchEvent){
		let tw = egret.Tween.get(this);
        tw.to({ "scaleX": this.touchedScale, "scaleY": this.touchedScale }, 80);
		this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
		if(this.touchedFilter)this.filters = [ this.touchedFilter ];
		SoundManager.play("small_button_mp3");
	}

	private onMouseOut(event:egret.TouchEvent){
		let tw = egret.Tween.get(this);
        tw.to({ "scaleX": this.normalScale, "scaleY": this.normalScale }, 80);
		this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
		if(this.touchedFilter)this.filters = [];
	}

	public changeBackground(bg: egret.Texture): void {
		this.buttonBg.texture = bg;
	}

	private onTouchTap(event:egret.TouchEvent){
		SoundManager.play( "open_list_mp3" );
	}
}