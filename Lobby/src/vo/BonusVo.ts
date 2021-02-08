class BonusVo {
	private hourlyBonusCount: number;
	private hourlyBonusCountMax: number;
	private hourlyBonuses: Object;
	private levelUpBonus: Object;
	private random: Array<number>;
	private randomPaid: Array<number>;
	private randomMax: number;
	private randomPaidPrice: number;
	private timeNextBonus: number;

	public constructor() {}

	public init(dataSource: Object = null):void {
		this.hourlyBonusCount = dataSource["hourly_bonus_count"] || 0;
		this.hourlyBonusCountMax = dataSource["hourly_bonus_count_max"] || 0;
		this.hourlyBonuses = dataSource["hourly_bonuses"] || {};
		this.levelUpBonus = dataSource["level_up_bonus"] || {};
		this.random = dataSource["random"] || new Array<number>(0);
		this.randomPaid = dataSource["random_paid"] || new Array<number>(0);
		this.randomMax = 0;
		this.randomPaidPrice = dataSource["random_paid_price"] || 0;
		this.timeNextBonus = dataSource["time_next_bonus"] || 0;
	}

	public getRandomBonus():Array<number> {
		let result = this.random;

		for (let i=0; i<result.length; i++) {
			result[i] = this.random[i] || this.randomPaid[i-this.random.length];
			if (result[i] > this.randomMax) this.randomMax = result[i];
		}

		return this.random;
	}

	public get(property: string):any {
		return this[property+""];
	}

	public update(property: string, value: any): void {
		if (typeof this[property]!=="undefined" && this[property]!==null) {
			this[property] = value;
		}
	}
}