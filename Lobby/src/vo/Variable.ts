class Variable {
	public static type: string;
	public static isMultiplayer: string;
	public static isMultiplayerPopup: string;
	public static isVideoBingo: boolean;

	public static source: Object;	// 数据源

	public constructor() {}

	public static init(dataSource: Object):void {
		this.source = dataSource;
		
		this.type = dataSource["type"] || "";

		let variables = dataSource["variables"] || {};
		this.isMultiplayer = variables["is_multiplayer"] || "";
		this.isMultiplayerPopup = variables["is_multiplayer_popup"] || "";
		this.isVideoBingo = variables["is_video_bingo"];
	}
}