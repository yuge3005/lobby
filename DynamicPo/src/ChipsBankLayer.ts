class ChipsBankLayer extends egret.DisplayObjectContainer{
	public constructor() {
		super();

		let products: Array<Object> = GlobelSettings.chipBank;

		for( let i: number = 0; i < products.length; i++ ){
			let bankItem: BankChipItem = new BankChipItem( i, products[i] );
			Com.addObjectAt( this, bankItem, 56 + 512 * i, 159 );
		}
	}
}