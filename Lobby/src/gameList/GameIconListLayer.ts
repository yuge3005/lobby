class GameIconListLayer extends egret.Sprite{

	private iconListPages: Array<egret.DisplayObjectContainer>;
	private pageMaxSize: Array<number>;

	private pageWidth: number = 1600;

	private currentContent: egret.DisplayObjectContainer;

	private favoriteList: Array<Object>;

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
					}
				}
				this.pageMaxSize[index] = Math.floor( j / 8 );
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
		for( let i: number = 0; i < newList.length; i++ ){
			let px: number = i % 4 * 386 + Math.floor( i / 8 ) * this.pageWidth;
			let py: number = Math.floor( i % 8 / 4 ) * 350;

			let iconName: string = GameIconsMapping[newList[i]["id"]]["gameSmallIcon"];
			let btn: TouchDownButton = Com.addDownButtonAt( this.iconListPages[0], "game_icons_json." + iconName, "game_icons_json." + iconName, px, py, this.openGame.bind(this), true );
			btn.scaleX = btn.scaleY = 2;
			btn.name = "" + newList[i]["id"];
		}
	}

	private setContent( content: egret.DisplayObjectContainer ){
		this.removeChildren();
		this.addChild( content );
		this.currentContent = content;
	}

	private openGame( event: egret.TouchEvent ){
		let favoriteThree: string = localStorage.getItem( "favorite" );
		let favArr: Array<string>;
		if( favoriteThree ){
			favArr = favoriteThree.split( "," );
			let inFavIndex: number = favArr.indexOf( event.target.name );
			if( inFavIndex < 0 ){
				favArr.unshift( event.target.name );
				if( favArr.length > 3 ) favArr.length = 3;
			}
			else{
				favArr.splice( inFavIndex, 1 );
				favArr.unshift( event.target.name );
			}
		}
		else{
			favArr = [ event.target.name ];
		}
		localStorage.setItem( "favorite", favArr.join( "," ) );
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