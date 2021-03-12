class CoinsBankLayer extends egret.DisplayObjectContainer{
	public constructor() {
		super();

		let products: Array<Object> = GlobelSettings.bank;

		for( let i: number = 0; i < products.length; i++ ){
			let bankItem: BankCoinItem = new BankCoinItem( i, products[i] );
			Com.addObjectAt( this, bankItem, 45, 145 * ( 6 - i ) );
			bankItem.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
		}

		this.cacheAsBitmap = true;
	}

	private onTap( event: egret.TouchEvent ): void {
		let ev: egret.Event = new egret.Event( "buyBankProduct" );
		ev["product_hash"] = event.target.hash;
		ev["buy_type"] = 0;
		this.parent.dispatchEvent( ev );
	}
}