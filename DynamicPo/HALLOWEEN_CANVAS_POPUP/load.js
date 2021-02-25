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
var HALLOWEEN_CANVAS_POPUP = (function (_super) {
    __extends(HALLOWEEN_CANVAS_POPUP, _super);
    function HALLOWEEN_CANVAS_POPUP(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(HALLOWEEN_CANVAS_POPUP, "classAssetName", {
        get: function () {
            return "Standard_11_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    HALLOWEEN_CANVAS_POPUP.prototype.init = function () {
        this.bgAssetName = "random_11_" + GlobelSettings.language.toUpperCase() + "_png";
        _super.prototype.init.call(this);
        var closeBtnRect = new egret.Rectangle(855, 109, 36, 36); //range of close button
        var comfirmBtnRect = new egret.Rectangle(338, 613, 235, 78); //range of comfirm button
        var alphaCloseBtn = this.createAlphaButton(closeBtnRect, this.onClose);
        var comfirmBtn = this.createAlphaButton(comfirmBtnRect, this.buyProduct);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    HALLOWEEN_CANVAS_POPUP.prototype.onRemove = function () {
        this.removeChildren();
    };
    HALLOWEEN_CANVAS_POPUP.prototype.buyProduct = function (event) {
        this.onClose(null);
    };
    HALLOWEEN_CANVAS_POPUP.prototype.createAlphaButton = function (rect, fun) {
        var btn = new egret.Shape;
        btn.graphics.beginFill(0xFFFFFF, 0.0);
        btn.graphics.drawRect(rect.x, rect.y, rect.width, rect.height);
        btn.graphics.endFill();
        btn.touchEnabled = true;
        mouse.setButtonMode(btn, true);
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, fun, this);
        return btn;
    };
    return HALLOWEEN_CANVAS_POPUP;
}(GenericPo));
__reflect(HALLOWEEN_CANVAS_POPUP.prototype, "HALLOWEEN_CANVAS_POPUP");
//# sourceMappingURL=load.js.map