class GameIconsMappingVo {
    private gameID: number;
    private gameName: string;
    private iconID: number;
    private gameSmallIcon: string;
    private favoriteIcon: string;
    private gameURL: string;
    private position: number;

    constructor(gameID: number, gameName: string, gameSmallIcon: string, favoriteIcon: string, gameURL: string = "" ) {
        this.gameID = gameID;
        this.gameName = gameName;
        this.gameSmallIcon = gameSmallIcon;
        this.favoriteIcon = favoriteIcon === "" ? gameSmallIcon: favoriteIcon;
        this.gameURL = gameURL;
    }

    public get(key: string): any {
        if (this[key]) {
            return this[key];
        }
        return null;
    }
}

let GameIconsMapping = {
    "19": new GameIconsMappingVo(19, "American Champion", "american_champion", "", "/champion"), 
    "20": new GameIconsMappingVo(20, "ShowBall3", "showball_3", "", "/showball3"), 
    "21": new GameIconsMappingVo(21, "ShowBall2", "showball_2", "", "/showball2"), 
    "22": new GameIconsMappingVo(22, "ShowBall1", "showball_1", "", "/showball1"), 
    "23": new GameIconsMappingVo(23, "BlackStar", "black_star", "", "/blackstar"), 
    "24": new GameIconsMappingVo(24, "Bingo3", "bingo_3", "", "/bingo3"), 
    "38": new GameIconsMappingVo(38, "NineBalls", "nineballs", "", "/nineball"), 
    "39": new GameIconsMappingVo(39, "Turbo90", "T90", "", "/turbo90"), 
    "41": new GameIconsMappingVo(41, "Pachinko", "pachinko_3", "", "/pachinko3"), 
    "42": new GameIconsMappingVo(42, "Pharaos", "pharao_s", "", "/pharos"), 
    "45": new GameIconsMappingVo(45, "DoubleBingo", "double_bingo", "", "/doubleBingo"), 
    "46": new GameIconsMappingVo(46, "Halloween", "halloween", "", "/halloween"), 
    "47": new GameIconsMappingVo(47, "EraDoGelo", "era_do_gelo", "", "/eraDoGelo"), 
    "48": new GameIconsMappingVo(48, "Prakaramba", "icon_prakaramba", "", "/prakaramba"), 
    "49": new GameIconsMappingVo(49, "SliverBall", "silver_ball", "", "/silverball"), 
    "50": new GameIconsMappingVo(50, "Aztec", "icon_aztecs", "", "/aztec"),
    "51": new GameIconsMappingVo(51, "TurboMania", "turbomania", "", "/turbomania"), 
    "52": new GameIconsMappingVo(52, "VIPBingo", "icon_VIPbingo", "", "/vipbingo"),
    "54": new GameIconsMappingVo(54, "HotBingo", "hot_bingo", "", "/hotbingo"),
    "56": new GameIconsMappingVo(56, "GoldBall", "gold_ball", "", "/goldball"), 
    "57": new GameIconsMappingVo(57, "DoubleTurbo90", "T90s", "", "/doubleTurbo90"), 
    "61": new GameIconsMappingVo(61, "Pachinko2", "pachinko_2", "", "/pachinko2"),
    "62": new GameIconsMappingVo(62, "DoubleMania", "double_mania", "", "/doublemania"),
    "63": new GameIconsMappingVo(63, "HalloweenX", "halloweenX", "", "/halloweenX"),
    "65": new GameIconsMappingVo(65, "BonusBingo", "bonus_bingo", "", "/bonusBingo"),
    "66": new GameIconsMappingVo(66, "Halloween25Line", "25_lines", "", "/halloween25Line"),
    "68": new GameIconsMappingVo(68, "Bonus Bingo", "copacabana", "", "/copacabana"),
    "69": new GameIconsMappingVo(69, "Bingo Bene", "bingo_bene", "", "/bingoBene"),
    "70": new GameIconsMappingVo(70, "SuperGoal", "super-goal", "", "/superGoal"),
    "71": new GameIconsMappingVo(71, "SuperLotto", "lotto", "", "/superLotto"),
    "67": new GameIconsMappingVo(67, "MultyPlayerBingo", "icon_carnaval_long", "carnaval", "/carnaval"),
    "72": new GameIconsMappingVo(72, "Mara", "paris_long", "paris", "/paris"),
    "74": new GameIconsMappingVo(74, "Azores", "mexico_long", "mexico", "/mexico"),
    "75": new GameIconsMappingVo(75, "Blackout", "bingo_glow_long", "bingo_glow", ""),
    "1001": new GameIconsMappingVo(1001, "", "22", null), 
    "COMING_SOON_EMPTY": new GameIconsMappingVo(-1, "", "", null)
};