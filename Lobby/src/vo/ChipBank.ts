
class ChipBank extends ExternalContents {
    private products:Array<ProductVo>;
	private static _instance: ChipBank;
	
    protected static get instance(): ChipBank{
        if (!this._instance) this._instance = new ChipBank();
		return this._instance;//subclass must override
	}

	public constructor() {
		super();

		if (ChipBank._instance) this.products = ChipBank._instance.products;
	}

    public static init(dataSource: Object): void{
		this.instance.initData(dataSource);
        this.instance.getProducts(dataSource["products"]);
	}

	public get(property: string):any {
        return this[property + ""];
	}

    private getProducts(list: Array<Object>): void{
		if (list && list.length>0) {
            this.products = new Array<ProductVo>(list.length);
            for (let i = 0; i < list.length; i++) {
                this.products[i] = new ProductVo(list[i]);
			}
		}
	}

    public static getQuickBuyData(): Array<Object> {
        return this.instance.getData();
	}

    private getData(): Array<Object>{
        if (!this.products) return new Array<Object>(0);
        let result = new Array<Object>(this.products.length);

		this.products.map((product, i) => {
			result[i] = {};
			result[i]["money"] = product.get("price");

			let item = product.itemFilter({ "type": "chips" });
			if (item && item.length > 0) result[i]["chip"] = item[0].get("after_discount_chips");
			
			let doubleXp = product.itemFilter({ "type": "double_xp" });
			if (doubleXp && doubleXp.length > 0) result[i]["double_xp"] = doubleXp[0].get("double_xp_duration");

			result[i]["hash"] = product.get("hash");
		});

		return result;
	}
}