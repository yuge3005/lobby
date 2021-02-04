class GameIconListLayer extends egret.ScrollView{

	private iconListPages: Array<egret.Sprite>;

	public constructor() {
		super();

		this.width = 1524;
		this.height = 700;

		this.verticalScrollPolicy = "off";
		this.horizontalScrollPolicy = "on";

		this.bounces = false;
		this.addEventListener( egret.TouchEvent.TOUCH_END, this.onTouchEnd, this );
	}

	public loadGameList( lists: Array<Object> ){
		this.iconListPages = [];
		for( let i: number = 0; i < lists.length; i++ ){
			let index: number = GameTabLayer.tabStrings.indexOf( lists[i]["category"] );
			if( index >= 0 ){
				this.iconListPages[ index ] = new egret.Sprite;
				for( let j: number = 0; j < lists[i]["list"].length; j++ ){
					let px: number = j % 4 * 386 + Math.floor( j / 8 ) * 1600;
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
				GraphicTool.drawRect( this.iconListPages[ index ], new egret.Rectangle( 0, 0, this.iconListPages[ index ].width, this.iconListPages[ index ].height ), 0, true, 0.0 );
			}
		}
		this.setContent( this.iconListPages[3] );
	}

	private openGameasuredWidth( event: egret.TouchEvent ){
		egret.log( 111 )
	}

	private onTouchEnd( event: egret.TouchEvent ){
		
	}
}