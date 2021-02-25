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
var defaultNewBank = (function (_super) {
    __extends(defaultNewBank, _super);
    function defaultNewBank(configUrl) {
        var _this = _super.call(this, configUrl) || this;
        _this.frameCounter = 0;
        return _this;
    }
    Object.defineProperty(defaultNewBank, "classAssetName", {
        get: function () {
            return "defaulNewBank";
        },
        enumerable: true,
        configurable: true
    });
    defaultNewBank.prototype.init = function () {
        this.bgAssetName = "defaultNewBank_json.layer_bg";
        this.closeButtonAssetName = "defaultNewBank_json.close_btn";
        _super.prototype.init.call(this);
        for (var i = 0; i < 6; i++) {
            Com.addObjectAt(this, this.createBankItem(GlobelSettings[egret.getQualifiedClassName(this)][i], i), 17, 50 + (5 - i) * 63);
        }
        var title = Com.addBitmapAt(this, GlobelSettings.language + "_head", 0, -60);
        title.x = this.bg.width - title.width >> 1;
        Com.addBitmapAt(this, "defaultNewBank_json.secure", 540, 524);
        var userLevel = eval("PlayerConfig.player('score').level");
        this.addText(this, 15, 524, 400, 30, 25, "left").text = { en: "Coins for level: ", es: "para el nivel: ", pt: "para o n��vel: " }[GlobelSettings.language] + userLevel;
        this.createDailyBar();
    };
    defaultNewBank.prototype.createDailyBar = function () {
        var spinBar = eval('Trigger.instance["spinBar"]');
        if (spinBar.collectTimes >= 4)
            return;
        this.dailyBar = new egret.DisplayObjectContainer;
        Com.addObjectAt(this, this.dailyBar, -58, 345);
        this.coinsBg = Com.addBitmapAt(this.dailyBar, "collect_btn_bg", 317, 108);
        this.coinsBg.filters = [MatrixTool.colorMatrixPure(0xA7FFFF)];
        this.clickTip = this.addText(this.dailyBar, 361, 125, 158, 24, 13);
        this.hourly_bonus_txt = this.addText(this.dailyBar, 362, 156, 155, 30, 24, "center", true, true);
        this.clickTip.text = { en: "Free Hourly Bonus", es: "Bonos a cada dos horas", pt: "B?nus a cada duas horas" }[GlobelSettings.language];
        if (spinBar.enabled) {
            this.enableCollectBonus();
        }
        else {
            this.hourly_bonus_txt.text = Utils.secondToHour(spinBar.leftTime);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }
    };
    defaultNewBank.prototype.onFrame = function (event) {
        if ((this.frameCounter++ & 7) == 0) {
            var spinBar = eval('Trigger.instance["spinBar"]');
            this.hourly_bonus_txt.text = Utils.secondToHour(spinBar.leftTime);
            if (spinBar.leftTime == 0) {
                this.onRemove(null);
                this.enableCollectBonus();
            }
        }
    };
    defaultNewBank.prototype.onRemove = function (event) {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onFrame, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    defaultNewBank.prototype.enableCollectBonus = function () {
        this.clickTip.x = 414;
        this.hourly_bonus_txt.x = 416;
        var userLevel = eval("PlayerConfig.player('score').level");
        this.hourly_bonus_txt.text = "$" + eval("PlayerConfig.player('bonus.hourly_bonuses')")[userLevel];
        var coinData = RES.getRes("coins_json");
        var coinTex = RES.getRes("coins_png");
        var mcf = new egret.MovieClipDataFactory(coinData, coinTex);
        var coin_mc = Com.addMovieClipAt(this.dailyBar, mcf, "coins", -900, -650);
        coin_mc.scaleX = coin_mc.scaleY = 3;
        var tw = egret.Tween.get(coin_mc);
        tw.to({ scaleX: 1, scaleY: 1, x: -47, y: -98 }, 1000, egret.Ease.circIn);
        var arrowMc = new egret.DisplayObjectContainer;
        Com.addObjectAt(this.dailyBar, arrowMc, 4, -5);
        var lightData = RES.getRes("bank_light_json");
        var lightTex = RES.getRes("bank_light_png");
        var lightmcf = new egret.MovieClipDataFactory(lightData, lightTex);
        var light_mc = Com.addMovieClipAt(this.dailyBar, lightmcf, "light", 240, 0);
        light_mc.scaleX = light_mc.scaleY = 0.36;
        Com.addBitmapAt(arrowMc, "defaultNewBank_json.b", 0, 0);
        var arrowMask = Com.addBitmapAt(arrowMc, "defaultNewBank_json.b", 0, 0);
        var light2 = Com.addBitmapAt(arrowMc, "defaultNewBank_json.light2", -46, -100);
        light2.mask = arrowMask;
        var arrowTx = this.addText(arrowMc, 77, 144, 237, 31, 20);
        arrowTx.text = { en: "Click to collect", es: "Haga Clic para Recoger", pt: "Clique para coletar" }[GlobelSettings.language];
        arrowTx.filters = [new egret.DropShadowFilter(2, 45, 0, 0.5, 4, 4, 2, 2)];
        this.lightMove(light2, -46);
        this.arrowMove(arrowMc);
        this.coinsBg.touchEnabled = true;
        mouse.setButtonMode(this.coinsBg, true);
        this.coinsBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCoinsCollect, this);
    };
    defaultNewBank.prototype.addText = function (target, x, y, width, height, size, align, stroke, bold) {
        if (align === void 0) { align = "center"; }
        if (stroke === void 0) { stroke = false; }
        if (bold === void 0) { bold = false; }
        var txt = Com.addTextAt(target, x, y, width, height, size, stroke, bold);
        txt.textAlign = align;
        txt.verticalAlign = "middle";
        return txt;
    };
    defaultNewBank.prototype.lightMove = function (light, startPosX) {
        light.x = startPosX;
        var tw = egret.Tween.get(light);
        tw.to({ x: 320 }, 1000, egret.Ease.circInOut);
        tw.wait(1500);
        tw.call(this.lightMove, this, [light, startPosX]);
    };
    defaultNewBank.prototype.arrowMove = function (arrow) {
        var tw = egret.Tween.get(arrow);
        tw.to({ x: 0 }, 600, egret.Ease.circInOut);
        tw.wait(200);
        tw.to({ x: 4 }, 600, egret.Ease.circInOut);
        tw.call(this.arrowMove, this, [arrow]);
    };
    defaultNewBank.prototype.createBankItem = function (product, index) {
        var coins = product["items"][0];
        var xp = product["items"][1];
        var item = new egret.DisplayObjectContainer();
        if (coins["type"] != "coins")
            throw new Error("product with no coins");
        // ����
        Com.addBitmapAt(item, "defaultNewBank_json.left_bar", 10, 3);
        // �ۿ۰ٷֱ�
        var discount = Com.addTextAt(item, 27, 11, 100, 24, 14, false, true);
        discount.text = coins["coins_discount"] + "% " + Lanuage.getValue("MORE") + "!";
        discount.fontFamily = "Microsoft YaHei";
        discount.textColor = 0x000000;
        // �ۿ�ǰ������
        var beforeDiscount = Com.addBitmapTextAt(item, "Righteous_fnt", 20, 38, "center", 18);
        beforeDiscount.width = 240;
        beforeDiscount.letterSpacing = -3;
        beforeDiscount.text = Utils.formatCoinsNumber(coins["base_coins"]);
        var shp = new egret.Shape;
        shp.graphics.lineStyle(2, 0xFF0000);
        shp.graphics.moveTo(0, 0);
        shp.graphics.lineTo(75, 15);
        shp.graphics.endFill();
        Com.addObjectAt(item, shp, 40, 40);
        Com.addBitmapAt(item, "defaultNewBank_json.bank_discount", 22, 34);
        // �м�bg
        Com.addBitmapAt(item, "defaultNewBank_json.bg_patch_reg", 130, 0);
        var coinPic = Com.addBitmapAt(item, "defaultNewBank_json.coins0" + (index + 1), 0, 0);
        coinPic.x = 143;
        coinPic.y = (58 - coinPic.height) * 0.7 + 6;
        if (index == 5 || index == 3) {
            Com.addBitmapAt(item, "defaultNewBank_json.patch_offer", 133, 48);
            var tx = Com.addTextAt(item, 133, 48, 90, 16, 13);
            tx.textAlign = "center";
            tx.verticalAlign = "middle";
            tx.text = index == 5 ? { en: "BEST", es: "MEJOR", pt: "MELHOR" }[GlobelSettings.language] : "POPULAR";
        }
        // �ۿۺ�������
        var afterDiscount = Com.addBitmapTextAt(item, "Righteous_fnt", 220, 22, "center", 21);
        afterDiscount.width = 270;
        afterDiscount.height = 21;
        afterDiscount.letterSpacing = -2;
        afterDiscount.text = Utils.formatCoinsNumber(coins["after_discount_coins"]);
        // �۸�
        Com.addBitmapAt(item, "defaultNewBank_json.bg_patch_price", 376, 18);
        var price = Com.addTextAt(item, 376, 18, 82, 32, 20, false, true);
        price.text = "R$" + product["price"];
        price.textAlign = "center";
        price.verticalAlign = "middle";
        if (xp && xp["type"] == "double_xp") {
            Com.addBitmapAt(item, "defaultNewBank_json.db_xp", 551, 0);
            var xpTime = Com.addBitmapTextAt(item, "Righteous_fnt", 595, 28, "center", 20);
            xpTime.text = xp["double_xp_duration"];
            var min = Com.addTextAt(item, 622, 38, 35, 20, 14, false, false);
            min.text = "min";
        }
        var btn = Com.addBitmapAt(item, "defaultNewBank_json.buy_btn_" + GlobelSettings.language, 469, 10);
        item.touchEnabled = true;
        mouse.setButtonMode(item, true);
        item.addEventListener(mouse.MouseEvent.MOUSE_OVER, this.itemAnimation.bind(item, 1, item), item);
        item.addEventListener(mouse.MouseEvent.MOUSE_OUT, this.itemAnimation.bind(item, 0, item), item);
        item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.requestBuyProduct.bind(this, product), this);
        return item;
    };
    /**
     * item����
     */
    defaultNewBank.prototype.itemAnimation = function (type, item) {
        egret.Tween.get(item).to({ anchorOffsetX: type * 4 }, 350, egret.Ease.bounceOut);
        egret.Tween.get(item).to({ scaleX: 1 + 0.02 * type, scaleY: 1 + 0.02 * type }, 350, egret.Ease.bounceOut);
    };
    defaultNewBank.prototype.onCoinsCollect = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "collect_bonus";
        this.dispatchEvent(ev);
    };
    /**
     * ����������Ʒ
     */
    defaultNewBank.prototype.requestBuyProduct = function (product) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "buyBankProduct";
        ev["product_hash"] = product["hash"];
        this.dispatchEvent(ev);
    };
    return defaultNewBank;
}(GenericPo));
__reflect(defaultNewBank.prototype, "defaultNewBank");
//# sourceMappingURL=load.js.map