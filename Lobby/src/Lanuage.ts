class Lanuage {
	public constructor() {
	}

	public static getValue( key: string, type: boolean = false ): string{
		return MuLang.getText( key, type ? 1 : 0 );
	}
}