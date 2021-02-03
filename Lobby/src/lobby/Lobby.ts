class Lobby extends egret.DisplayObjectContainer{

	// private featureArea: FeatureArea;
    private gameList: GameList;
	
	public constructor() {
		super();

		let bg: egret.Bitmap = Com.addBitmapAt( this, "lobby_json.bg", 0, 0 );
		bg.scaleX = bg.scaleY = 2;

		// feature
        // this.featureArea = new FeatureArea();
        // Com.addObjectAt(this, this.featureArea, 141, 191);

        // game list
        this.gameList = new GameList();
        this.gameList.loadGameList(PlayerConfig.player("canvas_data.icon_list"));
        Com.addObjectAt(this, this.gameList, 0, 0);
	}
}