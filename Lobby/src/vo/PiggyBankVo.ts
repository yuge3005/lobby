
/**
 * piggy bank vo
 */
class PiggyBankVo {
    private static _enable: boolean = false;
    private static _price: number;
    private static _savedCoinsNumber: number;
    private static _loyaltyPointNumber: number;
    private static _extraCoinsNumber: number;
    private static _haveFreeWheel: boolean = false;
    private static _wheel: Array<number>;
    private static _pigBankLevel: Array<number>;
    private static _hash: string;

    private static _instance: any;

    /**
     * init piggy gank vo
     */
    public static init(data: any): void {
        let product = data["product"];
        if (typeof product !== "undefined" && product !== null) {
            this._enable = true;

            if (!this._pigBankLevel || this._pigBankLevel.length === 0) {
                this._pigBankLevel = <Array<number>>PlayerConfig.player("pig_bank");
            }
            this._loyaltyPointNumber = Number(product["loyalty_base_point"]);
            this._price = Number(product["price"]);
            this._hash = product["hash"];

            this._savedCoinsNumber = -1;
            this._extraCoinsNumber = -1;
            this._haveFreeWheel = false;
            this._wheel = [];
            for (let i in product["items"]) {
                switch (product["items"][i]["type"]) {
                    case "pig_coins":
                        this._savedCoinsNumber = Number(product["items"][i]["coins"]);
                        break;
                    case "pig_extra_coin":
                        this._extraCoinsNumber = Number(product["items"][i]["pig_extra_coin"]);
                        break;
                    case "wheel":
                        this._haveFreeWheel = true;
                        this._wheel = <Array<number>>product["items"][i]["coins"];
                        break;
                }
            }
        } else this._enable = false;
    }

    public static clear() {
        this._enable = false;
        this._price = 0;
        this._savedCoinsNumber = -1;
        this._extraCoinsNumber = -1;
        this._loyaltyPointNumber = -1;
        this._haveFreeWheel = false;
        this._wheel = [];
        this._hash = "";
        this._instance = null;
    }

    public static get enable(): boolean {
        return this._enable;
    }

    public static set savedCoins(coins: number) {
        if (this._instance && this._instance["updateSavedCoins"]) this._instance["updateSavedCoins"](this._savedCoinsNumber, coins);
        this._savedCoinsNumber = coins;
    }

    public static get savedCoins(): number {
        return this._savedCoinsNumber;
    }

    public static get price(): string {
        let isBRL = GlobelSettings.currucyIsBRL;
        return (isBRL ? "R$" : "$") + (isBRL ? 4 : 1) * Number(this._price);
    }

    public static get loyaltyPointNumber(): number {
        return this._loyaltyPointNumber;
    }

    public static get extraCoinsNumber(): number {
        return this._extraCoinsNumber;
    }

    public static get haveFreeWheel(): boolean {
        return this._haveFreeWheel;
    }

    public static get wheel(): Array<number> {
        return this._wheel;
    }

    public static get level(): number {
        if (!this._pigBankLevel || this._pigBankLevel.length === 0) return 0;
        if (this._savedCoinsNumber < Number(this._pigBankLevel[0]["coins"])) return 0;
        for (let i = 0; i < this._pigBankLevel.length - 1; i++) {
            if (this._savedCoinsNumber >= Number(this._pigBankLevel[i]["coins"]) && this._savedCoinsNumber < Number(this._pigBankLevel[i + 1]["coins"])) return Math.floor(i / 2);
        }
        return 2;
    }

    public static set instance(instance: GenericPo) {
        this._instance = instance;
    }

    public static get instance() {
        return this._instance;
    }

    public static get hash(): string {
        return this._hash;
    }
}