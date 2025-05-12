const imageEl = document.getElementById("raffle-image");
const toggleBtn = document.getElementById("random-btn");

const imageList = [
		"image/char_1.webp",
		"image/char_2.webp",
		"image/char_3.webp",
		"image/char_4.webp",
		"image/char_5.webp",
		"image/char_6.webp",
		"image/char_7.webp",
		"image/char_8.webp",
		"image/char_9.webp",
		"image/char_10.webp",
		"image/char_11.webp",
	];

// Preload images
document.addEventListener("DOMContentLoaded", function () {
	imageList.forEach((imageSrc) => {
		const img = new Image();
		img.src = imageSrc;
	});
});

let intervalId = null;
let prevCharacter = -1;

toggleBtn.addEventListener("click", function () {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
		pickAndShowRandomCharacter(true);
		toggleBtn.textContent = "재추첨";
	} else {
		intervalId = setInterval(() => {
			pickAndShowRandomCharacter();
		}, 50);
		toggleBtn.textContent = "(눌러서 멈추기)";
	}
});

function pickAndShowRandomCharacter(allowSame = false){
	const availableIndices = [];
	for (let i = 0; i < imageList.length; i++) {
		if (allowSame || i !== prevCharacter) {
			availableIndices.push(i);
		}
	}
	randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
	prevCharacter = randomIndex;

	imageEl.src = imageList[randomIndex];
}