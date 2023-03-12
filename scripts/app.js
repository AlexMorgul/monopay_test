
let tg = window.Telegram.WebApp;

tg.MainButton.setText("СФОРМУВАТИ ПОСИЛАННЯ");

const formElement = document.getElementById('myForm');
const chbox = document.getElementById('highload1');
const amount = document.getElementById('amount');

setColorScheme();

formElement.addEventListener("submit", function (event) {
	event.preventDefault();
	
	let data = generateBodyRequest();
	data = JSON.stringify(data);
	sendData(data);
});

amount.addEventListener('input', function() {
	this.value != '' ? tg.MainButton.show() : tg.MainButton.hide();
});

Telegram.WebApp.onEvent('themeChanged', function() {
	setColorScheme();
});

Telegram.WebApp.onEvent('mainButtonClicked', function() {
	let data = generateBodyRequest();
	data = JSON.stringify(data);
	sendData(data);
});

tg.ready();

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

function generateBodyRequest() {
	const formData = new FormData(formElement);
		
	let data = {
		"amount": Number(formData.get('amount'))
	};

	if (chbox.checked) {
		data.basketOrder = [];

		data.basketOrder[0] = {
			"name": formData.get('itemName'),
			"qty": Number(formData.get('quantity')),
			"sum": Number(formData.get('amountPerItem'))
		};
	}

	data.queryId = tg.initDataUnsafe?.query_id;

	return data;
}

function sendData(data)  {
	const response = fetch("https://www.corezoid.com/api/2/json/public/1183175/3427feaf42c671b9b22a0d8a0c31169cb3e049df", {
		method: 'POST',
		headers: {},
		body: data
	});
}

