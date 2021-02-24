class Payment {
	private static hash:string = "";

	public constructor() {
		Payment.setHash("UmFwUWZERUtZQzZEb0MvaHJsM1p4dW12NXlFNjFHQUR5czBBSnRBQmFmNUh1L3UzdEVqWmEwRXVMaTV0eGRCcXJ1aiszUW8wbnpWOHkzS3B5YWtQUlpZS" +
                    "E5JMmxuYk1lMS9nNVB3K09EMWhiSERRNkRPRDNLZ3RlY1NIb0RsZGZvdWFiV043MHJ6TDdocVQyeUtiTzQ1VzFEd0dRNmFHb2dtVkhoelBEYllVTWF1" +
                    "VDdDZ2dGQXZTRFdybkNzMTBzSTYyYVVycDJ6U0l4U0RSbWF5a3pzZ2dTQ1dCNzlmZWZCOEVQN3pxUG9EUGZJeWUxUXF2Rkd1aVdqN3ZiRzZ4aDBRZHp" +
                    "SbTdzYjhUMHgxT3R2WVNIcWIvNkUyN0pMVlh6TnRuTElBMGZzQmo2NnpiUkM5OTFEYy9zTVk3RUZxcjUzbjZYaTNhMUpXWDZodmlYWUM0STdMb0p0bD" +
                    "hNWDAxQmFuWm1mSkYzOHFxR09oUUxDeWxPUzdUdXpoTjlReXRnRW9WMjRGK1NFVkdGMTFtSzdnLzAyL05WVlpkdVliNTAwd0UwQ1pwUXd4VXRSa2E4N" +
                    "EhqQzJ2ak9Za08rbGZocHVuTy9nYmczZWNPTGFUQk1mbXF2SmRlYnJUcEpFYms9OjrCZBzCfgoXbQ/6huyqPN6X");
	}

	public buy( hash: string, paymentSuccess: Function = null, paymentFailed: Function = null ):void {
		let ob = {
			hash: encodeURIComponent( hash ),
			seed: Math.floor(Math.random() * 100000000),
            fb: PlayerConfig.player("facebook.id"),
            debug: {}
		}

		let callback = function (data) {
			data = typeof data === "string" ? eval("(" + data + ")") : data;
			// if( GlobelSettings.isForFacebook ){
			// 	if (eval("FB")) {
			// 		console.log( "payURL" );
			// 		console.log( eval("API_HOST") + "/fbcurrency/purchase-" + data.id + ".htm" );
			// 		eval("FB").ui({
			// 			"quantity": 1,
			// 			"method": "pay",
			// 			"product": eval("API_HOST") + "/fbcurrency/purchase-" + data.id + ".htm",
			// 			"action": "purchaseitem"
			// 		}, function (response) {
			// 			if (typeof response !== 'undefined') {
			// 				if (response && response.payment_id) {
			// 					let parameters = {
			// 						transaction_id: response.payment_id,
			// 						token: new Date().valueOf()
			// 					};

			// 					new FacebookWait().paymentWait(parameters, paymentSuccess);

			// 					eval("FB").AppEvents.logPurchase( response.amount, response.currency, null );
			// 				} else if (paymentFailed) {
			// 					paymentFailed();
			// 				}
			// 			}
			// 		});
			// 	}
			// } else {
				PaymentForCustom.currentPurchaseId = data.id;
				PaymentForCustom.paymentSuccess = paymentSuccess;
				eval("getPaymentConfirmPopup")(data.id, "en_US");
			// }
        };

		let http = new Http().instance(eval("API_HOST") + "/cmd.php?action=get_product_hash" + ( GlobelSettings.isForCom ? "&platform=com" : "" ), "POST", "json="+JSON.stringify(ob), true, callback );
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http.send();
	}

	public static setHash(hash: string):void {
		if (!this.hash && this.hash === "") {
			this.hash = hash;
		}
	}

	private static getHash():string {
		return this.hash;
	}

	public static paymentPopupClosed(){
		let paymentForcustom = new PaymentForCustom();
		Trigger.instance.stage.addChild( paymentForcustom );
	}
}