var svg = document.querySelector("svg");
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");


function makeStar(numpts=42, innerRadius=30, burstSize=300) {
    var star = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    var points = "";

    for (var i = 0; i < numpts; i++) {
        var spokeLength = Math.random() * 2 + 1;
        points += `${
            960 + Math.cos(i * 2 * Math.PI / numpts) * burstSize * spokeLength
        },${
            960 + Math.sin(i * 2 * Math.PI / numpts) * burstSize * spokeLength
        } `;
        points += `${
            960 + Math.cos((i * 2 + 1) * Math.PI / numpts) * innerRadius
        },${
            960 + Math.sin((i * 2 + 1) * Math.PI / numpts) * innerRadius
        } `;
    }

    star.setAttribute("points", points);
    svg.appendChild(star);
    star.style.fill = "white";
    star.style.filter = "url(#fastBlur)";
}

function deleteStar() {
    if (document.querySelectorAll("polygon").length) {
        document.querySelector("polygon").remove();
    }
}

makeStar();

var starParams = {
    numpts: 42,
    innerRadius: 30,
    burstSize: 300,
    blurAmount: 4,
};
for (var input of document.querySelectorAll("form input")) {
    input.addEventListener("input", function() {
        starParams[this.id] = parseFloat(this.value);
        deleteStar();
        makeStar(
            starParams.numpts,
            starParams.innerRadius,
            starParams.burstSize
        );
        document.querySelector("#fastBlur feGaussianBlur").setAttribute("stdDeviation", starParams.blurAmount);
    });
}

if (location.hash == "#Photopea") {
    document.querySelector("#photopeaButton").style.display = "inline-block";
}

var myBurst = new SpotComponent(512, {
    intensity: 25,
    deformationFrequency: 0.006
});
myBurst.render();
document.body.appendChild(myBurst.canvas);