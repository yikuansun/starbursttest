class SpotComponent {
    canvas = document.createElement("canvas");
    options = {
        intensity: 10,
        deformationFrequency: 0.006,
        deformationAmount: 1.6,
        hue: 200,
        saturation: 100,
    };
    radius = 1024;

    constructor(radius, options) {
        this.radius = radius;
        for (var opt in options) {
            this.options[opt] = options[opt];
        }
    }

    render() {
        this.canvas.width = this.radius * 2;
        this.canvas.height = this.radius * 2;
        var ctx = this.canvas.getContext("2d");
        ctx.restore();
        ctx.save();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.drawImage((new EllipticalGradient()).canvas, 0, this.options.intensity, this.canvas.width, this.canvas.height - this.options.intensity);

        var deformationTexture = new FractalNoise(this.canvas.width, this.canvas.height, {
            baseFrequency: [this.options.deformationFrequency, 0]
        });
        deformationTexture.render();

        ctx.restore();
        ctx.save();
        ctx.globalCompositeOperation = "soft-light";
        ctx.filter = `saturate(0) contrast(${this.options.deformationAmount})`;
        ctx.drawImage(deformationTexture.canvas, 0, 0);

        ctx.restore();
        ctx.save();
        colorvibrance(ctx, this.options.hue, this.options.saturation);

        polarCoordinatesFilter(ctx);
    }
}