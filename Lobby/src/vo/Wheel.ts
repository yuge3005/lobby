class Wheel {
	public type: string;
	public names: string;
	public product: ProductVo;
	public purChaseProduct: ProductVo;
	public bonus: BonusVo;
	private static instance: Wheel;

	public static hasPurchase: boolean;
	public static modal: string;
	public static sector: number = -1;
	public static spinWheelCoinsNumber: number;

	public constructor() {
		if (typeof Wheel.instance !== "undefined" && Wheel.instance !== null) {
			this.type = Wheel.instance.type;
			this.names = Wheel.instance.names;
			this.product = Wheel.instance.product;
			this.bonus = Wheel.instance.bonus;
			this.purChaseProduct = Wheel.instance.purChaseProduct;
		}
	}

	public static setBonus(dataSource: Object): void {
		if (typeof this.instance === "undefined" || this.instance === null) this.instance = new Wheel();
		this.instance.bonus = new BonusVo();
		this.instance.bonus.init(dataSource);
	}

	public static updateBonus(data: Object): void {
		if (typeof this.instance === "undefined" || this.instance === null) this.instance = new Wheel();
		this.instance.bonus.init(data);
	}

	public static init(dataSource: Object):void {
		if (typeof this.instance === "undefined" || this.instance === null) this.instance = new Wheel();
		this.instance.type = dataSource["type"];
		this.instance.names = dataSource["name"];

		let products = dataSource["products"], product = (products && products.length > 0) ? products[0]: null;
		if (product) this.instance.product = new ProductVo(product);
	}

	public static initPurchased(dataSource: Object):void {
		if (typeof this.instance === "undefined" || this.instance === null) this.instance = new Wheel();

		let products = dataSource["products"], product = (products && products.length > 0) ? products[0]: null;
		if (product) {
			this.instance.purChaseProduct = new ProductVo(dataSource["product"]);
			this.hasPurchase = true;
		}
	}

	public static getWheelData(){
		let ob: Object = {};
		ob["hash"] = this.instance.product.get( "hash" );
		ob["price"] = this.instance.product.get( "price" );
		return ob;
	}
}