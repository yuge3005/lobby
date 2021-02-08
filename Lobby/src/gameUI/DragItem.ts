class DragItem extends egret.Sprite{

	public static START_DRAG: string = "startDrag";
	public static STOP_DRAG: string = "stopDrag";

	protected currentContent: egret.DisplayObject;

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

	public setContent( content: egret.DisplayObject ){
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

		this.dispatchEvent( new egret.Event( DragItem.START_DRAG ) );
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

	protected onGameListStopDrag( event: egret.TouchEvent ){
		this.stage.removeEventListener( egret.TouchEvent.TOUCH_END, this.onGameListStopDrag, this );
		this.stage.removeEventListener( egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onGameListStopDrag, this );
		this.stage.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.onMove, this );
		setTimeout( this.resetDraging.bind(this), 10 );
	}

	private resetDraging(){
		this.draging = false;
		this.dispatchEvent( new egret.Event( DragItem.STOP_DRAG ) );
	}
}