class FeatureItem extends egret.DisplayObjectContainer {
    private bg: egret.Bitmap;
    public poPath: string;
	public status: number;
	private startTime: Date;
	private endTime: Date;
	private overplus: egret.Timer;
    private overplusTip: egret.DisplayObjectContainer;
    private overplusText: egret.TextField;

    private startSeconds: number;
    private endSeconds: number;

    constructor(index: number, data: Object) {
        super();

        this.name = "" + index;
		this.poPath = data["poPath"];

        this.bg = Com.addBitmapAt(this, "lobby_json.ad_bg", 0, 0);

		// download picture
		FacebookBitmap.downloadBitmapDataByURL(this.poPath, this.showAd, this);

		// let params = data["data"], startIn = params["start_in"], endIn = params["end_in"];
		// if (startIn && endIn) {
		// 	this.startTime = Utils.transformUTCStringToDate(startIn);
		// 	this.endTime = Utils.transformUTCStringToDate(endIn);
		// 	let now = new Date();

		// 	if (this.startTime > now) {
		// 		this.status = 0;
                
        //         this.startSeconds = Math.ceil((this.startTime.valueOf() - now.valueOf()) / 1000);
        //         this.addStartTimer();
		// 	} else if (this.endTime < now) {
		// 		this.status = 2;
		// 	} else {
		// 		this.status = 1;

        //         this.endSeconds = Math.floor((this.endTime.valueOf() - now.valueOf()) / 1000);
		// 		this.addEndTimer();
		// 	}
		// } else this.status = 1;
    }

    /**
	 * show ad bitmap
	 */
	private showAd(event: egret.Event) {
		let loader: egret.ImageLoader = event.currentTarget;
        if (loader.data) {
            let texture = new egret.Texture();
            texture._setBitmapData(loader.data);
            let img = new egret.Bitmap(texture);
            Com.addObjectAt(this, img, 0, 0);
            
            this.bg.texture = texture;
        }
	}

    // /**
    //  * add start timer
    //  */
    // private addStartTimer(): void {
    //     // overplus tip
    //     this.overplusTip = new egret.DisplayObjectContainer();
    //     Com.addObjectAt(this, this.overplusTip, -5, -60);
    //     // tip bg
    //     Com.addBitmapAt(this.overplusTip, "lobby_json.starts_in", 0, 0);
    //     // tip text
    //     this.overplusText = Com.addTextAt(this.overplusTip, 38, 15, 253, 34, 32, false, false);
    //     this.overplusText.fontFamily = "Righteous";
    //     this.overplusText.verticalAlign = "middle";
    //     this.overplusText.text = MuLang.getText( "start_in" ) + " " + Utils.secondToDay(this.startSeconds);

    //     let now = new Date();
    //     this.startTimer(this.startSeconds, function() {
    //         this.startSeconds--;
    //         this.overplusText.text = MuLang.getText( "start_in" ) + " " + Utils.secondToDay(this.startSeconds);
    //     }, function () {
    //         this.overplus = null;
    //         this.addEndTimer();
    //         this.dispatchEvent(new egret.Event(AdArea.ITEM_START));
    //     }.bind(this));
    // }

	// /**
	//  * add ent timer
	//  */
	// private addEndTimer(): void {
    //     this.status = 1;

    //     // overplus tip
    //     if (!this.overplusTip) {
    //         this.overplusTip = new egret.DisplayObjectContainer();
    //     }
    //     Com.addObjectAt(this, this.overplusTip, -5, this.height - 30);
    //     this.overplusTip.removeChildren();
    //     // tip bg
    //     Com.addBitmapAt(this.overplusTip, "lobby_json.ends_in", 0, 0);
    //     // tip text
    //     this.overplusText = Com.addTextAt(this.overplusTip, 38, 39, 253, 34, 32, false, false);
    //     this.overplusText.fontFamily = "Righteous";
    //     this.overplusText.verticalAlign = "middle";
    //     this.overplusText.text = MuLang.getText( "end_in" ) + " " + Utils.secondToDay(this.endSeconds);

	// 	let now = new Date();
	// 	this.startTimer(this.endSeconds, function() {
    //         this.endSeconds--;
    //         this.overplusText.text = MuLang.getText( "end_in" ) + " " + Utils.secondToDay(this.endSeconds);
    //     }, function () {
    //         this.status = 2;

	// 		if (this.overplus) {
    //             this.overplus.stop();
    //             this.overplus = null;
    //         }
	// 		this.dispatchEvent(new egret.Event(AdArea.ITEM_END));
	// 	}.bind(this));
	// }

	// /**
	//  * start timer
	//  */
	// private startTimer(count: number, onTimer: Function, timerComplete: Function): void {
	// 	if (this.overplus) {
	// 		this.overplus.stop();
	// 		this.overplus = null;
	// 	}

	// 	this.overplus = new egret.Timer(1000, count);
    //     this.overplus.addEventListener(egret.TimerEvent.TIMER, onTimer, this);
	// 	this.overplus.addEventListener(egret.TimerEvent.TIMER_COMPLETE, timerComplete, this);
	// 	this.overplus.start();
	// }
}