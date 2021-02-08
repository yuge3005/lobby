class ExternalContents {

	protected static get instance(){
		return null;//subclass must override
	}

	protected art:Object;
    protected type:string;
    protected names:string;

	public constructor() {
	}

	protected initData(dataSource: Object):void {
		let lang = MuLang.language.toUpperCase();	// EN / ES / PT
		this.type = dataSource["type"];
		if( dataSource["art"] )this.art = dataSource["art"][lang];
		this.names = dataSource["name"];
	}
}