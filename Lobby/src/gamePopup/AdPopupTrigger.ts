class AdPopupTrigger {
	public constructor() {
	}

	public static doWhateverYuoWant( trigger: Object ){
		if( trigger ){
			let click_behaviour: string = trigger["click_behaviour"];
			if( click_behaviour ){
				if (click_behaviour == "open_machine") {
					Trigger.openGame( trigger["featured"] );
                }
				else if (click_behaviour == "open_piggy") {
					if (GlobelSettings["pigBankPoVo"]) {
						// Trigger.showPigBank();
						return;
					}
				}
				// else if (click_behaviour == "open_loyalty") Trigger.insertModel(LoyaltyPopup);
				// else if (click_behaviour == "open_questionnaire") Trigger.insertModel(QuestionsPopup);
				else if (click_behaviour == "open_gift") {
					// InviteAndGift.fromGift = true;
					// Trigger.insertModel(InviteAndGift);
				}
				// else if (click_behaviour == "open_popup") Trigger.instance.showAdPopup();
				// else if (click_behaviour == "open_po") Trigger.instance.showAdPo();
				else if (click_behaviour == "open_wheel") {
					Wheel.modal = SpinWheel.SpinWheelModel["COINS"];
					Trigger.insertInstance(new SpinWheelVIP);
				}
				else if (click_behaviour == "open_mission_bingo") {
					// MissionVo.initMission("1");
					// if (MissionVo.checkMissionLocked() < 0) Trigger.insertModel(MissionPopupForBingo);
				}
				else if (click_behaviour == "open_mission_slot") {
					// MissionVo.initMission("2");
					// if (MissionVo.checkMissionLocked() < 0) Trigger.insertModel(MissionPopupForSlot);
				}
			}
		}
	}
}