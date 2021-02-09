class Main extends egret.DisplayObjectContainer {
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
            if( Trigger.isMobile ) egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            if( Trigger.isMobile ) egret.ticker.resume();
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
        this.combineConfig();
        await RES.loadGroup( "lobby", 0, new LoadingUI );

        let stageW = this.stage.stageWidth;
		let stageH = this.stage.stageHeight;
		let isMobile: boolean = stageW < stageH;
		try{
			isMobile = eval( "isMobile()" );
		}catch(e){}
		Trigger.isMobile = isMobile;

		if( isMobile ){
			this.x = stageW;
			this.rotation = 90;
		}
        this.scaleX = 960/2250;
        this.scaleY = 540/1125;

        Trigger.instance.stage = this;
        PlayerConfig.init();
        UserVo.init();
        
        try{eval("removeLoadingProgress()");}
        catch(e){};
        
        MuLang.txt = RES.getRes( "lobby_tx" );
		this.addChild( new Lobby );
    }

    private combineConfig(){
        try{
			let group: Object = RES["config"].config.groups;
			group["lobby"] = ( group["lobby"] as Array<string> ).concat( group["lobby_" + MuLang.language] );
		}
		catch( e ){
			egret.error(e);
		}
    }
}