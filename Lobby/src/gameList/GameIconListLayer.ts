class GameIconListLayer extends egret.ScrollView{

	private iconListPages: Array<egret.DisplayObjectContainer>;

	public constructor() {
		super();

		this.width = 1525;
		this.height = 680;
	}

	public loadGameList( lists: Array<Object> ){
		this.iconListPages = [];
		for( let i: number = 0; i < lists.length; i++ ){
			let index: number = GameTabLayer.tabStrings.indexOf( lists[i]["category"] );
			if( index >= 0 ){
				this.iconListPages[ index ] = new egret.DisplayObjectContainer;
				egret.log( lists[i]["list"] );
			}
		}
	}
}