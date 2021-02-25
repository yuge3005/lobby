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
var Pachinko2Online = (function (_super) {
    __extends(Pachinko2Online, _super);
    function Pachinko2Online(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(Pachinko2Online, "classAssetName", {
        get: function () {
            return "pachinko2Online_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    Pachinko2Online.prototype.init = function () {
        this.bgAssetName = "pachinko2Online_json.bg";
        this.closeButtonAssetName = "pachinko2Online_json.btn_close";
        _super.prototype.init.call(this);
        var mcData = RES.getRes("pachinko2OnlineAnimation_json");
        var mcTexture = RES.getRes("pachinko2OnlineAnimation_png");
        this.mcf = new egret.MovieClipDataFactory(mcData, mcTexture);
        Com.addBitmapAt(this, "pachinko2Online_json.title", 300, -30);
        this.closeButton.x -= 160;
        this.closeButton.y += 20;
        Com.addMovieClipAt(this, this.mcf, "cat", 324, 44);
        Com.addBitmapAt(this, "pachinko2Online_json.bg_cover", 270, 302);
        Com.addBitmapAt(this, "pachinko2Online_json.number_bg", 40, 120);
        var yellowlight = Com.addBitmapAt(this, "pachinko2Online_json.bg_light", 713, 200);
        yellowlight.anchorOffsetX = yellowlight.width >> 1;
        yellowlight.anchorOffsetY = 91;
        Com.addBitmapAt(this, "pachinko2Online_json.wheel11", 630, 100);
        var wheel = Com.addBitmapAt(this, "pachinko2Online_json.wheel_center", 0, 0);
        wheel.anchorOffsetX = wheel.width >> 1;
        wheel.anchorOffsetY = 74;
        wheel.scaleX = 0.85;
        wheel.scaleY = 0.85;
        wheel.alpha = 0.9;
        var wheelContainer = new egret.DisplayObjectContainer;
        Com.addObjectAt(wheelContainer, wheel, 0, 0);
        wheelContainer.matrix = new egret.Matrix(1, 0.1, -0.275, 1);
        Com.addObjectAt(this, wheelContainer, 708, 190);
        Com.addBitmapAt(this, "pachinko2Online_json.Bitmap11", 599, 82).scaleX = 1.05;
        Com.addBitmapAt(this, "pachinko2Online_json.plus", 625, 150);
        this.letRotate(yellowlight, 7200);
        this.letRotate(wheel, 1700);
        Com.addBitmapAt(this, "pachinko2Online_lan_" + GlobelSettings.language + "_json.coins_" + GlobelSettings.language, 105, 200);
        Com.addBitmapAt(this, "pachinko2Online_lan_" + GlobelSettings.language + "_json.info_" + GlobelSettings.language, 277, 310);
        Com.addBitmapAt(this, "pachinko2Online_lan_" + GlobelSettings.language + "_json.free_" + GlobelSettings.language, 627, 230);
        var light = Com.addMovieClipAt(this, this.mcf, "pachinko2Light", 33, 108);
        var comfirmBtn = Com.addButtonAt(this, "pachinko2Online_lan_" + GlobelSettings.language + "_json.btn_buy_" + GlobelSettings.language, 453, 440, this.buyProduct, 1, 0.9);
        var product = GlobelSettings[egret.getQualifiedClassName(this)];
        var pricetxt = Com.addTextAt(this, 40, 147, 280, 27, 27, false, true);
        pricetxt.textAlign = "center";
        pricetxt.textColor = 0xFFFF00;
        pricetxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 1, 1, 2, 2)];
        var coinstxt = Com.addTextAt(this, 50, 245, 260, 30, 30, false, true);
        coinstxt.textAlign = "center";
        coinstxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 2, 2)];
        var currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        coinstxt.text = (currencyIsBrl ? "R$" : "$") + " " + Utils.formatCoinsNumber(product["price"] * (currencyIsBrl ? 4 : 1));
        var loyaltyLevel = LoyaltyVo.data["loyalty_level"];
        var loyaltLevel = loyaltyLevel;
        var loyaltyIcon = Com.addBitmapAt(this, "pachinko2Online_json.0" + (loyaltLevel + 1), 630, 275);
        loyaltyIcon.scaleY = loyaltyIcon.scaleX = 0.85;
        var loyaltytxt = Com.addTextAt(this, 550, 360, 287, 90, 32, false, true);
        loyaltytxt.textAlign = "center";
        loyaltytxt.textColor = 0xFFCC00;
        var coinString = GlobelSettings.language == "en" ? "coins" : (GlobelSettings.language == "es" ? "monedas" : "moedas");
        var loyaltyArr = LoyaltyVo.data["privileges"];
        var percent = loyaltyArr[loyaltyLevel]["purchase_bonus"] * 100;
        loyaltytxt.text = "+" + percent + "%\n" + coinString;
        loyaltytxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 3, 3)];
        pricetxt.text = Utils.formatCoinsNumber(Math.round(Number(product["items"][0].after_discount_coins) * (1 + Number(loyaltyArr[loyaltyLevel]["purchase_bonus"])))); //Utils.formatCoinsNumber(Number(product["items"][0].after_discount_coins));
        this.timerTxt = Com.addTextAt(this, 45, 297, 260, 26, 26, false, true);
        this.timerTxt.text = "00:00:00";
        var loyaltyPointTxt = Com.addTextAt(this, 45, 350, 260, 17, 17, false, true);
        loyaltyPointTxt.textAlign = "center";
        loyaltyPointTxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 2, 2)];
        loyaltyPointTxt.text = "+" + this.getLoyaltyPoints(product["loyalty_base_point"]) + (GlobelSettings.language == "en" ? " loyalty points" : (GlobelSettings.language == "es" ? " puntos de fidelidad" : " pontos de fidelidade"));
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    Pachinko2Online.prototype.updateDealOverplusText = function (time) {
        if (this.timerTxt)
            this.timerTxt.text = Utils.secondToHour(time);
    };
    Pachinko2Online.prototype.poOverplusOver = function () {
        this.onClose(null);
    };
    Pachinko2Online.prototype.onRemove = function () {
        this.removeChildren();
        this.addChild(this.bg);
        this.addChild(this.closeButton);
    };
    Pachinko2Online.prototype.addCoins = function () {
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
    Pachinko2Online.prototype.addCoinAt = function (name, x, y) {
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
    Pachinko2Online.prototype.letBlink = function (coinLight) {
        var tw = egret.Tween.get(coinLight);
        tw.wait(2000 + Math.random() * 3000);
        tw.to({ alpha: 1 }, 600);
        tw.to({ alpha: 0 }, 800);
        tw.call(this.continueBlink.bind(this, coinLight));
    };
    Pachinko2Online.prototype.continueBlink = function (coinLight) {
        if (!this.stage)
            return;
        this.letBlink(coinLight);
    };
    Pachinko2Online.prototype.letRotate = function (yellowlight, duration) {
        yellowlight.rotation = 0;
        var tw = egret.Tween.get(yellowlight);
        tw.to({ rotation: 1080 }, duration);
        tw.call(this.continueRotate.bind(this, yellowlight, duration));
    };
    Pachinko2Online.prototype.continueRotate = function (yellowlight, duration) {
        if (!this.stage)
            return;
        this.letRotate(yellowlight, duration);
    };
    Pachinko2Online.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    return Pachinko2Online;
}(TimerPo));
__reflect(Pachinko2Online.prototype, "Pachinko2Online");
//# sourceMappingURL=load.js.map