
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
        if (this.wheelList && this.wheelList.length > 0) {
            this.wheelList.map((wheel, index) => {
                if (wheel["type"] === "wheel_purchased") {
                    let wheelData = this.wheelList.splice(index, 1)[0];

                    Wheel.modal = SpinWheel.SpinWheelModel["COINS"];
			        Wheel.initPurchased(wheelData);

                    if (Wheel.hasPurchase) {
                        // wheel popup
                        let wheelPopup = new SpinWheel();
                        wheelPopup.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.showPurchasedWheelList.bind(this), this);
                        Trigger.insertInstance(wheelPopup);
                        return;
                    }
                }
            });
        } else Wheel.hasPurchase = false;
    }
}