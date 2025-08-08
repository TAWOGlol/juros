const loading = document.querySelector(".loading");
const size = loading.height;
const hsize = size/2;

const bola = loading.getContext("2d");
bola.beginPath();
bola.lineWidth = size * 0.1;
bola.lineCap = "round";
bola.strokeStyle = "#FFFFFF";
bola.arc(hsize, hsize, hsize - bola.lineWidth/2, 0, 1.5 * Math.PI);
bola.stroke();