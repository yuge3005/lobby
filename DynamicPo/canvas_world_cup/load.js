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
var canvas_world_cup = (function (_super) {
    __extends(canvas_world_cup, _super);
    function canvas_world_cup(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(canvas_world_cup, "classAssetName", {
        get: function () {
            return "canvas_world_cup_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    canvas_world_cup.prototype.init = function () {
        this.bgAssetName = "assets_world_cup_json.bg";
        this.closeButtonAssetName = "assets_world_cup_json.X-1";
        _super.prototype.init.call(this);
        Com.addBitmapAt(this, "assets_world_cup_json.title_bg", 170, 50);
        Com.addBitmapAt(this, "assets_world_cup_json.doctor-1", 710, 60);
        var titleSp = Com.addBitmapAt(this, "world_cup_" + GlobelSettings.language + "_json.title_" + GlobelSettings.language.toUpperCase(), 20, 50);
        titleSp.x = (651 - titleSp.width >> 1) + 170;
        titleSp.y = (102 - titleSp.height >> 1) + 40;
        var getSp = Com.addBitmapAt(this, "world_cup_" + GlobelSettings.language + "_json.get_" + GlobelSettings.language.toUpperCase(), 20, 50);
        getSp.x = (651 - getSp.width >> 1) + 170;
        getSp.y = 140;
        this.closeButton.x -= 90;
        this.closeButton.y += 50;
        this.addChild(this.closeButton);
        var comfirmBtn = Com.addButtonAt(this, "world_cup_" + GlobelSettings.language + "_json.button_confirm_" + GlobelSettings.language.toUpperCase(), 300, 400, this.buyProduct, 1, 0.9);
        comfirmBtn.x = this.bg.width >> 1;
        comfirmBtn.y = this.bg.height - comfirmBtn.height;
        var product = GlobelSettings[egret.getQualifiedClassName(this)];
        var pricetxt = Com.addTextAt(this, 400, 290, 360, 42, 42, false, true);
        pricetxt.textAlign = "center";
        pricetxt.textColor = 0xF0BE06;
        pricetxt.text = Utils.formatCoinsNumber(Number(product["items"][0].after_discount_coins));
        pricetxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
        var coinstxt = Com.addTextAt(this, 440, 375, 290, 60, 52, false, true);
        coinstxt.textAlign = "center";
        var currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        coinstxt.text = (currencyIsBrl ? "R$" : "$") + product["price"] * (currencyIsBrl ? 4 : 1);
        // coinstxt.text = "R$" + product["price"];
        coinstxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
        var disCount = Com.addTextAt(this, 250, 300, 180, 30, 30, false, true);
        disCount.textAlign = "center";
        disCount.textColor = 0xF0BE06;
        disCount.text = Utils.formatCoinsNumber(Number(product["items"][0].base_coins));
        var lineSp = new egret.Shape;
        lineSp.x = 280;
        lineSp.y = 300;
        lineSp.graphics.lineStyle(2, 0xFF0000);
        lineSp.graphics.moveTo(0, 0);
        lineSp.graphics.lineTo(120, 30);
        this.addChild(lineSp);
        var lanObj = { en: "FOR ONLY", es: "POR SOLO", pt: "POR APENAS" };
        var forTx = Com.addTextAt(this, 260, 385, 260, 36, 36, false, true);
        forTx.textAlign = "center";
        forTx.textColor = 0xF0BE06;
        forTx.text = lanObj[GlobelSettings.language];
        forTx.scaleX = 0.8;
    };
    canvas_world_cup.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    return canvas_world_cup;
}(GenericPo));
__reflect(canvas_world_cup.prototype, "canvas_world_cup");
//# sourceMappingURL=load.js.map