class Trigger {
	public static isMobile: boolean;
	public stage: Main;
	public size: egret.Point = new egret.Point( 2250, 1125);
	public scale: egret.Point = new egret.Point( 960 / 2250, 540 / 1125);

	private currentPoName: string;
	private currentPo: GenericModal;

	private static _instance: Trigger;
	public static get instance(): Trigger{
		if( !this._instance ) this._instance = new Trigger;
		return this._instance;
	}

	private trigs: TriggerVo;

	public constructor() {
		this.trigs = new TriggerVo();
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
	
	}

	private addPo( event:egret.Event = null ){
		this.currentPo.x = this.size.x >> 1;
		this.currentPo.y = this.size.y >> 1;
		this.currentPo.scaleX = 0.4;
		this.currentPo.scaleY = 0.4;
		this.currentPo.alpha = 0.4;
		this.currentPo.touchEnabled = true;
		this.currentPo.addEventListener( GenericModal.CLOSE_MODAL, this.closeCurrentPo, this );
		this.currentPo.addEventListener( GenericModal.MODAL_COMMAND, this.onModalCommand, this );

		let scale = 1;
		if (!this.currentPo.noScale) {
			scale = Math.min(this.size.x / this.currentPo.width, this.size.y / this.currentPo.height, 1.5);
		}

		// add touch event
		this.poShadow.once(egret.TouchEvent.TOUCH_TAP, this.quickClose, this);

		this.poContainer.addChild(this.currentPo);
		let tw: egret.Tween = egret.Tween.get(this.currentPo);
		tw.to({scaleX: scale, scaleY : scale, alpha: 1}, 300);

		this.modalPreloader.visible = false;
	}

	public closeCurrentPo() {
		if (!this.currentPo) return;
		let tw: egret.Tween = egret.Tween.get( this.currentPo );
		tw.to( {scaleX: 0.4, scaleY : 0.4, alpha: 0.4}, 300 );
		tw.call(function() {
			this.poContainer.removeChild( this.currentPo );
			this.poContainer.visible = false;
		}, this);
		tw.wait(100);
		tw.call(function() {
			this.currentPo = null;
			this.showFirstWaitingModal();
		}, this);
	}

	public showBank(type: number = 0) {
		if (isNaN(type)) type = 0;
		// Trigger.showBankTagIndex = type;

		// this.waitingModals.unshift( GlobelSettings.bankPoVo );
		// if( this.currentPo )this.closeCurrentPo();
		// else this.showFirstWaitingModal();
	}
}