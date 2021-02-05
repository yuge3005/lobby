class AdArea extends egret.DisplayObjectContainer {
    public static ITEM_START: string = "ITEM_START";
    public static ITEM_END: string = "ITEM_END";

    public static adSize: egret.Point;

    private adLayer: AdLayer;

    private currentItemIndex: number = 0;
    private defaultBg: egret.Bitmap;
    private autoScrollTimer: egret.Timer;
    private featuresContainer: egret.DisplayObjectContainer;
    private features: Array<FeatureItem>;
    private featuresData: Array<Object>;

    private touchDownTimestamp: number;
    private touchDowmPos: egret.Point;

    constructor() {
        super();

        Com.addBitmapAt(this, "lobby_json.ad_frame", 0, 0);

        AdArea.adSize = new egret.Point(321, 614);

        this.adLayer = new AdLayer;
        // this.adLayer.touchEnabled = true;
        // this.adLayer.touchChildren = false;
        // this.adLayer.visible = !locked;
        // this.adLayer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
        Com.addObjectAt( this, this.adLayer, 0, 0 );

        // this.defaultBg = Com.addBitmapAt(this, "lobby_json.ad_bg", 0, 0);

        let levelLocked = Number(PlayerConfig.player("score.level")) < 2;
        if (levelLocked) {
            this.adLayer.setContent( Com.addBitmapAt(this, "welcome_" + MuLang.language + "_png", 0, 0) );
		}
        else{
            
        }

        // if (FeatureVo.haveAds) this.loadFeatureData(FeatureVo.ads);
    }

    /**
     * load feature data
     */
    public loadFeatureData(data: Array<Object>): void {
        this.featuresData = data;

        this.features = new Array<FeatureItem>(data.length);
        for (let i = 0; i < data.length; i++) {
            this.features[i] = new FeatureItem(i, data[i]);
            this.features[i].addEventListener(AdArea.ITEM_START, this.itemStart, this);
            this.features[i].addEventListener(AdArea.ITEM_END, this.itemEnd, this);
            if (this.features[i].status === 1) {
                Com.addObjectAt(this.adLayer, this.features[i], this.adLayer.numChildren * AdArea.adSize.x, 0);
            }
        }

        this.checkHaveAds();
        this.startTimer();
    }

    /**
     * item start
     */
    private itemStart(index: number): void {
        if (this.autoScrollTimer) {
			this.autoScrollTimer.stop();

			egret.Tween.removeTweens(this.adLayer);
			egret.Tween.get(this.adLayer).to({ x: -this.currentItemIndex * AdArea.adSize.x }, 500, egret.Ease.circOut);
		}
		Com.addObjectAt(this.adLayer, this.features[index], this.adLayer.numChildren * AdArea.adSize.x, 0);

		this.defaultBg.visible = false;

		this.startTimer();
    }

    /**
     * item end
     */
    private itemEnd(index: number):void {
        if (!this.features[index].parent) return;
		let pos = this.adLayer.getChildIndex(this.features[index]);
		if (pos < 0) return;

		if (this.autoScrollTimer) {
			this.autoScrollTimer.stop();

			egret.Tween.removeTweens(this.adLayer);
			egret.Tween.get(this.adLayer).to({ x: 0 }, 500, egret.Ease.circOut);
			this.currentItemIndex = 0;
		}

		this.adLayer.removeChildAt(pos);
		for (let i = pos; i < this.adLayer.numChildren; i++) {
			let newX = this.adLayer.getChildAt(i).x - AdArea.adSize.x;
			egret.Tween.get(this.adLayer.getChildAt(i)).to({ x: newX }, 500);
		}

		this.checkHaveAds();
		this.startTimer();
    }

    /**
     * check have ads
     */
    private checkHaveAds(): void {
        this.defaultBg.visible = this.adLayer.numChildren <= 0;
        this.adLayer.visible = this.adLayer.numChildren > 0;
    }

    /**
     * on touch down
     */
    private onTouchDown( event: egret.TouchEvent ){
		this.stage.addEventListener( egret.TouchEvent.TOUCH_END, this.onTouchEnd, this );
		this.stage.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this );

		this.touchDownTimestamp = egret.getTimer();
		this.touchDowmPos = new egret.Point( event.stageX, event.stageY );

		if( this.autoScrollTimer ){
			this.autoScrollTimer.reset();
			this.autoScrollTimer.stop();
		}
	}

    /**
     * on touch move
     */
	private onTouchMove( event: egret.TouchEvent ){
		let movePoit: egret.Point = new egret.Point( event.stageX, event.stageY );
		let newX: number = - this.currentItemIndex * AdArea.adSize.x + movePoit.x - this.touchDowmPos.x;
		newX = newX >= 0 ? 0 : newX;
		newX = newX <= -(FeatureVo.ads.length-1) * AdArea.adSize.x ? -(FeatureVo.ads.length-1) * AdArea.adSize.x : newX;
		this.adLayer.x = newX >= 0 ? 0 : newX;
	}

    /**
     * on touch end
     */
	private onTouchEnd( event: egret.TouchEvent ){
		this.stage.removeEventListener( egret.TouchEvent.TOUCH_END, this.onTouchEnd, this );
		this.stage.removeEventListener( egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this );

		let movePoit: egret.Point = new egret.Point( event.stageX, event.stageY );
		if( egret.getTimer() - this.touchDownTimestamp < 200 && egret.Point.distance( this.touchDowmPos, movePoit ) < 50 ){
			this.onTouch();
		} else {
			this.endMove();
		}

		if( this.autoScrollTimer ){
			this.autoScrollTimer.start();
		}
	}

    /**
     * on touch
     */
	private onTouch(){
		this.adLayer.x = -this.currentItemIndex * AdArea.adSize.x;
        AdPopupTrigger.doWhateverYuoWant(GlobelSettings[(<FeatureItem>this.adLayer.getChildAt(this.currentItemIndex)).name]);
	}

    /**
     * end move
     */
	private endMove(){
		let newIndex: number = Math.round( -this.adLayer.x / AdArea.adSize.x );
		newIndex = newIndex <= 0 ? 0 : newIndex;
		newIndex = newIndex >= this.adLayer.numChildren ? this.adLayer.numChildren - 1 : newIndex;
		this.currentItemIndex = newIndex;
		egret.Tween.get(this.adLayer).to({x: -this.currentItemIndex * AdArea.adSize.x}, 500, egret.Ease.circOut);
	}

    /**
     * start timer
     */
    private startTimer(): void {
        if (this.adLayer.numChildren > 1) {
			if (!this.autoScrollTimer) {
				this.autoScrollTimer = new egret.Timer( 8000 );
				this.autoScrollTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			}
			this.autoScrollTimer.start();
		}
    }

    /**
     * on timer
     */
    private onTimer(): void {
        let newIndex: number = this.currentItemIndex + 1;
		newIndex = newIndex >= this.adLayer.numChildren ? 0 : newIndex;
		this.currentItemIndex = newIndex;
        
        egret.Tween.get(this.adLayer).to({x: -this.currentItemIndex * AdArea.adSize.x}, 500, egret.Ease.circOut);
    }

    /**
     * remove ads lock
     */
    public removeAdLock() {
        this.welcomeAds && (this.welcomeAds.visible = false);
        this.adLayer && (this.adLayer.visible = true);
        if (!this.adLayer) this.defaultBg.visible = true;
	}
}