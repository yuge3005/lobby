class UserVo {
	public static onLevelChanged: Function;
	public static onXpChanged: Function;
    public static onCoinsChanged: Function;
	public static onDineroChanged: Function;

	private static _instance: UserVo;

	private id: string;
	private lang: string;
	private music: number;
	private fbId: string = "";
	private accessToken: string;
	private _coins: number;
	private _dinero: number;
	private _coinsReal: number;
	private _dineroReal: number;
	private _level: number;
	private _xp: number;
	private thisLevelXp: number;
	private nextLevelXp: number;
	private levelMultiplier: number;
	private chipsLevelMultiplier: number;
	private levelMultiplierPuzzle: number;
	private blockPurchase: boolean;

	constructor() {
		let score = PlayerConfig.player("score");
		let settings = PlayerConfig.player("settings");

		this._coinsReal = this._coins = Number(score["coins"]);
		this._dineroReal = this._dinero = Number(score["chips"]);
		this._level = Number(score["level"]);
		this.xp = Number(score["xp"]);
		this.thisLevelXp = Number(score["this_level_xp"]);
		this.nextLevelXp = Number(score["next_level_xp"]);

		this.levelMultiplier = Number(PlayerConfig.player("levelMultiplier"));
		this.chipsLevelMultiplier = Number(PlayerConfig.player("chipsLevelMultiplier"));
		this.levelMultiplierPuzzle = Number(PlayerConfig.player("levelMultiplierPuzzle"));
		this.blockPurchase = Boolean(PlayerConfig.player("is_block_purchase"));

		this.id = PlayerConfig.player("user.id");
		this.lang = settings["lang"];
		this.music = settings["music"];

		let facebook = PlayerConfig.player("facebook");
		if (facebook && facebook["id"]) {
			this.fbId = facebook["id"];
			try {
				this.accessToken = eval("UserData.data['access_token']");
			} catch(e) {}
		}

		// if (this.xp > this.nextLevelXp) this.requestLevelUp();
	}

	/**
	 * init user data
	 */
	public static init(): void {
		if (!this._instance) this._instance = new UserVo();
	}

	/**
	 * update data
	 */
	public static updateData(data: Object): void {
		let coins = data["coins"];
		if ( coins != null && coins !== this._instance._coinsReal ) {
			this.coinsTo( coins );
		}

		let dineros = data["chips"];
		if ( dineros != null && dineros !== this._instance._dineroReal ) {
			this.dineroTo( dineros );
		}

		let xp = data["xp"];
		if (xp && xp !== this._instance._xp) {
			this._instance.xp = xp;
		}

		let level = data["leve"];
		if (level && level !== this._instance.level) {
			this._instance.level = level;
		}

		let thisLevelXp = data["this_level_xp"], nextLevelXp = data["next_level_xp"];
		if (thisLevelXp && thisLevelXp !== this._instance.thisLevelXp) this._instance.thisLevelXp = thisLevelXp;
		if (nextLevelXp && nextLevelXp !== this._instance.nextLevelXp) this._instance.nextLevelXp = nextLevelXp;

		if (xp && xp > this._instance.nextLevelXp) this._instance.requestLevelUp();
	}

	/**
	 * request level up
	 */
	private requestLevelUp(): void {
		let requestData = { json: JSON.stringify({ "bonus_type": "level_up", "seed": new Date().valueOf(), "debug": {}, "fb": GlobelSettings.isForFacebook ? PlayerConfig.player("facebook.id"): "", "current_bet": 0, "machineId": 0, "level": this.level, "game_id": 0 }) };
		new DataServer().getDataFromUrl(eval("API_HOST") + "/cmd.php?action=update_user_bonus", this.requestLevelUpSuccess.bind(this), this, true, requestData);
	}

	/**
	 * request level up success
	 */
	private requestLevelUpSuccess(data: Object): void {
		if (typeof data === "undefined" || data === null) return;
		data = typeof (data) === "string" ? JSON.parse(data) : data;

		// level
		let level = Number(data["level"]);
		PlayerConfig.player("score.level", level);
		if (data["levelMultiplier"]) PlayerConfig.player("levelMultiplier", data["levelMultiplier"]);
		if (data["chipsLevelMultiplier"]) PlayerConfig.player("chipsLevelMultiplier", data["chipsLevelMultiplier"]);
		if (data["levelMultiplierPuzzle"]) PlayerConfig.player("levelMultiplierPuzzle", data["levelMultiplierPuzzle"]);

		let bonus = 0, bonuses = data["bonuses"];
		if (bonuses && bonuses.length > 0) {
			bonuses.map((b) => {
				bonus += Number(b["level_up_bonus"]);
			});
		}

		// // unlock games
		// let unlockGameIDs = Lobby.getInstance().checkHaveGameUnlocked(level);
		// if (unlockGameIDs.length > 0) {
		// 	if (FirstUserExperienceVo.haveExperience("game", "level_up")) {
		// 		let popup = new FirstUserUnlockGamePopup(bonus === 0 ? PlayerConfig.player("bonus.level_up_bonus." + data["level"]) : bonus);
		// 		popup.registItems(data["reward_items"]);
		// 		Trigger.insertInstance(popup);
		// 	} else {
		// 		UnlockGamePopup.gameID = unlockGameIDs[0];
		// 		Trigger.insertModel(UnlockGamePopup);
		// 	}
		// }

		let properties = {
			"level": level,
			"coins": Number(data["coins"]),
			"this_level_xp": Number(data["this_level_xp"]),
			"next_level_xp": Number(data["next_level_xp"]),
			"xp": Number(data["xp"])
		}
		UserVo.updateData(properties);

		// update loyalty data
		LoyaltyVo.updateData(data);
	}

	/**
	 * refresh
	 */
	public static refresh(): void {
		this._instance.levelMultiplier = Number(PlayerConfig.player("levelMultiplier"));
		this._instance.chipsLevelMultiplier = Number(PlayerConfig.player("chipsLevelMultiplier"));
		this._instance.levelMultiplierPuzzle = Number(PlayerConfig.player("levelMultiplierPuzzle"));
		this._instance.blockPurchase = Boolean(PlayerConfig.player("is_block_purchase"));
	}

	public static get(key: string): any {
		if (this._instance) {
			return this._instance[key];
		}

		return 0;
	}

	private set coins(coins: number) {
		if( this._coins == coins ) return;
		this._coins = coins;
		if (UserVo.onCoinsChanged) {
			UserVo.onCoinsChanged( coins );
		}
	}

	private get coins(): number {
		return this._coins;
	}

	private set dineros(dineros: number) {
		if( this._dinero == dineros ) return;
		this._dinero = dineros;
		if (UserVo.onDineroChanged) {
			UserVo.onDineroChanged( dineros );
		}
	}

	private get dineros(): number {
		return this._dinero;
	}

	public static addCoins( coins: number ){
		this.coinsTo( coins + this._instance._coinsReal );
	}

	public static coinsTo( coins: number ){
		this._instance._coinsReal = coins;
		TweenerTool.tweenTo( this._instance, { coins: coins }, 400 );
	}

	public static addDineros( dinero: number ){
		this.dineroTo( dinero + this._instance._dineroReal );
	}

	public static dineroTo( dinero: number ){
		this._instance._dineroReal = dinero;
		TweenerTool.tweenTo( this._instance, { dinero: dinero }, 400 );
	}

	private set xp(xp: number) {
		this._xp = xp;
		UserVo.onXpChanged && UserVo.onXpChanged(this.xpProgress);
	}

	private get xp(): number {
		return this._xp;
	}

	private set level(level: number) {
		if( this._level == level ) return;
		this._level = level;
		if( UserVo.onLevelChanged ) UserVo.onLevelChanged( level );
	}

	private get level(): number {
		return this._level;
	}

	private get xpProgress(): number {
		return Math.floor((this.xp - this.thisLevelXp) * 100 / (this.nextLevelXp - this.thisLevelXp)) / 100;
	}
}