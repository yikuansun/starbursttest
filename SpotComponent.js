class SpotComponent {
    canvas = document.createElement("canvas");
    options = {
        intensity: 10,
        deformationFrequency: 0.006
    };
    size = 1024;

    constructor(size, options) {
        this.size = size;
        for (var opt in options) {
            this.options[opt] = options[opt];
        }
    }

    render() {
        this.canvas.width = this.size;
        this.canvas.height = this.size;
        var ctx = this.canvas.getContext("2d");
    }
}