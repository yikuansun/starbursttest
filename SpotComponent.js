class SpotComponent {
    canvas = document.createElement("canvas");
    options = {
        intensity: 10,
        deformationFrequency: 0.006
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
    }
}