let canvas;
let sec = 5;
let thisInterval;
if (sec > 0) {
	thisInterval = setInterval(function () {
		if (sec === 1) {
			sec = 6
		}
		sec--;
		draw();
	}, 1000);
}


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	textFont('Roboto Mono');
}

function draw() {
	background(0);

	stroke(255);
	noFill();

	let now = new Date();

	let s = sec / 5;

	translate(width / 2, height / 2);

	let x = Math.min(width, height) * 0.9;
	let x2 = x * 0.9;
	let x3 = x * 0.8;
	// let x4 = x3 * 0.9;

	strokeCap(SQUARE);
	strokeWeight(30 / 1000 * x);
	textAlign(CENTER, CENTER);

	push();
	rotate(-HALF_PI);



	arc(0, 0, x3, x3, 0, TAU * s);

	pop();

	noStroke();
	fill(255);

	textSize(100 / 1000 * x);
	text(
		[floor(sec)]
			.map(n => ('0' + n).slice(-2))
			.join(':'),
		0, 0);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

module.exports = canvas;