class PlayerConfig {
	public constructor() {
	}

	public static player( str: string ): any{
		if( str == "facebook.currency.currency" )return "BRL";
		return "BRL";
	}

	public static config( str: string ): any{
		return "com";//"facebook"
	}
}