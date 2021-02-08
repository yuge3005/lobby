class TriggerVo {

	public static ENTER_LOBBY: string = "enter_lobby";
	public static BACK_TO_LOBBY: string = "back_to_lobby";
	public static EXIT_BANK: string = "exit_bank";
	public static OUT_OF_COINS: string = "out_of_coins_game_id";
	public static OUT_OF_DINERO: string = "out_of_chips_game_id";
	public static ENTER_GAME: string = "enter_game_id";
	public static PO: string = "po";

	private trigs: Object;
	private poLimits: Object;
	private haveTimer: boolean = false;

	public constructor() {
		this.trigs = {};
		this.trigs[TriggerVo.BACK_TO_LOBBY] = new Array<PoVo>();
		this.trigs[TriggerVo.ENTER_LOBBY] = new Array<PoVo>();
		this.trigs[TriggerVo.EXIT_BANK] = new Array<PoVo>();
		this.trigs[TriggerVo.PO] = new Array<PoVo>();
		this.trigs[TriggerVo.OUT_OF_COINS] = new Object();
		this.trigs[TriggerVo.OUT_OF_COINS]["game_id"] = new Array();
		this.trigs[TriggerVo.OUT_OF_COINS]["povo"] = new Array<PoVo>();
		this.trigs[TriggerVo.ENTER_GAME] = new Object();
		this.trigs[TriggerVo.ENTER_GAME]["game_id"] = new Array();
		this.trigs[TriggerVo.ENTER_GAME]["povo"] = new Array<PoVo>();
		this.poLimits = {};
	}

	public registTrigger(trigObject: Object, className: string, classUrl: string, configUrl: string) {
		for (let ob in trigObject) {
			switch (ob) {
				case TriggerVo.ENTER_LOBBY: this.trigs[TriggerVo.ENTER_LOBBY].push(new PoVo(className, classUrl, configUrl)); break;
				case TriggerVo.BACK_TO_LOBBY: this.trigs[TriggerVo.BACK_TO_LOBBY].push(new PoVo(className, classUrl, configUrl)); break;
				case TriggerVo.EXIT_BANK: this.trigs[TriggerVo.EXIT_BANK].push(new PoVo(className, classUrl, configUrl)); break;
				case TriggerVo.OUT_OF_COINS:
					this.trigs[TriggerVo.OUT_OF_COINS]["game_id"] = trigObject[ob];
					this.trigs[TriggerVo.OUT_OF_COINS]["povo"].push(new PoVo(className, classUrl, configUrl));
					break;
				case TriggerVo.ENTER_GAME:
					this.trigs[TriggerVo.ENTER_GAME]["game_id"] = trigObject[ob];
					this.trigs[TriggerVo.ENTER_GAME]["povo"].push(new PoVo(className, classUrl, configUrl));
					break;
				default:
					if (!this.trigs[ob]) this.trigs[ob] = new Array<PoVo>();
					this.trigs[ob].push(new PoVo(className, classUrl, configUrl));
					break;
			}
		}
	}

	public registPo(trigObject: Object, className: string, classUrl: string, configUrl: string) {
		if (trigObject[TriggerVo.ENTER_LOBBY] || trigObject[TriggerVo.BACK_TO_LOBBY] || trigObject[TriggerVo.EXIT_BANK]) {
			this.trigs[TriggerVo.PO].push(new PoVo(className, classUrl, configUrl));
		}
	}

	public registLimits(className: string, productId: number, expiredTime: number, cooldownTime: number) {
		this.haveTimer = true;
		this.poLimits[className] = new PoLimitVo(className, productId, expiredTime, cooldownTime);
	}

	public registPopupLimits(className: string, productId: number, startTime: number, endTime: number) {
		// this.haveTimer = true;
		this.poLimits[className] = new PopupLimitVo(className, productId, startTime, endTime);
	}

	public get haveDealOverplus() {
		for (let key in this.poLimits) {
			if ((<PoLimitVo>this.poLimits[key]).can) return true;
		}
		return false;
	}

	public get havePoTimer() {
		return this.haveTimer;
	}

	public getTriggerPo(trigger: string) {
		return this.trigs[trigger];
	}

	public getOutOfCoinsPo(trigger: string) {
		let ooc = this.trigs[trigger];
		if (typeof ooc !== "undefined" && ooc !== null) {
			let povo = <Array<PoVo>>ooc["povo"];
			let limitPovo = [];
			let className = "";
			for (let i in povo) {
				className = (<PoVo>povo[i]).className;
				if (!this.poLimits[className] || (this.poLimits[className] && (<PoLimitVo>this.poLimits[className]).can)) limitPovo.push(povo[i]);
			}
			if (limitPovo.length === 0) return null;
			ooc["povo"] = limitPovo;
		}
		return ooc;
	}

	public getTriggerPoByLimit(trigger: string) {
		let result = [];
		let className = "";
		for (let i in this.trigs[trigger]) {
			className = (<PoVo>this.trigs[trigger][i]).className;
			if (!this.poLimits[className] || (this.poLimits[className] && (<PoLimitVo>this.poLimits[className]).can)) result.push(this.trigs[trigger][i]);
		}
		return result;
	}
}