class AdArea extends egret.DisplayObjectContainer {
    // public static ITEM_START: string = "ITEM_START";
    // public static ITEM_END: string = "ITEM_END";

    public static adSize: egret.Point;

    private adLayer: AdLayer;

    private currentItemIndex: number = 0;
    private featuresContainer: egret.DisplayObjectContainer;
    private features: Array<FeatureItem>;

    private autoScrollTimer: egret.Timer;
    private featuresData: Array<Object>;

    constructor() {
        super();

        Com.addBitmapAt(this, "lobby_json.ad_frame", 0, 0);

        AdArea.adSize = new egret.Point(321, 614);

        this.adLayer = new AdLayer;
        Com.addObjectAt( this, this.adLayer, 0, 0 );
        this.adLayer.addEventListener( DragItem.START_DRAG, this.onAdStartDrag, this );
        this.adLayer.addEventListener( DragItem.STOP_DRAG, this.onAdStopDrag, this );

        let maskSp: egret.Shape = new egret.Shape;
		this.addChild( maskSp );
        GraphicTool.drawRect( maskSp, new egret.Rectangle( 3, 3, 315, 601 ), 0, false, 1, 30 );
        this.adLayer.mask = maskSp;

        let levelLocked = Number(PlayerConfig.player("score.level")) < 2;
        if (levelLocked) {
            this.adLayer.setContent( Com.addBitmapAt(this, "welcome_" + MuLang.language + "_png", 0, 0) );
		}
        else{
            if (FeatureVo.haveAds) this.loadFeatureData(FeatureVo.ads);
            else this.adLayer.setContent( Com.addBitmapAt(this, "lobby_json.ad_bg", 0, 0) );
        }
    }

    private onAdStartDrag( event: egret.Event ){
        this.stopTimer();
    }

    private onAdStopDrag( event: egret.Event ){
        this.startTimer();
    }

    /**
     * load feature data
     */
    public loadFeatureData(data: Array<Object>): void {
        this.featuresData = data;

        this.featuresContainer = new egret.DisplayObjectContainer;
        this.features = new Array<FeatureItem>(data.length);
        for (let i = 0; i < data.length; i++) {
            this.features[i] = new FeatureItem(i, data[i]);
            // this.features[i].addEventListener(AdArea.ITEM_START, this.itemStart, this);
            // this.features[i].addEventListener(AdArea.ITEM_END, this.itemEnd, this);
            // if (this.features[i].status === 1) {
            Com.addObjectAt(this.featuresContainer, this.features[i], this.featuresContainer.numChildren * AdArea.adSize.x, 0);
            // }
        }

        if( this.featuresContainer.numChildren > 0 )this.adLayer.setContent( this.featuresContainer );
        else this.adLayer.setContent( Com.addBitmapAt(this, "lobby_json.ad_bg", 0, 0) );

        this.startTimer();
    }

    // /**
    //  * item start
    //  */
    // private itemStart(index: number): void {
    //     if (this.autoScrollTimer) {
	// 		this.autoScrollTimer.stop();

	// 		egret.Tween.removeTweens(this.adLayer);
	// 		egret.Tween.get(this.adLayer).to({ x: -this.currentItemIndex * AdArea.adSize.x }, 500, egret.Ease.circOut);
	// 	}
	// 	Com.addObjectAt(this.adLayer, this.features[index], this.adLayer.numChildren * AdArea.adSize.x, 0);

	// 	this.startTimer();
    // }

    // /**
    //  * item end
    //  */
    // private itemEnd(index: number):void {
    //     if (!this.features[index].parent) return;
	// 	let pos = this.adLayer.getChildIndex(this.features[index]);
	// 	if (pos < 0) return;

	// 	if (this.autoScrollTimer) {
	// 		this.autoScrollTimer.stop();

	// 		egret.Tween.removeTweens(this.adLayer);
	// 		egret.Tween.get(this.adLayer).to({ x: 0 }, 500, egret.Ease.circOut);
	// 		this.currentItemIndex = 0;
	// 	}

	// 	this.adLayer.removeChildAt(pos);
	// 	for (let i = pos; i < this.adLayer.numChildren; i++) {
	// 		let newX = this.adLayer.getChildAt(i).x - AdArea.adSize.x;
	// 		egret.Tween.get(this.adLayer.getChildAt(i)).to({ x: newX }, 500);
	// 	}

	// 	this.startTimer();
    // }

    /**
     * start timer
     */
    private startTimer(): void {
        if (this.featuresContainer.numChildren > 1) {
            this.autoScrollTimer = new egret.Timer( 8000 );
            this.autoScrollTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this.autoScrollTimer.start();
		}
    }

    private stopTimer(): void {
        if( this.autoScrollTimer ){
            this.autoScrollTimer.reset();
            this.autoScrollTimer.stop();
            this.autoScrollTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.autoScrollTimer = null;
        }
    }

    /**
     * on timer
     */
    private onTimer( event: egret.TimerEvent ): void {
        let newIndex: number = this.currentItemIndex + 1;
		newIndex = newIndex >= this.featuresContainer.numChildren ? 0 : newIndex;
		this.currentItemIndex = newIndex;
        
        // egret.Tween.get(this.featuresContainer).to({x: -this.currentItemIndex * AdArea.adSize.x}, 400, egret.Ease.circOut);
        TweenerTool.tweenTo( this.featuresContainer, { x: -this.currentItemIndex * AdArea.adSize.x }, 400, 0, null, null, egret.Ease.backOut );
    }
}