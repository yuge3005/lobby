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
var SupportAndContact = (function (_super) {
    __extends(SupportAndContact, _super);
    function SupportAndContact(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(SupportAndContact, "classAssetName", {
        get: function () {
            return "Standard_33_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    SupportAndContact.prototype.init = function () {
        this.bgAssetName = "random_33_" + GlobelSettings.language.toUpperCase() + "_png";
        _super.prototype.init.call(this);
        var closeBtnRect = new egret.Rectangle(518, 32, 45, 45); //range of close button
        var comfirmBtnRect = new egret.Rectangle(25, 300, 250, 55); //range of comfirm button
        var addiBtnRect = new egret.Rectangle(282, 300, 250, 55); //range of comfirm button
        var alphaCloseBtn = this.createAlphaButton(closeBtnRect, this.onClose);
        var comfirmBtn = this.createAlphaButton(comfirmBtnRect, this.onComfirm);
        var addiBtn = this.createAlphaButton(addiBtnRect, this.onAddi);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    SupportAndContact.prototype.onComfirm = function (event) {
        var lan = { en: "Dr. Bingo: Support Request", es: "Dr. Bingo: Solicitud a Atención al Cliente", pt: "Dr. Bingo: Solicitações do Suporte" };
        var facebookId = PlayerConfig.player("facebook_id");
        var locale = GlobelSettings.language;
        window.open("mailto:Financial@doutorbingo.com&subject=" + lan[locale.substr(0, 2)] + "-" + facebookId);
    };
    SupportAndContact.prototype.onAddi = function () {
        window.parent.location.href = "https://www.doutorbingo.com";
    };
    SupportAndContact.prototype.onRemove = function () {
        this.removeChildren();
    };
    SupportAndContact.prototype.createAlphaButton = function (rect, fun) {
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
    return SupportAndContact;
}(GenericPo));
__reflect(SupportAndContact.prototype, "SupportAndContact");
//# sourceMappingURL=load.js.map