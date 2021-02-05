class GameIconListLayer extends DragItem{

	private iconListPages: Array<egret.DisplayObjectContainer>;
	private pageMaxSize: Array<number>;

	protected get contentWidth(): number{
		return this.pageMaxSize[this.currentContentIndex];
	}

	private pageWidth: number = 1600;
	private maskRect: egret.Rectangle;

	private currentContentIndex: number;

	private favoriteList: Array<Object>;

	public constructor() {
		super();

		this.maskRect = new egret.Rectangle( 0, 0, 1524, 700 );
		this.mask = this.maskRect;
		GraphicTool.drawRect( this, this.maskRect, 0, true, 0.0 );
	}

	public loadGameList( lists: Array<Object> ){
		this.iconListPages = [];
		this.pageMaxSize = [];
		this.favoriteList = [];
		for( let i: number = 0; i < lists.length; i++ ){
			let index: number = GameTabLayer.tabStrings.indexOf( lists[i]["category"] );
			let isMulty: boolean = lists[i]["category"] == "multiplayer";
			if( index >= 0 ){
				this.iconListPages[ index ] = new egret.DisplayObjectContainer;
				let j: number;
				for( j = 0; j < lists[i]["list"].length; j++ ){
					let pt: egret.Point;
					if( isMulty ) pt = this.getSlotPosition( j );
					else pt = this.getPositionOnContent( j );
					if( GameIconsMapping[lists[i]["list"][j].id] ){
						let iconName: string = GameIconsMapping[lists[i]["list"][j].id]["gameSmallIcon"];
						this.buildIconByNameId( this.iconListPages[ index ], iconName, pt, lists[i]["list"][j].id );
						
						this.setFav( lists[i]["list"][j].fav, lists[i]["list"][j] );
					}
					else{
						let comingSoon: egret.Bitmap = Com.addBitmapAt( this.iconListPages[ index ], "game_icons_json.coming_soon" + ( isMulty ? "_long" : "" ), pt.x, pt.y );
						comingSoon.scaleX = comingSoon.scaleY = 2;
					}
				}
				this.pageMaxSize[index] = ( Math.ceil( j / ( isMulty ? 4 : 8 ) ) - 1 ) * this.pageWidth;
			}
		}
		
		this.buildFavoriteList();
		this.setContent( this.iconListPages[0] );
	}

	private setFav( favIndex: number, item: Object ){
		if( favIndex >= 0 ){
			if( !this.favoriteList[favIndex] ) this.favoriteList[favIndex] = item;
			else{
				egret.error( "favorite index error" );
				egret.log( this.favoriteList[favIndex] );
				egret.log( item );
			}
		}
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
			let pt: egret.Point = this.getPositionOnContent( i );
			let iconName: string = GameIconsMapping[newList[i]["id"]]["favoriteIcon"];
			let btn: TouchDownButton = this.buildIconByNameId( this.iconListPages[0], iconName, pt, newList[i]["id"] );
		}
		this.pageMaxSize[0] = ( Math.ceil( i / 8 ) - 1 ) * this.pageWidth;
	}

	private getPositionOnContent( i: number ): egret.Point{
		let px: number = i % 4 * 386 + Math.floor( i / 8 ) * this.pageWidth;
		let py: number = Math.floor( i % 8 / 4 ) * 350;
		return new egret.Point( px, py );
	}

	private getSlotPosition( i: number ): egret.Point{
		let px: number = i % 4 * 386 + Math.floor( i / 4 ) * this.pageWidth;
		let py: number = 42;
		return new egret.Point( px, py );
	}

	private buildIconByNameId( target: egret.DisplayObjectContainer, name: string, pt: egret.Point, id: number ): TouchDownButton{
		let btn: TouchDownButton = Com.addDownButtonAt( target, "game_icons_json." + name, "game_icons_json." + name, pt.x, pt.y, this.openGame.bind(this), true );
		btn.scaleX = btn.scaleY = 2;
		btn.name = "" + id;
		return btn;
	}

	protected setContent( content: egret.DisplayObjectContainer ){
		super.setContent( content );
		this.currentContentIndex = this.iconListPages.indexOf( content );
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

	public setListTo( index: number ){
		this.setContent( this.iconListPages[index] );
	}

	protected onGameListStopDrag( event: egret.TouchEvent ){
		super.onGameListStopDrag( event );
		if( this.draging ) TweenerTool.tweenTo( this.currentContent, { x: Math.round( this.currentContent.x / this.pageWidth ) * this.pageWidth }, 400, 0, null, null, egret.Ease.backOut );
	}
}