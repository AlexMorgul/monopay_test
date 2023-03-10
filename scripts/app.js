let tg = window.Telegram.WebApp;

function isPaymentExtended() {

let chbox = document.getElementById('highload1')
let ext = document.getElementById('extented')
  
	if (chbox.checked) {
		ext.style.display = ""
		chbox.style.backgroundColor = rgb(79, 180, 198)
	}
	else {
		ext.style.display = "none"
		
	}
}