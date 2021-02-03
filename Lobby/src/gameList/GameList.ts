class GameList extends egret.DisplayObjectContainer {

    private tabLayer: GameTabLayer;

    constructor() {
        super();

        this.tabLayer = new GameTabLayer;
        this.addChild( this.tabLayer );
        this.tabLayer.setTabTo( 0 );
        this.tabLayer.addEventListener( GameTabLayer.TAB_CHANGE, this.tabChange, this );
    }

    public loadGameList( lists: Array<Object> ){

    }

    public tabChange( event: egret.Event ){
        this.tabLayer.setTabTo( Number( event.data ) );
    }
}