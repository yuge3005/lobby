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
var po_brazil = (function (_super) {
    __extends(po_brazil, _super);
    function po_brazil(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(po_brazil, "classAssetName", {
        get: function () {
            return "Standard_6513_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    po_brazil.prototype.init = function () {
        this.bgAssetName = "random_9758_" + GlobelSettings.language.toUpperCase() + "_png";
        _super.prototype.init.call(this);
        var closeBtnRect = new egret.Rectangle(-339,-72,67,37); //range of close button
        var comfirmBtnRect = new egret.Rectangle(-339,-72,67,37); //range of comfirm button
        var coinRect = new egret.Rectangle(276, 422, 410, 45);
        var coinColor = 0xffe25a;
        var priceRect = new egret.Rectangle(250, 470, 425, 45);
        var priceColor = 0xFFFFFF;
        var disCountRect = new egret.Rectangle(397, 370, 225, 35);
        var disCountColor = 0xcacaca;
        Com.addObjectAt(this, this.showLoyaltyPrivileges(), 710, 350);
        var forOnlyRect = new egret.Rectangle(250, 425, 425, 35);
        var forOnlyColor = 0xffe25a;
        var alphaCloseBtn = this.createAlphaButton(closeBtnRect, this.onClose);
        var comfirmBtn = this.createAlphaButton(comfirmBtnRect, this.buyProduct);
        var product = GlobelSettings[egret.getQualifiedClassName(this)];
        var loyaltyLevel = LoyaltyVo.data["loyalty_level"];
        var loyaltyArr = LoyaltyVo.data["privileges"];
        var coinstxt = this.createText(coinRect, coinColor, true);
        coinstxt.text = Utils.formatCoinsNumber(Number(product["items"][0].after_discount_coins));
        coinstxt.stroke = 2;
        coinstxt.strokeColor = 0;
        var coinsText1 = this.createCoinsTest(coinRect, coinColor, coinstxt, 25, true);
        var disCount = this.createText(disCountRect, disCountColor);disCount.visible=false;
        disCount.text = Utils.formatCoinsNumber(Number(product["items"][0].base_coins));
        disCount.stroke = 2;
        disCount.strokeColor = 0;
        var coinsText2 = this.createCoinsTest(disCountRect, disCountColor, disCount, 25);
        coinsText2.visible = false;
        var lanObj = { en: "FOR ONLY", es: "POR SOLO", pt: "POR APENAS" };
        var forTx = this.createText(forOnlyRect, forOnlyColor, true);
        forTx.text = lanObj[GlobelSettings.language];forTx.visible = false
        var pricetxt = this.createText(priceRect, priceColor, true, true);
        var currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        pricetxt.text = (currencyIsBrl ? "R$" : "$") + product["price"] * (currencyIsBrl ? 4 : 1);
        // pricetxt.text = "R$" + product["price"];
        coinstxt.text = Utils.formatCoinsNumber(Math.round(Number(product["items"][0].after_discount_coins) * (1 + Number(loyaltyArr[loyaltyLevel]["purchase_bonus"]))));
        this.timerTxt = Com.addTextAt( this, 350, 333, 260, 26, 26, false, true );
        this.timerTxt.text = "00:00:00";this.timerTxt.textColor = 0xff0000;this.timerTxt.size = 33;
pricetxt.size = 34;
forTx.size = 25;
        var loyaltyPointTxt = Com.addTextAt(this, 691, 542, 260, 21, 21, false, true);
        loyaltyPointTxt.textAlign = "center";
        loyaltyPointTxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 2, 2)];
        loyaltyPointTxt.text = "+" + this.getLoyaltyPoints(product["loyalty_base_point"]); // + ( GlobelSettings.language == "en" ? " loyalty points" : ( GlobelSettings.language == "es" ? " puntos de fidelidad" : " pontos de fidelidade" ) );
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    po_brazil.prototype.updateDealOverplusText = function(time) {
if( this.timerTxt ) this.timerTxt.text = Utils.secondToHour( time );
}
    // protected updateDealOverplusText(time: number): void {
    // if( this.timerTxt ) this.timerTxt.text = Utils.secondToHour( time );
    // }
    po_brazil.prototype.poOverplusOver = function () {
        this.onClose(null);
    };
    po_brazil.prototype.onRemove = function () {
        this.removeChildren();
        // this.addChild( this.bg );
        // this.addChild( this.closeButton );
    };
    po_brazil.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    po_brazil.prototype.createAlphaButton = function (rect, fun) {
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
    po_brazil.prototype.createText = function (rect, color, useFilters, bold) {
        if (useFilters === void 0) { useFilters = false; }
        if (bold === void 0) { bold = false; }
        var txt = Com.addTextAt(this, rect.x, rect.y, rect.width, rect.height, rect.height, false, bold);
        txt.textColor = color;
        txt.verticalAlign = "middle";
        if (!bold)
            txt.bold = true;
        if (useFilters)
            txt.filters = [new egret.DropShadowFilter(1, 90, 0x333333, 1, 4, 3, 2, 2)];
        return txt;
    };
    po_brazil.prototype.createCoinsTest = function (rect, color, txt, size, dropShaddow) {
        if (dropShaddow === void 0) { dropShaddow = false; }
        var bitmap = Com.addBitmapAt(this, "Po_icons_json.coin", rect.x + (rect.width - txt.textWidth) * 0.5 - 88, rect.y + rect.height * 0.5);
        bitmap.anchorOffsetY = bitmap.height >> 1;
        if (!dropShaddow)
            bitmap.filters = [MatrixTool.colorMatrix(0.33, 0.33, 1)];
        return bitmap;
    };
    po_brazil.prototype.createDisCountLine = function (disCount) {
        var lineSp = new egret.Shape;
        lineSp.x = disCount.x;
        lineSp.y = disCount.y;
        lineSp.graphics.lineStyle(2, 0xFF0000);
        lineSp.graphics.moveTo(disCount.width - disCount.textWidth >> 1, 0);
        lineSp.graphics.lineTo(disCount.width + disCount.textWidth >> 1, disCount.height);
        this.addChild(lineSp);
    };
    return po_brazil;
}(TimerPo));
__reflect(po_brazil.prototype, "po_brazil");
//# sourceMappingURL=load.js.map