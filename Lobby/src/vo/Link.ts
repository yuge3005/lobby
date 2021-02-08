/**
 * Link Bonus PO
 */
class Link {
	public names: string;
	public type: string;
	public amount: number;
	public bonusAmount: number;
	public bonusId: string;
	public bonusType: string;
	public expiry: string;
	public status: string;
	public isDefault: string;
	public useLevelMultiplier: string;
	public items: Array<Object>;
	// public files: string;		// both two is .swf files path, ignore it.
	// public gfxPath: string;

	private static instance: Link;
	private static giftBonusIds: Array<string> = [];
	private static links: Array<Link> = new Array<Link>();
	private static haveLink: boolean;

	public constructor() {
		if (typeof Link.instance !== "undefined" && Link.instance !== null) {
			this.names = Link.instance.names;
			this.type = Link.instance.type;
			this.amount = Link.instance.amount;
			this.bonusAmount = Link.instance.bonusAmount;
			this.bonusId = Link.instance.bonusId;
			this.bonusType = Link.instance.bonusType;
			this.expiry = Link.instance.expiry;
			this.status = Link.instance.status;
			this.isDefault = Link.instance.isDefault;
			this.useLevelMultiplier = Link.instance.useLevelMultiplier;
			this.items = Link.instance.items;
		}
	}

	public static init(dataSource: Object): void {
		if (dataSource["bonuses_status"] && dataSource["bonuses_status"] === "not_found") return;
		Link.haveLink = true;
		if (!Link.links) Link.links = new Array<Link>();

		if (dataSource["bonuses_status"] === "not_available" || dataSource["bonuses_status"] === "expired") {
			if (typeof this.instance === "undefined" || this.instance === null) {
				let link = new Link();
				link.status = dataSource["bonuses_status"];
				Link.links.push(link);
			}
		} else {
			let link = new Link();
			link.names = dataSource['name'] || "";
			link.type = dataSource['type'] || "";
			link.amount = dataSource['amount'] || 0;
			link.bonusAmount = dataSource['bonus_amount'] || 0;
			link.bonusId = dataSource['bonus_id'] || "";
			link.bonusType = dataSource['bonus_type'] || "";
			link.expiry = dataSource['expiry'] || "";
			link.status = dataSource['bonuses_status'];
			link.isDefault = dataSource['is_default'] || "";
			link.useLevelMultiplier = dataSource['use_level_multiplier'] || "";
			link.items = dataSource["reward_items"] || [];
			Link.links.push(link);
		}
	}

	public static startGiftBonusTimer(): void {
		let giftTimer = new egret.Timer(5000, 0);
		giftTimer.addEventListener(egret.TimerEvent.TIMER, function (timer: egret.Timer) {
			let giftBonusIds = eval("freeBonusIds");
			if (giftBonusIds && giftBonusIds.length > 0) {
				for (let i = 0; i < giftBonusIds.length; i++) {
					if (Link.giftBonusIds.indexOf(giftBonusIds[i]) < 0) Link.giftBonusIds.push(giftBonusIds[i]);
				}

				timer.stop();
				timer = null;
			}
			eval("freeBonusIds = []");

			if (Link.giftBonusIds.length > 0 && !Link.haveLink) {
				let bonusId = Link.giftBonusIds.splice(0, 1);
				Link.loadBonusData(bonusId[0]);
			}
		}.bind(Link, giftTimer), Link);
		giftTimer.start();
	}

	public static loadBonusData(bonus_id: string): void {
		if (Link.haveLink) return;
		let parameters = {bonus_id: bonus_id};
		new DataServer().getDataFromUrl(eval("API_HOST") + "/cmd.php?action=get_gift_bonus", Link.loadBonusDataSuccess, this, true, parameters);
	}

	private static loadBonusDataSuccess(data): void {
		data = typeof data === "string" ? JSON.parse(data) : data;
		Link.init(data);

		Link.showPopup();
	}

	public static showPopup(): void {
		if (!Link.links || Link.links.length === 0) return;
		Link.instance = Link.links.splice(0, 1)[0];

		let popup: GenericPo;
		if (Link.isExpired || Link.isNotAvailable) {
			LinkedExpired.isExpired = Link.instance.status === "expired";
			popup = new LinkedExpired();
		} else {
			// if (Link.instance.bonusType === "manual")
			// 	popup = new LinkBonus();
			// else if (Link.instance.bonusType === "chips")
			// 	popup = new LinkDinero();
			
			popup = new ScratchCard();
		}
		if (popup) {
			popup.addEventListener(egret.Event.REMOVED_FROM_STAGE, Link.clean, Link);
			Trigger.insertInstance(popup);
		}
	}

	public static clean(): void {
		Link.haveLink = Link.links && Link.links.length > 0;
		Link.instance = null;
		if (Link.links.length > 0) {
			Link.showPopup();
		} else if (Link.giftBonusIds.length > 0) {
			let bonusId = Link.giftBonusIds.splice(0, 1)[0];
			Link.loadBonusData(bonusId);
		}
	}

	public static get isLink(): boolean {
		return Link.links && Link.links.length > 0;
	}

	public static get isNotAvailable(): boolean {
		return Link.instance && Link.instance.status === "not_available";
	}

	public static get isExpired(): boolean {
		return Link.instance && Link.instance.status === "expired";
	}
}