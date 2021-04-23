class SpinWheelVo {
    private static wheelList: Array<Object>;

    /**
     * push wheel data in list
     */
    public static pushWheelData(data: Object): void {
        if (!this.wheelList) this.wheelList = new Array<Object>(0);
        this.wheelList.push(data);
        Wheel.hasPurchase = true;
    }

    /**
     * show purchased wheel list
     */
    public static showPurchasedWheelList(): void {
        Wheel.hasPurchase = false;
        if (this.wheelList && this.wheelList.length > 0) {
            let wheelData = this.wheelList.shift();

            Wheel.modal = SpinWheel.SpinWheelModel["COINS"];
            Wheel.initPurchased(wheelData);

            if (Wheel.hasPurchase) {
                let wheelPopup = new SpinWheel();
                wheelPopup.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.showPurchasedWheelList.bind(this), this);
                Trigger.insertInstance(wheelPopup);
                return;
            }
        }
    }
}