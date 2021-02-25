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
var world_cup_popup = (function (_super) {
    __extends(world_cup_popup, _super);
    function world_cup_popup(configUrl) {
        return _super.call(this, configUrl) || this;
    }
    Object.defineProperty(world_cup_popup, "classAssetName", {
        get: function () {
            return "world_cup_popup_" + GlobelSettings.language; //subclass must override
        },
        enumerable: true,
        configurable: true
    });
    world_cup_popup.prototype.init = function () {
        this.bgAssetName = "world_cup_popup_" + GlobelSettings.language.toUpperCase() + "_png";
        _super.prototype.init.call(this);
        var closeBtnRect = new egret.Rectangle(340, 544, 280, 67); //range of close button
        // let comfirmBtnRect: egret.Rectangle = new egret.Rectangle( 345, 494, 226, 74 );//range of comfirm button
        /*let coinRect: egret.Rectangle = new egret.Rectangle( 220, 268, 410, 45 );
        let coinColor: number = 0xffe25a;

        let priceRect: egret.Rectangle = new egret.Rectangle( 250, 430, 425, 45 );
        let priceColor: number = 0xFFFFFF;

        let disCountRect: egret.Rectangle = new egret.Rectangle( 320, 330, 225, 35 );
        let disCountColor: number = 0xcacaca;

        let forOnlyRect: egret.Rectangle = new egret.Rectangle( 250, 382, 425, 35 );
        let forOnlyColor: number = 0xffe25a;*/
        var alphaCloseBtn = this.createAlphaButton(closeBtnRect, this.onClose);
        // let comfirmBtn: egret.Shape = this.createAlphaButton( comfirmBtnRect, this.buyProduct );
        /*let product: Object = GlobelSettings[egret.getQualifiedClassName( this )];
        
        let coinstxt: egret.TextField = this.createText( coinRect, coinColor, true );
        coinstxt.text = Utils.formatCoinsNumber(Number(product["items"][0].after_discount_coins));

        let coinsText1: egret.TextField = this.createCoinsTest( coinRect, coinColor, coinstxt, 25, true );

        let disCount: egret.TextField = this.createText( disCountRect, disCountColor );
        disCount.text =	Utils.formatCoinsNumber(Number(product["items"][0].base_coins));

        let coinsText2: egret.TextField = this.createCoinsTest( disCountRect, disCountColor, disCount, 25 );

        this.createDisCountLine( disCount );

        let lanObj: Object = { en: "FOR ONLY", es: "POR SOLO", pt: "POR APENAS" };

        let forTx: egret.TextField = this.createText( forOnlyRect, forOnlyColor, true );
        forTx.text = lanObj[GlobelSettings.language];

        let pricetxt: egret.TextField = this.createText( priceRect, priceColor, true, true );
        let currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        pricetxt.text = (currencyIsBrl ? "R$" : "$") + product["price"] * (currencyIsBrl ? 4 : 1);*/
        // pricetxt.text = "R$" + product["price"];
    };
    world_cup_popup.prototype.buyProduct = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyProduct";
        this.dispatchEvent(ev);
    };
    world_cup_popup.prototype.createAlphaButton = function (rect, fun) {
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
    world_cup_popup.prototype.createText = function (rect, color, useFilters, bold) {
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
    world_cup_popup.prototype.createCoinsTest = function (rect, color, txt, size, dropShaddow) {
        if (dropShaddow === void 0) { dropShaddow = false; }
        var coinsTxt = this.createText(new egret.Rectangle(0, rect.y + rect.height - size - 3, 100, size), color, dropShaddow);
        coinsTxt.textAlign = "left";
        coinsTxt.bold = false;
        var lanCoins = { en: "coins", es: "monedas", pt: "moedas" };
        coinsTxt.text = lanCoins[GlobelSettings.language];
        coinsTxt.x = rect.x + (rect.width + txt.textWidth) * 0.5 + 10;
        return coinsTxt;
    };
    world_cup_popup.prototype.createDisCountLine = function (disCount) {
        var lineSp = new egret.Shape;
        lineSp.x = disCount.x;
        lineSp.y = disCount.y;
        lineSp.graphics.lineStyle(2, 0xFF0000);
        lineSp.graphics.moveTo(disCount.width - disCount.textWidth >> 1, 0);
        lineSp.graphics.lineTo(disCount.width + disCount.textWidth >> 1, disCount.height);
        this.addChild(lineSp);
    };
    return world_cup_popup;
}(GenericPo));
__reflect(world_cup_popup.prototype, "world_cup_popup");
//# sourceMappingURL=load.js.map