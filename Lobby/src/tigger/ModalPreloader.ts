class ModalPreloader extends egret.DisplayObjectContainer{

	private entity: egret.Bitmap;

	public constructor() {
		super();

		this.entity = Com.addBitmapAt(this, "modalGeneric_json.loader", 0, 0);
		this.entity.anchorOffsetX = this.entity.width >> 1;
		this.entity.anchorOffsetY = this.entity.height >> 1;

		this.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAdd, this );
	}

	private onAdd( event: egret.Event ){
		this.addEventListener( egret.Event.REMOVED_FROM_STAGE, this.onRemove, this );
		egret.Tween.get(this.entity, {loop: true}).to({rotation: 1800}, 7200);
	}

	private onRemove( event: egret.Event ){
		this.removeEventListener( egret.Event.REMOVED_FROM_STAGE, this.onRemove, this );
		egret.Tween.removeTweens(this.entity);
	}
}