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
var canvas_newyear = (function (_super) {
    __extends(canvas_newyear, _super);
    function canvas_newyear(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(canvas_newyear, "classAssetName", {
        get: function () {
            return "canvas_newyear_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    canvas_newyear.prototype.init = function () {
        this.bgAssetName = "assets_newyear_json.Enfeites-1";
        this.closeButtonAssetName = "assets_newyear_json.X-1";
        _super.prototype.init.call(this);
        var lightData = RES.getRes("fireworks_json");
        var lightTex = RES.getRes("fireworks_png");
        this.mcf = new egret.MovieClipDataFactory(lightData, lightTex);
        Com.addBitmapAt(this, "newyear_" + GlobelSettings.language + "_json.happy_" + GlobelSettings.language, 300, 180);
        Com.addBitmapAt(this, "newyear_" + GlobelSettings.language + "_json.coin_" + GlobelSettings.language, 450, 435);
        this.closeButton.x -= 200;
        this.closeButton.y += 60;
        var comfirmBtn = Com.addButtonAt(this, "newyear_" + GlobelSettings.language + "_json.enjoy_" + GlobelSettings.language, 300, 400, this.buyProduct, 1, 0.9);
        comfirmBtn.x = this.bg.width >> 1;
        comfirmBtn.y = this.bg.height - comfirmBtn.height;
        this.addFireworks("fireworks", 550, 250, 1.8);
        this.addFireworks("fireworks2", -350, -400, 2);
        this.addFireworks("fireworks3", 450, -380, 2.3);
        this.addFireworks("fireworks", -650, -100, 3);
        this.addFireworks("fireworks3", -600, -250, 2.6);
        this.addFireworks("fireworks2", 200, -350, 3.24);
        var product = GlobelSettings[egret.getQualifiedClassName(this)];
        var pricetxt = Com.addTextAt(this, 350, 350, 500, 65, 65, false, true);
        pricetxt.textAlign = "center";
        pricetxt.textColor = 0xF0BE06;
        pricetxt.text = Utils.formatCoinsNumber(Number(product["items"][0].after_discount_coins));
        pricetxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
        var coinstxt = Com.addTextAt(this, 410, 540, 380, 80, 72, false, true);
        coinstxt.textAlign = "center";
        coinstxt.text = "$" + product["price"];
        coinstxt.filters = [new egret.DropShadowFilter(1, 90, 0xCC1286, 1, 4, 3, 2, 2)];
    };
    canvas_newyear.prototype.addFireworks = function (name, posX, posY, scale) {
        var mc = Com.addMovieClipAt(this, this.mcf, name, posX, posY);
        mc.scaleX = scale;
        mc.scaleY = scale;
    };
    canvas_newyear.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    return canvas_newyear;
}(GenericPo));
__reflect(canvas_newyear.prototype, "canvas_newyear");
//# sourceMappingURL=load.js.map