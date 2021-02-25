class GlobelSettings {
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

    public static defaultNewBank: Array<Object> =  [
        {
            "product_id": "2",
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
                    "coins_discount": 500,
                    "after_discount_coins": 18000
                },
                {
                    "type": "double_xp",
                    "double_xp_duration": "90"
                }
            ],
            "hash": "NHBpWTJqeklWVHZzWWEwNW1nV0x0NEswVTBGNWJsWWxMUVBSeGlwbGxrOG5jZkFpdTJnbjhDNyswT2VsVGJwNXh0ZFdqVVdpYm05OFEzeGl0endURE0vWlBITVFRVURieVBrUHFNLytFSUp0QUVFY1BEYnUvaGVOR1JXcVlJK2NXU1p1SGRnN3NIQ0drUmdKWmp4Vm1PNXF2ODZ4UVBvSncxOWhrMWlvUlJUTzNUcllML01XODlDZzZ2OWZQa1FHVmRwWW9lVXBndTZNblRDUjIwN1Z6akZkMXV2Lzl4Qzk5TjBTYklRUzgzZXNmTVpTeWlXWXVmczJrc1ZieHd1ZDZTUHp3NFB6Ymw1YVBlV1lxK2xRVnI0a2xHZUY5aFcyNmtncUhUSjVEOVJvMkdiZkxHZ2tlNXVmeXpmVXBCVG1ITUs2QWozcVVJL2NaU1Jja0EvNGVPeW1Cd3Z3Y3Q4TnpaTGFmcGQ1eEg4REs2ZVJRbVJuU1RRcGgrdHpJUUpKQXcyK2xmK0lFMVhXOHh1cmNLblAyejBXamZGNW9XRjdsRXJBZ1FHWFY0dU5BMzV1Uk9lUU15Um01dXFsTFZvSUYyYlZCaVFZbHNDeTliRVJHckJDWmN6NUw1a20wMno3Z1JkeGRndUhmdU5Zc3FvMzo6LvIyL5JsV/IoyM2OSUya6w=="
        },
        {
            "product_id": "3",
            "price_id": "3",
            "price": "5",
            "currency": "USD",
            "googlePlayID": "id_5usd",
            "appleID": "id_5usd",
            "timer_seconds": null,
            "purchase_count": null,
            "items": [
                {
                    "type": "coins",
                    "base_coins": 5000,
                    "coins_discount": 600,
                    "after_discount_coins": 35000
                },
                {
                    "type": "double_xp",
                    "double_xp_duration": "90"
                }
            ],
            "hash": "NUJLVTNtSjRCU0xCelBrcHBKL3EyRE5jK2FCeVVFMHVNV2MzeDZ3VzlET0pKNy9aSUpndEFQNC9PMkRrQnFDOWxBQWR0eDBidjdwamh0R3RmL3gvdWdQWCsrV1RPTENub0hOWjI3TnZMRUd4blJiaGVaTGZJSnJPSlBPcWtZbHBaNktzUHNnaXc0aU0zczVjV1p4VEMxMVE4cXMrVmd3WGkyRyt2eG04c2U0aGhHYUp0NmoyZXVkT3NtWlFtRzBkeGF0eTNkYVROWGhrTFFHK2hqU3I3V3FpRFI4VWQ3dThQTGloQkNIOEcwMm12cW9ld2RIYjdzUzRSYWxWWUtSZGdGWWc1SFJSVzRiWW1uZnFLV1FueFlWdVlsTWRXV1NXRFo1aWw4V1dtRFk4YVF3eExLOFpqd3REcHFvdWdBKzFqMWNnZE9MUmxYTWNLRFZYcU9INzB1UmhYMjhtYWc0WXdEOEVlSGNYQ1c3VGhxekh0YnZaSmFmcHV0RmpEV0Y5UFR6d3lCRys5cjVwKzc3QzJnVmNQUlQvOTZWSUdmbWRwWStSQ2ZrYWk5Sm4raDNuWllvTU90M3FTN1c2VkNCVHlOeHMrWXRwQVBzRWtXR1lCdmRETDNSUzNwbjB6eG00d0VReFZFYWs6OvEpdwM911Hjs969xw6X9WQ="
        },
        {
            "product_id": "4",
            "price_id": "4",
            "price": "10",
            "currency": "USD",
            "googlePlayID": "id_10usd",
            "appleID": "id_10usd",
            "timer_seconds": null,
            "purchase_count": null,
            "items": [
                {
                    "type": "coins",
                    "base_coins": 10000,
                    "coins_discount": 700,
                    "after_discount_coins": 80000
                },
                {
                    "type": "double_xp",
                    "double_xp_duration": "90"
                }
            ],
            "hash": "L1lSU2d0TUFheng1aUllY3o2am9EbnZiNXlNM0pZWURXcFJFSVNFMHpET0dXNFUvdVR0ZHJxRDFIcjcrdzhXVFd6OWU4VTBucjJGRUo2b2tzOVhJWlpmMGNGN2FHOXhDSFhxMFlqUXNCQWFDQTVmcnA2cWJUUWFlYUxHNWhDMmdpRS9SeVhPaFZXVHJneFBmSVVxTldyZmFDK2UxajIyMXdHZHRoMlA0c1FibTcxY0ttNTBGblBrdDl5L3ZnV0RLbC9mWGR0cTlPaW5FdVF1R2IrNE5tY3liQlVrZ3FQM285R0xTYnZMcEwrZ1EreUhFUzc4UHNrdUhIeUlhUlllekNoblBWTkRYUEN1YmJCZWpjN3crWmwzUFY1dEhkSGl5R1hYTWFXa3puTVIzQmhsVnc4SEN1dmdQYlhqN0JDRVJQOFoxYWlWNjBLd0dkUEplMUN5cmtMVzhhMHg3bm80UWxBK0dLSDB6V3RxZU5scnJ0NTl3cEFNQTFOdXBvQXBFSFFHWjU5NW1VUTVXWnlvcVJWRkdqRzlkZ3pMMkIrdWxEMVNFUm5YaWhSMExudWZ6K1dGcGxoTmJYZjBXUU9QdUhYb2svT09UelpEVUY1NG5zWXNJejNLT2c4b3h5SFc2ZW12dVhlN1FIYVYrWVE9PTo6H3O4cglS0H2hUlIn8f2cXQ=="
        },
        {
            "product_id": "5",
            "price_id": "5",
            "price": "25",
            "currency": "USD",
            "googlePlayID": "id_25usd",
            "appleID": "id_25usd",
            "timer_seconds": null,
            "purchase_count": null,
            "items": [
                {
                    "type": "coins",
                    "base_coins": 25000,
                    "coins_discount": 800,
                    "after_discount_coins": 225000
                },
                {
                    "type": "double_xp",
                    "double_xp_duration": "90"
                }
            ],
            "hash": "MDNLbVh3b2Y0NjQ2TlEwbXplTG4xdXQyd1ZPVjQ4RUxiM1dNYUVFRWNkNlVGRVVFbkVzdkxtMlk4M2pHWVA4TXpmM3QyNFVqUDFTMm1QYytWd2x2M01OQ29sZzIwcldLRXFQVFZabkQ2TUFTbnhXZG5lZWRnZ0xMSWZraVJFeEJJblU3U1IyS09DeXVmWXhkUEpuU2NHZEJydWQxdzM1MmZ2WFQxUzk3VEtxditJNlk3Rk5sSExSeVgzQmF0cGpwU1BrR2ZIZmU2Mll2RVVtTi93ZytpaGFPc3N3T0dvZkwrdkxFRFJHVENYQjJoOWh2MkZDRFR2ZzhwRTdWdmdyeEc5UUFha1VQVk9EMHVTMFFVbjBMWjBxL2xrbGFZQ09VYzBHMEZDT1JFY0JzVFhtSURHc1FiODlCUSt4Sm41Y0hSUzQ3YWxEVEVTK2ZrcUYwR0M2bEdlWm8yRDRUOWpjQmFOV0YrclJZZXVNSXRZQXFMeWxxS1htUmpEejBBRC80MmxWYzg0dG56V2tOK2FLRDNGZHJkSUx5YjRvQ01DSjZJOThKQklEZWUyS2tyNTNWOVZ6VTVNbzRqYjJiQVByaXhLeURhSUlsN3RDc1FMSDUyUmgyL3NRRzllL0N6d05oemlJRWxDc2tNVCtPa1cwPTo6TQJr1rBryKbwltMa9z/sCQ=="
        },
        {
            "product_id": "6",
            "price_id": "6",
            "price": "35",
            "currency": "USD",
            "googlePlayID": "id_35usd",
            "appleID": "id_35usd",
            "timer_seconds": null,
            "purchase_count": null,
            "items": [
                {
                    "type": "coins",
                    "base_coins": 35000,
                    "coins_discount": 900,
                    "after_discount_coins": 350000
                },
                {
                    "type": "double_xp",
                    "double_xp_duration": "90"
                }
            ],
            "hash": "Z1Z3c0hyR3pseENpTDRjc0VqU1QyK3UxZUJuTTdhelBHa05pU3poNGdZOFBrRFBNTS84YkxYOHR1dGZiTEZoY3JVZWdTdGlWMExUWlBKRlNDRFdzMlNZRzY4UzBYTDVBblhJbWxWcW1yelZDYjNxblZZcU5kTlI4YThxRkliaUpqYkJiSHlLZUVucTJMeW5sNVBzdG9IYzFJT0xHNHJRTk5FVFJ4SThiTTBxTUJkVG1JaEU5TkM2NjUxdS9yY3hQSG9BRmtPa1VycFFaeXRBT2JFYVIyWWd6V0EzMlFId2wvbEFxWGJ5cnJUOStvVmh2TnRMV2RnNTJGdmRSdUdYSHc5SEFKUUhCdWlpazJwcHJMdEF5SmsyTzUyZld6ckhRVlVVd0xHbml1NitzbStidnNLdlp4U0M2ZjJUN21nTG03ejRNaVlYcTRnU25VMFdDemRLYmlNWFN6QlZQY1cxL1BHYmRsWVF6UTNLWi9HY3QwcU9RZ0NqZzFDaXNZNm41ZnMxY0habWJsSnpXVWxUVEV4YUtReUhpS2JLYjdkVWprQndpUWZySjM0ZkNER3c0bmRVWGRoUUlDSnBhS0VtditCTDhHQkVQQkVYKzNNZFVuOXVVVXZwMkdLTEU2a1NNZHR6V1ZUcDJCcnVPZVpvPTo6VpZriecZw0RI0RSEEDIbOw=="
        },
        {
            "product_id": "7",
            "price_id": "7",
            "price": "50",
            "currency": "USD",
            "googlePlayID": "id_50usd",
            "appleID": "id_50usd",
            "timer_seconds": null,
            "purchase_count": null,
            "items": [
                {
                    "type": "coins",
                    "base_coins": 50000,
                    "coins_discount": 1000,
                    "after_discount_coins": 550000
                },
                {
                    "type": "double_xp",
                    "double_xp_duration": "90"
                }
            ],
            "hash": "MkZTSHVSQ2VCQ0ZoalhHbk5meWdBWWxwL1llak9vOXV5cnp3cWlxekhOWHZja29HMk1EZTA3Tm5OZElUdWJMTEllZ0h4Qmc4STBQS0NqZzZiV011bnd5MmkyUnRSMTZlYjd2cnJPd3pHQVROdUpsSHVDR2dpc1hpWE5zWm9yWWVlOGpWcXRDaXBCbjBFZmNFWTFvLzZ2UnoxNTJRelBNeEcwRWZFQTJJS2pVa0JwdndQQ0RZZUtXLzYvbTNBNWc0OVFYVVRBTytmUGJneG1kQUo2c01vZC9GaHRzRkVUOHoyWktvNVVFUVFjRmdlUWQvSG1UZjJQR1dBbWNMeE5XWVRIY0NEVmxVVzMrTHg3YThZOEFZRUZLNnZBMVpySVhRdTdZTmp1UVJQdVFuU3dkRTJKMU9ha04yWXVRZlR6NG9BUno1M25UaElDejdzSXdnVVNObEdwRkRKL2F6NHZrQytpc1Z2bENUYnEwRkJKV2R3L3pEZnVqRlRuTDZlODY0MzZ6aTZ4RTRzbXJsSmZweVNoMTMxc0JnM21tMDNUdjduK2pvMVVDaituWjU4RGR0OXBaa29RWjdZb240SDJNM1hnTmdWekpxUVh1MDJTQ3E3V1c4eXNqQS9aVnNqR0l1UXI0NmNMa1JPNWlnTlA0czo6JMmFmzqs5cKCFF0ZEC+CKg=="
        }
    ]
}

function trace( item ){
	console.log( item );
}