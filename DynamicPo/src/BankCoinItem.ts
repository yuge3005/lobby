class BankCoinItem extends BankProductItem{

	public constructor( index: number, data: Object ) {
		super();

		Com.addBitmapAt( this, "defaultBank_json.bg_single_buycoins", 0, 0 );
		Com.addBitmapAt( this, "defaultBank_json.flag_extra", 594, 0 );
	}
}