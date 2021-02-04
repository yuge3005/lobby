class Trigger {
	public stage: Main;

	private static _instance: Trigger;
	public static get instance(): Trigger{
		if( !this._instance ) this._instance = new Trigger;
		return this._instance;
	}

	public constructor() {
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