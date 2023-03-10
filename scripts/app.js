let tg = window.Telegram.WebApp;

// tg.expand();

tg.MainButton.show();
tg.MainButton.setText("Сформувати посилання");

Telegram.WebApp.onEvent("mainButtonClicked", function() {
	location.replace("https://alexmorgul.github.io/monopay_test/link.html");
})

// tg.MainButton.textColor = ;
// tg.MainButton.color = ;


function isPaymentExtended() {
	let chbox = document.getElementById('highload1');
	let ext = document.getElementById('extented');

	if (chbox.checked) {
		ext.style.display = "";
	}
	else {
		ext.style.display = "none";
	}

	location.replace("https://alexmorgul.github.io/monopay_test/link.html")
}

// tg.onEvent("themeChanged", eventHandler) {
// 	ext.style.display = "none";
// }