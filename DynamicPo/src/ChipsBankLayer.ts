class ChipsBankLayer extends egret.DisplayObjectContainer{
	public constructor() {
		super();

		let products: Array<Object> = GlobelSettings.chipBank;

		for( let i: number = 0; i < products.length; i++ ){
			let bankItem: BankChipItem = new BankChipItem( i, products[i] );
			Com.addObjectAt( this, bankItem, 56 + 512 * i, 159 );
			bankItem.touchChildren = false;
			bankItem.touchEnabled = true;
			bankItem.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onTap, this );
		}
	}

	private onTap( event: egret.TouchEvent ): void {
		let ev: egret.Event = new egret.Event( "buyBankProduct" );
		ev["product_hash"] = event.target.hash;
		ev["buy_type"] = 1;
		this.parent.dispatchEvent( ev );
	}
}