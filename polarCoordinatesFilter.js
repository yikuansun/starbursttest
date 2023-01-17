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
    var origin = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 };
    for (var i = 0; i < outputData.length; i += 4) {
        var outputCoords = iToXY(i, ctx.canvas.width, ctx.canvas.height);
        var angle = Math.atan2(outputCoords.y - origin.y, outputCoords.x - origin.x);
        var radius = Math.sqrt(Math.pow(outputCoords.x - origin.x, 2) + Math.pow(outputCoords.y - origin.y, 2));
        if (radius > ctx.canvas.width / 2) {
            continue;
        }
        var inputCoords = {
            x: Math.round(angle / Math.PI / 2 * ctx.canvas.width),
            y: Math.round(radius * 2)
        };
        var inputI = xYToI(inputCoords.x, inputCoords.y, ctx.canvas.width, ctx.canvas.height);
        outputData[i] = inputData[inputI];
        outputData[i + 1] = inputData[inputI + 1];
        outputData[i + 2] = inputData[inputI + 2];
        outputData[i + 3] = 255;
    }
    ctx.putImageData(outputImageData, 0, 0);
}