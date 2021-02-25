class MovieClipButton extends egret.MovieClip {
	public constructor( mcData: egret.MovieClipData ) {
		super( mcData );

		this.touchEnabled = true;
		mouse.setButtonMode( this, true );
		this.addEventListener( mouse.MouseEvent.MOUSE_OVER, this.beginToPlay, this );
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
	}

	private beginToPlay(event: egret.TouchEvent){
		this.play(-1);
		this.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
		SoundManager.play("small_button_mp3");
	}

	private onMouseOut(event:egret.TouchEvent){
		this.gotoAndStop(1);
		this.removeEventListener(mouse.MouseEvent.MOUSE_OUT, this.onMouseOut, this);
	}

	private onTouchTap(event:egret.TouchEvent){
		SoundManager.play( "open_list_mp3" );
	}
}