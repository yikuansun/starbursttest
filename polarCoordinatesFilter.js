function polarCoordinatesFilter(ctx) {
    var canvas = ctx.canvas;
    var inputImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var outputImageData = new ImageData(canvas.width, canvas.height);
    var inputData = inputImageData.data;
    var outputData = outputImageData.data;
    var origin = { x: canvas.width / 2, y: canvas.height / 2 };
    var outputX = -1, outputY = 0;
    var inputX = -1, inputY = 0;
    for (var i = 0; i < outputData.length; i += 4) {
        outputX++;
        if (outputX >= canvas.width) {
            outputY++;
            outputX = 0;
        }
        var angle = Math.atan2(outputY - origin.y, outputX - origin.x);
        var radius = Math.sqrt(Math.pow(outputX - origin.x, 2) + Math.pow(outputY - origin.y, 2));
        if (radius > canvas.width / 2) {
            continue;
        }
        inputX = Math.round(angle / Math.PI / 2 * canvas.width);
        inputY = Math.round(radius * 2);
        var inputI = 4 * (inputY * canvas.width + inputX);
        outputData[i] = inputData[inputI];
        outputData[i + 1] = inputData[inputI + 1];
        outputData[i + 2] = inputData[inputI + 2];
        outputData[i + 3] = 255;
    }
    ctx.putImageData(outputImageData, 0, 0);
}