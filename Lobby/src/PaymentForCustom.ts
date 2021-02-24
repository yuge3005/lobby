
class PaymentForCustom extends egret.DisplayObjectContainer{

	private light: egret.Bitmap;

	public static currentPurchaseId: string;
	public static paymentPrice: number;
	public static paymentSuccess: Function;

	private purchaseId: string;
	private succesCallback: Function;

	public constructor() {
		super();

		this.x = 570;
		this.y = 270;
		Com.addBitmapAt( this, "pay_bar", 0, 0 );
		this.light = Com.addBitmapAt( this, "pay_bar_light", -100, 0 );

		this.lightStar();

		Com.addDownButtonAt( this, "close_blue", "close_blue", 282, 12, this.onClose, true );

		this.mask = Com.addBitmapAt( this, "pay_bar_mask", 10, 10 );

		this.purchaseId = PaymentForCustom.currentPurchaseId;
		this.succesCallback = PaymentForCustom.paymentSuccess;

		let tx = Com.addTextAt( this, 10, 0, 280, 49, 20 );
		tx.verticalAlign = "middle";
		tx.textColor = 0x0000FF;
		tx.text = "Pagamento Processando";

		this.delayChecking();
	}

	private lightStar(): void{
		let tw: egret.Tween = egret.Tween.get( this.light );
		tw.to( {x:-18}, 1500 );
		tw.call( this.restartLight, this );
	}

	private restartLight(){
		if( !this.stage )return;
		this.light.x = -100;
		this.lightStar();
	}

	private onClose(){
		if( this.parent )this.parent.removeChild( this );
	}

	private delayChecking(){
		let tw: egret.Tween = egret.Tween.get( this );
		tw.wait( 2000 );
		tw.call( this.checkPurchase, this );
	}

	private checkPurchase(){
		let ob: Object = { mongo_id : this.purchaseId, token: new Date().getTime() };
		// new DataServer().getDataFromUrl(eval("API_HOST") + "/api.php?command=check_com_transaction", this.getPurchaseCallback.bind(this), this, true, ob, null);
		let http = new Http().instance("api.php?command=check_com_transaction", "POST", JSON.stringify(ob), true, this.getPurchaseCallback.bind(this) );
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http.send();

        new DataServer().getDataFromUrl(eval("API_HOST") + "api.php?command=check_com_transaction", this.getPurchaseCallback, this, true, ob);
	}

	private getPurchaseCallback( data: any ){
		data = JSON.parse(data);
		if ( data && data["status"] ){
			// var controller : Controller = Controller.instance;
			if(data.status == 2){
				// controller.cmd('hideModal');					
				// controller.cmd('showModal', 'facebookPayFailed');					
				// showLog( "payment failed" );
				console.error( "pay faild" );
			}
			else if (data.status == 1){
				// if (config['items'][0]['type'] == 'wheel') {
				// 	controller.cmd('hideWindow');
				// 	controller.cmd('hideModal');						
				// 	controller.cmd('showModal', 'hourlyBonus', {above_windows:false, coins:config['items'][0]['coins'], noCloseButton:true,payment_id:checkingPaymentId});
				// }
				// else {
				// 	Server.cmd('refresh_score', {}, onRefreshScore);
				// }
				// alert( "purchase ok! please reload" );

				LoyaltyVo.updateData(data);
				if( this.succesCallback )this.succesCallback( data );
			}
			this.onClose();
		}
		else{
			this.delayChecking();
		}		
	}
}