const imageList = [
	"image/skin_1.webp",
	"image/skin_2.webp",
	"image/skin_3.webp",
	"image/skin_4.webp",
	"image/skin_5.webp",
	"image/skin_6.webp",
	"image/skin_7.webp",
	"image/skin_8.webp",
	"image/skin_9.webp",
	"image/skin_10.webp",
	"image/skin_11.webp",
	"image/skin_12.webp",
	"image/skin_13.webp",
];

const wrap = document.getElementById("gacha");
const card = document.getElementById("card");
const hint = document.getElementById("hint");
const flash = document.getElementById("flash");
const stage = document.getElementById("stage");
const resultWrap = document.getElementById("resultWrap");
const resultImagePre = document.getElementById("resultImage");
const groundShadow = document.querySelector(".ground-shadow");

const tapNeeded = 4;
let taps = 0,
	revealed = false;

const glowLevels = [
	"0 0 16px rgba(255,255,255,0.4)",
	"0 0 28px rgba(255,255,255,0.6)",
	"0 0 44px rgba(255,255,255,0.8)",
	"0 0 64px rgba(255,255,255,1)",
];

const emblemTitle = card.querySelector(".title");
if (emblemTitle) emblemTitle.remove();

const chosenIndex = Math.floor(Math.random() * imageList.length);
const chosenUrl = imageList[chosenIndex];
let preloadReady = false;
let preloadedImg = new Image();
try {
	const link = document.createElement("link");
	link.rel = "preload";
	link.as = "image";
	link.href = chosenUrl;
	document.head.appendChild(link);
} catch (_) {}

preloadedImg.decoding = "async";
preloadedImg.loading = "eager";
preloadedImg.src = chosenUrl;
if (preloadedImg.decode) {
	preloadedImg
		.decode()
		.then(() => {
			preloadReady = true;
		})
		.catch(() => {
			preloadReady = true;
		});
} else {
	preloadedImg.onload = () => {
		preloadReady = true;
	};
	preloadedImg.onerror = () => {
		preloadReady = true;
	};
}

wrap.addEventListener(
	"click",
	() => {
		if (revealed) return;
		taps++;
		hint.textContent = `${taps}/${tapNeeded}`;

		if (taps <= glowLevels.length) {
			card.style.boxShadow = `inset 0 0 0 2px rgba(255,255,255,0.1), ${glowLevels[taps - 1]}`;
		}

		card.animate([{ transform: "scale(1)" }, { transform: "scale(1.05)" }, { transform: "scale(1)" }], {
			duration: 300,
			easing: "cubic-bezier(0.23, 1, 0.32, 1)",
		});

		if (taps >= tapNeeded) {
			reveal();
		}
	},
	{ passive: true }
);

function reveal() {
	revealed = true;
	hint.textContent = "열리는 중…";
	flash.classList.add("on");

	setTimeout(() => {
		stage.classList.add("revealed");
		resultWrap.setAttribute("aria-hidden", "false");
		if (wrap) wrap.style.display = "none";
		if (groundShadow) groundShadow.style.display = "none";

		while (resultWrap.firstChild) resultWrap.removeChild(resultWrap.firstChild);

		let img = resultImagePre || document.createElement("img");
		img.id = "resultImage";
		img.alt = "결과 카드";

		if (preloadReady) {
			if (preloadedImg && preloadedImg.complete) {
				const clone = preloadedImg.cloneNode(false);
				img = clone;
				img.id = "resultImage";
				img.alt = "결과 카드";
			} else {
				img.src = chosenUrl;
			}
		} else {
			img.src = chosenUrl;
		}

		img.style.maxWidth = "min(72vw, 640px)";
		img.style.maxHeight = "80vh";
		img.style.borderRadius = "22px";
		img.style.boxShadow =
			"0 0 64px rgba(255,255,255,1), 0 22px 60px rgba(0,0,0,.6), inset 0 0 0 2px rgba(255,255,255,.06)";

		resultWrap.appendChild(img);
	}, 180);
}
