class Trigger {
	public static isMobile: boolean;
	public stage: Main;

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