class FractalNoise {
    canvas = document.createElement("canvas");
    svgFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
    options = {
        baseFrequency: [0.01, 0.01],
        type: "fractalNoise",
        numOctaves: 10,
        seed: 1,
        stitchTiles: "stitch"
    };
    width = 1920;
    height = 1080;

    setOptions(options) {
        for (var opt in options) {
            this.options[opt] = options[opt];
            if (opt == "baseFrequency") this.svgFilter.setAttribute("baseFrequency", options[opt].join(" "));
            else this.svgFilter.setAttribute(opt, options[opt]);
        }
    }

    constructor(width, height, options) {
        this.svgFilter.id = `fNoiseFilter${Math.random().toFixed(8).replace("0.", "")}`;
        this.setOptions(options);
        this.width = width;
        this.height = height;
    }

    render() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        var canv = this.canvas;
        document.body.appendChild(this.svgFilter);

        var ctx = canv.getContext("2d");
        ctx.restore();
        ctx.save();
        ctx.clearRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canv.width, canv.height);
        ctx.restore();
        ctx.save();
        ctx.filter = `url(#${this.svgFilter.id})`;
        ctx.fillRect(0, 0, canv.width, canv.height);

        this.svgFilter.remove();
    }
}