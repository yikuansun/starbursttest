var canvas = document.querySelector("canvas");

var starParams = {
    intensity: 10,
    deformationFrequency: 0.006,
    deformationAmount: 1.6,
    hue: 200,
    saturation: 100,
};
for (var input of document.querySelectorAll("form input")) {
    input.addEventListener("input", function() {
        starParams[this.id] = parseFloat(this.value);

        var myBurst = new SpotComponent(512, starParams);
        myBurst.render();
        
        canvas.getContext("2d").drawImage(myBurst.canvas, 0, 0);
    });
}

if (location.hash == "#Photopea") {
    document.querySelector("#photopeaButton").style.display = "inline-block";
}

var myBurst = new SpotComponent(512, starParams);
myBurst.render();

canvas.getContext("2d").drawImage(myBurst.canvas, 0, 0);