
let tg = window.Telegram.WebApp;

tg.MainButton.setText("СФОРМУВАТИ ПОСИЛАННЯ");

const formElement = document.getElementById('myForm');
var nPositions = 0;

const chbox = document.getElementById('highload1');
const extented = document.getElementById('extented');
const goods = document.getElementById('goods');
var isExtend = false;

const amount = document.getElementById('amount');
const amountRegExp = /^\d+(?:[.]\d{1,2})?$/;

// const itemName = document.getElementById('itemName');

// const quantity = document.getElementById('quantity');
const quantityRegExp = /^([1-9])+?$/;


// const amountPerItem = document.getElementById('amountPerItem');
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
});

Telegram.WebApp.onEvent('themeChanged', function() {
	setColorScheme();
});

Telegram.WebApp.onEvent('mainButtonClicked', function() {
	// let isDataValid = validateValue();
	let isDataValid = true;
	
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
			errors.innerHTML = '<p style="color: red; margin-left: 11.25px; font-size: 13px;">- Перевірте вказані дані! (формат для вартості: 123.45)</p>';
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

		if (nPositions == 0) {
			nPositions = 1;
			item = createItem();
			goods.appendChild(item);
		}
	}
	else {
		extented.style.display = "none";
		isExtend = false;
	}
}

function addItem() {
	nPositions++;
	item = createItem();
	goods.appendChild(item);
}

function createItem() {
	let indexName = 'itemName_' + nPositions;
	let indexQuantity = 'quantity_' + nPositions;
	let indexAmountPerItem = 'amountPerItem_' + nPositions;

	const hr = document.createElement('hr');
	const br = document.createElement('br');

	// div 'item'
	let div = document.createElement('div');
	div.id = 'item_' + nPositions;
	
	// p 'item'
	let p = document.createElement('p');
	p.append('Товар №' + nPositions);
	p.className = 'item_text';

	// label & input 'name'
	const labelItemName = document.createElement('label');
	labelItemName.htmlFor = indexName;
	labelItemName.append('Назва товару:');

	const inputItemName = document.createElement('input');
	Object.assign(inputItemName, {
		type: 'text',
		id: indexName,
		name: indexName
	})

	// label & input 'quantity'
	const labelQuantity = document.createElement('label');
	labelQuantity.htmlFor = indexQuantity;
	labelQuantity.append('Кількість:');

	const inputQuantity = document.createElement('input');
	Object.assign(inputQuantity, {
		type: 'text',
		id: indexQuantity,
		name: indexQuantity
	})

	// label & input 'amountPerItem'
	const labelAmountPerItem = document.createElement('label');
	labelAmountPerItem.htmlFor = indexAmountPerItem;
	labelAmountPerItem.append('Сума за один товар:');

	const inputAmountPerItem = document.createElement('input');
	Object.assign(inputAmountPerItem, {
		type: 'text',
		id: indexAmountPerItem,
		name: indexAmountPerItem
	})

	// create & fill fragment
	const item = document.createDocumentFragment();

	item.appendChild(hr);
	item.appendChild(p);

	// item name
	item.appendChild(labelItemName);
	item.appendChild(inputItemName);
	item.appendChild(br);
	item.appendChild(br.cloneNode());

	// item quantity
	item.appendChild(labelQuantity);
	item.appendChild(inputQuantity);
	item.appendChild(br.cloneNode());
	item.appendChild(br.cloneNode());

	// amount per item
	item.appendChild(labelAmountPerItem);
	item.appendChild(inputAmountPerItem);
	item.appendChild(br.cloneNode());
	item.appendChild(br.cloneNode());

	div.appendChild(item);

	return div;
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

		let name = formData.get('itemName_' + (i+1));
		let qty = Number(formData.get('quantity_' + (i+1)));
		let sum = Number(formData.get('amountPerItem_' + (i+1)));

		for (let i = 0; i < nPositions; i++) {
			data.merchantPaymInfo.basketOrder.push({
				"name": name,
				"qty": Math.round(qty*100),
				"sum": Math.round(sum*100),
			});
		}
	}	

	data.queryId = tg.initDataUnsafe.query_id;

	return data;
}

function checkResult() {

	let data = generateBodyRequest();
	sendData(data);
}

async function sendData(data)  {
	const response = await fetch("https://www.corezoid.com/api/2/json/public/1183175/3427feaf42c671b9b22a0d8a0c31169cb3e049df", {
		method: 'POST',
		headers: {},
		body: JSON.stringify(data)
	});
}