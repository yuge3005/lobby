class GameIconListLayer extends egret.Sprite{

	private iconListPages: Array<egret.DisplayObjectContainer>;
	private pageMaxSize: Array<number>;

	private get contentWidth(): number{
		return this.pageMaxSize[this.currentContentIndex];
	}

	private pageWidth: number = 1600;
	private maskRect: egret.Rectangle;

	private currentContent: egret.DisplayObjectContainer;
	private currentContentIndex: number;

	private favoriteList: Array<Object>;

	private dragStarStageX: number;
	private dragStarStageY: number;
	private dragStarContentX: number;

	private draging: boolean;

	public constructor() {
		super();

		this.maskRect = new egret.Rectangle( 0, 0, 1524, 700 );
		this.mask = this.maskRect;
		GraphicTool.drawRect( this, this.maskRect, 0, true, 0.0 );

		this.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.onStartDrag, this );
		this.touchEnabled = true;
	}

	public loadGameList( lists: Array<Object> ){
		this.iconListPages = [];
		this.pageMaxSize = [];
		this.favoriteList = [];
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
						let btn: TouchDownButton = Com.addDownButtonAt( this.iconListPages[ index ], "game_icons_json." + iconName, "game_icons_json." + iconName, px, py, this.openGame.bind(this), true );
						btn.scaleX = btn.scaleY = 2;
						btn.name = "" + lists[i]["list"][j].id;

						let favIndex: number = lists[i]["list"][j].fav;
						if( favIndex >= 0 ){
							if( !this.favoriteList[favIndex] ) this.favoriteList[favIndex] = lists[i]["list"][j];
							else{
								egret.error( "favorite index error" );
								egret.log( this.favoriteList[favIndex] );
								egret.log( lists[i]["list"][j] );
							}
						}
					}
					else{
						let comingSoon: egret.Bitmap = Com.addBitmapAt( this.iconListPages[ index ], "game_icons_json.coming_soon", px, py );
						comingSoon.scaleX = comingSoon.scaleY = 2;
						comingSoon.touchEnabled = false;
					}
				}
				this.pageMaxSize[index] = ( Math.ceil( j / 8 ) - 1 ) * this.pageWidth;
			}
		}
		
		this.buildFavoriteList();
		this.setContent( this.iconListPages[0] );
	}

	private buildFavoriteList(){
		let tempList: Array<Object> = this.favoriteList;
		let newList: Array<Object> = [];
		let favoriteThree: string = localStorage.getItem( "favorite" );
		if( favoriteThree ){
			let favArr: Array<string> = favoriteThree.split( "," );
			for( let i: number = 0; i < favArr.length; i++ ){
				for( let j: number = 0; j < tempList.length; j++ ){
					if( tempList[j] && tempList[j]["id"] == Number(favArr[i]) ){
						newList.push( tempList[j] );
						tempList[j] = null;
					}
				}
			}
		}
		for( let i: number = 0; i < tempList.length; i++ ){
			if( tempList[i] ) newList.push( tempList[i] );
		}
		this.favoriteList = newList;
		this.iconListPages[0] = new egret.DisplayObjectContainer;
		let i: number;
		for( i = 0; i < newList.length; i++ ){
			let px: number = i % 4 * 386 + Math.floor( i / 8 ) * this.pageWidth;
			let py: number = Math.floor( i % 8 / 4 ) * 350;

			let iconName: string = GameIconsMapping[newList[i]["id"]]["gameSmallIcon"];
			let btn: TouchDownButton = Com.addDownButtonAt( this.iconListPages[0], "game_icons_json." + iconName, "game_icons_json." + iconName, px, py, this.openGame.bind(this), true );
			btn.scaleX = btn.scaleY = 2;
			btn.name = "" + newList[i]["id"];
		}
		this.pageMaxSize[0] = ( Math.ceil( i / 8 ) - 1 ) * this.pageWidth;
	}

	private setContent( content: egret.DisplayObjectContainer ){
		this.removeChildren();
		this.addChild( content );
		this.currentContent = content;
		this.currentContentIndex = this.iconListPages.indexOf( this.currentContent );
	}

	private openGame( event: egret.TouchEvent ){
		if( this.draging )return;
		this.recordFavoriteIndex( event.target.name );
		localStorage.setItem( "gotoGame" + event.target.name, "true" );
		document.location.href = GameIconsMapping[event.target.name].gameURL;
	}

	private recordFavoriteIndex( indexStr: string ){
		let favoriteThree: string = localStorage.getItem( "favorite" );
		let favArr: Array<string>;
		if( favoriteThree ){
			favArr = favoriteThree.split( "," );
			let inFavIndex: number = favArr.indexOf( indexStr );
			if( inFavIndex < 0 ){
				favArr.unshift( indexStr );
				if( favArr.length > 3 ) favArr.length = 3;
			}
			else{
				favArr.splice( inFavIndex, 1 );
				favArr.unshift( indexStr );
			}
		}
		else{
			favArr = [ indexStr ];
		}
		localStorage.setItem( "favorite", favArr.join( "," ) );
	}

	private onStartDrag( event: egret.TouchEvent ){
		this.stage.addEventListener( egret.TouchEvent.TOUCH_END, this.onGameListStopDrag, this );
		this.stage.addEventListener( egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onGameListStopDrag, this );
		this.stage.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.onMove, this );

		this.dragStarStageX = event.stageX;
		this.dragStarStageY = event.stageY;
		this.dragStarContentX = this.currentContent.x;
	}

	private dragSliderPosition( dis: number ){
		dis -= Main.isMobile ? this.dragStarStageY : this.dragStarStageX;
		dis /= this.parent.parent.parent.scaleX;
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
		setTimeout( this.resetDraging.bind(this), 33 );

		if( this.draging ) TweenerTool.tweenTo( this.currentContent, { x: Math.round( this.currentContent.x / this.pageWidth ) * this.pageWidth }, 400, 0, null, null, egret.Ease.backOut );
	}

	private onMove( event: egret.TouchEvent ){
		if( !this.draging ){
			if( ( !Main.isMobile && Math.abs( event.stageX - this.dragStarStageX ) < 5)  || (Main.isMobile && Math.abs( event.stageY - this.dragStarStageY ) < 5) ) return;
			if( ( !Main.isMobile && Math.abs( event.stageX - this.dragStarStageX ) < Math.abs( event.stageY - this.dragStarStageY ) )
				|| ( Main.isMobile && Math.abs( event.stageY - this.dragStarStageY ) < Math.abs( event.stageX - this.dragStarStageX ) ) ){
				this.onGameListStopDrag( null );
				return;
			}
			else this.draging = true;
		}

		this.dragSliderPosition( Main.isMobile ? event.stageY : event.stageX );
	}

	private resetDraging(){
		this.draging = false;
	}

	public setListTo( index: number ){
		this.setContent( this.iconListPages[index] );
	}
}