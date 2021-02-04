class GameList extends egret.DisplayObjectContainer {

    private tabLayer: GameTabLayer;
    private iconListLayer: GameIconListLayer;

    constructor() {
        super();

        this.tabLayer = new GameTabLayer;
        this.addChild( this.tabLayer );
        this.tabLayer.setTabTo( 0 );
        this.tabLayer.addEventListener( GameTabLayer.TAB_CHANGE, this.tabChange, this );

        this.iconListLayer = new GameIconListLayer;
        Com.addObjectAt( this, this.iconListLayer, 610, 160 );
    }

    public loadGameList( lists: Array<Object> ){
        this.iconListLayer.loadGameList( lists );
    }

    public tabChange( event: egret.Event ){
        let index: number = Number( event.data );
        this.tabLayer.setTabTo( index );
        this.iconListLayer.setListTo( index );
    }
}