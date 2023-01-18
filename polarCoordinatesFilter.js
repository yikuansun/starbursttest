function polarCoordinatesFilter(ctx) {
    var canvas = ctx.canvas;
    var inputImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var outputImageData = new ImageData(canvas.width, canvas.height);
    var inputData = inputImageData.data;
    var outputData = outputImageData.data;
    var origin = { x: canvas.width / 2, y: canvas.height / 2 };
    for (var i = 0; i < outputData.length; i += 4) {
        var outputCoords = {
            x: (i / 4) % canvas.width,
            y: Math.floor((i / 4) / canvas.width)
        };
        var angle = Math.atan2(outputCoords.y - origin.y, outputCoords.x - origin.x);
        var radius = Math.sqrt(Math.pow(outputCoords.x - origin.x, 2) + Math.pow(outputCoords.y - origin.y, 2));
        if (radius > canvas.width / 2) {
            continue;
        }
        var inputCoords = {
            x: Math.round(angle / Math.PI / 2 * canvas.width),
            y: Math.round(radius * 2)
        };
        var inputI = 4 * (inputCoords.y * canvas.width + inputCoords.x);
        outputData[i] = inputData[inputI];
        outputData[i + 1] = inputData[inputI + 1];
        outputData[i + 2] = inputData[inputI + 2];
        outputData[i + 3] = 255;
    }
    ctx.putImageData(outputImageData, 0, 0);
}