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
        var watch = new Timer();

        this.canvas.width = this.radius * 2;
        this.canvas.height = this.radius * 2;
        var ctx = this.canvas.getContext("2d");
        ctx.restore();
        ctx.save();
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        watch.start();
        ctx.drawImage(prerenderedEllipticalGradient, 0, this.options.intensity, this.canvas.width, this.canvas.height - this.options.intensity);
        watch.stop();
        console.log("gradient:", watch.timeElapsed);

        watch.start();
        var deformationTexture = new FractalNoise(this.canvas.width, this.canvas.height, {
            baseFrequency: [this.options.deformationFrequency, 0]
        });
        deformationTexture.render();
        watch.stop();
        console.log("generate deformation:", watch.timeElapsed);

        ctx.restore();
        ctx.save();
        watch.start();
        ctx.globalCompositeOperation = "soft-light";
        ctx.filter = `saturate(0) contrast(${this.options.deformationAmount})`;
        ctx.drawImage(deformationTexture.canvas, 0, 0);
        watch.stop();
        console.log("draw deformation:", watch.timeElapsed);

        ctx.restore();
        ctx.save();
        watch.start();
        colorvibrance(ctx, this.options.hue, this.options.saturation);
        watch.stop();
        console.log("colorize:", watch.timeElapsed);

        watch.start();
        polarCoordinatesFilter(ctx);
        watch.stop();
        console.log("polar coords:", watch.timeElapsed);
    }
}