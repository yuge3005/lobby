class Lobby extends egret.DisplayObjectContainer{
    public static SHOW_USER_PROFILES: string = "SHOW_USER_PROFILES";

    private static _instance: Lobby;
    private featureArea: AdArea;
    private gameList: GameList;
    public topBar: TopBar;
    private socialBar: SocialBar;

	public constructor() {
		super();

        Lobby._instance = this;

		let bg: egret.Bitmap = Com.addBitmapAt( this, "lobby_json.bg", 0, 0 );
		bg.scaleX = bg.scaleY = 2;

        this.featureArea = new AdArea();
        Com.addObjectAt(this, this.featureArea, 231, 208);

        this.gameList = new GameList();
        this.gameList.loadGameList(PlayerConfig.player("canvas_data.icon_list"));
        Com.addObjectAt(this, this.gameList, 0, 0);

        this.topBar = new TopBar();
        // this.topBar.addEventListener(Lobby.SHOW_USER_PROFILES, this.showUserProfile, this);
        Com.addObjectAt(this, this.topBar, 0, 0);

        this.socialBar = new SocialBar();
        // this.socialBar.addEventListener(Lobby.SHOW_PUZZLE, this.showPuzzle, this);
        // this.socialBar.addEventListener(Lobby.FIRST_WITH_PUZZLE, this.showPuzzleTutorial, this);
        Com.addObjectAt(this, this.socialBar, 0, 940);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    /**
     * on add to stage callback
     */
    private onAddToStage(): void {
        // show enter lobby popup
        Trigger.enterLobby();
    }

    public static getInstance(): Lobby {
        return this._instance;
    }
}