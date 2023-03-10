let tg = window.Telegram.WebApp;

tg.MainButton.show();
tg.MainButton.setText("Сформувати посилання");

setColorScheme();

Telegram.WebApp.onEvent("themeChanged", function() {
	setColorScheme();
	location.replace("https://alexmorgul.github.io/monopay_test/link.html");
})

Telegram.WebApp.onEvent("mainButtonClicked", function() {
	location.replace("https://alexmorgul.github.io/monopay_test/link.html");
})

function isPaymentExtended() {
	let chbox = document.getElementById('highload1');
	let ext = document.getElementById('extented');

	if (chbox.checked) {
		ext.style.display = "";
	}
	else {
		ext.style.display = "none";
	}
}

function setColorScheme() {
	let logo = document.getElementById('logo');
	let colorScheme = tg.colorScheme;

	if (colorScheme === "dark") {
		logo.src = "img/monopay_dark_bg.svg";
	} else {
		logo.src = "img/monopay_light_bg.svg";
	}
}