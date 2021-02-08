class PlayerConfig {
	private static configObject: JSON;
	private static playerObject: JSON;
	private static timestampGap: number;

	public constructor() {}

	/**
	 * 初始化, 获取网络配置和用户信息
	 */
	public static init():void {
		let config = null;
		let player = null;

		try {
			config = eval("getConfig()");
		} catch(e) {
			console.error(e);
		}

		try {
			player = eval("getPlayer()");
		} catch(e) {
			console.error(e);
		}

		if (typeof config === "undefined" || config === null || typeof player === "undefined" || player === null) {
			console.error("can not get player or config information, please refresh again.");
			return;
		}
		
		if (typeof config === "string") {
			config = JSON.parse(config);
		}

		if (typeof player === "string") {
			player = JSON.parse(player);
		}

		this.configObject = config;
		this.playerObject = player;

		// if( GlobelSettings.isForCom ) player.facebook = player.custom;
		// PlayerConfig.player("platform", "com");

		this.initExternalContents(player["external_contents"], config["version_po"] );
		// Wheel.setBonus(player["bonus"]);

		// get timestamp gap
		let localTimestamp = Math.floor(new Date().valueOf() / 1000);
		PlayerConfig.timestampGap = Number(PlayerConfig.player("time")) - localTimestamp;

		// // auto time
		// let autoTimeTimer = new egret.Timer(1000, 0);
		// autoTimeTimer.addEventListener(egret.TimerEvent.TIMER, function () {
		// 	this.playerObject["time"] = Math.floor(new Date().valueOf() / 1000) + PlayerConfig.timestampGap;

		// 	if (this.playerObject["time"] > Number(this.playerObject["mission"]["task_reset_time"])) {
		// 		if (Lobby.getInstance()) Lobby.getInstance().lockMission(2);
		// 	}
		// }, this);
		// autoTimeTimer.start();
	}

	/**
	 * 获取玩家数据, 或修改玩家数据
	 * @param parameter 要获取的参数名称, 层级之间以.拼接成字符串,如PlayerConfig.player("facebook.id")
	 * 					the name that key for you want get some value from player
	 * @param value 要修改参数的值,如PlayerConfig.player("score.coins", 41230000)
	 * 					the value that update with @parameter
	 * @param force 是否强制更改参数值(当value为null)
	 */
	public static player(parameter: string, value: any = null, force: boolean = false):any {
		if (!this.playerObject) return null;
		
		let player = this.playerObject;
		if (parameter && parameter !== "") {
			if (parameter.indexOf(".")>=0) {
				let valueIndex = null;
				parameter.split(".").map((param: string) => {
					try{
						if (param !== "") {
							player = player[param];
							if (value!==null || force) {
								if (typeof valueIndex==="undefined" || valueIndex===null) valueIndex = "";
								valueIndex += "[\"" + param + "\"]"
							}
						}
					} catch(e) {
						player = null;
						valueIndex = null;
					}
				});
				if (valueIndex!==null) {
					eval("this.playerObject" + valueIndex + " = value;");
				}
			} else {
				if (value !== null || force) eval("this.playerObject[\"" + parameter + "\"] = value;");
				player = this.playerObject[parameter];
			}
		}

		return typeof player === "undefined" || player === null ? null : player;
	}

	/**
	 * 获取配置数据, 或修改配置值
	 * @param parameter 要获取的参数名称, 层级之间以.拼接成字符串,如PlayerConfig.config("http")
	 * 					the name that key for you want get some value from player
	 * @param value 要修改参数的值,如PlayerConfig.config("host", "127.0.0.1")
	 * 					the value that update with @parameter
	 */
	public static config(parameter: string, value: any = null):any {
		if (!this.configObject) return null;

		let config = this.configObject;
		if (parameter && parameter !== "") {
			if (parameter.indexOf(".")>=0) {
				let valueIndex = null;
				parameter.split(".").map((param: string) => {
					try{
						if (param !== "") {
							config = config[param];
							if (value!==null) {
								if (typeof valueIndex==="undefined" || valueIndex===null) valueIndex = "";
								valueIndex += "[\"" + param + "\"]"
							}
						}
					} catch(e) {
						config = null;
						valueIndex = null;
					}
				});
				if (valueIndex!==null) {
					eval("this.configObject" + valueIndex + " = value;");
				}
			} else {
				if (value !== null) eval("this.configObject[\"" + parameter + "\"] = value;");
				config = this.configObject[parameter];
			}
		}

		return typeof config === "undefined" || config === null ? null : config;
	}

	/**
	 * 初始化popups
	 */
	private static initExternalContents(dataSource: JSON, version_po: string ):void {
		let list = dataSource["list"];
		if (list && list.length>0) {
			for (let i=0; i<list.length; i++) {
				switch (list[i].type) {
					case "pig_bank":
					case "bank":
					case "chipbank":
					case "po":
					case "popup":
						if (list[i].type === "pig_bank") PiggyBankVo.init(list[i]);
						if (list[i].type === "bank") Bank.init(list[i]);
						if (list[i].type === "chipbank") ChipBank.init(list[i]);

						if( list[i]["art"] && list[i]["art"].length ){
							let poPath: string = list[i]["art"][0]["file"]["file_id_html5"];
							if (poPath.indexOf(".swf") < 0 && poPath.indexOf(".png") < 0 ) {
								let className: string = poPath.replace(/.*\/(.*)\//, "$1"), products = list[i]["products"];
								
								if (className === "" || className === "assets") continue;
								if (list[i].type !== "popup" && !list[i]["products"]) continue;

								// coins bank and chips bank
								if (list[i].type === "bank" || list[i].type === "chipbank") {
									let isABtest = this.playerObject["ab"] && this.playerObject["ab"]["bank_art"] === "blocky";
									if (isABtest) {
										className += "_B";
										poPath = poPath.substring(0, poPath.length - 1) + "_B/";
									}
									if (!GlobelSettings.bankPoVo) {
										GlobelSettings.bankPoVo = new PoVo(className, poPath + "load.js" + "?" + version_po, poPath + "data.res.json");
									}
									if (typeof GlobelSettings[className] === "undefined") GlobelSettings[className] = {};
									GlobelSettings[className][list[i].type] = products;
									GlobelSettings["bankVersionClass"] = className;
								} else if (list[i]["type"] === "pig_bank") {
									let product = (products && products.length > 0) ? products[0]: null;
									if (!product) continue;
									GlobelSettings.pigBankPoVo = new PoVo(className, poPath + "load.js" + "?" + version_po, poPath + "data.res.json");
									if (list[i]["triggers"]) {
										Trigger.registTrigger(list[i]["triggers"], className, poPath + "load.js" + "?" + version_po, poPath + "data.res.json");
									}
									
									GlobelSettings[className] = product;
								} else {
									if (list[i].type === "po") {
										let product = (products && products.length > 0) ? products[0]: null;
										if (!product) continue;

										Trigger.registPo(list[i]["triggers"], className, poPath + "load.js" + "?" + version_po, poPath + "data.res.json");

										// time limit
										if (typeof list[i]["timer_seconds"] !== "undefined" && list[i]["timer_seconds"] !== null) {
											let currentTime = Number(this.playerObject["time"]);
											let expiredTime = Number(list[i]["expired_time"]);
											let cooldownTime = Number(list[i]["cooldown_end_time"]);
											Trigger.registLimits(className, Number(product["product_id"]), expiredTime - currentTime, cooldownTime - currentTime);
										}

										GlobelSettings[className] = product;
									} else if (list[i].type === "popup") {
										// time limit
										if (typeof list[i]["display_start_time"] !== "undefined" && list[i]["display_start_time"] !== null &&
											typeof list[i]["display_end_time"] !== "undefined" && list[i]["display_end_time"] !== null) {
											let startTime = MDS.transformUTCStringToDate(list[i]["display_start_time"]).valueOf();
											let endTime = MDS.transformUTCStringToDate(list[i]["display_end_time"]).valueOf();
											Trigger.registPopupLimits(className, null, startTime, endTime);
										}

										GlobelSettings[className] = list[i]["triggers"];
										if(list[i].click_show_game_id) GlobelSettings[className].featured = list[i].click_show_game_id;
									}

									Trigger.registTrigger(list[i]["triggers"], className, poPath + "load.js" + "?" + version_po, poPath + "data.res.json");
								}
							}
							// lobby ads feature
							else if( poPath.indexOf(".png") > 0 && list[i].triggers ){
								let lanIndex: number = 0;
								if( MuLang.language == "pt" ) lanIndex = 1;
								else if( MuLang.language == "es" ) lanIndex = 2;
								poPath = list[i]["art"][lanIndex]["file"]["file_id_html5"];
								FeatureVo.pushAds({
									"name": list[i]["name"],
									"poPath": poPath,
									"data": list[i]
								});
								GlobelSettings[list[i]["name"]] = list[i]["triggers"];
							}
						}
						break;
					case "wheel": 
						Wheel.init(list[i]);
						break;
					case "variables": 
						Variable.init(list[i]);
						break;
					case "bonus": 
						Link.init(list[i]);
						break;
					case "wheel_purchased":
						SpinWheelVo.pushWheelData(list[i]);
						break;
					default: break;
				}
			}
		}
	}

	public static updateUser():void {
		
	}

	public static get properties(): string {
		return localStorage.getItem("user_account_info");
	}
}