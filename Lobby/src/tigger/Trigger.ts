class Trigger {
	public static isMobile: boolean;
	public stage: Main;
	public size: egret.Point = new egret.Point( 2250, 1125);
	public scale: egret.Point = new egret.Point( 960 / 2250, 540 / 1125);

	private currentPoName: string;
	private currentPo: GenericModal;

	private poContainer: egret.DisplayObjectContainer;
	private poShadow: egret.Shape;
	private modalPreloader: ModalPreloader;

	private static _instance: Trigger;
	public static get instance(): Trigger{
		if( !this._instance ) this._instance = new Trigger;
		return this._instance;
	}

	private blockPurchase: boolean = false;
	private trigs: TriggerVo;

	private waitingModals: Array<PoVo|GenericModal>;

	public constructor() {
		this.trigs = new TriggerVo();
		this.waitingModals = [];

		this.blockPurchase = Boolean(PlayerConfig.player("is_block_purchase"));
		// po container
		this.poContainer = new egret.DisplayObjectContainer();
		// shadow
		this.poShadow = new egret.Shape();
		GraphicTool.drawRect(this.poShadow, new egret.Rectangle( 0, 0, this.size.x, this.size.y ), 0, false, 0.5);
		this.poShadow.touchEnabled = true;
		Com.addObjectAt(this.poContainer, this.poShadow, 0, 0);
		// modal preloader
		this.modalPreloader = new ModalPreloader;
		Com.addObjectAt( this.poContainer, this.modalPreloader, this.size.x >> 1, this.size.y >> 1 );
	}

	/**
	 * quick close
	 */
	private quickClose(): void {
		if (this.currentPo && !this.currentPo["cannotQuick"] ) this.closeCurrentPo();
	}

	public static registTrigger( trigObject: Object, className: string, classUrl: string, configUrl: string ){
		this.instance.trigs.registTrigger( trigObject, className, classUrl, configUrl );
	}

	public static registPo( trigObject: Object, className: string, classUrl: string, configUrl: string){
		this.instance.trigs.registPo(trigObject, className, classUrl, configUrl);
	}

	public static registLimits(className: string, productId: number, expiredTime: number, cooldownTime: number): void {
		this.instance.trigs.registLimits(className, productId, expiredTime, cooldownTime);
	}

	public static registPopupLimits(className: string, productId: number, startTime: number, endTime: number): void {
		this.instance.trigs.registPopupLimits(className, productId, startTime, endTime);
	}

	/**
	 * enter lobby
	 */
	public static enterLobby(): void{
		Trigger.instance.enterLobbyTrigger();
	}

	/**
	 * enter lobby trigger popups
	 */
	private enterLobbyTrigger() {
		if (this.blockPurchase) {
			this.showBank();
		} else {
			// let experience = FirstUserExperienceVo.step("lobby");
            // if (experience !== null) {
            //     FirstUserExperienceVo.showExperienceEffect(experience);
			// }
			
			if (Number(PlayerConfig.player("score.level")) > 2 && !PlayerConfig.player("collected_daily_bonus")) {
				let dailyBonus = new DailyBonus();
				Trigger.insertInstance(dailyBonus);
			}

			// if (Boolean(PlayerConfig.player("is_first_login_chips")) && !Boolean(PlayerConfig.player("is_new"))) {
			// 	ToolbarUserCoins.addDineros( -Number(PlayerConfig.player("init_chips") ) );
			// 	this.waitingModals.push(new PoVo("FreeDineroPopup", "", ""));
			// }

			// if (PlayerConfig.player("claim_bonuses") && (<Array<Object>>PlayerConfig.player("claim_bonuses")).length > 0) {
			// 	let claimBonuses = <Array<Object>>PlayerConfig.player("claim_bonuses");
			// 	for (let i = 0; i < claimBonuses.length; i++) {
			// 		if (Number(claimBonuses[i]["type"]) === 0) {
			// 			if ([46, 47, 63, 66].indexOf(Number(claimBonuses[i]["game_id"])) === -1) {
			// 				this.waitingModalsInstance.push(new ClaimBonus(claimBonuses[i]));
			// 			}
			// 		} else {
			// 			if (claimBonuses[i]["isGold"]) this.waitingModalsInstance.push(new GoldTournamentEnd(claimBonuses[i]));
			// 			else this.waitingModalsInstance.push(new TournamentEnd(claimBonuses[i]));
			// 		}
			// 	}
			// }

			// if (PlayerConfig.player("vip_club")) {
			// 	let messages = <Array<any>>PlayerConfig.player("vip_club.message");
			// 	if (messages && messages.length > 0) {
			// 		this.showVipClubMessage(messages, 0);
			// 	}
			// }

			// if (Link.isLink) Link.showPopup();
			// if (GlobelSettings.isForCom && eval("freeBonusIds")) Link.startGiftBonusTimer();

			// if (GlobelSettings.isForFacebook && PlayerConfig.player("facebook.count_requests")) {
			// 	this.waitingModals.push( new PoVo( "GiftRecieve", "", "" ) );
			// 	//new DataServer().getDataFromUrl( eval("API_HOST") + "cmd.php?action=list_requests", ......
			// }

			// if( Wheel.hasPurchase ){
			// 	SpinWheelVo.showPurchasedWheelList();
			// }

			// check secret bank purchase
			// let isSecretPurchase = Boolean(PlayerConfig.player("is_secret_purchase"));
			// let purchasePandings = PlayerConfig.player("purchase_pending");
			// if (isSecretPurchase && purchasePandings.length > 0) {
			// 	SecretBankVo.initPurchasePendings(purchasePandings);
			// }

			// if (!FirstUserExperienceVo.isLocked("po_enter_lobby")) {
				this.waitingModals = this.waitingModals.concat( this.trigs.getTriggerPoByLimit( TriggerVo.ENTER_LOBBY ) );
			// }
			this.showFirstWaitingModal();
		}
	}

	/**
	 * show po
	 */
	private showPo(): void {
		if (this.blockPurchase) return;
		this.waitingModals = this.waitingModals.concat( this.trigs.getTriggerPoByLimit( TriggerVo.PO ) );
		this.showFirstWaitingModal();
	}

	/**
	 * exit bank trigger popups
	 */
	private exitBankTrigger(): void {
		if (this.blockPurchase) return;
		this.waitingModals = this.waitingModals.concat(this.trigs.getTriggerPoByLimit(TriggerVo.EXIT_BANK));
		this.showFirstWaitingModal();
	}

	/**
	 * show first waiting modal
	 */
	private showFirstWaitingModal() {
		if (!this.currentPo) {
			if ( this.waitingModals.length > 0 ) {
				if (this.waitingModals[0] instanceof PoVo) {
					let po: PoVo = this.waitingModals.shift() as PoVo;
					this.showModal( po.className, po.configUrl, po.classUrl );
				} else if (this.waitingModals[0] instanceof GenericModal ) {
					this.showInstance(this.waitingModals.shift() as GenericModal);
				}
			}
		}
	}

	public showModal( myClass: any, assetConfigUrl: string = null, classUrl: string = null ){
		this.stage.addChild(this.poContainer);
		this.poContainer.visible = this.modalPreloader.visible = true;

		if( myClass instanceof Function ){
			this.showPoWithClass( myClass, assetConfigUrl );
		}
		else if( typeof(myClass) == "string" && classUrl != null ){
			this.loadDynamicClass( myClass, assetConfigUrl, classUrl );
		}
		else throw new Error( "none such class:" + myClass );
	}

	public static insertInstance(instance: GenericModal): void {
		if( Trigger.instance.currentPo ){
			Trigger.instance.waitingModals.unshift( instance );
			Trigger.instance.closeCurrentPo();
		}
		else Trigger.instance.showInstance(instance);
	}

	private showInstance(instance: GenericModal): void {
		this.currentPo = instance;
		this.stage.addChild(this.poContainer);
		this.poContainer.visible = this.modalPreloader.visible = true;
		if (this.currentPo.inited) this.addPo();
		else this.currentPo.addEventListener( GenericModal.GENERIC_MODAL_LOADED, this.addPo, this );
	}

	private addPo( event:egret.Event = null ){
		this.currentPo.x = this.size.x >> 1;
		this.currentPo.y = this.size.y >> 1;
		this.currentPo.scaleX = 0.1;
		this.currentPo.scaleY = 0.1;
		this.currentPo.alpha = 0.2;
		this.currentPo.touchEnabled = true;
		this.currentPo.once( GenericModal.CLOSE_MODAL, this.closeCurrentPo, this );
		this.currentPo.once( TriggerVo.EXIT_BANK, this.exitBankTrigger, this );
		this.currentPo.addEventListener( GenericModal.MODAL_COMMAND, this.onModalCommand, this );

		let scale = 1;
		if (this.currentPo.needZoomOut) {
			scale = Math.min(this.size.x / this.currentPo.width, this.size.y / this.currentPo.height, 1.5);
		}

		this.poShadow.once(egret.TouchEvent.TOUCH_TAP, this.quickClose, this);
		this.poContainer.addChild(this.currentPo);
		let tw: egret.Tween = egret.Tween.get(this.currentPo);
		tw.to({scaleX: scale * 1.125, scaleY : scale, alpha: 1}, 300);

		this.modalPreloader.visible = false;
	}

	public closeCurrentPo() {
		if (!this.currentPo) return;
		let tw: egret.Tween = egret.Tween.get( this.currentPo );
		tw.to( {scaleX: 0.4, scaleY : 0.4, alpha: 0.4}, 300 );
		tw.call(this.removePoFromContainer.bind(this));
		tw.wait(100);
		tw.call(this.showNextWaitingModal.bind(this));
	}

	private loadDynamicClass( className: string, assetConfigUrl: string, classUrl: string ){
		let cls: Function = egret.getDefinitionByName( className );
		if( cls ){
			this.showPoWithClassName( className, assetConfigUrl );
			return;
		}
        var s = document.createElement('script');
        s.async = false;
        s.src = classUrl;
		trace( "I am loading " + classUrl );
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
			s.removeEventListener('load', eval("arguments.callee"), false);
			egret.getDefinitionByName( className )["needZoomOut"] = egret.getDefinitionByName( className )["needZoomOut"] == null ? true : false;
            this.showPoWithClassName( className, assetConfigUrl );
		}.bind(this), false);
        document.head.appendChild(s);
	}

	private showPoWithClassName( className: string, assetConfigUrl: string ){
		let cls: Function = egret.getDefinitionByName( className );
		this.showPoWithClass( cls, assetConfigUrl );
	}

	private showPoWithClass(myClass: Function, assetConfigUrl: string) {
		this.currentPo = eval("new myClass(assetConfigUrl)");
		this.currentPo.needZoomOut = eval( "myClass" )["needZoomOut"];
		if( this.currentPo.inited )this.addPo();
		else this.currentPo.addEventListener( GenericModal.GENERIC_MODAL_LOADED, this.addPo, this );
	}

	private onModalCommand( event: egret.Event ){
		switch( event["cmd"] ){
			case "buyProduct":
				let poData: Object = GlobelSettings[egret.getQualifiedClassName(event.target)];
				new Payment().buy( poData["hash"], this.buyPo.bind(this, event["productType"] || 0 ) );
				// Congratulations.buyingPoWheel = Congratulations.checkPoItemsWheel( poData["items"] );
				break;
			case "showBank":
				this.showBank();
				break;
			case "buyBankProduct":
				new Payment().buy(event["product_hash"], this.buyPo.bind(this, event["buy_type"]));
				// Congratulations.buyingPoWheel = null;
				break;
			case "collect_bonus":
				// if( this.currentPo )this.closeCurrentPo();
				this["spinBar"].colectDailyBonus();
				break;
		}
	}

	/**
	 * buy po
	 * @param buyType 0 - coins, 1 - dinero
	 */
	private buyPo(buyType: number, data: any): void {
		Trigger.insertInstance( new FacebookWait );
		if (data["status"] == 1) {
			if (GlobelSettings.isForCom) {
				eval("gtag('event', 'conversion', {'send_to': 'AW-922306755/JoztCJymjdEBEMOR5bcD','value': 1.0,'currency': 'USD','transaction_id': PaymentForcustom.currentPurchaseId})");
			}
			
			egret.setTimeout(function (buyType: number, data: any) {
				this.transationFinished(buyType, 0, data);
			}.bind(this, buyType, data), this, 3000);
		}
	}

	private transationFinished(buyType: number, doubleXp: number, transactionData: any) {
		let coins = Number(transactionData[buyType === 1 ? "add_chips" : "credit" ]);
		let chips = Number(transactionData["add_chips"]);
		// if (doubleXp > 0) Lobby.getInstance().updateDoubleXpDuration(doubleXp);

		// if (transactionData["puzzle_piece_ids"] && transactionData["puzzle_piece_ids"].length > 0) {
		// 	PuzzleVo.showPiecesPopup(transactionData["puzzle_piece_ids"]);
		// }

		Congratulations.type = buyType;
		Congratulations.coins = coins;
		Congratulations.chips = chips;
		Trigger.insertInstance( new Congratulations );
	}

	private removePoFromContainer(){
		this.poContainer.removeChild( this.currentPo );
		this.poContainer.visible = false;
	}

	private showNextWaitingModal(){
		this.currentPo = null;
		this.showFirstWaitingModal();
	}

	public showBank(type: number = 0) {
		if (isNaN(type)) type = 0;
		GlobelSettings.bankOpenType = type;

		this.waitingModals.unshift( GlobelSettings.bankPoVo );
		if( this.currentPo )this.closeCurrentPo();
		else this.showFirstWaitingModal();
	}

	public static flyingCoins( count: number, startPosition: egret.Point ){
		let flyCoins: FlyingCoins = new FlyingCoins();
		flyCoins.fly( count, startPosition, new egret.Point( 560, 70 ), new egret.Point( 1000, 500 ), 0.2, 0.4, 0.8 );
		this.instance.stage.addChild( flyCoins );
	}

	public static flyingDinero( count: number, startPosition: egret.Point ){
		let flyCoins: FlyingCoins = new FlyingCoins();
		flyCoins.flyDenero( count, startPosition, new egret.Point( 1600, 70 ), new egret.Point( 400, 300 ), 0.4, 0.3, 0.5 );
		this.instance.stage.addChild( flyCoins );
	}

	public static openGame(gameID: string){
		this.recordFavoriteIndex( gameID );
		localStorage.setItem( "gotoGame" + gameID, "true" );
		document.location.href = GameIconsMapping[gameID].gameURL;
	}

	private static recordFavoriteIndex( indexStr: string ){
		let favoriteThree: string = localStorage.getItem( "favorite" );
		let favArr: Array<string>;
		if( favoriteThree ){
			favArr = favoriteThree.split( "," );
			let inFavIndex: number = favArr.indexOf( indexStr );
			if( inFavIndex < 0 ){
				favArr.unshift( indexStr );
				if( favArr.length > 3 ) favArr.length = 3;
			}
			else{
				favArr.splice( inFavIndex, 1 );
				favArr.unshift( indexStr );
			}
		}
		else{
			favArr = [ indexStr ];
		}
		localStorage.setItem( "favorite", favArr.join( "," ) );
	}
}