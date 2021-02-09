class TopBar extends egret.DisplayObjectContainer {
    private userHead: egret.Bitmap;
    private redPoint: RedPoint;
    private xpProgress: egret.Bitmap;
    private xpProgressText: egret.TextField;
    private levelText: egret.TextField;
    private coinsText: egret.TextField;
    private dineroText: egret.TextField;
    private piggyBank: egret.Bitmap;

    private dealBtn: egret.DisplayObjectContainer;
    private timeBg: egret.Bitmap;
    private dealBtnText: egret.TextField;
    private dealTimeOverplus: egret.TextField;

    private blockPurchase: boolean;

    constructor() {
        super();

        this.blockPurchase = Boolean(PlayerConfig.player("is_block_purchase"));
		// let haveDealOverplus = Trigger.instance.haveDealOverplus;
        // let havePoTimer = Trigger.instance.havePoTimer;

        let bar_up: egret.Bitmap = Com.addBitmapAt(this, "lobby_json.bar_up", 0, 0);
        bar_up.scaleX = bar_up.scaleY = 2;

        // user level area
        let userLevelArea = new egret.DisplayObjectContainer();
        Com.addObjectAt(this, userLevelArea, 65, 2);
        // exp bg
        Com.addBitmapAt(userLevelArea, "lobby_json.experience_bg", 39, 33);
        this.xpProgress = Com.addBitmapAt(userLevelArea, "lobby_json.experience_progress_bar", 41, 33);
        this.xpProgress.mask = new egret.Rectangle(0, 0, 0, 67);
        // user head icon
        this.userHead = Com.addBitmapAt(userLevelArea, "lobby_json.avatar", 0, 17);
        this.userHead.touchEnabled = true;
        this.userHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserProfile, this);
        // if (UserVo.get("fbId") !== "") Utils.downloadBitmapDataByFacebookID(UserVo.get("fbId"), 95, 95, this.loadHeadImage, this);
        // head mask
        let headMask: egret.Shape = new egret.Shape;
        GraphicTool.drawCircle( headMask, new egret.Point( 47, 47 ), 47, 0 );
        Com.addObjectAt(userLevelArea, headMask, 0, 17);
        this.userHead.mask = headMask;
        Com.addBitmapAt(userLevelArea, "lobby_json.btn_player_outline", 0, 17);
        // red point
        this.redPoint = new RedPoint();
        Com.addObjectAt(userLevelArea, this.redPoint, 15, 30);
        this.redPointCheck();
        // level star
        Com.addBitmapAt(userLevelArea, "lobby_json.icon_experience", 321, 0);
        // xp progress text
        this.xpProgressText = Com.addTextAt(userLevelArea, 108, 46, 212, 46, 32, false, false);
        this.xpProgressText.fontFamily = "Righteous";
        this.xpProgressText.verticalAlign = "middle";
        this.xpProgressText.textColor = 0xFFFFFF;
        this.xpProgressText.stroke = 2;
        this.xpProgressText.strokeColor = 0x00045F;
        // level text
        this.levelText = Com.addTextAt(userLevelArea, 338, 39, 88, 46, 40, false, false);
        this.levelText.fontFamily = "Righteous";
        this.levelText.verticalAlign = "middle";
        this.levelText.textColor = 0xFFFFFF;
        this.levelText.stroke = 2;
        this.levelText.strokeColor = 0x00045F;
        this.onXpChanged(UserVo.get("xpProgress"));
        this.onLevelChanged(UserVo.get("level"));

        // user coins area
        let userCoinsArea = new egret.DisplayObjectContainer();
        Com.addObjectAt(this, userCoinsArea, 571, 22);
        // text bg
        Com.addBitmapAt(userCoinsArea, "lobby_json.number_bg", 5, 9);
        this.coinsText = Com.addTextAt(userCoinsArea, 85, 14, 272, 72, 52, false, false);
        this.coinsText.fontFamily = "Righteous";
        this.coinsText.verticalAlign = "middle";
        this.coinsText.textColor = 0xFFFFFF;
        this.coinsText.stroke = 2;
        this.coinsText.strokeColor = 0x9D7806;
        this.onCoinsChanged(Number(UserVo.get("coins")));
        // coin icon
        let coinIcon = Com.addBitmapAt(userCoinsArea, "lobby_json.icon_coin", 0, 0);
        coinIcon.touchEnabled = true;
        coinIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBank, this);

        // bank btn
        let bankBtn = new egret.DisplayObjectContainer();
        bankBtn.touchEnabled = true;
        bankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBank, this);
        Com.addObjectAt(this, bankBtn, 948, 16);
        // bank btn bg
        Com.addBitmapAt(bankBtn, "lobby_json.btn_bank", 0, 0);
        // bank btn text
        let bankBtnText = Com.addTextAt(bankBtn, 15, 3, 249, 90, 48, false, false);
        bankBtnText.fontFamily = "Righteous";
        bankBtnText.verticalAlign = "middle";
        bankBtnText.stroke = 2;
        bankBtnText.strokeColor = 0x004913;
        bankBtnText.text = MuLang.getText("buy", MuLang.CASE_UPPER);

        let haveDealTimer = true;//havePoTimer && haveDealOverplus && !this.blockPurchase;
        // deal btn
        this.dealBtn = new egret.DisplayObjectContainer();
        this.dealBtn.touchEnabled = true;
        // this.dealBtn.filters = (havePoTimer && !haveDealOverplus) || this.blockPurchase ? [MatrixTool.colorMatrix(0.33, 0.33, 1)] : [];
        this.dealBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPo, this);
        Com.addObjectAt(this, this.dealBtn, 1212, 16);
        // deal btn bg
        Com.addBitmapAt(this.dealBtn, "lobby_json.btn_deal", 0, 0);
        // deal btn text
        this.dealBtnText = Com.addTextAt(this.dealBtn, 0, 3, 249, haveDealTimer ? 64: 90, haveDealTimer ? 42: 48, false, false);
        this.dealBtnText.fontFamily = "Righteous";
        this.dealBtnText.verticalAlign = "middle";
        this.dealBtnText.stroke = 2;
        this.dealBtnText.strokeColor = 0x800C68;
        this.dealBtnText.text = MuLang.getText("deal", MuLang.CASE_UPPER);
        // timer
        this.timeBg = Com.addBitmapAt(this.dealBtn, "lobby_json.time_base_lobby", 4, 64);
        this.timeBg.scale9Grid = new egret.Rectangle(16, 0, 12, 30);
        this.timeBg.width = 214;
        // overplus text
        this.dealTimeOverplus = Com.addTextAt(this.dealBtn, 4, 64, 214, 30, 28, false, false);
        this.dealTimeOverplus.fontFamily = "Righteous";
        this.dealTimeOverplus.verticalAlign = "middle";
        this.dealTimeOverplus.text = "00:00:00";
        this.timeBg.visible = this.dealTimeOverplus.visible = haveDealTimer;

        // user dinero area
        let dineroArea = new egret.DisplayObjectContainer();
        Com.addObjectAt(this, dineroArea, 1491, 31);
        // text bg
        Com.addBitmapAt(dineroArea, "lobby_json.number_bg", 0, 0);
        // dinero text
        this.dineroText = Com.addTextAt(dineroArea, 2, 2, 242, 72, 52, false, false);
        this.dineroText.fontFamily = "Righteous";
        this.dineroText.verticalAlign = "middle";
        this.dineroText.textColor = 0xFFFFFF;
        this.dineroText.stroke = 2;
        this.dineroText.strokeColor = 0x41A948;
        // this.onDineroChanged(Number(UserVo.get("dineros")));
        // dinero icon
        let dineroIcon = Com.addBitmapAt(dineroArea, "lobby_json.icon_dinero", 224, 0);
        dineroIcon.touchEnabled = true;
        dineroIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showBank.bind(this, 1), this);

        // piggy bank
        this.piggyBank = Com.addBitmapAt(this, "lobby_json.icon_piggybank", 1882, 23);
        this.piggyBank.touchEnabled = true;
        // this.piggyBank.visible = PiggyBankVo.enable;
        this.piggyBank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openPiggyBank, this);

        // setting btn
        let settingBtn = Com.addBitmapAt(this, "lobby_json.btn_setting", 2014, 17);
        settingBtn.touchEnabled = true;
        settingBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSetting, this);

        // UserVo.onLevelChanged = this.onLevelChanged.bind(this);
        // UserVo.onXpChanged = this.onXpChanged.bind(this);
        // UserVo.onCoinsChanged = this.onCoinsChanged.bind(this);
        // UserVo.onDineroChanged = this.onDineroChanged.bind(this);

        this.cacheAsBitmap = true;
    }

    /**
     * load head image
     */
    private loadHeadImage(e: egret.Event): void {
        let loader = <egret.ImageLoader>e.currentTarget;

        let texture = new egret.Texture();
        texture._setBitmapData(loader.data);
        this.userHead.texture = texture;
    }

    /**
     * update overplus text
     * @param time 
     */
    public updateOverplusText(time: number): void {
        if (this.blockPurchase) return;
        if (this.timeBg.visible === false) {
			this.dealBtnText.height = 32;
			this.dealBtnText.size = 16;
			this.timeBg.visible = this.dealTimeOverplus.visible = true;
		}
		this.dealBtn.filters = [];
		this.dealTimeOverplus.text = Utils.secondToHour(time);
    }

    /**
	 * po overplus over
	 */
	public poOverplusOver(): void {
		if (this.blockPurchase) return;
		this.dealBtnText.height = 40;
		this.dealBtnText.size = 20;
		this.timeBg.visible = this.dealTimeOverplus.visible = false;
		this.dealBtn.filters = [MatrixTool.colorMatrix(0.33, 0.33, 1)];
	}

    /**
     * show user profile
     */
    private showUserProfile(): void {
        // this.dispatchEvent(new egret.Event(Lobby.SHOW_USER_PROFILES));
    }

    /**
     * show bank
     */
    private showBank(type: number = 0): void {
        // this.dispatchEvent(new egret.Event(Lobby.SHOW_BANK, false, false, {"type": type}));
    }

    /**
     * show po
     */
    private showPo(): void {
        if (this.blockPurchase) return;
		// Trigger.showPo();
    }

    /**
     * unlock piggy bank
     */
    public unlockPiggyBank(): void {
        if (this.piggyBank) this.piggyBank.visible = true;
    }

    /**
     * open piggy bank
     */
    private openPiggyBank(): void {
        // Trigger.showPigBank();
    }

    /**
     * show setting
     */
    private showSetting(): void {
        // Trigger.insertModel(SettingPopup);
    }

    /**
     * on level changed
     */
    private onLevelChanged(level: number): void {
        this.levelText.text = "" + level;
    }

    /**
     * on xp changed
     */
    private onXpChanged(progress: number): void {
        if (progress >= 1) progress = 1;
        this.xpProgressText.text = (progress * 100) + "%";
        this.xpProgress.mask.width = progress * 354;
    }

    /**
     * on coins changed
     */
    private onCoinsChanged(coins: number): void {
        this.coinsText.text = Utils.formatCoinsNumber(coins);
        this.coinsText.size = 52 - Math.max(this.coinsText.text.length - 6, 0) * 4;
    }

    /**
     * on dinero changed
     */
    private onDineroChanged(dinero: number): void {
        this.dineroText.text = Utils.formatCoinsNumber(dinero);
        this.dineroText.size = 52 - Math.max(this.dineroText.text.length - 6, 0) * 4;
    }

    /**
     * red point check
     */
    public redPointCheck(): void {
        let preferencesData = PlayerConfig.player("user_info.preferences");
        let answersData = PlayerConfig.player("user_info.preferences_answer");
		// let total = ((PlayerConfig.player("user_info.email_is_verified") || false) ? 0 : 1) + (((PlayerConfig.player("user_info.telephone_is_verified") || Number(PlayerConfig.player("loyalty.loyalty_level")) < 3) || false) ? 0 : 1) + (preferencesData.length - answersData.length);
        
        // this.redPoint.check(total);
    }
}