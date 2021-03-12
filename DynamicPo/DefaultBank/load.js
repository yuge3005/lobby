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
var DefaultBank = (function (_super) {
    __extends(DefaultBank, _super);
    function DefaultBank(configUrl) {
        if (configUrl === void 0) { configUrl = null; }
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(DefaultBank, "classAssetName", {
        get: function () {
            return "defaultBank";
        },
        enumerable: true,
        configurable: true
    });
    DefaultBank.prototype.init = function () {
        this.bg = Com.addBitmapAt(this, "defaultBank_json.coins_bg", 0, 0);
        this.anchorOffsetX = this.bg.width;
        this.anchorOffsetY = this.bg.height;
        this.bg.scaleX = this.bg.scaleY = 2;
        this.closeButton = Com.addDownButtonAt(this, "defaultBank_json.btn_close", "defaultBank_json.btn_close", this.bg.width << 1, 0, this.onClose, true);
        this.inited = true;
        this.dispatchEvent(new egret.Event(GenericModal.GENERIC_MODAL_LOADED));
    };
    DefaultBank.needZoomOut = false;
    return DefaultBank;
}(GenericPo));
__reflect(DefaultBank.prototype, "DefaultBank");
//# sourceMappingURL=DefaultBank.js.map