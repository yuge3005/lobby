class Trigger {
	public static isMobile: boolean;
	public stage: Main;

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
}