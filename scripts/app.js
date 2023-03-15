
let tg = window.Telegram.WebApp;

tg.MainButton.setText("СФОРМУВАТИ ПОСИЛАННЯ");

const formElement = document.getElementById('myForm');
var nPositions = 0;

const chbox = document.getElementById('highload1');
const extented = document.getElementById('extented');
const productFields = document.getElementById('productFields');
var isExtend = false;

const amount = document.getElementById('amount');
const amountRegExp = /^\d+(?:[.]\d{1,2})?$/;

const itemName = document.getElementById('itemName');

const quantity = document.getElementById('quantity');
const quantityRegExp = /^([1-9])+?$/;


const amountPerItem = document.getElementById('amountPerItem');
const amountPerItemRegExp = /^\d+(?:[.]\d{1,2})?$/;

const errors = document.getElementById('errors');

setColorScheme();

tg.ready();


//  events
amount.addEventListener('input', function() {
	this.value != '' ? tg.MainButton.show() : tg.MainButton.hide();
});

formElement.addEventListener("submit", function (event) {
	event.preventDefault();
	let data = generateBodyRequest();
});

Telegram.WebApp.onEvent('themeChanged', function() {
	setColorScheme();
});

Telegram.WebApp.onEvent('mainButtonClicked', function() {
	let isDataValid = validateValue();
	
	if (isDataValid) {
		let data = generateBodyRequest();
		sendData(data);
	}
});


// functions
function validateValue() {
	let isDataValid = false;

	let isAmountValid = amountRegExp.test(amount.value);

	if (isExtend) {
		let isItemNameValid = itemName.value != '';
		let isQuantityValid = quantityRegExp.test(quantity.value);
		let isAmountPerItemValid = amountPerItemRegExp.test(amountPerItem.value);

		if (isAmountValid && isItemNameValid && isQuantityValid && isAmountPerItemValid) {
			errors.innerHTML = '';
			isDataValid = true;
		} else {
			errors.innerHTML = '<p style="color: red; margin-left: 11.25px;">- Перевірте вказані дані! (формат для вартості: 123.45)</p>';
			isDataValid = false;
		}
	} else {
		if (isAmountValid) {
			errors.innerHTML = '';
			isDataValid = true;
		} else {
			errors.innerHTML = '<p style="color: red; margin-left: 11.25px;">- Лише ціле або дійсне число (.00)</p>';
			isDataValid = false;
		}
	}

	return isDataValid;
} 

function isPaymentExtended() {
	if (chbox.checked) {
		extented.style.display = "";
		isExtend = true;
		nPositions = 1;

		productFields.innerHTML = getFieldsTemplate();
	}
	else {
		extented.style.display = "none";
		isExtend = false;
		nPositions = 0;
		productFields.innerHTML = '';
	}
}

function addItem() {
	nPositions++;
	productFields.innerHTML += getFieldsTemplate();
}

function getFieldsTemplate() {
	let indexName = 'itemName_' + nPositions;
	let indexQuantity = 'quantity_' + nPositions;
	let indexAmountPerItem = 'amountPerItem_' + nPositions;

	return '<hr><p class="item_text">Товар №' + nPositions + '</p><label for="' + indexName + 
		'">Назва товару:</label><input type="text" id="' + indexName + '" name="' + indexName + '"><br><br><label for="' 
		+ indexQuantity + '">Кількість:</label><input type="text" id="'	+ indexQuantity + '" name="' + indexQuantity +
		'"><br><br><label for="' + indexAmountPerItem + '">Сума за один товар:</label><input type="text" id="' + 
		indexAmountPerItem + '" name="' + indexAmountPerItem + '"><br><br>';
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
		data.merchantPaymInfo = {
			"basketOrder": []
		};

		for (let i = 0; i < nPositions; i++) {
			data.merchantPaymInfo.basketOrder[0] = {
				"name": formData.get('itemName_' + i),
				"qty": Number(formData.get('quantity_' + i)),
				"sum": Number(formData.get('amountPerItem_' + i))
			};
		}
	}

	console.log(data);

	data.queryId = tg.initDataUnsafe.query_id;

	return data;
}

async function sendData(data)  {
	const response = await fetch("https://www.corezoid.com/api/2/json/public/1183175/3427feaf42c671b9b22a0d8a0c31169cb3e049df", {
		method: 'POST',
		headers: {},
		body: JSON.stringify(data)
	});
}