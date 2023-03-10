let tg = window.Telegram.WebApp;

let chbox = document.getElementById('highload1');
let ext = document.getElementById('extented');

tg.onEvent("themeChanged", eventHandler) {
	ext.style.display = "none";
}

function isPaymentExtended() {
  
	if (chbox.checked) {
		ext.style.display = ""
	}
	else {
		ext.style.display = "none"
	}
}