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
var H5_BlackFriday_strong_po = (function (_super) {
    __extends(H5_BlackFriday_strong_po, _super);
    function H5_BlackFriday_strong_po(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(H5_BlackFriday_strong_po, "classAssetName", {
        get: function () {
            return "Standard_2705_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    H5_BlackFriday_strong_po.prototype.init = function () {
        this.bgAssetName = "random_8430_" + GlobelSettings.language.toUpperCase() + "_png";
        _super.prototype.init.call(this);
        var closeBtnRect = new egret.Rectangle(768,130,35,37); //range of close button
        var comfirmBtnRect = new egret.Rectangle(328,557,243,85); //range of comfirm button
        var coinRect = new egret.Rectangle(244, 407, 410, 45);
        var coinColor = 0xffe25a;
        var priceRect = new egret.Rectangle(226, 576, 425, 45);
        var priceColor = 0xFFFFFF;
        var disCountRect = new egret.Rectangle(334, 480, 225, 35);
        var disCountColor = 0x94eb1a;
        Com.addObjectAt(this, this.showLoyaltyPrivileges(), 145, 535);
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
        var disCount = this.createText(disCountRect, disCountColor);
        disCount.text = Utils.formatCoinsNumber(Math.round(Number(product["items"][1].after_discount_chips) * (1 + Number(loyaltyArr[loyaltyLevel]["purchase_chips"]))));
        disCount.stroke = 2;
        disCount.strokeColor = 0;
        var coinsText2 = this.createCoinsTest(disCountRect, disCountColor, disCount, 25, true);
coinsText2.texture = RES.getRes("Po_icons_json.dinero");
        coinsText2.y += 13;//this.createDisCountLine(disCount);
        var lanObj = { en: "FOR ONLY", es: "POR SOLO", pt: "POR APENAS" };
        var pricetxt = this.createText(priceRect, priceColor, true, true);
        var currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        pricetxt.text = (currencyIsBrl ? "R$" : "$") + product["price"] * (currencyIsBrl ? 4 : 1);
        // pricetxt.text = "R$" + product["price"];
        coinstxt.text = Utils.formatCoinsNumber(Math.round(Number(product["items"][0].after_discount_coins) * (1 + Number(loyaltyArr[loyaltyLevel]["purchase_bonus"]))));
        // this.timerTxt = Com.addTextAt( this, 330, 210, 260, 26, 26, false, true );
        // this.timerTxt.text = 
pricetxt.size = 34;
        var loyaltyPointTxt = Com.addTextAt(this, 634, 605, 260, 21, 21, false, true);
        loyaltyPointTxt.textAlign = "center";
        loyaltyPointTxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 2, 2)];
        loyaltyPointTxt.text = "+" + this.getLoyaltyPoints(product["loyalty_base_point"]); // + ( GlobelSettings.language == "en" ? " loyalty points" : ( GlobelSettings.language == "es" ? " puntos de fidelidad" : " pontos de fidelidade" ) );
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    // private timerTxt: egret.TextField;
    // protected updateDealOverplusText(time: number): void {
    // if( this.timerTxt ) this.timerTxt.text = Utils.secondToHour( time );
    // }
    H5_BlackFriday_strong_po.prototype.poOverplusOver = function () {
        this.onClose(null);
    };
    H5_BlackFriday_strong_po.prototype.onRemove = function () {
        this.removeChildren();
        // this.addChild( this.bg );
        // this.addChild( this.closeButton );
    };
    H5_BlackFriday_strong_po.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";ev["productType"] = 2;
        this.dispatchEvent(ev);
    };
    H5_BlackFriday_strong_po.prototype.createAlphaButton = function (rect, fun) {
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
    H5_BlackFriday_strong_po.prototype.createText = function (rect, color, useFilters, bold) {
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
    H5_BlackFriday_strong_po.prototype.createCoinsTest = function (rect, color, txt, size, dropShaddow) {
        if (dropShaddow === void 0) { dropShaddow = false; }
        var bitmap = Com.addBitmapAt(this, "Po_icons_json.coin", rect.x + (rect.width - txt.textWidth) * 0.5 - 88, rect.y + rect.height * 0.5);
        bitmap.anchorOffsetY = bitmap.height >> 1;
        if (!dropShaddow)
            bitmap.filters = [MatrixTool.colorMatrix(0.33, 0.33, 1)];
        return bitmap;
    };
    H5_BlackFriday_strong_po.prototype.createDisCountLine = function (disCount) {
        var lineSp = new egret.Shape;
        lineSp.x = disCount.x;
        lineSp.y = disCount.y;
        lineSp.graphics.lineStyle(2, 0xFF0000);
        lineSp.graphics.moveTo(disCount.width - disCount.textWidth >> 1, 0);
        lineSp.graphics.lineTo(disCount.width + disCount.textWidth >> 1, disCount.height);
        this.addChild(lineSp);
    };
    return H5_BlackFriday_strong_po;
}(TimerPo));
__reflect(H5_BlackFriday_strong_po.prototype, "H5_BlackFriday_strong_po");
//# sourceMappingURL=load.js.map