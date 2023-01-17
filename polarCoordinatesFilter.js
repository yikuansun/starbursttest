function polarCoordinatesFilter(ctx) {
    var iToXY = function(i, imgWidth, imgHeight) {
        return {
            x: (i / 4) % imgWidth,
            y: Math.floor((i / 4) / imgWidth)
        };
    };
    var xYToI = function(x, y, imgWidth, imgHeight) {
        return 4 * (y * imgWidth + x);
    };
    var inputImageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    var outputImageData = new ImageData(ctx.canvas.width, ctx.canvas.height);
    var inputData = inputImageData.data;
    var outputData = outputImageData.data;
    for (var i = 0; i < inputData.length; i += 4) {
        var inputCoords = iToXY(i, ctx.canvas.width, ctx.canvas.height);
        var angle = inputCoords.x / ctx.canvas.width * 2 * Math.PI;
        var radius = inputCoords.y / 2;
        var targetCoords = {
            x: Math.round(ctx.canvas.width / 2 + Math.sin(angle) * radius),
            y: Math.round(ctx.canvas.height / 2 - Math.cos(angle) * radius)
        };
        var targetI = xYToI(targetCoords.x, targetCoords.y, ctx.canvas.width, ctx.canvas.height);
        for (var j = 0; j < 3; j++) {
            outputData[targetI + j] = inputData[i + j];
        }
        outputData[targetI + 3] = 255;
    }
    console.log(outputData)
    ctx.putImageData(outputImageData, 0, 0);
}