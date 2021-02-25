class Main extends egret.DisplayObjectContainer {

    private currentPo: GenericModal;

    public constructor() {
        super();

		this.scaleX = this.scaleY = 0.5;

		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

	private onAddToStage(event: egret.Event) {
        this.loadDynamicClass( "po_brazil", "po_brazil/data.res.json", "po_brazil/load.js" );
		this.stage.scaleMode = egret.StageScaleMode.NO_SCALE;
	}

    private loadDynamicClass( className: string, assetConfigUrl: string, classUrl: string ){
		let cls: Function = egret.getDefinitionByName( className );
		if( cls ){
			console.log( "build from class" );
			this.showPoWithClassName( className, assetConfigUrl );
			return;
		}
		console.log( "load class js" );
        var s = document.createElement('script');
        s.async = false;
        s.src = classUrl;
        s.addEventListener('load', function () {
            s.parentNode.removeChild(s);
			s.removeEventListener('load', eval("arguments.callee"), false);
			console.log( "build from className" );
            this.showPoWithClassName( className, assetConfigUrl );
		}.bind(this), false);
        document.head.appendChild(s);
	}

    private showPoWithClassName( className: string, assetConfigUrl: string ){
		let cls: Function = egret.getDefinitionByName( className );
		this.showPoWithClass( cls, assetConfigUrl );
	}

    private showPoWithClass( myClass: Function, assetConfigUrl: string ){
		this.currentPo = eval("new myClass(assetConfigUrl)");
		if( this.currentPo.inited )this.addPo();
		else this.currentPo.addEventListener( GenericModal.GENERIC_MODAL_LOADED, this.addPo, this );
	}

    private addPo( event:egret.Event = null ){
		this.currentPo.x = this.stage.stageWidth * 2 >> 1;
		this.currentPo.y = ( this.stage.stageHeight * 2 >> 1 ) + 100;
		this.currentPo.scaleX = 0.4;
		this.currentPo.scaleY = 0.4;
		this.currentPo.addEventListener( "closeModal", this.closeCurrentPo, this  );

		this.addChild( this.currentPo );
		let tw: egret.Tween = egret.Tween.get( this.currentPo );
		tw.to( {"scaleX": 1, "scaleY" : 1}, 300 );
	}

	public closeCurrentPo( event: egret.Event ){
		let tw: egret.Tween = egret.Tween.get( this.currentPo );
		tw.to( {"scaleX": 0.4, "scaleY" : 0.4}, 300 );
		tw.call(function() {
			this.removeChild( this.currentPo );
		}, this);
	}
}

class mouse{
	public constructor() {
	}
	
	public static setButtonMode( a: any, b: boolean = false ){

	}
}