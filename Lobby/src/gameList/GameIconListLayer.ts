class GameIconListLayer extends egret.Sprite{

	private iconListPages: Array<egret.DisplayObjectContainer>;
	private pageMaxSize: Array<number>;

	private pageWidth: number = 1600;

	private currentContent: egret.DisplayObjectContainer

	public constructor() {
		super();

		let maskRect: egret.Rectangle = new egret.Rectangle( 0, 0, 1524, 700 );
		this.mask = maskRect;
		GraphicTool.drawRect( this, maskRect, 0, true, 0.0 );

		this.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onStartDrag, this );
	}

	public loadGameList( lists: Array<Object> ){
		this.iconListPages = [];
		this.pageMaxSize = [];
		for( let i: number = 0; i < lists.length; i++ ){
			let index: number = GameTabLayer.tabStrings.indexOf( lists[i]["category"] );
			if( index >= 0 ){
				this.iconListPages[ index ] = new egret.DisplayObjectContainer;
				let j: number;
				for( j = 0; j < lists[i]["list"].length; j++ ){
					let px: number = j % 4 * 386 + Math.floor( j / 8 ) * this.pageWidth;
					let py: number = Math.floor( j % 8 / 4 ) * 350;
					if( GameIconsMapping[lists[i]["list"][j].id] ){
						let iconName: string = GameIconsMapping[lists[i]["list"][j].id]["gameSmallIcon"];
						let btn: TouchDownButton = Com.addDownButtonAt( this.iconListPages[ index ], "game_icons_json." + iconName, "game_icons_json." + iconName, px, py, this.openGameasuredWidth.bind(this), true );
						btn.scaleX = btn.scaleY = 2;
					}
					else{
						let comingSoon: egret.Bitmap = Com.addBitmapAt( this.iconListPages[ index ], "game_icons_json.coming_soon", px, py );
						comingSoon.scaleX = comingSoon.scaleY = 2;
					}
				}
				this.pageMaxSize[index] = Math.floor( j / 8 );
			}
		}
		this.setContent( this.iconListPages[3] );
	}

	private setContent( content: egret.DisplayObjectContainer ){
		this.removeChildren();
		this.addChild( content );
		this.currentContent = content;
	}

	private openGameasuredWidth( event: egret.TouchEvent ){
		egret.log( 111 )
	}

	private onStartDrag( event: egret.TouchEvent ){
		// this.stage.addEventListener( egret.TouchEvent.TOUCH_END, this.onSliderStopDrag, this );
		// this.stage.addEventListener( egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onSliderStopDrag, this );
		// this.stage.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.onMove, this );

		// this.dragStarStageY = event.stageY;
		// this.dragStarSliderY = this.slider.y;
		// this.dragSliderPosition( event.stageY );
	}
}