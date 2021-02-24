class SocialBar extends egret.DisplayObjectContainer {
    private vipClub: egret.DisplayObjectContainer;
    private tournament: egret.DisplayObjectContainer;
    private loyalty: egret.DisplayObjectContainer;
    private gift: egret.DisplayObjectContainer;
    private facebookArea: egret.DisplayObjectContainer;
    private surveyOn: egret.DisplayObjectContainer;
    private inform: egret.DisplayObjectContainer;
    private hourlyBonus: egret.DisplayObjectContainer;
    private album: egret.DisplayObjectContainer;
    private questionsRedPoint: RedPoint;

    private goldTournamentTip: egret.DisplayObjectContainer;

    constructor() {
        super();

        let bar_bottom: egret.Bitmap = Com.addBitmapAt(this, "lobby_json.bar_bottom", 0, 0);
        bar_bottom.scaleX = bar_bottom.scaleY = 2;
        
        // properties
        let isFacebook = PlayerConfig.player("facebook_id") != null;
        let questions = <Array<Object>>PlayerConfig.player("questioner");
        let loyaltyLevel = PlayerConfig.player("loyalty.loyalty_level");

        let isVip: boolean = PlayerConfig.player("is_contact_popup");
        if( isVip ){
            this.vipClub = new egret.DisplayObjectContainer();
            this.vipClub.touchEnabled = true;
            this.vipClub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showVipClub, this);
            Com.addObjectAt(this, this.vipClub, 168, 45);
            Com.addBitmapAt(this.vipClub, "lobby_json.icon_vip_club", 34, 0);
            Com.addBitmapAt(this.vipClub, "icon_texts_" + MuLang.language + "_json.icon_vip", 0, 50);
        }

        // tournament
        this.tournament = new egret.DisplayObjectContainer();
        this.tournament.touchEnabled = true;
        Com.addObjectAt(this, this.tournament, 366, 38);
        // bg
        Com.addBitmapAt(this.tournament, "lobby_json.icon_tournament", 46, 0);
        // txt
        Com.addBitmapAt(this.tournament, "icon_texts_" + MuLang.language + "_json.icon_tourna", 0, 58);
        // gold tournament tip
        // if (GoldTournamentVo.haveGoldToday) {
        //     // this.goldTournamentTip = new egret.DisplayObjectContainer();
        // }
        // if (FirstUserExperienceVo.isLocked("tournament_system")) {
        //     let unlockLevel = FirstUserExperienceVo.getUnlockLevel("tournament_system");
        //     this.tournament["lock"] = this.createIconLock(this.tournament, Lanuage.getValue("unlock_level", true) + "\n" + unlockLevel);
        // } else this.tournament.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTournament, this);

        // album
        this.album = new egret.DisplayObjectContainer();
        this.album.touchEnabled = true;
        Com.addObjectAt(this, this.album, 616, 10);
        // bg
        Com.addBitmapAt(this.album, "lobby_json.puzzle_icon", 0, 0);
        // txt
        Com.addBitmapAt(this.album, "icon_texts_" + MuLang.language + "_json.icon_dr_journey", 0, 94);
        // if (FirstUserExperienceVo.isLocked("collect_system")) {
        //     let unlockLevel = FirstUserExperienceVo.getUnlockLevel("collect_system");
        //     this.album["lock"] = this.createIconLock(this.album, Lanuage.getValue("unlock_level", true) + "\n" + unlockLevel);
        // } else this.album.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showAlbum, this);

        // loyalty
        this.loyalty = new egret.DisplayObjectContainer();
        this.loyalty.touchEnabled = true;
        Com.addObjectAt(this, this.loyalty, 1469, 9);
        // bg
        let loyaltyIcon = Com.addBitmapAt(this.loyalty, "loyalty_level_icon_json." + loyaltyLevel, 4, 0);
        loyaltyIcon.scaleX = loyaltyIcon.scaleY = .8;
        // txt
        Com.addBitmapAt(this.loyalty, "icon_texts_" + MuLang.language + "_json.icon_loyalty", 0, 82);
        
        // if (FirstUserExperienceVo.isLocked("loyalty_system")) {
        //     let unlockLevel = FirstUserExperienceVo.getUnlockLevel("loyalty_system");
        //     this.loyalty["lock"] = this.createIconLock(this.loyalty, Lanuage.getValue("unlock_level", true) + "\n" + unlockLevel);
        // } else this.loyalty.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLoyalty, this);

        if (isFacebook) {
            // gift
            this.gift = new egret.DisplayObjectContainer();
            this.gift.touchEnabled = true;
            Com.addObjectAt(this, this.gift, 1698, 32);
            // bg
            Com.addBitmapAt(this.gift, "lobby_json.icon_gift", 4, 0);
            // txt
            Com.addBitmapAt(this.gift, "icon_texts_" + MuLang.language + "_json.icon_gift", 0, 76);

            // if (FirstUserExperienceVo.isLocked("friend_system")) {
            //     let unlockLevel = FirstUserExperienceVo.getUnlockLevel("friend_system");
            //     this.gift["lock"] = this.createIconLock(this.gift, Lanuage.getValue("unlock_level", true) + "\n" + unlockLevel);
            // } else this.gift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGift, this);
        } else {
            let facebookLinkCoins = Number(PlayerConfig.player("guest_link_account_base_coins")) * Number(PlayerConfig.player("levelMultiplier"));
            /**
             * facebook area
             */
            this.facebookArea = new egret.DisplayObjectContainer();
            this.facebookArea.touchEnabled = true;
            this.facebookArea.addEventListener(egret.TouchEvent.TOUCH_TAP, this.facebookConnect, this);
            Com.addObjectAt(this, this.facebookArea, 1696, 15);
            // bg
            Com.addBitmapAt(this.facebookArea, "lobby_json.icon_facebook", 0, 0);
            // facebook coins
            let facebookCoins = Com.addTextAt(this.facebookArea, 41, 64, 123, 35, 26, false, false);
            facebookCoins.verticalAlign = "middle";
            facebookCoins.textColor = 0xFFFF00;
            facebookCoins.text = "" + facebookLinkCoins;
            // txt
            Com.addBitmapAt(this.facebookArea, "icon_texts_" + MuLang.language + "_json.icon_facebook", -2, 90);
        }

        // survey on
        this.surveyOn = new egret.DisplayObjectContainer();
        this.surveyOn.touchEnabled = true;
        this.surveyOn.visible = questions && questions.length > 0;
        this.surveyOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSurveyOn, this);
        Com.addObjectAt(this, this.surveyOn, 1867, 42);
        // bg
        Com.addBitmapAt(this.surveyOn, "lobby_json.icon_survey_on", 57, 0);
        // txt
        Com.addBitmapAt(this.surveyOn, "icon_texts_" + MuLang.language + "_json.icon_survey", 0, 65);
        if (questions.length > 0) {
            // red point
            this.questionsRedPoint = new RedPoint();
            Com.addObjectAt(this.surveyOn, this.questionsRedPoint, 145, 11);
            this.questionsRedPoint.check(questions.length);
        }

        // inform
        this.inform = new egret.DisplayObjectContainer();
        this.inform.touchEnabled = true;
        this.inform.visible = !questions || questions.length === 0;
        this.inform.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInform, this);
        Com.addObjectAt(this, this.inform, 1896, 40);
        // bg
        Com.addBitmapAt(this.inform, "lobby_json.icon_profile", 20, 0);
        // txt
        Com.addBitmapAt(this.inform, "icon_texts_" + MuLang.language + "_json.icon_profile", 0, 70);

        // hourly bonus
        this.hourlyBonus = new HourlyBonusBar();
        // this.hourlyBonus.addEventListener(Lobby.SHOW_BANK, this.showBank, this);
        Com.addObjectAt(this, this.hourlyBonus, 898, -55);

        // first user expierence
		// let firstWithPuzzle = localStorage.getItem("first_with_puzzle");
		// if (firstWithPuzzle === null || typeof firstWithPuzzle === "undefined") {
		// 	RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showPuzzleTutorial, this);
		// 	RES.loadGroup("puzzle_tutorial_" + MuLang.language);
		// }

        this.cacheAsBitmap = true;
    }

    /**
     * create icon lock
     */
    private createIconLock(target: egret.DisplayObjectContainer, text: string): egret.DisplayObjectContainer {
        let lockContainer = new egret.DisplayObjectContainer();
        lockContainer.width = target.width;
        lockContainer.height = target.height;
        Com.addObjectAt(target, lockContainer, 0, 0);

        // lock
        let lockIcon = Com.addBitmapAt(lockContainer, "lobby_json.locked", target.width >> 1, target.height >> 1);
        lockIcon.anchorOffsetX = lockIcon.width >> 1;
        lockIcon.anchorOffsetY = lockIcon.height >> 1;
        lockIcon.scaleX = lockIcon.scaleY = .3;

        return lockContainer;
    }

    /**
     * unlock gift
     */
    public unlockGift(): void {
        // if (this.gift) {
        //     if (this.gift["lock"]) FirstUserExperienceVo.cleanCircles(this.gift["lock"]);
		//     this.gift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGift, this);
        // }
    }

    /**
     * show vip club
     */
    private showVipClub(): void {
        // Trigger.insertModel(ContactPopup);
    }

    /**
     * show tournament
     */
    private showTournament(): void {
        // Trigger.insertModel(CompetitionsPopup);
    }

    /**
     * show album
     */
    private showAlbum(): void {
        // this.dispatchEvent(new egret.Event(Lobby.SHOW_PUZZLE));
    }

    /**
	 * show puzzle tutorial
	 */
    private showPuzzleTutorial(event: RES.ResourceEvent): void {
        if (event.groupName === "puzzle_tutorial_" + MuLang.language) {
            this.showAlbumIcon(false);
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showPuzzleTutorial, this);
			this.dispatchEvent(new egret.Event("FIRST_WITH_PUZZLE"));
		}
    }

    /**
     * show album icon
     */
    public showAlbumIcon(show: boolean): void {
        this.album.visible = show;
    }

    /**
     * show loyalty
     */
    private showLoyalty(): void {
        // Trigger.insertModel(LoyaltyPopup);
    }

    /**
     * show gift
     */
    private showGift(): void {
        // Trigger.insertModel(InviteAndGift);
    }

    /**
     * facebook connect
     */
    private facebookConnect(): void {
        localStorage.removeItem("player");
        localStorage.removeItem("user_account_info");

        window.location.href = "/?change_login_type=facebook";
    }

    /**
     * show survey on
     */
    private showSurveyOn(): void {
        // Trigger.insertModel(QuestionsPopup);
    }

    /**
     * show inform
     */
    private showInform(): void {
        // Trigger.insertModel(InformPopup);
    }

    /**
     * red point check
     */
    public redPointCheck(): void {
        let questions = <Array<Object>>PlayerConfig.player("questioner");
        // this.questionsRedPoint.check(questions.length);
    }

    /**
     * show bank
     */
    private showBank(): void {
        // this.dispatchEvent(new egret.Event(Lobby.SHOW_BANK, false, false, {"type": 0}));
    }

    /**
     * unlock tournament system
     */
    public unlockTournamentSystem(): void {
        if (this.tournament) {
            this.tournament["lock"] && this.tournament.removeChild(this.tournament["lock"]);
            this.tournament.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTournament, this);
        }
    }

    /**
     * unlock puzzle system
     */
    public unlockPuzzleSystem(): void {
        if (this.album) {
            this.album["lock"] && this.album.removeChild(this.album["lock"]);
            this.album.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showAlbum, this);
        }
    }

    /**
     * unlock loyalty system
     */
    public unlockLoyaltySystem(): void {
        if (this.loyalty) {
            this.loyalty["lock"] && this.loyalty.removeChild(this.loyalty["lock"]);
            this.loyalty.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLoyalty, this);
        }
    }

    public get albumPosition(): egret.Point {
        return new egret.Point(this.album.x, this.album.y);
    }
}