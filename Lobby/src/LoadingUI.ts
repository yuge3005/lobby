class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {

    public constructor() {
        super();
    }

    public onProgress(current: number, total: number): void {
        let progress = document.getElementById("loading_progress_div");
        if (progress) {
            progress.style.width = Math.floor(320 * (.18 + current / total * .82)) + "px";
        }
    }
}
