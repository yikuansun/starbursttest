class EllipticalGradient {
    canvas = document.createElement("canvas");

    getLuma(distance, maxDistance) {
        return 1 - Math.sqrt(1 - Math.pow(distance / maxDistance - 1, 2));
    }

    constructor() {
        var canv = this.canvas;
        canv.width = 2048;
        canv.height = 2048;
        var ctx = canv.getContext("2d");
        ctx.restore();
        ctx.save();

        ctx.fillRect(0, 0, canv.width, canv.height);

        var iData = ctx.getImageData(0, 0, canv.width, canv.height);
        var data = iData.data;
        for (var i = 0; i < data.length; i += 4) {
            var distFromTop = Math.floor(i / 4 / canv.width);
            var pixelBrightness = this.getLuma(distFromTop, canv.height);
            data[i] = 255 * pixelBrightness;
            data[i + 1] = 255 * pixelBrightness;
            data[i + 2] = 255 * pixelBrightness;
        }
        ctx.putImageData(iData, 0, 0);
    }
}

var prerenderedEllipticalGradient = (new EllipticalGradient()).canvas;