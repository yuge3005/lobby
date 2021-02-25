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
var Loyalty_po = (function (_super) {
    __extends(Loyalty_po, _super);
    function Loyalty_po(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(Loyalty_po, "classAssetName", {
        get: function () {
            return "loyalty_po_01_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    Loyalty_po.prototype.init = function () {
        this.bgAssetName = "loyalty_po_01_json.bg_01";
        this.closeButtonAssetName = "loyalty_po_01_json.btn_close";
        _super.prototype.init.call(this);
        var yellowlight = Com.addBitmapAt(this, "loyalty_po_01_json.bg_light02", this.bg.width >> 1, this.bg.height >> 1);
        yellowlight.anchorOffsetX = yellowlight.width >> 1;
        yellowlight.anchorOffsetY = 330;
        this.closeButton.y += 22;
        this.addBitmapInMiddle("loyalty_po_" + GlobelSettings.language + "_json.title_" + GlobelSettings.language, -5);
        this.addBitmapInMiddle("loyalty_po_01_json.bg_02", 35);
        this.addBitmapInMiddle("loyalty_po_" + GlobelSettings.language + "_json.coins_" + GlobelSettings.language + "-1", 205);
        this.addBitmapInMiddle("loyalty_po_" + GlobelSettings.language + "_json.info_" + GlobelSettings.language, 355);
        var comfirmBtn = Com.addButtonAt(this, "loyalty_po_" + GlobelSettings.language + "_json.btn-" + GlobelSettings.language, 300, 400, this.buyProduct, 1, 0.9);
        comfirmBtn.x = this.bg.width >> 1;
        comfirmBtn.y = this.bg.height;
        var product = GlobelSettings[egret.getQualifiedClassName(this)];
        var pricetxt = Com.addTextAt(this, 230, 155, 285, 32, 32, false, true);
        pricetxt.textAlign = "center";
        pricetxt.textColor = 0xFFFF33;
        pricetxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 3, 3)];
        var coinstxt = Com.addTextAt(this, 250, 280, 245, 35, 35, false, true);
        coinstxt.textAlign = "center";
        coinstxt.text = "$" + product["price"];
        coinstxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 2, 2)];
        this.letRotate(yellowlight);
        this.addCoins();
        var currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        coinstxt.text = (currencyIsBrl ? "R$" : "$") + " " + Utils.formatCoinsNumber(product["price"] * (currencyIsBrl ? 4 : 1));
        var loyaltyLevel = LoyaltyVo.data["loyalty_level"];
        var loyaltLevel = loyaltyLevel;
        Com.addBitmapAt(this, "loyalty_po_01_json.0" + (loyaltLevel + 1), 470, 180);
        var loyaltytxt = Com.addTextAt(this, 400, 285, 287, 90, 40, false, true);
        loyaltytxt.textAlign = "center";
        loyaltytxt.textColor = 0xFFCC00;
        var coinString = GlobelSettings.language == "en" ? "coins" : (GlobelSettings.language == "es" ? "monedas" : "moedas");
        var loyaltyArr = LoyaltyVo.data["privileges"];
        var percent = loyaltyArr[loyaltyLevel]["purchase_bonus"] * 100;
        loyaltytxt.text = "+" + percent + "%\n" + coinString;
        loyaltytxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 3, 3)];
        pricetxt.text = Utils.formatCoinsNumber(Math.round(Number(product["items"][0].after_discount_coins) * (1 + Number(loyaltyArr[loyaltyLevel]["purchase_bonus"]))));
        var loyaltyPointTxt = Com.addTextAt(this, 150, 435, 445, 21, 21, false, true);
        loyaltyPointTxt.textAlign = "center";
        loyaltyPointTxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 2, 2)];
        loyaltyPointTxt.text = "+" + this.getLoyaltyPoints(product["loyalty_base_point"]) + (GlobelSettings.language == "en" ? " loyalty points" : (GlobelSettings.language == "es" ? " puntos de fidelidad" : " pontos de fidelidade"));
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    Loyalty_po.prototype.onRemove = function () {
        this.removeChildren();
        this.addChild(this.bg);
        this.addChild(this.closeButton);
    };
    Loyalty_po.prototype.addCoins = function () {
        this.coinsContainer = new egret.DisplayObjectContainer;
        this.coinsContainer.scaleX = this.coinsContainer.scaleY = 0.4;
        Com.addObjectAt(this, this.coinsContainer, -80, 30);
        this.addCoinAt("coin01-1", 289, 286);
        this.addCoinAt("coin02-1", 603, 348);
        this.addCoinAt("coin03-1", 430, 542);
        this.addCoinAt("coin04-1", 608, 684);
        this.addCoinAt("coin05-1", 173, 695);
        this.addCoinAt("coin06-1", 516, 1036);
        this.addCoinAt("coin07-1", 1730, 227);
        this.addCoinAt("coin08-1", 1862, 519);
        this.addCoinAt("coin09-1", 2007, 254);
        this.addCoinAt("coin10", 2123, 571);
        this.addCoinAt("coin11", 1680, 749);
        this.addCoinAt("coin12", 1883, 867);
    };
    Loyalty_po.prototype.addCoinAt = function (name, x, y) {
        var coinLight = Com.addBitmapAt(this.coinsContainer, name, x, y);
        coinLight.anchorOffsetX = coinLight.width >> 1;
        coinLight.anchorOffsetY = coinLight.height >> 1;
        coinLight.alpha = 0;
        coinLight.scaleX = coinLight.scaleY = 2.5;
        var coin = Com.addBitmapAt(this.coinsContainer, name, x, y);
        coin.anchorOffsetX = coin.width >> 1;
        coin.anchorOffsetY = coin.height >> 1;
        coin.scaleX = coin.scaleY = 2.5;
        this.letBlink(coinLight);
    };
    Loyalty_po.prototype.letBlink = function (coinLight) {
        var tw = egret.Tween.get(coinLight);
        tw.wait(2000 + Math.random() * 3000);
        tw.to({ alpha: 1 }, 600);
        tw.to({ alpha: 0 }, 800);
        tw.call(this.continueBlink.bind(this, coinLight));
    };
    Loyalty_po.prototype.continueBlink = function (coinLight) {
        if (!this.stage)
            return;
        this.letBlink(coinLight);
    };
    Loyalty_po.prototype.letRotate = function (yellowlight) {
        yellowlight.rotation = 0;
        var tw = egret.Tween.get(yellowlight);
        tw.to({ rotation: 1080 }, 7200);
        tw.call(this.continueRotate.bind(this, yellowlight));
    };
    Loyalty_po.prototype.continueRotate = function (yellowlight) {
        if (!this.stage)
            return;
        this.letRotate(yellowlight);
    };
    Loyalty_po.prototype.addBitmapInMiddle = function (name, posY) {
        var bit = Com.addBitmapAt(this, name, 0, 0);
        bit.x = this.bg.width - bit.width >> 1;
        bit.y = posY;
        return bit;
    };
    Loyalty_po.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    return Loyalty_po;
}(TimerPo));
__reflect(Loyalty_po.prototype, "Loyalty_po");
//# sourceMappingURL=load.js.map