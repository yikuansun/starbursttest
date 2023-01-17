var canvas = document.querySelector("canvas");

var starParams = {
    intensity: 10,
    deformationFrequency: 0.006,
    deformationAmount: 1.6,
    hue: 200,
    saturation: 100,
};

var myBurst = new SpotComponent(512, starParams);

for (var input of document.querySelectorAll("form input")) {
    input.addEventListener("change", function() {
        starParams[this.id] = parseFloat(this.value);
        
        myBurst.options = starParams;
        myBurst.render();
        canvas.getContext("2d").drawImage(myBurst.canvas, 0, 0);
    });
}

if (location.hash == "#Photopea") {
    document.querySelector("#photopeaButton").style.display = "inline-block";
}

myBurst.render();

canvas.getContext("2d").drawImage(myBurst.canvas, 0, 0);