let tg = window.Telegram.WebApp;

tg.expand();

tg.MainButton.show();
tg.MainButton.setText("Сформувати посилання");

Telegram.WebApp.onEvent("mainButtonClicked", function() {
	let test = document.getElementById("test");
	let p = document.createElement("p");

	p.innerText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, rerum.");
	test.appendChild(p);
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
}

// tg.onEvent("themeChanged", eventHandler) {
// 	ext.style.display = "none";
// }