class DefaultBank extends GenericPo{

	private coinsBankLayer: CoinsBankLayer;
	private chipsBankLayer: ChipsBankLayer;

	private coinsBankBtn: TouchDownButton;
	private chipsBankBtn: TouchDownButton;

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

		this.coinsBankBtn = Com.addDownButtonAt( this, "defaultBank_json.coins_" + GlobelSettings.language, "defaultBank_json.coins_" + GlobelSettings.language, 10, 27, this.switchTocoinsBank.bind(this), true );
		this.chipsBankBtn = Com.addDownButtonAt( this, "defaultBank_json.dinero_" + GlobelSettings.language, "defaultBank_json.dinero_" + GlobelSettings.language, 380, 27, this.switchTochipsBank.bind(this), true );
		this.buildCurrentBankType( GlobelSettings.bankOpenType );

		Com.addBitmapAt( this, "defaultBank_json.title_line", 350, 21 );
		Com.addBitmapAt( this, "defaultBank_json.title_line", 710, 21 );

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
		this.coinsBankLayer.visible = true;
		this.coinsBankBtn.enabled = false;
		this.chipsBankBtn.enabled = true;
		this.bg.texture = RES.getRes( "defaultBank_json.coins_bg" );
	}

	private showChipsBank(){
		if( this.coinsBankLayer ) this.coinsBankLayer.visible = false;
		if( !this.chipsBankLayer ){
			this.chipsBankLayer = new ChipsBankLayer;
			Com.addObjectAt( this, this.chipsBankLayer, 0, 0 );
		}
		this.chipsBankLayer.visible = true;
		this.coinsBankBtn.enabled = true;
		this.chipsBankBtn.enabled = false;
		this.bg.texture = RES.getRes( "defaultBank_json.dinero_bg" );
	}

	private switchTocoinsBank( event: egret.TouchEvent ){
		this.showCoinsBank();
	}

	private switchTochipsBank( event: egret.TouchEvent ){
		this.showChipsBank();
	}
}