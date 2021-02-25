var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var JackpotOnFire = (function (_super) {
    __extends(JackpotOnFire, _super);
    function JackpotOnFire(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(JackpotOnFire, "classAssetName", {
        get: function () {
            return "jackpotOnFire_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    JackpotOnFire.prototype.init = function () {
        this.bgAssetName = "jackpotOnFire_asset_json.bg";
        this.closeButtonAssetName = "jackpotOnFire_asset_json.btn_close";
        _super.prototype.init.call(this);
        var lightData = RES.getRes("jack_mc_json");
        var lightTex = RES.getRes("jack_mc_png");
        this.mcf = new egret.MovieClipDataFactory(lightData, lightTex);
        var mc = Com.addMovieClipAt(this, this.mcf, "winterFire", 150, -20);
        Com.addBitmapAt(this, "jacklan_" + GlobelSettings.language + "_json.title_" + GlobelSettings.language, 190, 60);
        Com.addBitmapAt(this, "jackpotOnFire_asset_json.txt_frame-1", 445, 110);
        Com.addBitmapAt(this, "jacklan_" + GlobelSettings.language + "_json.coins_txt_" + GlobelSettings.language, 505, 235);
        this.closeButton.x -= 240;
        this.closeButton.y += 30;
        Com.addBitmapAt(this, "jackpotOnFire_asset_json.wheel_bg", 170, 270);
        Com.addBitmapAt(this, "jacklan_" + GlobelSettings.language + "_json.txt_" + GlobelSettings.language, 370, 330);
        this.wheel_center = Com.addBitmapAt(this, "jackpotOnFire_asset_json.wheel_center", 0, 0);
        this.wheel_center.anchorOffsetX = 74;
        this.wheel_center.anchorOffsetY = 74;
        var wheelCenterContainer = new egret.DisplayObjectContainer;
        wheelCenterContainer.addChild(this.wheel_center);
        wheelCenterContainer.scaleX = 0.85;
        wheelCenterContainer.scaleY = 1;
        wheelCenterContainer.rotation = 11;
        Com.addObjectAt(this, wheelCenterContainer, 729, 409);
        this.runWheel();
        var wheelFrame = Com.addBitmapAt(this, "jackpotOnFire_asset_json.wheel_frame", 729, 409);
        wheelFrame.anchorOffsetX = 104.5;
        wheelFrame.anchorOffsetY = 104;
        wheelFrame.scaleX = 0.832;
        wheelFrame.scaleY = 0.977;
        wheelFrame.rotation = 20;
        var product = GlobelSettings[egret.getQualifiedClassName(this)];
        var pricetxt = Com.addTextAt(this, 315, 205, 500, 25, 25, false, true);
        pricetxt.textAlign = "center";
        pricetxt.textColor = 0xF0BE06;
        pricetxt.text = Utils.formatCoinsNumber(Number(product["items"][0].after_discount_coins));
        pricetxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
        var coinstxt = Com.addTextAt(this, 375, 270, 380, 30, 30, false, true);
        coinstxt.textAlign = "center";
        var currencyIsBrl = GlobelSettings.currucyIsBRL;
        coinstxt.text = (currencyIsBrl ? "R$" : "$") + " " + Utils.formatCoinsNumber(product["price"] * (currencyIsBrl ? 4 : 1));
        coinstxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
        var parData = RES.getRes("newParticle_json");
        var parTex = RES.getRes("newParticle_png");
        this.system = new particle.GravityParticleSystem(parTex, parData);
        this.system.start();
        this.addChild(this.system);
        var comfirmBtn = Com.addButtonAt(this, "jacklan_" + GlobelSettings.language + "_json.btn_bg_" + GlobelSettings.language, 510, 520, this.buyProduct, 1, 0.9);
    };
    JackpotOnFire.prototype.runWheel = function () {
        if (!this.stage)
            return;
        this.wheel_center.rotation = 0;
        var tw = egret.Tween.get(this.wheel_center);
        tw.to({ rotation: 36000 }, 18000);
        tw.call(this.runWheel.bind(this));
    };
    JackpotOnFire.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    return JackpotOnFire;
}(GenericPo));
__reflect(JackpotOnFire.prototype, "JackpotOnFire");
//# sourceMappingURL=load.js.map