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
var FathersPopup = (function (_super) {
    __extends(FathersPopup, _super);
    function FathersPopup(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(FathersPopup, "classAssetName", {
        get: function () {
            return "popup_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    FathersPopup.prototype.init = function () {
        this.bgAssetName = "popup_" + GlobelSettings.language.toUpperCase() + "_png";
        _super.prototype.init.call(this);
        var closeBtnRect = new egret.Rectangle(900, 88, 33, 33); //range of close button
        var comfirmBtnRect = new egret.Rectangle(508, 499, 202, 68); //range of comfirm button
        var alphaCloseBtn = this.createAlphaButton(closeBtnRect, this.onClose);
        var comfirmBtn = this.createAlphaButton(comfirmBtnRect, this.showBank);
    };
    FathersPopup.prototype.showBank = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "showBank";
        this.dispatchEvent(ev);
    };
    FathersPopup.prototype.createAlphaButton = function (rect, fun) {
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
    return FathersPopup;
}(GenericPo));
__reflect(FathersPopup.prototype, "FathersPopup");
//# sourceMappingURL=load.js.map