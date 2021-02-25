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
var Fathersday = (function (_super) {
    __extends(Fathersday, _super);
    function Fathersday(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(Fathersday, "classAssetName", {
        get: function () {
            return "fathersday_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    Fathersday.prototype.init = function () {
        this.bgAssetName = "fathers_day_json.bg";
        this.closeButtonAssetName = "fathers_day_json.btn_close";
        _super.prototype.init.call(this);
        var lightData = RES.getRes("fathersdayAnimation_json");
        var lightTex = RES.getRes("fathersdayAnimation_png");
        this.mcf = new egret.MovieClipDataFactory(lightData, lightTex);
        this.closeButton.x -= 180;
        this.closeButton.y += 40;
        var coinsPositions = [];
        coinsPositions.push(new egret.Point(350, 118));
        coinsPositions.push(new egret.Point(2067, 301));
        coinsPositions.push(new egret.Point(39, 600));
        coinsPositions.push(new egret.Point(2007, 976));
        coinsPositions.push(new egret.Point(114, 336));
        coinsPositions.push(new egret.Point(644, 1120));
        coinsPositions.push(new egret.Point(63, 730));
        coinsPositions.push(new egret.Point(1606, 1077));
        coinsPositions.push(new egret.Point(2192, 567));
        for (var i = 0; i < 9; i++) {
            this.addCoins("coin0" + (i + 1), coinsPositions[i].x, coinsPositions[i].y, 0.33);
        }
        Fathersday.ts = Com.addBitmapAt(this, "fathers_day_json.number_bg", 40, 115);
        Com.addBitmapAt(this, "fathersday_" + GlobelSettings.language + "_json.title_" + GlobelSettings.language, 175, 0);
        Com.addBitmapAt(this, "fathersday_" + GlobelSettings.language + "_json.coins_" + GlobelSettings.language, 100, 204);
        Com.addBitmapAt(this, "fathersday_" + GlobelSettings.language + "_json.introduce_" + GlobelSettings.language, 515, 170);
        var comfirmBtn = Com.addButtonAt(this, "fathersday_" + GlobelSettings.language + "_json.btn_buy_" + GlobelSettings.language, 352, 410, this.buyProduct, 1, 0.9);
        comfirmBtn.x += comfirmBtn.width * 0.5;
        comfirmBtn.y += comfirmBtn.height * 0.5;
        var light = Com.addMovieClipAt(this, this.mcf, "light_2", 35, 95);
        var arrow = Com.addMovieClipAt(this, this.mcf, "movingArrow", 390, 425);
        arrow.rotation = 45;
        var product = GlobelSettings[egret.getQualifiedClassName(this)];
        var pricetxt = Com.addTextAt(this, 68, 150, 280, 23, 23, false, true);
        pricetxt.textAlign = "center";
        pricetxt.textColor = 0xFEFE06;
        pricetxt.text = Utils.formatCoinsNumber(Number(product["items"][0].after_discount_coins));
        // pricetxt.filters = [ new egret.DropShadowFilter(1,90,0xCC1286,1,4,3,2,2) ];
        var coinstxt = Com.addTextAt(this, 78, 265, 260, 30, 30, false, true);
        coinstxt.textAlign = "center";
        var currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        coinstxt.text = (currencyIsBrl ? "R$" : "$") + product["price"] * (currencyIsBrl ? 4 : 1);
        coinstxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
    };
    Fathersday.prototype.addCoins = function (name, posX, posY, scale) {
        var coin = Com.addBitmapAt(this, name, posX * scale - 20, posY * scale - 70);
        coin.x += coin.width >> 1;
        coin.y += coin.height >> 1;
        coin.anchorOffsetX = coin.width >> 1;
        coin.anchorOffsetY = coin.height >> 1;
        coin.scaleX = scale;
        coin.scaleY = scale;
        this.scaleCoins(coin, scale);
    };
    Fathersday.prototype.scaleCoins = function (coin, scale) {
        var tw = egret.Tween.get(coin);
        tw.wait(1000 + Math.random() * 1000);
        tw.to({ scaleX: scale * 1.5, scaleY: scale * 1.5 }, 400);
        tw.to({ scaleX: scale, scaleY: scale }, 500);
        tw.wait(2000 + Math.random() * 1500);
        tw.call(this.restartCoinScale, this, [coin, scale]);
    };
    Fathersday.prototype.restartCoinScale = function (coin, scale) {
        if (this.stage)
            this.scaleCoins(coin, scale);
    };
    Fathersday.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    return Fathersday;
}(GenericPo));
__reflect(Fathersday.prototype, "Fathersday");
//# sourceMappingURL=load.js.map