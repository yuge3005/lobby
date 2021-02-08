class ProductVo {
	private appleID:string;
    private currency:string;
    private googlePlayerId:string;
    private hash:string;
    private items:Array<ItemVo>;
    private price:number;
    private price_id:string;
    private product_id:string;
    private purchase_count:number;
    private timer_seconds:number;

	public constructor(dataSource: Object) {
		this.appleID = dataSource["appleID"];
		this.currency = dataSource["currency"];
		this.googlePlayerId = dataSource["googlePlayerID"];
		this.hash = dataSource["hash"];
		this.price = dataSource["price"];
		this.price_id = dataSource["price_id"];
		this.product_id = dataSource["product_id"];
		this.purchase_count = dataSource["purchase_count"];
		this.timer_seconds = dataSource["timer_seconds"];
		
		let list = dataSource["items"];
		if (list && list.length>0) {
			this.items = new Array<ItemVo>(list.length);
			for (let i=0; i<list.length; i++) {
				this.items[i] = new ItemVo(list[i]);
			}
		}
	}

	public itemFilter(parameter: Object):Array<ItemVo> {
		if (!this.items) return null;
		let result = new Array<ItemVo>();

		this.items.map((item, i) => {
			if (item.test(parameter) !== null) {
				result.push(item);
			}
		});

		return result;
	}

	public get(property: string):any {
		return this[property+""];
	}

	public getMaxCoins():number {
		let result = 0;
		let items = this.itemFilter({type: "wheel"});
		if (items && items.length>0) {
			let coins = items[0].get("coins");
			for (let i=0; i<coins.length; i++) {
				if (Number(coins[i]) > result) result = Number(coins[i]); 
			}
		}

		return result;
	}
}