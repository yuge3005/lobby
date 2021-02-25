
class TimerPo extends GenericPo{
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
		
		if (Number(loyaltyData["loyalty_level"]) > 0) {
			// loyalty level icon
			let loyaltyIcon = Com.addBitmapAt(result, "loyalty_level_icon_json." + Math.min( 7, Number(loyaltyData["loyalty_level"]) ), 0, 0);
			loyaltyIcon.scaleX = loyaltyIcon.scaleY = .6;

			// text
			let text = Com.addTextAt(result, 0, 118, 130, 52, 32, true, true);
			text.fontFamily = "TCM_conden";
			text.textColor = 0xFECB00;
			text.filters = [new egret.DropShadowFilter(1,90,0x333333,1,4,3,2,2)];
			text.textFlow = <Array<egret.ITextElement>>[
				{ text: "+", style: { size: 28, bold: true } },
				{ text: "" + Number(loyaltyData["privileges"][Number(loyaltyData["loyalty_level"])]["purchase_bonus"]) * 100, style: { size: 38, bold: true } },
				{ text: "%", style: { size: 28, bold: true } }
			];
		}

		return result;
	}

	protected onKeyUp(keyCode: number): void {}
}