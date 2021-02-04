class GameTabLayer extends egret.DisplayObjectContainer{

	public static tabStrings: Array<string> = ["favorite", "multiplayer", "Slot", "bingo"];
    private tabs: Array<TouchDownButton> = [];
	private tabsTx: Array<TextLabel> = [];

	public static TAB_CHANGE: string = "tabChange";

	public constructor() {
		super();

		GameTabLayer.tabStrings.map( this.buildTab.bind( this ) );
		this.cacheAsBitmap = true;

		this.setTabTo( 0 );
	}

	private buildTab( item: string, index: number ){
		let btn: TouchDownButton = Com.addDownButtonAt( this, "lobby_json.side_tab_light", "lobby_json.side_tab_light", 0, 0, this.changeTab.bind(this), false );
		btn.name = "" + index;
		this.tabs[index] = btn;
		this.tabs[index].disabledFilter = MatrixTool.colorMatrixLighter( 0.2 );
		this.tabs[index].anchorOffsetY = 114;
		this.tabsTx[index] = Com.addLabelAt( this, 0, 0, 140, 40, 40, false, true );
		this.tabsTx[index].textColor = 0;
		this.tabsTx[index].setText( MuLang.getText( item, MuLang.CASE_UPPER ) );
		this.tabsTx[index].rotation = 90;
		this.tabsTx[index].x = 60;
	}

	private changeTab( event: egret.TouchEvent ){
		let ev: egret.Event = new egret.Event( GameTabLayer.TAB_CHANGE );
		ev.data = event.target.name;
		this.dispatchEvent( ev );
	}

	public setTabTo( index: number ){
		for( let i: number = 0; i < 4; i++ ){
			if( i < index ){
				this.addChild( this.tabs[i] );
				this.addChild( this.tabsTx[i] );
				this.tabs[i].enabled = true;
				this.tabs[i].scaleX = this.tabs[i].scaleY = 1;
				this.tabs[i].filters = [MatrixTool.colorMatrix(0.5, 0.1, 1)];
				this.tabsTx[i].width = this.tabsTx[i].maxWidth = 140;
				TweenerTool.tweenTo( this.tabs[i], { y: 314 + i * 165 }, 100 );
				TweenerTool.tweenTo( this.tabsTx[i], { x: 60, y: 314 + i * 165 - 90 }, 100 );
			}
			else if( i == index ){
				this.addChild( this.tabs[i] );
				this.addChild( this.tabsTx[i] );
				this.tabs[i].enabled = false;
				this.tabs[i].scaleX = this.tabs[i].scaleY = 1.1;
				this.tabs[i].filters = [];
				this.tabsTx[i].width = this.tabsTx[i].maxWidth = 160;
				TweenerTool.tweenTo( this.tabs[i], { y: 314 + i * 165 + 11 }, 100 );
				TweenerTool.tweenTo( this.tabsTx[i], { x: 70, y: 314 + i * 165 + 11 - 80 }, 100 );
			}
			else{
				this.addChildAt( this.tabsTx[i], 0 );
				this.addChildAt( this.tabs[i], 0 );
				this.tabs[i].enabled = true;
				this.tabs[i].scaleX = this.tabs[i].scaleY = 1;
				this.tabs[i].filters = [MatrixTool.colorMatrix(0.5, 0.1, 1)];
				this.tabsTx[i].width = this.tabsTx[i].maxWidth = 140;
				TweenerTool.tweenTo( this.tabs[i], { y: 314 + i * 165 + 22 }, 100 );
				TweenerTool.tweenTo( this.tabsTx[i], { x: 60, y: 314 + i * 165 + 22 - 51 }, 100 );
			}
			this.tabsTx[i].setText( this.tabsTx[i].text );
		}
	}
}