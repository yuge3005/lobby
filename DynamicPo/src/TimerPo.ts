class TimerPo extends GenericModal{

	protected bgAssetName: string;
	protected bg: egret.Bitmap;
	protected closeButtonAssetName: string;
	protected closeButton: ScaleAbleButton;
	protected closeButtonOffset: egret.Point;

	public constructor(configUrl: string = null ) {
		super( configUrl );
	}

	protected init(){
		this.bg = Com.addBitmapAt( this, this.bgAssetName, 0, 0 );
		if( !this.closeButtonOffset ) this.closeButtonOffset = new egret.Point( 0, 0 );

		this.anchorOffsetX = this.bg.width >> 1;
		this.anchorOffsetY = this.bg.height >> 1;

		this.closeButton = Com.addButtonAt( this, this.closeButtonAssetName, this.bg.width + this.closeButtonOffset.x, this.closeButtonOffset.y, this.onClose, 1.4, 1.2 );

		super.init();
	}

	protected onClose( event: egret.TouchEvent ){
		this.dispatchEvent( new egret.Event( GenericModal.CLOSE_MODAL ) );
		SoundManager.play( "close_list_mp3" );
	}

		/**
	 * update deal overplus text
	 */
	protected updateDealOverplusText(time: number): void { }
	
	/**
	 * po overplus over
	 */
	protected poOverplusOver(): void { }
	
	/**
	 * gte loyalty points
	 */
	protected getLoyaltyPoints(basePoint: number): number {
		let loyaltyData = LoyaltyVo.data;
		return Math.min(Math.round(basePoint * (1 + Number(loyaltyData["this_month_purchase_count"]) / Number(loyaltyData["loyalty_calc_f"]))), Number(loyaltyData["loyalty_calc_purchase_lt"]));
	}

	/**
	 * show loyalty privileges
	 */
	protected showLoyaltyPrivileges(): egret.DisplayObjectContainer {
		let loyaltyData = LoyaltyVo.data;
		let result = new egret.DisplayObjectContainer();
		
		// loyalty level icon
		Com.addBitmapAt(result, "loyalty_system_" + GlobelSettings.language + "_json.level_" + (Number(loyaltyData["loyalty_level"]) + 1), 0, 0);

		// text
		let text = Com.addTextAt(result, 0, 88, 101, 60, 32, false, true);
		text.fontFamily = "TCM_conden";
		text.textColor = 0xFECB00;
		text.textFlow = <Array<egret.ITextElement>>[
			{ text: "+", style: { size: 22 } },
			{ text: "" + Number(loyaltyData["privileges"][Number(loyaltyData["loyalty_level"])]["purchase_bonus"]) * 100, style: { size: 32 } },
			{ text: "%\n" + Lanuage.getValue("coins"), style: { size: 22 } }
		];

		return result;
	}
}