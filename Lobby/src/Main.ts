class Main extends egret.DisplayObjectContainer {

    protected isMobile: boolean;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource();
        this.createGameScene();
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        await RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private async createGameScene() {
        await RES.loadGroup( "lobby", 0, new LoadingUI );
        let stageW = this.stage.stageWidth;
		let stageH = this.stage.stageHeight;
		let isMobile: boolean = stageW < stageH;
		try{
			isMobile = eval( "isMobile()" );
		}catch(e){}
		this.isMobile = isMobile;

		if( isMobile ){
			this.x = stageW;
			this.rotation = 90;
		}
        this.scaleX = 960/2250;
        this.scaleY = 540/1125;
		this.addChild( new Lobby );
    }
}