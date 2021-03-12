class GlobelSettings {

    public static bankOpenType: number = 1;

	public constructor() {
	}

	public static get language(): string{
		if( localStorage && ["pt","en","es"].indexOf( localStorage["language"] ) >= 0 )return localStorage["language"];
		return "en";
	}
	public static lanuageNames: Object = {en:"english",es:"spanish",pt:"portuguese"};

	public static get languageName(){
		return this.lanuageNames[this.language];
	}

    // private static platform : String = "com";
	public static get isForCom():Boolean{
		return PlayerConfig.config( "platform" ) == "com";
	}
	public static get isForFacebook():Boolean{
		return PlayerConfig.config( "platform" ) == "facebook";
	}

	public static get currucyIsBRL(): boolean{
		return this.isForFacebook ? PlayerConfig.player( "facebook.currency.currency" ) == "BRL" : true;
	}

	public static New_year_po_2019: Object = {
        "product_id": "19",
        "price_id": "2",
        "price": "3000",
        "currency": "USD",
        "googlePlayID": "id_3usd_v1",
        "appleID": "id_3usd_v1",
        "timer_seconds": null,
        "purchase_count": null,
        "items": [
            {
                "type": "coins",
                "base_coins": 3000,
                "coins_discount": 2200,
                "after_discount_coins": 2817000000
            },
            {
                "type": "double_xp",
                "double_xp_duration": "90"
            }
        ],
        "hash": "Nm40RGNrbVFJdlZKMG5ScVY5U1NRZW9mblBnSjdnQzlQOWlRSHdsNVNHM3E1YUdKOGp1dmFUSS9HckI0QkdjNnRXeFFTMjc4NkxyL0FKSXM3TmhWQS9QYTcwUVRGaEhxUnh6Tk1IUjcxeEdrdEFGMThxY2VsM1B4eVVySlZxYmVpRnhtc205VnNOVDJ0Kzkwd2VCTS83K2dvZUg4d3hZVFNNeXFjWVdHNDRnRHAyalJsaVIveldjeHExMHAvcjhGTEJ6Y3VBbm1aWXV1Y3Brc1dVTTVwMERFNGhxS3NMWXdRZFJSQmpvT0RwTzUzV244TW5MOVpQNFU0bVhQeUljcVExWFg5R3JjTm04c1BTZnpQV3ZnbFJMdU1teWFqT01WMVBZeDlXbU1ob3BwZ0xWREVhVWs4bVVXWDRFU3R6UFlWUnVHbDFCOHRIRUlicWROWlRtejI5WTFFMXkvQXB6R3p5dFZoTlpCd2N4VDFWT0NRbTdCV1R6NFo2bGp4emo0UjRPSFhvZitrUUFhUmdHM1ppODBYTHZCS2Y2U3paekM2Kyt2QytZMmtmRzdiOVQ4OVFoY2RPS0VxNHJ5ckpQazZ5R25WNE5ZbkdzUGFRTHJLejVZSFpqbE5DZFoxemlrWEQzR3YxYmp0b1JsM0E9PTo6yVfHQ5Qdidkfz7SBa4CHPA=="
    }

    public static New_year_popup_2019: Object = {
        "click_behaviour": "open_machine",
        "featured": "71"
    }
    
    public static po_brazil: Object = {
        "product_id": "19",
        "price_id": "2",
        "price": "3000",
        "currency": "USD",
        "googlePlayID": "id_3usd_v1",
        "appleID": "id_3usd_v1",
        "timer_seconds": null,
        "purchase_count": null,
        "items": [
            {
                "type": "coins",
                "base_coins": 3000,
                "coins_discount": 2200,
                "after_discount_coins": 5600000
            },
            {
                "type": "chips",
                "base_chips": 3000,
                "chips_discount": 2200,
                "after_discount_chips": 5600000
            },
            {
                "type": "double_xp",
                "double_xp_duration": "90"
            }
        ],
        "loyalty_base_point": 20,
        "hash": "Nm40RGNrbVFJdlZKMG5ScVY5U1NRZW9mblBnSjdnQzlQOWlRSHdsNVNHM3E1YUdKOGp1dmFUSS9HckI0QkdjNnRXeFFTMjc4NkxyL0FKSXM3TmhWQS9QYTcwUVRGaEhxUnh6Tk1IUjcxeEdrdEFGMThxY2VsM1B4eVVySlZxYmVpRnhtc205VnNOVDJ0Kzkwd2VCTS83K2dvZUg4d3hZVFNNeXFjWVdHNDRnRHAyalJsaVIveldjeHExMHAvcjhGTEJ6Y3VBbm1aWXV1Y3Brc1dVTTVwMERFNGhxS3NMWXdRZFJSQmpvT0RwTzUzV244TW5MOVpQNFU0bVhQeUljcVExWFg5R3JjTm04c1BTZnpQV3ZnbFJMdU1teWFqT01WMVBZeDlXbU1ob3BwZ0xWREVhVWs4bVVXWDRFU3R6UFlWUnVHbDFCOHRIRUlicWROWlRtejI5WTFFMXkvQXB6R3p5dFZoTlpCd2N4VDFWT0NRbTdCV1R6NFo2bGp4emo0UjRPSFhvZitrUUFhUmdHM1ppODBYTHZCS2Y2U3paekM2Kyt2QytZMmtmRzdiOVQ4OVFoY2RPS0VxNHJ5ckpQazZ5R25WNE5ZbkdzUGFRTHJLejVZSFpqbE5DZFoxemlrWEQzR3YxYmp0b1JsM0E9PTo6yVfHQ5Qdidkfz7SBa4CHPA=="
    }
    
    public static King_days: Object = {
        "product_id": "19",
        "price_id": "2",
        "price": "3000",
        "currency": "USD",
        "googlePlayID": "id_3usd_v1",
        "appleID": "id_3usd_v1",
        "timer_seconds": null,
        "purchase_count": null,
        "items": [
            {
                "type": "coins",
                "base_coins": 3000,
                "coins_discount": 2200,
                "after_discount_coins": 123125000000
            },
            {
                "type": "double_xp",
                "double_xp_duration": "90"
            }
        ],
        "hash": "Nm40RGNrbVFJdlZKMG5ScVY5U1NRZW9mblBnSjdnQzlQOWlRSHdsNVNHM3E1YUdKOGp1dmFUSS9HckI0QkdjNnRXeFFTMjc4NkxyL0FKSXM3TmhWQS9QYTcwUVRGaEhxUnh6Tk1IUjcxeEdrdEFGMThxY2VsM1B4eVVySlZxYmVpRnhtc205VnNOVDJ0Kzkwd2VCTS83K2dvZUg4d3hZVFNNeXFjWVdHNDRnRHAyalJsaVIveldjeHExMHAvcjhGTEJ6Y3VBbm1aWXV1Y3Brc1dVTTVwMERFNGhxS3NMWXdRZFJSQmpvT0RwTzUzV244TW5MOVpQNFU0bVhQeUljcVExWFg5R3JjTm04c1BTZnpQV3ZnbFJMdU1teWFqT01WMVBZeDlXbU1ob3BwZ0xWREVhVWs4bVVXWDRFU3R6UFlWUnVHbDFCOHRIRUlicWROWlRtejI5WTFFMXkvQXB6R3p5dFZoTlpCd2N4VDFWT0NRbTdCV1R6NFo2bGp4emo0UjRPSFhvZitrUUFhUmdHM1ppODBYTHZCS2Y2U3paekM2Kyt2QytZMmtmRzdiOVQ4OVFoY2RPS0VxNHJ5ckpQazZ5R25WNE5ZbkdzUGFRTHJLejVZSFpqbE5DZFoxemlrWEQzR3YxYmp0b1JsM0E9PTo6yVfHQ5Qdidkfz7SBa4CHPA=="
    }

    public static JackpotOnFire: Object = {
        "product_id": "19",
        "price_id": "2",
        "price": "3",
        "currency": "USD",
        "googlePlayID": "id_3usd_v1",
        "appleID": "id_3usd_v1",
        "timer_seconds": null,
        "purchase_count": null,
        "items": [
            {
                "type": "coins",
                "base_coins": 3000,
                "coins_discount": 2200,
                "after_discount_coins": 69000
            },
            {
                "type": "double_xp",
                "double_xp_duration": "90"
            }
        ],
        "hash": "Nm40RGNrbVFJdlZKMG5ScVY5U1NRZW9mblBnSjdnQzlQOWlRSHdsNVNHM3E1YUdKOGp1dmFUSS9HckI0QkdjNnRXeFFTMjc4NkxyL0FKSXM3TmhWQS9QYTcwUVRGaEhxUnh6Tk1IUjcxeEdrdEFGMThxY2VsM1B4eVVySlZxYmVpRnhtc205VnNOVDJ0Kzkwd2VCTS83K2dvZUg4d3hZVFNNeXFjWVdHNDRnRHAyalJsaVIveldjeHExMHAvcjhGTEJ6Y3VBbm1aWXV1Y3Brc1dVTTVwMERFNGhxS3NMWXdRZFJSQmpvT0RwTzUzV244TW5MOVpQNFU0bVhQeUljcVExWFg5R3JjTm04c1BTZnpQV3ZnbFJMdU1teWFqT01WMVBZeDlXbU1ob3BwZ0xWREVhVWs4bVVXWDRFU3R6UFlWUnVHbDFCOHRIRUlicWROWlRtejI5WTFFMXkvQXB6R3p5dFZoTlpCd2N4VDFWT0NRbTdCV1R6NFo2bGp4emo0UjRPSFhvZitrUUFhUmdHM1ppODBYTHZCS2Y2U3paekM2Kyt2QytZMmtmRzdiOVQ4OVFoY2RPS0VxNHJ5ckpQazZ5R25WNE5ZbkdzUGFRTHJLejVZSFpqbE5DZFoxemlrWEQzR3YxYmp0b1JsM0E9PTo6yVfHQ5Qdidkfz7SBa4CHPA=="
    }

    public static bank: Array<Object> =  [
        {
            "product_id":"39",
            "price_id":"6",
            "price":"15",
            "currency":"USD",
            "googlePlayID":"id_15usd",
            "appleID":"id_15usd",
            "total_pieces":null,
            "timer_seconds":null,
            "is_locked":false,
            "is_free":false,
            "is_price_locked":false,
            "is_reward_locked":false,
            "is_picture_locked":false,
            "wheel_weight_id":null,
            "position":1,
            "expired_time":"",
            "cooldown_end_time":"",
            "is_purchased":false,
            "loyalty_base_point":15,
            "items":[
                {
                    "type":"coins",
                    "base_coins":525000,
                    "coins_discount":2600,
                    "after_discount_coins":14175000
                }
            ],
            "hash":"RUVvoaY"
        },
        {"product_id":"7","price_id":"10","price":"40","currency":"USD","googlePlayID":"id_40usd","appleID":"id_40usd","total_pieces":null,"timer_seconds":null,"is_locked":false,"is_free":false,"is_price_locked":false,"is_reward_locked":false,"is_picture_locked":false,"wheel_weight_id":null,"position":2,"expired_time":"","cooldown_end_time":"","is_purchased":false,"loyalty_base_point":40,"items":[{"type":"coins","base_coins":1400000,"coins_discount":3900,"after_discount_coins":56000000}],"hash":"VFlRpOD06OlhQpREIdmLRp0iCgZWFSr0="},
        {"product_id":"9","price_id":"13","price":"75","currency":"USD","googlePlayID":"id_75usd","appleID":"id_75usd","total_pieces":null,"timer_seconds":null,"is_locked":false,"is_free":false,"is_price_locked":false,"is_reward_locked":false,"is_picture_locked":false,"wheel_weight_id":null,"position":3,"expired_time":"","cooldown_end_time":"","is_purchased":false,"loyalty_base_point":75,"items":[{"type":"coins","base_coins":2625000,"coins_discount":4500,"after_discount_coins":120750000}],"hash":"TmJPRvL9DOknMDpNfw0="},
        {"product_id":"10","price_id":"15","price":"90","currency":"USD","googlePlayID":"id_90usd","appleID":"id_90usd","total_pieces":null,"timer_seconds":null,"is_locked":false,"is_free":false,"is_price_locked":false,"is_reward_locked":false,"is_picture_locked":false,"wheel_weight_id":null,"position":4,"expired_time":"","cooldown_end_time":"","is_purchased":false,"loyalty_base_point":90,"items":[{"type":"coins","base_coins":3150000,"coins_discount":4700,"after_discount_coins":151200000}],"hash":"MWZSoLDq392BE"},
        {"product_id":"13","price_id":"19","price":"150","currency":"USD","googlePlayID":"id_150usd","appleID":"id_150usd","total_pieces":"1","timer_seconds":null,"is_locked":false,"is_free":false,"is_price_locked":false,"is_reward_locked":false,"is_picture_locked":false,"wheel_weight_id":null,"position":5,"expired_time":"","cooldown_end_time":"","is_purchased":false,"loyalty_base_point":150,"items":[{"type":"coins","base_coins":5250000,"coins_discount":5300,"after_discount_coins":283500000},{"type":"total_pieces","total_pieces":"1"}],"hash":"a3M2U0N+g=="},
        {"product_id":"14","price_id":"22","price":"200","currency":"USD","googlePlayID":"id_200usd","appleID":"id_200usd","total_pieces":"1","timer_seconds":null,"is_locked":false,"is_free":false,"is_price_locked":false,"is_reward_locked":false,"is_picture_locked":false,"wheel_weight_id":null,"position":6,"expired_time":"","cooldown_end_time":"","is_purchased":false,"loyalty_base_point":200,"items":[{"type":"coins","base_coins":7000000,"coins_discount":5700,"after_discount_coins":406000000},{"type":"total_pieces","total_pieces":"1"}],"hash":"WF5OQ3Y18UNrUazQ=="}
    ]

    public static chipBank: Array<Object> = [
        {
            "product_id":"93",
            "price_id":"2",
            "price":"3",
            "currency":"USD",
            "googlePlayID":"id_3usd_v1",
            "appleID":"id_3usd_v1",
            "total_pieces":null,
            "timer_seconds":null,
            "is_locked":false,
            "is_free":false,
            "is_price_locked":false,
            "is_reward_locked":false,
            "is_picture_locked":false,
            "wheel_weight_id":null,
            "position":1,
            "expired_time":"",
            "cooldown_end_time":"",
            "is_purchased":false,
            "loyalty_base_point":3,
            "items":[
                {
                    "type":"chips",
                    "base_chips":1500,
                    "chips_discount":6,
                    "after_discount_chips":1590
                }
            ],
            "hash":"a1Gg=="
        },
        {"product_id":"94","price_id":"5","price":"10","currency":"USD","googlePlayID":"id_10usd","appleID":"id_10usd","total_pieces":null,"timer_seconds":null,"is_locked":false,"is_free":false,"is_price_locked":false,"is_reward_locked":false,"is_picture_locked":false,"wheel_weight_id":null,"position":2,"expired_time":"","cooldown_end_time":"","is_purchased":false,"loyalty_base_point":10,"items":[{"type":"chips","base_chips":5000,"chips_discount":15,"after_discount_chips":5750}],"hash":"L1ZPaFJD1ONcc="},
        {"product_id":"95","price_id":"11","price":"50","currency":"USD","googlePlayID":"id_50usd","appleID":"id_50usd","total_pieces":null,"timer_seconds":null,"is_locked":false,"is_free":false,"is_price_locked":false,"is_reward_locked":false,"is_picture_locked":false,"wheel_weight_id":null,"position":3,"expired_time":"","cooldown_end_time":"","is_purchased":false,"loyalty_base_point":50,"items":[{"type":"chips","base_chips":25000,"chips_discount":75,"after_discount_chips":43750}],"hash":"dFh2G/O"}
    ]
}

function trace( item ){
	console.log( item );
}