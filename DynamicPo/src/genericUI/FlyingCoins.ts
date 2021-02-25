class FlyingCoins extends egret.DisplayObjectContainer {

	private coinsMcs: Array<Coin>;
	private coinsFly: Array<Coin>;
	
	private startPosition: egret.Point;
	private endPosition: egret.Point;
	private middlePosition: egret.Point;
	private startScale: number;
	private endScale: number;
	private middleScale: number;

	public constructor() {
		super();

		this.coinsMcs = [];
	}

	public fly( coinsCount: number, startPosition: egret.Point, endPosition: egret.Point, middlePosition: egret.Point, startScale: number, endScale: number, middleScale: number ){
		while( this.coinsMcs.length < coinsCount )this.coinsMcs.push( new Coin() );
		this.coinsFly = this.coinsMcs.concat();

		this.startPosition = startPosition;
		this.endPosition = endPosition;
		this.middlePosition = middlePosition;
		this.startScale = startScale;
		this.endScale = endScale;
		this.middleScale = middleScale;
		this.startFly();
		
		SoundManager.play( "collect_coins_mp3" );
	}

	private startFly(){
		if( !this.coinsFly.length )return;
		let coin: Coin = this.coinsFly.shift();
		coin.startPosition = this.startPosition;
		coin.endPosition = this.endPosition;
		coin.middlePosition = this.middlePosition;
		coin.startScale = this.startScale;
		coin.endScale = this.endScale;
		coin.middleScale = this.middleScale;
		coin.rotation = Math.random()*360;
		coin.gotoAndPlay(Math.floor(Math.random()*coin.totalFrames));
		this.addChild( coin );
		coin.play(-1);
		let twX: egret.Tween = egret.Tween.get( coin );
		twX.wait(30);
		twX.call( this.startFly, this );
		twX.to( { factor: 1 }, 800 );
		twX.call( this.endFly, this, [coin] );
	}

	private endFly( coin: Coin ){
		coin.parent.removeChild( coin );
		coin.stop();
		if( this.numChildren === 0 ){
			if( this.parent )this.parent.removeChild( this );
		}
	}
}