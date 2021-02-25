class PlayerConfig {
	public constructor() {
	}

	public static player( str: string ): string{
		if( str == "facebook.currency.currency" )return "BRL";
		return "BRL";
	}

	public static config( str: string ): string{
		return "com";//"facebook"
	}
}