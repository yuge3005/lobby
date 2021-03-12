class DefaultBank extends GenericPo{

	private coinsBankLayer: CoinsBankLayer;
	private chipsBankLayer: ChipsBankLayer;

	protected static get classAssetName(){
		return "defaultBank";
	}

	public static needZoomOut: boolean = false;

	public constructor( configUrl: string = null ) {
		super( configUrl );
	}

	protected init(){

		this.bg = Com.addBitmapAt( this, "defaultBank_json.coins_bg", 0, 0 );
		this.anchorOffsetX = this.bg.width;
		this.anchorOffsetY = this.bg.height;
		this.bg.scaleX = this.bg.scaleY = 2;

		this.closeButton = Com.addDownButtonAt( this, "defaultBank_json.btn_close", "defaultBank_json.btn_close", ( this.bg.width << 1 ) - 58, -35, this.onClose, true );

		this.buildCurrentBankType( GlobelSettings.bankOpenType );

		this.inited = true;
		this.dispatchEvent( new egret.Event( GenericModal.GENERIC_MODAL_LOADED ) );
	}

	private buildCurrentBankType( type: number ){
		if( type == 0 ) this.showCoinsBank();
		else this.showChipsBank();
	}

	private showCoinsBank(){
		if( this.chipsBankLayer ) this.chipsBankLayer.visible = false;
		if( !this.coinsBankLayer ){
			this.coinsBankLayer = new CoinsBankLayer;
			Com.addObjectAt( this, this.coinsBankLayer, 0, 0 );
		}
		this.bg.texture = RES.getRes( "defaultBank_json.coins_bg" );
	}

	private showChipsBank(){
		if( this.coinsBankLayer ) this.coinsBankLayer.visible = false;
		if( !this.chipsBankLayer ){
			this.chipsBankLayer = new ChipsBankLayer;
			Com.addObjectAt( this, this.chipsBankLayer, 0, 0 );
		}
		this.bg.texture = RES.getRes( "defaultBank_json.dinero_bg" );
	}
}