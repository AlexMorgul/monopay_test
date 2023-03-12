
let tg = window.Telegram.WebApp;

tg.MainButton.setText("СФОРМУВАТИ ПОСИЛАННЯ");

const formElement = document.getElementById('myForm');

const chbox = document.getElementById('highload1');
const ext = document.getElementById('extented');
var isExtend = false;

const amount = document.getElementById('amount');
const amountRegExp = /^\d+(?:[.]\d{1,2})?$/;

const errors = document.getElementById('errors');

setColorScheme();

// formElement.addEventListener("submit", function (event) {
// 	event.preventDefault();

// 	let isValid = validateValue();
	
// 	if (isValid) {
// 		let data = generateBodyRequest();
// 		data = JSON.stringify(data);
// 		sendData(data);
// 	}
// });

amount.addEventListener('input', function() {
	this.value != '' ? tg.MainButton.show() : tg.MainButton.hide();
});

Telegram.WebApp.onEvent('themeChanged', function() {
	setColorScheme();
});

Telegram.WebApp.onEvent('mainButtonClicked', function() {
	let isValid = validateValue();
	
	if (isValid) {
		let data = generateBodyRequest();
		sendData(data);
	}

});

tg.ready();

function validateValue() {
	let isValid = amountRegExp.test(amount.value);

	if (!isValid) {
		errors.innerHTML = '<p style="color: red; margin-left: 11.25px;">- Лише ціле або дійсне число (.00)</p>';
	}

	return isValid;
} 

function isPaymentExtended() {
	if (chbox.checked) {
		ext.style.display = "";
		isExtend = true;
	}
	else {
		ext.style.display = "none";
		isExtend = false;
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

	if (isExtend) {
		data.basketOrder = [];

		data.basketOrder[0] = {
			"name": formData.get('itemName'),
			"qty": Number(formData.get('quantity')),
			"sum": Number(formData.get('amountPerItem'))
		};
	}

	data.queryId = tg.initDataUnsafe.query_id;

	return data;
}

function sendData(data)  {
	const response = fetch("https://www.corezoid.com/api/2/json/public/1183175/3427feaf42c671b9b22a0d8a0c31169cb3e049df", {
		method: 'POST',
		headers: {},
		body: JSON.stringify(data)
	});
}

