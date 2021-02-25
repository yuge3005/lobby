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
var canvas_ooc_v1 = (function (_super) {
    __extends(canvas_ooc_v1, _super);
    function canvas_ooc_v1(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(canvas_ooc_v1, "classAssetName", {
        get: function () {
            return "canvas_ooc_v1_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    canvas_ooc_v1.prototype.init = function () {
        this.bgAssetName = "ooc_v1_json.po_3th_BG";
        this.closeButtonAssetName = "ooc_v1_json.x-1-1";
        _super.prototype.init.call(this);
        Com.addBitmapAt(this, "ooc_v1_" + GlobelSettings.language + "_json.po_3th_" + GlobelSettings.language, 64, 110);
        Com.addBitmapAt(this, "ooc_v1_" + GlobelSettings.language + "_json.Bitmap-" + GlobelSettings.language, 145, 237);
        var comfirmBtn = Com.addButtonAt(this, "ooc_v1_" + GlobelSettings.language + "_json.BUTTON-" + GlobelSettings.language, 210 + 130, 460 + 43, this.buyProduct, 1, 0.9);
        var product = GlobelSettings[egret.getQualifiedClassName(this)];
        var coinTxt = Com.addTextAt(this, 110, 300, 460, 70, 50, false, true);
        coinTxt.textAlign = "center";
        coinTxt.verticalAlign = "middle";
        coinTxt.textColor = 0xFFFFFF;
        coinTxt.text = Utils.formatCoinsNumber(product["items"][0].after_discount_coins);
        coinTxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
        var moneyTxt = Com.addTextAt(this, 300, 405, 75, 40, 35, false, true);
        moneyTxt.textAlign = "center";
        moneyTxt.textColor = 0xFEFE00;
        moneyTxt.text = "$" + product["price"];
        moneyTxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
        var oldCoinTxt = Com.addTextAt(this, 240, 280, 200, 20, 20, false, true);
        oldCoinTxt.textAlign = "center";
        oldCoinTxt.textColor = 0xFEFE00;
        oldCoinTxt.text = Utils.formatCoinsNumber(product["items"][0].base_coins);
        oldCoinTxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
        var line = new egret.Shape;
        line.x = (oldCoinTxt.width - oldCoinTxt.textWidth >> 1) + oldCoinTxt.x;
        line.y = oldCoinTxt.y;
        line.graphics.lineStyle(4, 0x00FF00);
        line.graphics.moveTo(0, 20);
        line.graphics.lineTo(oldCoinTxt.textWidth, 0);
        line.graphics.endFill();
        this.addChild(line);
    };
    canvas_ooc_v1.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    return canvas_ooc_v1;
}(GenericPo));
__reflect(canvas_ooc_v1.prototype, "canvas_ooc_v1");
//# sourceMappingURL=load.js.map