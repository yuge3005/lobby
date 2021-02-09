class Trigger {
	public static isMobile: boolean;
	public stage: Main;
	public size: egret.Point = new egret.Point( 2250, 1125);
	public scale: egret.Point = new egret.Point( 960 / 2250, 540 / 1125);

	private currentPoName: string;
	private currentPo: GenericModal;

	private poContainer: egret.DisplayObjectContainer;
	private poShadow: egret.Shape;
	private modalPreloader: egret.Bitmap;

	private static _instance: Trigger;
	public static get instance(): Trigger{
		if( !this._instance ){
			this._instance = new Trigger;
			this.instance.init();
		}
		return this._instance;
	}

	private trigs: TriggerVo;

	private waitingModalsInstance: Array<GenericModal>;
	public constructor() {
		this.trigs = new TriggerVo();
		this.waitingModalsInstance = new Array<GenericModal>();
	}

	public init(): void {
		if (!this.poContainer) {
			// po container
			this.poContainer = new egret.DisplayObjectContainer();
			// shadow
			this.poShadow = new egret.Shape();
			GraphicTool.drawRect(this.poShadow, new egret.Rectangle( 0, 0, this.size.x, this.size.y ), 0, false, 0.5);
			this.poShadow.touchEnabled = true;
			Com.addObjectAt(this.poContainer, this.poShadow, 0, 0);
			// modal preloader
			this.modalPreloader = Com.addBitmapAt(this.poContainer, "modalGeneric_json.loader", this.size.x >> 1, this.size.y >> 1);
			this.modalPreloader.anchorOffsetX = this.modalPreloader.width >> 1;
			this.modalPreloader.anchorOffsetY = this.modalPreloader.height >> 1;
			egret.Tween.get(this.modalPreloader, {loop: true}).to({rotation: 359}, 1800);
		}
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
		this.currentPo.scaleX = 0.1;
		this.currentPo.scaleY = 0.1;
		this.currentPo.alpha = 0.2;
		this.currentPo.addEventListener( GenericModal.CLOSE_MODAL, this.closeCurrentPo, this );
		this.currentPo.addEventListener( GenericModal.MODAL_COMMAND, this.onModalCommand, this );

		let scale = 1;
		if (!this.currentPo["noScale"]) {
			scale = Math.min(this.size.x / this.currentPo.width, this.size.y / this.currentPo.height, 1.5);
		}

		// add touch event
		this.poShadow.once(egret.TouchEvent.TOUCH_TAP, this.quickClose, this);

		this.stage.addChild(this.currentPo);
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