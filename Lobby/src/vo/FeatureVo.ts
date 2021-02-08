
class FeatureVo {
    private static _haveAds: boolean = false;
    private static adsArray: Array<Object>;

    public static pushAds(ads: Object): void {
        if (!this.adsArray) this.adsArray = new Array<Object>();

        this._haveAds = true;
        this.adsArray.push(ads);
    }

    /**
     * get ads
     */
    public static get ads(): Array<Object> {
        return this.adsArray;
    }

    /**
     * check have ads in lobby
     */
    public static get haveAds(): boolean {
        return this._haveAds;
    }
}