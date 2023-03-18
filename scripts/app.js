
let tg = window.Telegram.WebApp;

const formElement = document.getElementById('myForm');
const chbox = document.getElementById('highload1');
const extented = document.getElementById('extented');
const goods = document.getElementById('goods');
const amount = document.getElementById('amount');
const errors = document.getElementById('errors');

const priceRegExp = /^\d+(?:[.]\d{1,2})?$/;
const quantityRegExp = /^([1-9])[0-9]*$/;

var nPositions = 0;
var isExtend = false;

setColorScheme();
tg.MainButton.setText("СФОРМУВАТИ ПОСИЛАННЯ");
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
	let fieldsData = null;
	let isAmountValid = priceRegExp.test(amount.value);

	if (!isAmountValid) {
		setErrors();
		return false;
	}

	if (isExtend) {
		fieldsData = getFieldsData();
		let isDataValid = fieldsValidate(fieldsData);
		

		if (!isDataValid) {
			setErrors();
			return false;
		}
	}

	let data = generateBodyRequest(fieldsData);
	sendData(data);
});


// functions
function fieldsValidate(fieldsData) {
	if (!checkItemName(fieldsData.itemName)) return false;

	if (!checkQuantity(fieldsData.quantity)) return false;

	if (!checkAmountPerItem(fieldsData.amountPerItem)) return false;

	return true;
}

function checkItemName(itemNameList) {
	let isItemNameValid = true;

	itemNameList.forEach(name => { 
		if (name == '') isItemNameValid = false;
	});

	return isItemNameValid;
}

function checkQuantity(quantityList) {
	let isQuantityValid = true;

	quantityList.forEach(qty => {
		if (!quantityRegExp.test(qty)) isQuantityValid = false;
	});

	return isQuantityValid;
}

function checkAmountPerItem(amountPerItemList) {
	let isAmountPerItemValid = true;

	amountPerItemList.forEach(amount => {
		if (!priceRegExp.test(amount)) isAmountPerItemValid = false;
	});

	return isAmountPerItemValid;
}

function getFieldsData() {
	const itemNameList = document.querySelectorAll('#itemName');
	const quantityList = document.querySelectorAll('#quantity');
	const amountPerItemList = document.querySelectorAll('#amountPerItem');

	let fieldsData = {
		'itemName': [],
		'quantity': [],
		'amountPerItem': []
	};
	
	itemNameList.forEach(value => fieldsData.itemName.push(value.value));
	quantityList.forEach(value => fieldsData.quantity.push(value.value));
	amountPerItemList.forEach(value => fieldsData.amountPerItem.push(value.value));

	return fieldsData;
}

function setErrors() {
	let error = '<p style="color: red; margin-left: 11.25px; font-size: 12px;">' +
	'- Перевірте вказані дані! (формат для вартості: 123.45)</p>';

	errors.innerHTML = error;
	window.scrollTo(0,0);
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
	let indexName = 'itemName';
	let indexQuantity = 'quantity';
	let indexAmountPerItem = 'amountPerItem';

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

function generateBodyRequest(fieldsData) {
	const totalPrice = Math.round(Number(amount.value)*100);
	let data = { "amount": totalPrice };

	if (isExtend) {
		data.merchantPaymInfo = {
			"basketOrder": []
		};

		for (let i = 0; i < nPositions; i++) {
			let name = fieldsData.itemName[i];
			let qty = Number(fieldsData.quantity[i]);
			let sum = Math.round(Number(fieldsData.amountPerItem[i] * 100));

			data.merchantPaymInfo.basketOrder.push({
				"name": name,
				"qty": qty,
				"sum": sum,
			});
		}
	}

	data.queryId = tg.initDataUnsafe.query_id;
	return data;
}

// function checkResult() {
// 	console.log('valid: ' + fieldsValidate(getFieldsData()))
// 	let data = generateBodyRequest(getFieldsData());

	
// 	sendData(data);
// }

async function sendData(data)  {
	const response = await fetch("https://www.corezoid.com/api/2/json/public/1183175/3427feaf42c671b9b22a0d8a0c31169cb3e049df", {
		method: 'POST',
		headers: {},
		body: JSON.stringify(data)
	});
}