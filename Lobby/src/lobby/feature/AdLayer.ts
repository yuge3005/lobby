class AdLayer extends DragItem{

	private adWidth: number;
	protected get contentWidth(): number{
		return this.adWidth;
	}

	public constructor() {
		super();

		let maskSp: egret.Shape = new egret.Shape;
        GraphicTool.drawRect( maskSp, new egret.Rectangle( 3, 3, 315, 601 ), 0, false, 1, 30 );
        this.mask = maskSp;
	}

	public setContent( content: egret.DisplayObject ){
		super.setContent( content );
		this.adWidth = Math.round( content.width - AdArea.adSize.x ) * AdArea.adSize.x;
	}
}