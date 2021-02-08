class ItemVo {
	private type:string;
	private coins: Array<number>;
    private after_discount_coins:number;
    private base_coins:number;
    private coins_discount:number;
    private double_xp_duration:number;

	public constructor(dataSource: Object) {
		this.type = dataSource["type"];
		this.coins = dataSource["coins"] ? dataSource["coins"] : null;
		this.after_discount_coins = dataSource["after_discount_coins"] ? dataSource["after_discount_coins"] : null;
		this.base_coins = dataSource["base_coins"] ? dataSource["base_coins"] : null;
		this.coins_discount = dataSource["coins_discount"] ? dataSource["coins_discount"] : null;
		this.double_xp_duration = dataSource["double_xp_duration"] ? dataSource["double_xp_duration"] : null;
	}

	public test(parameter: Object):ItemVo {
		let flag = true;
		Object.keys(parameter).map((key) => {
			if (typeof this[key] === "undefined" || this[key] === null || this[key] !== parameter[key]) flag = false;
		});
		return flag ? this : null;
	}

	public get(property: string):any {
		return this[property+""];
	}
}