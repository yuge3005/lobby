class GameList extends egret.DisplayObjectContainer {
    private static instance: GameList;
    private currentTag: string;
    private gameTypeTag: Array<GameTypeTag>;
    private list: Array<GameIconList>;
    private allIcons: Array<GameIcon>;

    constructor() {
        super();

        GameList.instance = this;

        // game type tag
        this.gameTypeTag = new Array<GameTypeTag>();
        this.currentTag = "favorite";
        ["favorite", "multiplayer", "slot", "bingo"].map((type, index) => {
            let tag = new GameTypeTag(type);
            tag.addEventListener(GameTypeTag.CHANGE_TAG, this.changeGameType, this);
            Com.addObjectAt(this, tag, 0, 200 + index * 150);
            this.setChildIndex(tag, 0);

            tag.active = type === this.currentTag;
            this.gameTypeTag.push(tag);
        });
    }

    /**
     * load game list
     */
    public loadGameList(data: Array<Object>): void {
        this.list = new Array<GameIconList>();
        this.allIcons = new Array<GameIcon>();

        let listArray = [];
        for (let i = 0; i < data.length; i++) {
            let iconList = new GameIconList(data[i]);
            iconList.visible = iconList.category === this.currentTag;
            Com.addObjectAt(this, iconList, 507, 0);

            // get favorite icons
            listArray = listArray.concat(iconList.getFavIcons());

            this.allIcons = this.allIcons.concat(iconList.getAllIcons());
            this.list.push(iconList);
        }

        let favList = {
            "category": "favorite",
            "list": listArray.sort((a, b) => Number(a["fav"]) > Number(b["fav"]) ? 1: -1)
        }
        // favorite list
        let favIconList = new GameIconList(favList);
        Com.addObjectAt(this, favIconList, 507, 0);
        this.list.push(favIconList);
    }

    /**
     * change game type
     */
    private changeGameType(event: egret.Event): void {
        let type = event.data["type"];
        if (type === this.currentTag) return;
        this.currentTag = type;

        let idx = 0;
        this.gameTypeTag.map((tag, index, arr) => {
            tag.active = tag.type === type;
            if (tag.type === type) idx = index;
        });

        this.setTagsSort(idx);

        this.list.map((l) => {
            if (l.category === type) l.visible = true;
            else l.visible = false;
        });
    }

    /**
     * set tags sort
     */
    private setTagsSort(idx: number): void {
        this.gameTypeTag.map((tag, index, arr) => {
            this.setChildIndex(tag, arr.length - Math.abs(idx - index));
        });
        
    }

    /**
	 * check have game unlocked
	 **/
	public checkHaveGameUnlocked(level: number): Array<number> {
		let unlockedGameId = [];
		let games = this.allIcons;
		for (let i = 0; i < games.length; i++) {
			let id = games[i].checkGameIsUnlocked(level);
			if (id > 0) unlockedGameId.push(id);
		}
		return unlockedGameId;
    }

    /**
	 * get unlocked games ID
	 */
	public static getUnlockedGamesID(): Array<number> {
		let result = [];
        GameList.instance.allIcons.map((icon) => {
            let id = icon.unlockedGameID();
			if (id > 0) result.push(id);
        });
		return result;
	}
    
    /**
	 * update loyalty level
	 */
	public updateLoyaltyLevel(level: number): Array<number> {
		let unlockedGameId = [];
        this.allIcons.map((icon) => {
            let id = icon.checkGameIsUnlockedByLoyalty(level);
			if (id > 0) unlockedGameId.push(id);
        });
		return unlockedGameId;
    }
    
    /**
	 * check happy hour status
	 */
	public checkHappyHourStatus(): void {
		for (let i = 0; i < this.allIcons.length; i++) {
			this.allIcons[i].checkHappyHourStatus();
		}
    }
    
    /**
	 * lock all games
	 */
	public lockAllGames(): void {
		if (this.allIcons) {
			this.allIcons.map((icon) => {
				icon.lockToFirstUser();
			});
		}
    }
    
    /**
	 * get unlock icons
	 */
	public getUnlockIcons(): egret.DisplayObjectContainer {
		let result = null;

        this.list.map((l) => {
            if (l.category === "favorite") {
                result = l.getUnlockIcons();
            }
        });

		return result;
    }
    
    /**
	 * show first user tip animation
	 */
	public showFirstUserTipAnimation(): void {
		if (this.allIcons) {
			this.allIcons.map((icon) => {
				icon.showFirstUserTipAnimation();
			});
		}
    }
    
    /**
	 * clear first user tip animation
	 */
	public clearFirstUserTipAnimation(): void {
		if (this.allIcons) {
			this.allIcons.map((icon) => {
				icon.clearFirstUserTip();
			});
		}
	}

	/**
	 * refresh free spin and card icon
	 */
	public refreshFreeSpinAndCardIcon(): void {
		if (this.allIcons) {
			this.allIcons.map((icon) => {
				icon.refreshFreeSpinAndCardIcon();
			});
		}
    }
}