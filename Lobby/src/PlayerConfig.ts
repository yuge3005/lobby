class PlayerConfig {

	public static serverVertion: number = 2;
	
	public constructor() {
	}

	private static _playerData: Object;
	private static get playerData(): Object{
		if( !this._playerData ){
			let playerStr: string = localStorage.getItem("player");
			if( playerStr ){
				try{
					this._playerData = JSON.parse( playerStr );
				}
				catch(e){
					this._playerData = null;
				}
			}
		}
		return this._playerData;
	}

	private static _configData: Object;
	private static get configData(): Object{
		if( !this._configData ){
			let configStr: string = localStorage.getItem("config");
			if( configStr ){
				try{
					this._configData = JSON.parse( configStr );
				}
				catch(e){
					this._configData = null;
				}
			}
		}
		return this._configData;
	}

	private static playerConfig: Object = { "user.id": requestStr( "id" ), "score.level": 2538, "score.this_level_xp": 2500, "score.next_level_xp": 3500, "score.xp": 3000,
		"mission": {"task_is_process":"0","unlock_level":10,"task":{"387285":{"is_active":"1","type":"1","current":"1","target":"2","id":"387285"},"387286":{"is_active":"0","type":"1","current":"1","target":"6","id":"387286"},"387287":{"is_active":"0","type":"1","current":"0","target":"15","id":"387287"}},"score_info":{"score_is_process":"0"}},"mission.unlock_level":3000, "canvas_data.icon_list": [{"category":"bingo","list":[{"referenceID":"90T","id":39,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":1,"unlock_loyalty_level":0,"end_time":"","fav":2},{"referenceID":"PAK","id":41,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":3,"unlock_loyalty_level":0,"end_time":"","fav":5},{"referenceID":"PHS","id":42,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":5,"unlock_loyalty_level":0,"end_time":"","fav":6},{"referenceID":"NIB","id":38,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":7,"unlock_loyalty_level":0,"end_time":"","fav":7},{"referenceID":"SHB3","id":20,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":11,"unlock_loyalty_level":0,"end_time":"","fav":9},{"referenceID":"SILB","id":49,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":13,"unlock_loyalty_level":0,"end_time":"","fav":10},{"referenceID":"BLK","id":23,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":15,"unlock_loyalty_level":0,"end_time":"","fav":11},{"referenceID":"PRA","id":48,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":17,"unlock_loyalty_level":0,"end_time":"","fav":12},{"referenceID":"SHB1","id":22,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":19,"unlock_loyalty_level":0,"end_time":"","fav":13},{"referenceID":"GBL","id":56,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":21,"unlock_loyalty_level":0,"end_time":"","fav":14},{"referenceID":"TMN","id":51,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":24,"unlock_loyalty_level":0,"end_time":"","fav":15},{"referenceID":"VBNG","id":52,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":26,"unlock_loyalty_level":0,"end_time":"","fav":16},{"referenceID":"HOT","id":54,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":28,"unlock_loyalty_level":0,"end_time":"","fav":17},{"referenceID":"D90T","id":57,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":30,"unlock_loyalty_level":0,"end_time":"","fav":18},{"referenceID":"SHB2","id":21,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":32,"unlock_loyalty_level":0,"end_time":"","fav":19},{"referenceID":"AZTE","id":50,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":34,"unlock_loyalty_level":0,"end_time":"","fav":20},{"referenceID":"BOL3","id":24,"overlay":"","height":1,"width":1,"icon_scale":1.05,"type":"game","unlock_level":36,"unlock_loyalty_level":0,"end_time":"","fav":21},{"referenceID":"DBLB","id":45,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":38,"unlock_loyalty_level":0,"end_time":"","fav":22},{"referenceID":"AMC","id":19,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":42,"unlock_loyalty_level":0,"end_time":"","fav":23},{"referenceID":"PA2","id":61,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":44,"unlock_loyalty_level":0,"end_time":"","fav":24},{"referenceID":"TPB","id":62,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":48,"unlock_loyalty_level":0,"end_time":"","fav":26},{"referenceID":"BOB","id":65,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":50,"unlock_loyalty_level":0,"end_time":"","fav":27},{"referenceID":"CPB","id":68,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":52,"unlock_loyalty_level":0,"end_time":"","fav":28},{"referenceID":"BBN","id":69,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":54,"unlock_loyalty_level":0,"end_time":"","fav":29},{"referenceID":"SPG","id":70,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":56,"unlock_loyalty_level":0,"end_time":"","fav":30},{"referenceID":"SLT","id":71,"overlay":"OVERLAY_VIP","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":58,"unlock_loyalty_level":0,"end_time":"","fav":31},{"referenceID":"COMING_SOON_EMPTY","overlay":"OVERLAY_COMING_SOON_TEXT","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":-1,"unlock_loyalty_level":-1,"end_time":"","is_remote_download":false,"is_featured":false,"featured_img_src":"","fav":-1},{"referenceID":"COMING_SOON_EMPTY","overlay":"OVERLAY_COMING_SOON_TEXT","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":-1,"unlock_loyalty_level":-1,"end_time":"","is_remote_download":false,"is_featured":false,"featured_img_src":"","fav":-1},{"referenceID":"COMING_SOON_EMPTY","overlay":"OVERLAY_COMING_SOON_TEXT","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":-1,"unlock_loyalty_level":-1,"end_time":"","is_remote_download":false,"is_featured":false,"featured_img_src":"","fav":-1},{"referenceID":"COMING_SOON_EMPTY","overlay":"OVERLAY_COMING_SOON_TEXT","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":-1,"unlock_loyalty_level":-1,"end_time":"","is_remote_download":false,"is_featured":false,"featured_img_src":"","fav":-1},{"referenceID":"COMING_SOON_EMPTY"},{"referenceID":"COMING_SOON_EMPTY"}]},{"category":"Slot","list":[{"referenceID":"HWL","id":46,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":1,"unlock_loyalty_level":0,"end_time":"","fav":3},{"referenceID":"HW25","id":66,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":2,"unlock_loyalty_level":0,"end_time":"","fav":4},{"referenceID":"ERA","id":47,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":9,"unlock_loyalty_level":0,"end_time":"","fav":8},{"referenceID":"halloweenX","id":63,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":46,"unlock_loyalty_level":0,"end_time":"","fav":25},{"referenceID":"COMING_SOON_EMPTY","overlay":"OVERLAY_COMING_SOON_TEXT","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":-1,"unlock_loyalty_level":-1,"end_time":"","is_remote_download":false,"is_featured":false,"featured_img_src":"","fav":-1},{"referenceID":"COMING_SOON_EMPTY","overlay":"OVERLAY_COMING_SOON_TEXT","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":-1,"unlock_loyalty_level":-1,"end_time":"","is_remote_download":false,"is_featured":false,"featured_img_src":"","fav":-1},{"referenceID":"COMING_SOON_EMPTY"},{"referenceID":"COMING_SOON_EMPTY"}]},{"category":"multiplayer","list":[{"referenceID":"MEX","id":74,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":2,"unlock_loyalty_level":0,"is_classic":true,"end_time":"","fav":32},{"referenceID":"CNV","id":67,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":1,"unlock_loyalty_level":0,"is_classic":true,"end_time":"","fav":33},{"referenceID":"PAS","id":72,"overlay":"","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":1,"unlock_loyalty_level":0,"is_classic":true,"end_time":"","fav":34},{"referenceID":"COMING_SOON_EMPTY","overlay":"OVERLAY_COMING_SOON_TEXT","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":-1,"unlock_loyalty_level":-1,"end_time":"","is_remote_download":false,"is_featured":false,"featured_img_src":"","fav":-1},{"referenceID":"COMING_SOON_EMPTY","overlay":"OVERLAY_COMING_SOON_TEXT","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":-1,"unlock_loyalty_level":-1,"end_time":"","is_remote_download":false,"is_featured":false,"featured_img_src":"","fav":-1},{"referenceID":"COMING_SOON_EMPTY","overlay":"OVERLAY_COMING_SOON_TEXT","height":1,"width":1,"icon_scale":1,"type":"game","unlock_level":-1,"unlock_loyalty_level":-1,"end_time":"","is_remote_download":false,"is_featured":false,"featured_img_src":"","fav":-1},{"referenceID":"COMING_SOON_EMPTY"},{"referenceID":"COMING_SOON_EMPTY"}]}], "loyalty.loyalty_level": 4, "facebook_id": "115260495912054","questioner": [] };
	private static mission: Object = {};

	public static player( key: string ){
		try{
			let item: any = eval( "this.playerData." + key );
			return item;
		}
		catch(e){
			let rs = this.playerConfig[key];
			if( key=="user.id" && !rs ) rs = "243972732";
			return rs;
		}
	}

	public static config( key: string ){
		try{
			let item: any = eval( "this.configData." + key );
			return item;
		}
		catch(e){
			let rs = this.playerConfig[key];
			if( key=="http" && !rs ) rs = "https";
			if( key=="host" && !rs ) rs = "staging.doutorbingo.com";
			if( key=="platform" && !rs ) rs = "com";
			return rs;
		}
	}

	public static get properties(): string {
		return localStorage.getItem("user_account_info");
	}
}

function requestStr( str ){
	var resItems: Array<string> = location.search.split( /[?&]/ );
	var items: Object = Object;
	for( var i = 0; i < resItems.length; i++ ){
		var item: Array<string> = resItems[i].split("=");
		if( item.length == 2 ) items[item[0]] = item[1];
	}
	return items[str];
}