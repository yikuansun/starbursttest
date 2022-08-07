var svg = document.querySelector("svg");
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

var star = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

var numpts = 42;
var points = "";

for (var i = 0; i < numpts; i++) {
    var spokeLength = Math.random() * 2 + 1;
    points += `${
        960 + Math.cos(i * 2 * Math.PI / numpts) * 300 * spokeLength
    },${
        960 + Math.sin(i * 2 * Math.PI / numpts) * 300 * spokeLength
    } `;
    points += `${
        960 + Math.cos((i * 2 + 1) * Math.PI / numpts) * 30
    },${
        960 + Math.sin((i * 2 + 1) * Math.PI / numpts) * 30
    } `;
}

star.setAttribute("points", points);
svg.appendChild(star);
star.style.fill = "white";