let tg = window.Telegram.WebApp;



function isPaymentExtended() {
	let chbox = document.getElementById('highload1');
	let ext = document.getElementById('extented');
	
	if (chbox.checked) {
		ext.style.display = ""
	}
	else {
		ext.style.display = "none"
	}
}

// tg.onEvent("themeChanged", eventHandler) {
// 	ext.style.display = "none";
// }