class AdLayer extends DragItem{

	private adWidth: number;
	protected get contentWidth(): number{
		return this.adWidth;
	}

	public constructor() {
		super();
	}

	public setContent( content: egret.DisplayObject ){
		super.setContent( content );
		this.adWidth = Math.max( Math.round( ( content.width - AdArea.adSize.x ) / AdArea.adSize.x ) * AdArea.adSize.x, 0 );
	}

	protected onGameListStopDrag( event: egret.TouchEvent ){
		super.onGameListStopDrag( event );
		if( this.draging ) TweenerTool.tweenTo( this.currentContent, { x: Math.round( this.currentContent.x / AdArea.adSize.x ) * AdArea.adSize.x }, 400, 0, null, null, egret.Ease.backOut );
	}
}