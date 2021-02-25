class LoyaltyVo {

	public static data: Object = {
		"loyalty_level": 1,
		"loyalty_point": 12.8,
		"loyalty_this_level_begin": 10,
		"loyalty_next_level_begin": 100,
		"this_month_purchase_count": "2",
		"privileges": [
			{
				"id": "1",
				"level": "0",
				"purchase_bonus": "0",
				"daily_bonus": "0",
				"hourly_bonus": "0",
				"is_zero": "Yes",
				"daily_bonus_type": "normal",
				"customer_service_type": "Support",
				"earlier_play_game": "no",
				"service_priorities": "ordinary",
				"telephone_verification": "Close"
			},
			{
				"id": "2",
				"level": "1",
				"purchase_bonus": "0.02",
				"daily_bonus": "0.1",
				"hourly_bonus": "0.2",
				"is_zero": "Yes",
				"daily_bonus_type": "normal",
				"customer_service_type": "Support",
				"earlier_play_game": "no",
				"service_priorities": "ordinary",
				"telephone_verification": "Close"
			},
			{
				"id": "3",
				"level": "2",
				"purchase_bonus": "0.04",
				"daily_bonus": "0.15",
				"hourly_bonus": "0.3",
				"is_zero": "Yes",
				"daily_bonus_type": "normal",
				"customer_service_type": "Support",
				"earlier_play_game": "no",
				"service_priorities": "ordinary",
				"telephone_verification": "Close"
			},
			{
				"id": "4",
				"level": "3",
				"purchase_bonus": "0.1",
				"daily_bonus": "0.2",
				"hourly_bonus": "0.4",
				"is_zero": "Yes",
				"daily_bonus_type": "normal",
				"customer_service_type": "Support",
				"earlier_play_game": "no",
				"service_priorities": "ordinary",
				"telephone_verification": "Open"
			},
			{
				"id": "5",
				"level": "4",
				"purchase_bonus": "0.15",
				"daily_bonus": "0.25",
				"hourly_bonus": "0.5",
				"is_zero": "Yes",
				"daily_bonus_type": "Will not restart",
				"customer_service_type": "Support",
				"earlier_play_game": "yes",
				"service_priorities": "priority",
				"telephone_verification": "Open"
			},
			{
				"id": "6",
				"level": "5",
				"purchase_bonus": "0.25",
				"daily_bonus": "0.4",
				"hourly_bonus": "0.8",
				"is_zero": "Yes",
				"daily_bonus_type": "Will not restart",
				"customer_service_type": "Talk to us",
				"earlier_play_game": "yes",
				"service_priorities": "priority",
				"telephone_verification": "Open"
			},
			{
				"id": "7",
				"level": "6",
				"purchase_bonus": "0.3",
				"daily_bonus": "0.5",
				"hourly_bonus": "1",
				"is_zero": "NO",
				"daily_bonus_type": "Will not restart",
				"customer_service_type": "Talk to us",
				"earlier_play_game": "yes",
				"service_priorities": "special",
				"telephone_verification": "Open"
			},
			{
				"id": "8",
				"level": "7",
				"purchase_bonus": "0.1",
				"daily_bonus": "0.1",
				"hourly_bonus": "0.1",
				"is_zero": "NO",
				"daily_bonus_type": "Will not restart",
				"customer_service_type": "Talk to us",
				"earlier_play_game": "yes",
				"service_priorities": "special",
				"telephone_verification": "Open"
			}
		],
		"loyalty_calc_purchase_lt": 1200,
		"loyalty_calc_f": 60
	}

	public constructor() {
	}
}