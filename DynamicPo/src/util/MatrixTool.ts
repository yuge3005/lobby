class MatrixTool {
	public constructor() {
	}

	public static colorMatrix( mainChannel: number, otherChannel: number, alphaChannel: number ){
		let matrix : Array<number> = [];
		matrix = matrix.concat( [mainChannel, otherChannel, otherChannel, 0, 0 ] );
		matrix = matrix.concat( [otherChannel, mainChannel, otherChannel, 0, 0 ] );
		matrix = matrix.concat( [otherChannel, otherChannel, mainChannel, 0, 0 ] );
		matrix = matrix.concat( [0, 0, 0, alphaChannel, 0 ] );
		let gcmf: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(matrix);
		return gcmf;
	}

	public static colorMatrixPure( color: number ){
		let matrix : Array<number> = [];
		matrix = matrix.concat( [0, 0, 0, 0, color >> 16 ] );
		matrix = matrix.concat( [0, 0, 0, 0, ( color & 0x00FF00 ) >> 8 ] );
		matrix = matrix.concat( [0, 0, 0, 0, color & 0x0000FF ] );
		matrix = matrix.concat( [0, 0, 0, 1, 0 ] );
		let gcmf: egret.ColorMatrixFilter = new egret.ColorMatrixFilter(matrix);
		return gcmf;
	}
}