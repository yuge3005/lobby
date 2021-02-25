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
var King_days = (function (_super) {
    __extends(King_days, _super);
    function King_days(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(King_days, "classAssetName", {
        get: function () {
            return "Standard_36_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    King_days.prototype.init = function () {
        this.bgAssetName = "random_36_" + GlobelSettings.language.toUpperCase() + "_png";
        _super.prototype.init.call(this);
        var closeBtnRect = new egret.Rectangle(842, 27, 40, 40); //range of close button
        var comfirmBtnRect = new egret.Rectangle(322, 565, 290, 105); //range of comfirm button
        var coinRect = new egret.Rectangle(220, 255, 410, 45);
        var coinColor = 0xffe25a;
        var priceRect = new egret.Rectangle(250, 420, 425, 45);
        var priceColor = 0xFFFFFF;
        var disCountRect = new egret.Rectangle(320, 315, 225, 35);
        var disCountColor = 0xcacaca;
        Com.addObjectAt(this, this.showLoyaltyPrivileges(), 710, 350);
        var forOnlyRect = new egret.Rectangle(250, 370, 425, 35);
        var forOnlyColor = 0xffe25a;
        var alphaCloseBtn = this.createAlphaButton(closeBtnRect, this.onClose);
        var comfirmBtn = this.createAlphaButton(comfirmBtnRect, this.buyProduct);
        var product = GlobelSettings[egret.getQualifiedClassName(this)];
        var coinstxt = this.createText(coinRect, coinColor, true);
        coinstxt.text = Utils.formatCoinsNumber(Number(product["items"][0].after_discount_coins));
        var coinsText1 = this.createCoinsTest(coinRect, coinColor, coinstxt, 25, true);
        var disCount = this.createText(disCountRect, disCountColor);
        disCount.text = Utils.formatCoinsNumber(Number(product["items"][0].base_coins));
        var coinsText2 = this.createCoinsTest(disCountRect, disCountColor, disCount, 25);
        this.createDisCountLine(disCount);
        var lanObj = { en: "FOR ONLY", es: "POR SOLO", pt: "POR APENAS" };
        var forTx = this.createText(forOnlyRect, forOnlyColor, true);
        forTx.text = lanObj[GlobelSettings.language];
        var pricetxt = this.createText(priceRect, priceColor, true, true);
        var currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        pricetxt.text = (currencyIsBrl ? "R$" : "$") + product["price"] * (currencyIsBrl ? 4 : 1);
        // pricetxt.text = "R$" + product["price"];
        var loyaltyLevel = LoyaltyVo.data["loyalty_level"];
        var loyaltyArr = LoyaltyVo.data["privileges"];
        coinstxt.text = Utils.formatCoinsNumber(Math.round(Number(product["items"][0].after_discount_coins) * (1 + Number(loyaltyArr[loyaltyLevel]["purchase_bonus"]))));
        // this.timerTxt = Com.addTextAt( this, 330, 210, 260, 26, 26, false, true );
        // this.timerTxt.text = "00:00:00";
        var loyaltyPointTxt = Com.addTextAt(this, 342, 520, 260, 21, 21, false, true);
        loyaltyPointTxt.textAlign = "center";
        loyaltyPointTxt.filters = [new egret.DropShadowFilter(1, 90, 0, 1, 4, 3, 2, 2)];
        loyaltyPointTxt.text = "+" + this.getLoyaltyPoints(product["loyalty_base_point"]); // + ( GlobelSettings.language == "en" ? " loyalty points" : ( GlobelSettings.language == "es" ? " puntos de fidelidad" : " pontos de fidelidade" ) );
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    // private timerTxt: egret.TextField;
    // protected updateDealOverplusText(time: number): void {
    // if( this.timerTxt ) this.timerTxt.text = Utils.secondToHour( time );
    // }
    King_days.prototype.poOverplusOver = function () {
        this.onClose(null);
    };
    King_days.prototype.onRemove = function () {
        this.removeChildren();
        // this.addChild( this.bg );
        // this.addChild( this.closeButton );
    };
    King_days.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    King_days.prototype.createAlphaButton = function (rect, fun) {
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
    King_days.prototype.createText = function (rect, color, useFilters, bold) {
        if (useFilters === void 0) { useFilters = false; }
        if (bold === void 0) { bold = false; }
        var txt = Com.addTextAt(this, rect.x, rect.y, rect.width, rect.height, rect.height, false, bold);
        txt.textColor = color;
        if (!bold)
            txt.bold = true;
        if (useFilters)
            txt.filters = [new egret.DropShadowFilter(1, 90, 0x333333, 1, 4, 3, 2, 2)];
        return txt;
    };
    King_days.prototype.createCoinsTest = function (rect, color, txt, size, dropShaddow) {
        if (dropShaddow === void 0) { dropShaddow = false; }
        var coinsTxt = this.createText(new egret.Rectangle(0, rect.y + rect.height - size - 3, 100, size), color, dropShaddow);
        coinsTxt.textAlign = "left";
        coinsTxt.bold = false;
        var lanCoins = { en: "coins", es: "monedas", pt: "moedas" };
        coinsTxt.text = lanCoins[GlobelSettings.language];
        coinsTxt.x = rect.x + (rect.width + txt.textWidth) * 0.5 + 10;
        return coinsTxt;
    };
    King_days.prototype.createDisCountLine = function (disCount) {
        var lineSp = new egret.Shape;
        lineSp.x = disCount.x;
        lineSp.y = disCount.y;
        lineSp.graphics.lineStyle(2, 0xFF0000);
        lineSp.graphics.moveTo(disCount.width - disCount.textWidth >> 1, 0);
        lineSp.graphics.lineTo(disCount.width + disCount.textWidth >> 1, disCount.height);
        this.addChild(lineSp);
    };
    return King_days;
}(TimerPo));
__reflect(King_days.prototype, "King_days");
//# sourceMappingURL=load.js.map