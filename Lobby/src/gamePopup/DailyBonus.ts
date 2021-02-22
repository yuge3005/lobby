class DailyBonus extends GenericPo {
	private today: egret.DisplayObjectContainer;
	private animation: LoyaltyPrivilege;
	private todayCoins: egret.TextField;
	private days_in_a_row: number;
    private items: Array<egret.DisplayObjectContainer>;
    private bonusPosition: Array<Object>;
	private todayBonus: number;
	private dailyBonus: Array<any>;

	protected static get classAssetName() {
		return "daily_bonus";
	}

	public constructor() {
		super();
	}

	protected init() {
		this.bgAssetName = "daily_bonus_json.bg";
		this.closeButtonAssetName = "";

		super.init();

		// set size
		this.width = 2000;
		this.height = 1120;
		this.bonusPosition = [{ x: 354, y: 493 }, { x: 388, y: 441 }, { x: 354, y: 392 }, { x: 344, y: 380 }, { x: 141, y: 210 }];

		// content container
		let contentContainer = new egret.DisplayObjectContainer();
		contentContainer.width = 1947;
		contentContainer.height = 434;
		contentContainer.anchorOffsetX = 973;
		contentContainer.anchorOffsetY = 217;
        Com.addObjectAt(this, contentContainer, 1000, 677);

		// title
		let title = Com.addTextAt(this, 422, 39, 1152, 171, 120, true, false);
		title.fontFamily = "Broadway";
		title.verticalAlign = "middle";
		title.stroke = 6;
		title.strokeColor = 0xFFFFFF;
		title.textColor = 0x06829A;
		title.alpha = 0;
		title.text = MuLang.getText("daily_bonus");

		// render texture and shadow
		let renderTexture = new egret.RenderTexture();
		renderTexture.drawToTexture(title);
		let shadow = new egret.Bitmap(renderTexture);
		shadow.filters = [new egret.GlowFilter(0x000B3C, 1, 30, 30, 3, egret.BitmapFilterQuality.HIGH)];
		Com.addObjectAt(this, shadow, 432, 49);

		// subtext
		let subtext = Com.addTextAt(this, 315, 246, 1366, 154, 72, true, false);
		subtext.fontFamily = "Righteous";
		subtext.stroke = 4;
		subtext.textColor = 0xFFFFFF;
		subtext.text = MuLang.getText("daily_bonus_subtext");

		// daily_bonus_data
		this.dailyBonus = PlayerConfig.player("daily_bonus");
		this.days_in_a_row = Number(PlayerConfig.player("days_in_a_row"));

		// days bg
        this.items = new Array<egret.DisplayObjectContainer>(this.dailyBonus.length);
		this.dailyBonus.map((pos, i) => {
            this.items[i] = this.createDaysBackground(i, this.dailyBonus[i], this.days_in_a_row - 1);
			Com.addObjectAt(contentContainer, this.items[i], 193 + i * 390, 217);

			if (this.days_in_a_row - 1 === i) {
				this.todayBonus = this.dailyBonus[i];
                this.today = this.items[i];
			}
			if (i > 0) {
				Com.addBitmapAt(contentContainer, "daily_bonus_json.day_arrow", 343 + (i - 1) * 390, 117);
			}
		});
		// set today index
		contentContainer.setChildIndex(this.today, 100);
        this.startItemsAnimation();
	}

	/**
	 * 创建daily背景
	 */
	private createDaysBackground(index: number, bonus: number, todayIndex: number): egret.DisplayObjectContainer {
		let result = new egret.DisplayObjectContainer();
		let bg = null, isToday = index === todayIndex, isGray = index < todayIndex;

		if (isToday) {
			// bg
			bg = Com.addBitmapAt(result, "daily_bonus_json.today", 0, 0);

			// today
			let today = Com.addTextAt(result, 37, 10, 406, 121, 120, true, false);
			today.fontFamily = "Lobster";
			today.verticalAlign = "middle";
			today.stroke = 4;
			today.strokeColor = 0xD5155A;
			today.textColor = 0xFFD4D4;
			today.skewY = -10;
			today.text = MuLang.getText("today");

			// coins number
			this.todayCoins = Com.addTextAt(result, 239, 234, 430, 124, 120, true, true);
			this.todayCoins.fontFamily = "Righteous";
			this.todayCoins.stroke = 4;
			this.todayCoins.strokeColor = 0xC81255;
            this.todayCoins.anchorOffsetX = 215;
            this.todayCoins.anchorOffsetY = 62;
			this.todayCoins.verticalAlign = "middle";
            this.todayCoins.text = Utils.formatCoinsNumber(bonus);

			// coin text
			let coinText = Com.addTextAt(result, 24, 300, 430, 62, 48, true, true);
			coinText.fontFamily = "Righteous";
			coinText.verticalAlign = "middle";
			coinText.stroke = 2;
			coinText.strokeColor = 0xC81255;
			coinText.text = MuLang.getText("coins", MuLang.CASE_UPPER);

			if (index < 4) {
				// arrow
				Com.addBitmapAt(result, "daily_bonus_json.today_arrow", 0, 500);

				// arrow text
				let arrowText = Com.addTextAt(result, 47, 570, 433, 53, 42, false, true);
				arrowText.fontFamily = "Righteous";
				arrowText.textColor = 0xffffff;
				arrowText.textAlign = "left";
				arrowText.verticalAlign = "middle";
				arrowText.text = MuLang.getText("TOMORROW YOU GET");
			}

			// btn
			let btnContainer = new egret.DisplayObjectContainer();
			btnContainer.touchEnabled = true;
			btnContainer.once(egret.TouchEvent.TOUCH_TAP, this.showLoyaltyPrivilegeAnimation.bind(this, result), this);
			Com.addObjectAt(result, btnContainer, 51, 408);
			// btn bg
			let btnBg = Com.addBitmapAt(btnContainer, "daily_bonus_json.collect_btn", 0, 0);
			// btn text
			let btnText = Com.addTextAt(btnContainer, 0, 0, 380, 119, 56, true, false);
			btnText.fontFamily = "Righteous";
			btnText.verticalAlign = "middle";
			btnText.textColor = 0xFFFFFF;
			btnText.stroke = 3;
			btnText.strokeColor = 0x000000;
			btnText.text = MuLang.getText("collect", MuLang.CASE_UPPER);

			// loyalty animation
			this.animation = new LoyaltyPrivilege();
			this.animation.visible = false;
			Com.addObjectAt(result, this.animation, index < 4 ? 600: -120, 305);
		} else {
			// bg
			bg = Com.addBitmapAt(result, "daily_bonus_json.day", 0, 0);

            // today
			let day = Com.addTextAt(result, 157, 130, 324, 90, 72, true, false);
			day.fontFamily = "Lobster";
			day.verticalAlign = "middle";
			day.stroke = 3;
			day.strokeColor = 0x020A19;
			day.textColor = 0xFFFFFF;
			day.text = MuLang.getText("day") + (index + 1);

			// render texture and shadow			
			let renderTexture = new egret.RenderTexture();
			renderTexture.drawToTexture(day);
			let shadow = new egret.Bitmap(renderTexture);
			shadow.filters = [new egret.GlowFilter(0x1F68F3, 3, 20, 20, 1, egret.BitmapFilterQuality.HIGH)];
			shadow.skewY = -10;
			Com.addObjectAt(result, shadow, 157, 160);
			day.visible = false;

            // coins number
			let coins = Com.addTextAt(result, 172, 231, 290, 134, 100, true, true);
			coins.fontFamily = "Righteous";
			coins.stroke = 4;
			coins.strokeColor = 0x0000ff;
			coins.verticalAlign = "middle";
            coins.textFlow = <Array<egret.ITextElement>>[
                {"text": Utils.formatCoinsNumber(bonus), style: {}},
                {"text": "\n" + MuLang.getText("coins", MuLang.CASE_UPPER), style: {size: 42}}
            ];

			// bonus icon
			Com.addBitmapAt(result, "daily_bonus_json.Stack-" + (index + 1), this.bonusPosition[index]["x"], this.bonusPosition[index]["y"]);

			// gray
			if (isGray) {
				let shape = new egret.Shape();
				GraphicTool.drawRect(shape, new egret.Rectangle(136, 114, 367, 415), 0x000000, true, .7, 52);
				Com.addObjectAt(result, shape, 0, 0);
			}
		}

		result.scaleX = 0;
		result.scaleY = 0;
		result.anchorOffsetX = bg.width >> 1;
		result.anchorOffsetY = bg.height >> 1;

		return result;
	}

	/**
	 * start items animation
	 */
	private startItemsAnimation(): void {
		this.items.map((item, i) => {
            let tween = egret.Tween.get(item);

            tween.wait(300 + i * 150).to({scaleX: 1, scaleY: 1, alpha: 1}, 300, egret.Ease.backOut);
            if (item === this.today) {
                tween.call(this.startTodayAnimation, this);
            }
        });
	}

	/**
	 * today animation
	 */
	private startTodayAnimation(): void {
		egret.Tween.get(this.todayCoins, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 700).to({ scaleX: 1, scaleY: 1 }, 700);
	}

	/**
	 * show loyalty privilege animation
	 */
	private showLoyaltyPrivilegeAnimation(container: egret.DisplayObjectContainer): void {
		let loyaltyData = LoyaltyVo.data;
		let dailyBonusMultiple = Number(loyaltyData["privileges"][Number(loyaltyData["loyalty_level"])]["daily_bonus"]);

		if (dailyBonusMultiple > 0) {
			let extraBonus = this.todayBonus * dailyBonusMultiple;
			let gap = extraBonus / 40;

			// loyalty privilege animation
			this.animation.visible = true;

			// text timer
			let textTimer = new egret.Timer(50, 40);
			textTimer.addEventListener(egret.TimerEvent.TIMER, function (gap: number) {
				this.todayBonus += gap;
				this.todayCoins.text = Utils.formatCoinsNumber(Math.floor(this.todayBonus));
			}.bind(this, gap), this);
			textTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (finalBonus: number) {
				if (this.animation.parent) this.animation.parent.removeChild(this.animation);
				this.todayCoins.text = Utils.formatCoinsNumber(Math.floor(finalBonus));
				this.todayBonus = finalBonus;
				this.collectDailyBonus();
			}.bind(this, this.todayBonus + extraBonus), this);
			egret.setTimeout(function (textTimer: egret.Timer) { textTimer.start(); }.bind(this, textTimer), this, 500);

			
		} else {
			this.collectDailyBonus();
		}
	}

	/**
	 * collect bonus
	 */
	private collectDailyBonus(): void {
		// request
		let data = { json: JSON.stringify({ "bonus_type": "daily_bonus", "seed": new Date().valueOf(), "debug": {}, "fb": PlayerConfig.player("facebook.id") }) };
		new DataServer().getDataFromUrl(eval("API_HOST") + "/cmd.php?action=update_user_bonus", this.collectRequestSuccess, this, true, data, this.collectRequestFailed);
	}

	/**
	 * collect request success
	 */
	private collectRequestSuccess(data: any): void {
		data = JSON.parse(data);
		if (data.status === "ok") {
			let x = this.today.x;
			let y = 894;

			let rewardItems = data["reward_items"];
			if (rewardItems) {
				ExtendItemVo.showItems(rewardItems, new egret.Point(x, y), this.collectedCallback.bind(this));
			}

			let gap = this.todayBonus / 40;
			// bonus text timer
			let textTimer = new egret.Timer(50, 40);
			textTimer.addEventListener(egret.TimerEvent.TIMER, function (gap: number) {
				this.todayBonus -= gap;
				this.todayCoins.text = Utils.formatCoinsNumber(Math.floor(this.todayBonus));
			}.bind(this, gap), this);
			textTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
				this.todayBonus = 0;
				this.todayCoins.text = "0";
			}, this);
			textTimer.start();
		}
	}

	/**
	 * collect request failed
	 */
	private collectRequestFailed(data: any): void {
		this.collectedCallback();
	}

	/**
	 * close popup
	 */
	private collectedCallback(): void {
		super.onClose(null);
	}
}