class Lanuage {

	private static instance: Lanuage;

	private itemList: Object;

	public constructor() {
		this.getItemList();
	}

	public static getValue( key: string, upCase: boolean = false ): string{
		if( !this.instance )this.instance = new Lanuage;
		return upCase ? this.instance.getValueByKey( key ).toUpperCase() : this.instance.getValueByKey( key );
	}

	private getValueByKey( key: string ): string{
		return this.itemList[key][GlobelSettings.language];
	}

	private setItem( en: string, es: string, pt: string, key: string = null ){
		this.itemList[ key ? key : en ] = { en: en, es: es, pt: pt };
	}

	private getItemList(): void{
		this.itemList = {};
		
		this.setItem( "coins", "monedas", "moedas" );
		this.setItem( "for", "por", "por" );
		this.setItem( "find friends", "encuentre a sus amigos", "PROCURAR SEUS AMIGOS" );
		this.setItem( "buy", "comprar", "comprar" );
		this.setItem( "MORE", "Más", "Mais" );
		this.setItem( "spin", "girar", "gire" );
		this.setItem( "Presenteie seus amigos com o Doutor Bingo", "Presenteie seus amigos com o Doutor Bingo", "Presenteie seus amigos com o Doutor Bingo", "SlotsStory Gift" );
		this.setItem( "Moedas grátis para você jogar Doutor Bingo. Aproveite!", "Moedas grátis para você jogar Doutor Bingo. Aproveite!", "Moedas grátis para você jogar Doutor Bingo. Aproveite!", "REQUEST_MESSAGE_GIFT" );		
		this.setItem( "TOMORROW YOU GET", "MAÑANA TU GANARÁS","AMANHÃ VOCÊ GANHARÁ" );
		this.setItem( "collect", "recoger", "coletar" );
		this.setItem( "spin wheel", "ruleta", "roleta" );
		this.setItem( "please wait!", "¡Por favor espere!", "por favor espere!" );
		this.setItem( "FACEBOOK IS AUTHORIZING\n YOUR PURCHASE", "Facebook está autorizando\n su pago", "O FACEBOOK ESTÁ AUTORIZANDO\n A SUA TRANSAÇÃO", "facebook wait" );
		this.setItem( "Doctor Bingo!", "¡Doctor Bingo!", "Doctor Bingo!", "invite title" );
		this.setItem( "Invites you to play Doctor Bingo, Click here to PLAY NOW!", "Convidaram você para jogar Doctor Bingo. Clique aqui para JOGAR AGORA!", "Convidaram você para jogar Doctor Bingo. Clique aqui para JOGAR AGORA!", "invite message" );
	}
}