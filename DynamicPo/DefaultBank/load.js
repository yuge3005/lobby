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
        this.closeButton = Com.addDownButtonAt(this, "defaultBank_json.btn_close", "defaultBank_json.btn_close", (this.bg.width << 1) - 58, -35, this.onClose, true);
        this.coinsBankBtn = Com.addDownButtonAt(this, "defaultBank_json.coins_" + GlobelSettings.language, "defaultBank_json.coins_" + GlobelSettings.language, 10, 27, this.switchTocoinsBank.bind(this), true);
        this.chipsBankBtn = Com.addDownButtonAt(this, "defaultBank_json.dinero_" + GlobelSettings.language, "defaultBank_json.dinero_" + GlobelSettings.language, 380, 27, this.switchTochipsBank.bind(this), true);
        this.buildCurrentBankType(GlobelSettings.bankOpenType);
        Com.addBitmapAt(this, "defaultBank_json.title_line", 350, 21);
        Com.addBitmapAt(this, "defaultBank_json.title_line", 710, 21);
        this.inited = true;
        this.dispatchEvent(new egret.Event(GenericModal.GENERIC_MODAL_LOADED));
        GlobelSettings.bonusUI = new DefaultBankHourlyBonusBar;
        Com.addObjectAt(this, GlobelSettings.bonusUI, 761, 21);
    };
    DefaultBank.prototype.buildCurrentBankType = function (type) {
        if (type == 0)
            this.showCoinsBank();
        else
            this.showChipsBank();
    };
    DefaultBank.prototype.showCoinsBank = function () {
        if (this.chipsBankLayer)
            this.chipsBankLayer.visible = false;
        if (!this.coinsBankLayer) {
            this.coinsBankLayer = new CoinsBankLayer;
            Com.addObjectAt(this, this.coinsBankLayer, 0, 0);
        }
        this.coinsBankLayer.visible = true;
        this.coinsBankBtn.enabled = false;
        this.chipsBankBtn.enabled = true;
        this.bg.texture = RES.getRes("defaultBank_json.coins_bg");
    };
    DefaultBank.prototype.showChipsBank = function () {
        if (this.coinsBankLayer)
            this.coinsBankLayer.visible = false;
        if (!this.chipsBankLayer) {
            this.chipsBankLayer = new ChipsBankLayer;
            Com.addObjectAt(this, this.chipsBankLayer, 0, 0);
        }
        this.chipsBankLayer.visible = true;
        this.coinsBankBtn.enabled = true;
        this.chipsBankBtn.enabled = false;
        this.bg.texture = RES.getRes("defaultBank_json.dinero_bg");
    };
    DefaultBank.prototype.switchTocoinsBank = function (event) {
        this.showCoinsBank();
    };
    DefaultBank.prototype.switchTochipsBank = function (event) {
        this.showChipsBank();
    };
    DefaultBank.needZoomOut = false;
    return DefaultBank;
}(GenericPo));
__reflect(DefaultBank.prototype, "DefaultBank");
var CoinsBankLayer = (function (_super) {
    __extends(CoinsBankLayer, _super);
    function CoinsBankLayer() {
        var _this = _super.call(this) || this;
        var products = GlobelSettings.bank;
        for (var i = 0; i < products.length; i++) {
            var bankItem = new BankCoinItem(i, products[i]);
            Com.addObjectAt(_this, bankItem, 45, 145 * (6 - i));
            bankItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        }
        _this.cacheAsBitmap = true;
        return _this;
    }
    CoinsBankLayer.prototype.onTap = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["product_hash"] = event.target.hash;
        ev["buy_type"] = 0;
        ev["cmd"] = "buyBankProduct";
        this.parent.dispatchEvent(ev);
    };
    return CoinsBankLayer;
}(egret.DisplayObjectContainer));
__reflect(CoinsBankLayer.prototype, "CoinsBankLayer");
var ChipsBankLayer = (function (_super) {
    __extends(ChipsBankLayer, _super);
    function ChipsBankLayer() {
        var _this = _super.call(this) || this;
        var products = GlobelSettings.chipBank;
        for (var i = 0; i < products.length; i++) {
            var bankItem = new BankChipItem(i, products[i]);
            Com.addObjectAt(_this, bankItem, 56 + 512 * i, 159);
            bankItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        }
        _this.cacheAsBitmap = true;
        return _this;
    }
    ChipsBankLayer.prototype.onTap = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["product_hash"] = event.target.hash;
        ev["buy_type"] = 1;
        ev["cmd"] = "buyBankProduct";
        this.parent.dispatchEvent(ev);
    };
    return ChipsBankLayer;
}(egret.DisplayObjectContainer));
__reflect(ChipsBankLayer.prototype, "ChipsBankLayer");
var BankCoinItem = (function (_super) {
    __extends(BankCoinItem, _super);
    function BankCoinItem(index, data) {
        var _this = _super.call(this) || this;
        Com.addBitmapAt(_this, "defaultBank_json.bg_single_buycoins", 0, 0);
        Com.addBitmapAtMiddle(_this, "defaultBank_json.coins0" + (6 - index), 120, Math.ceil((5 - index) / 3) % 2 == 1 ? 80 : 100);
        Com.addBitmapAt(_this, "defaultBank_json.flag_extra", 594, 0);
        if (index == 5 || index == 3) {
            var bestBg = Com.addBitmapAt(_this, "defaultBank_json.best", 15, 113);
            bestBg.width = 185;
            bestBg.height = 25;
            var bestTx = Com.addTextAt(_this, 15, 118, 185, 18, 18, false, true);
            if (index == 5) {
                bestTx.text = GlobelSettings.language == "en" ? "BEST OFFER" : (GlobelSettings.language == "pt" ? "MELHOR OFERTA" : "MEJOR OFERTA");
            }
            else if (index == 3) {
                bestTx.text = GlobelSettings.language == "en" ? "MOST POPULAR" : (GlobelSettings.language == "pt" ? "MAIS POPULAR" : "MÁS POPULAR");
            }
        }
        var coinsTx = Com.addLabelAt(_this, 230, 20, 400, 52, 52, true, true);
        coinsTx.textAlign = "left";
        coinsTx.setText(Utils.formatCoinsNumber(data["items"][0]["after_discount_coins"]));
        coinsTx.stroke = 4;
        coinsTx.strokeColor = 0;
        coinsTx.scaleX = 0.8;
        var oldTx = Com.addTextAt(_this, 235, 85, 400, 42, 40, false, true);
        oldTx.textAlign = "left";
        oldTx.textColor = 0x09366F;
        oldTx.text = (GlobelSettings.language == "en" ? "was" : "era").toUpperCase() + " " + Utils.formatCoinsNumber(data["items"][0]["base_coins"]);
        oldTx.scaleX = 0.8;
        var deleteLine = new egret.Shape;
        deleteLine.graphics.beginFill(0x09366F);
        deleteLine.graphics.drawRect(0, 0, oldTx.textWidth * oldTx.scaleX, 8);
        deleteLine.graphics.endFill();
        Com.addObjectAt(_this, deleteLine, 235, 100);
        var extraTxShadow = Com.addTextAt(_this, 596, 18, 206, 36, 36, false, true);
        extraTxShadow.text = "EXTRA";
        extraTxShadow.textColor = 0;
        var extraTx = Com.addTextAt(_this, 594, 14, 206, 36, 36, false, true);
        extraTx.text = "EXTRA";
        var extraNumTxShadow = Com.addLabelAt(_this, 598, 70, 206, 40, 40, false, true);
        extraNumTxShadow.setText(Math.round(data["items"][0]["coins_discount"]) + "%");
        extraNumTxShadow.textColor = 0;
        var extraNumTx = Com.addLabelAt(_this, 594, 68, 206, 40, 40, false, true);
        extraNumTx.setText(Math.round(data["items"][0]["coins_discount"]) + "%");
        var btnBg = Com.addBitmapAt(_this, "buy_btn", 1244, 19);
        btnBg.width = 232;
        var currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        var priceTx = Com.addTextAt(_this, 1244, 57, 290, 35, 35, true, true);
        priceTx.text = (currencyIsBrl ? "R$" : "$") + " " + Utils.formatCoinsNumber(data["price"]);
        priceTx.stroke = 4;
        priceTx.strokeColor = 0x0F7900;
        priceTx.scaleX = 0.8;
        var lpBg = Com.addBitmapAt(_this, "defaultBank_json.loyalty_points_bg", 1023, 6);
        lpBg.width = 210;
        var lp = Com.addBitmapAt(_this, "defaultBank_json.loyalty_points_icon", 1032, 34);
        lp.scaleX = lp.scaleY = 0.7;
        var lpTx = Com.addTextAt(_this, 1107, 48, 135, 50, 50, true, true);
        lpTx.stroke = 3;
        lpTx.strokeColor = 0xFF0000;
        lpTx.scaleX = 0.9;
        lpTx.text = "+" + Math.round(data["loyalty_base_point"]);
        if (Number(data["total_pieces"])) {
            var puzzleBg = Com.addBitmapAt(_this, "defaultBank_json.loyalty_points_bg", 1023 - 215, 6);
            puzzleBg.width = 217;
            var puzzle = Com.addBitmapAt(_this, "defaultBank_json.icon_collection", 847, 15);
            puzzle.scaleX = puzzle.scaleY = 0.7;
            Com.addBitmapAtMiddle(_this, "defaultBank_json.puzzle_number_" + data["total_pieces"], 963, 95);
        }
        _this.hash = data["hash"];
        return _this;
    }
    return BankCoinItem;
}(BankProductItem));
__reflect(BankCoinItem.prototype, "BankCoinItem");
var BankChipItem = (function (_super) {
    __extends(BankChipItem, _super);
    function BankChipItem(index, data) {
        var _this = _super.call(this) || this;
        Com.addBitmapAt(_this, "defaultBank_json.dinero_button_bg", 0, 0);
        Com.addBitmapAtMiddle(_this, "defaultBank_json.dinero_0" + (3 - index), 214, 337);
        Com.addBitmapAt(_this, "defaultBank_json.extra_bg", -18, -12);
        var lp = Com.addBitmapAt(_this, "defaultBank_json.loyalty_points_icon", 163, 580);
        lp.scaleX = lp.scaleY = 0.5;
        var lpTx = Com.addTextAt(_this, 214, 586, 128, 46, 44, false, true);
        lpTx.text = "+" + Math.round(data["loyalty_base_point"]);
        var chipsTx = Com.addTextAt(_this, 0, 670, 480, 60, 56, true, true);
        chipsTx.text = Utils.formatCoinsNumber(data["items"][0]["after_discount_chips"]);
        chipsTx.stroke = 5;
        chipsTx.strokeColor = 0x115F00;
        var oldTx = Com.addTextAt(_this, 0, 750, 480, 42, 40);
        oldTx.bold = true;
        oldTx.textColor = 0x004800;
        oldTx.text = (GlobelSettings.language == "en" ? "was" : "era").toUpperCase() + " " + Utils.formatCoinsNumber(data["items"][0]["base_chips"]);
        var deleteLine = new egret.Shape;
        deleteLine.graphics.beginFill(0x004800);
        deleteLine.graphics.drawRect(0, 0, oldTx.textWidth, 8);
        deleteLine.graphics.endFill();
        Com.addObjectAt(_this, deleteLine, 480 - oldTx.textWidth >> 1, 766);
        var currencyIsBrl = PlayerConfig.player("facebook.currency.currency") == "BRL";
        var priceTx = Com.addTextAt(_this, 0, 32, 480, 44, 44, true, true);
        priceTx.text = (currencyIsBrl ? "R$" : "$") + " " + Utils.formatCoinsNumber(data["price"]);
        priceTx.stroke = 4;
        priceTx.strokeColor = 0x007F10;
        var extraTx = Com.addLabelAt(_this, 0, 55, 130, 40, 40, false, true);
        extraTx.rotation = -45;
        extraTx.scaleX = 0.6;
        extraTx.setText("EXTRA");
        var extraNumTx = Com.addLabelAt(_this, 0, 110, 260, 35, 35, false, true);
        extraNumTx.rotation = -45;
        extraNumTx.scaleX = 0.6;
        extraNumTx.setText(Math.round(data["items"][0]["chips_discount"]) + "%");
        _this.hash = data["hash"];
        return _this;
    }
    return BankChipItem;
}(BankProductItem));
__reflect(BankChipItem.prototype, "BankChipItem");
var DefaultBankHourlyBonusBar = (function (_super) {
    __extends(DefaultBankHourlyBonusBar, _super);
    function DefaultBankHourlyBonusBar() {
        var _this = _super.call(this) || this;
        Com.addBitmapAt(_this, "defaultBank_json.dinero_free_bonus_bg", 0, 0);
        _this.coin = new Coin;
        _this.coin.scaleX = _this.coin.scaleY = 0.5;
        Com.addObjectAt(_this, _this.coin, 15, 38);
        _this.coin.play(-1);
        _this.titleTx = Com.addTextAt(_this, 100, 10, 300, 40, 40);
        _this.titleTx.text = MuLang.getText("free_bonus");
        _this.coinsTx = Com.addTextAt(_this, 100, 54, 300, 32, 32);
        _this.touchChildren = false;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTap, _this);
        return _this;
    }
    DefaultBankHourlyBonusBar.prototype.timerStaus = function (time, status) {
        if (this.coinsChangeingAnimation)
            return;
        if (time > 0)
            this.coinsTx.text = Utils.secondToHour(time);
        else {
            if (!this.touchEnabled)
                this.touchEnabled = true;
            if (status == PlayerConfig.player("bonus.hourly_bonus_count_max")) {
                this.coinsTx.text = GlobelSettings.language == "en" ? "FREE SPINS" : (GlobelSettings.language == "es" ? "JUGADAS GRATIS" : "JOGADA GRÁTIS");
            }
            var hourlyBonuses = PlayerConfig.player("bonus.hourly_bonuses");
            var bonus = hourlyBonuses[PlayerConfig.player("score.level")];
            this.coinsTx.text = Utils.formatCoinsNumber(bonus);
        }
    };
    DefaultBankHourlyBonusBar.prototype.onTap = function (event) {
        var ev = new egret.Event(GenericModal.MODAL_COMMAND);
        ev["cmd"] = "collect_bonus";
        this.parent.dispatchEvent(ev);
    };
    return DefaultBankHourlyBonusBar;
}(CollectHourlyBonusBar));
__reflect(DefaultBankHourlyBonusBar.prototype, "DefaultBankHourlyBonusBar");
//# sourceMappingURL=DefaultBank.js.map