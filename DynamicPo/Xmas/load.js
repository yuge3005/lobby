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
var Xmas = (function (_super) {
    __extends(Xmas, _super);
    function Xmas(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(Xmas, "classAssetName", {
        get: function () {
            return "po_light120"; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    Xmas.prototype.init = function () {
        this.bgAssetName = "assets_json.120";
        this.closeButtonAssetName = "assets_json.x-1";
        _super.prototype.init.call(this);
        var lightData = RES.getRes("animation_json");
        var lightTex = RES.getRes("animation_json");
        this.mcf = new egret.MovieClipDataFactory(lightData, lightTex);
        var lightMovie = Com.addMovieClipAt(this, this.mcf, "light120", -222, 68);
        this.starPositions = [new egret.Point(185, 42), new egret.Point(282, 50), new egret.Point(465, 124), new egret.Point(117, 470), new egret.Point(667, 572), new egret.Point(635, 508), new egret.Point(510, 522)];
        this.addStar();
        var comfirmBtn = Com.addButtonAt(this, "btn_ble", 300, 400, this.onClose, 1, 0.9);
        comfirmBtn.x = this.bg.width >> 1;
        comfirmBtn.y = this.bg.height - comfirmBtn.height * 1.5;
    };
    Xmas.prototype.addStar = function () {
        var pt = this.starPositions.shift();
        Com.addMovieClipAt(this, this.mcf, "star", pt.x - 224, pt.y - 185);
        if (this.starPositions.length == 0)
            return;
        var tw = egret.Tween.get(this);
        tw.wait(800);
        tw.call(this.addStar);
    };
    return Xmas;
}(GenericPo));
__reflect(Xmas.prototype, "Xmas");
//# sourceMappingURL=load.js.map