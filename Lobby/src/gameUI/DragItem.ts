class DragItem extends egret.Sprite{

	protected currentContent: egret.DisplayObjectContainer;

	private dragStarStageX: number;
	private dragStarStageY: number;
	private dragStarContentX: number;

	protected draging: boolean;

	protected get contentWidth(): number{
		return this.currentContent.width;
	}

	public constructor() {
		super();

		this.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onStartDrag, this );
		this.touchEnabled = true;
	}

	protected setContent( content: egret.DisplayObjectContainer ){
		this.removeChildren();
		this.addChild( content );
		this.currentContent = content;
	}

	private onStartDrag( event: egret.TouchEvent ){
		this.stage.addEventListener( egret.TouchEvent.TOUCH_END, this.onGameListStopDrag, this );
		this.stage.addEventListener( egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onGameListStopDrag, this );
		this.stage.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.onMove, this );

		this.dragStarStageX = event.stageX;
		this.dragStarStageY = event.stageY;
		this.dragStarContentX = this.currentContent.x;
	}

	private onMove( event: egret.TouchEvent ){
		if( !this.draging ){
			if( ( !Trigger.isMobile && Math.abs( event.stageX - this.dragStarStageX ) < 5)  || (Trigger.isMobile && Math.abs( event.stageY - this.dragStarStageY ) < 5) ) return;
			if( ( !Trigger.isMobile && Math.abs( event.stageX - this.dragStarStageX ) < Math.abs( event.stageY - this.dragStarStageY ) )
				|| ( Trigger.isMobile && Math.abs( event.stageY - this.dragStarStageY ) < Math.abs( event.stageX - this.dragStarStageX ) ) ){
				this.onGameListStopDrag( null );
				return;
			}
			else this.draging = true;
		}

		this.dragSliderPosition( Trigger.isMobile ? event.stageY : event.stageX );
	}

	private dragSliderPosition( dis: number ){
		dis -= Trigger.isMobile ? this.dragStarStageY : this.dragStarStageX;
		dis /= Trigger.instance.stage.scaleX;
		dis += this.dragStarContentX;
		let p: number = dis;
		if( p > 0 ) p = 0;
		if( p < -this.contentWidth ) p = -this.contentWidth;
		this.currentContent.x = p;
	}

		private onGameListStopDrag( event: egret.TouchEvent ){
		this.stage.removeEventListener( egret.TouchEvent.TOUCH_END, this.onGameListStopDrag, this );
		this.stage.removeEventListener( egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onGameListStopDrag, this );
		this.stage.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.onMove, this );
		setTimeout( this.resetDraging.bind(this), 10 );

		if( this.draging ) TweenerTool.tweenTo( this.currentContent, { x: Math.round( this.currentContent.x / this.pageWidth ) * this.pageWidth }, 400, 0, null, null, egret.Ease.backOut );
	}

	private resetDraging(){
		this.draging = false;
	}
}