let tg = window.Telegram.WebApp;

tg.MainButton.show();
tg.MainButton.setText("СФОРМУВАТИ ПОСИЛАННЯ");

setColorScheme();

tg.ready();

Telegram.WebApp.onEvent("themeChanged", function() {
	setColorScheme();
})

Telegram.WebApp.onEvent("mainButtonClicked", function() {
	// location.replace("https://alexmorgul.github.io/monopay_test/link.html");
})

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

// window.addEventListener( "load", function () {

	// Access the form element...
	const form = document.getElementById("myForm");
  
	// ...and take over its submit event.
	form.addEventListener("submit", function (event) {
	  event.preventDefault();
	  sendData();
	} );
// })

async function sendData()  {

	const response = await fetch("https://www.corezoid.com/api/2/json/public/1183175/4ca2acf3e28b9cf85af468ab1e147ff103d7828d", {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"ops":[
				{
					"ref":"ref_1",
					"type":"create",
					"obj":"task",
					"conv_id":1160217,
					"data": {
					"lat":"51.5085",
					"lon":"-0.1257"
					}
				}
			]
		})
	});
	
	response.json().then(data => {
		console.log(JSON.stringify(data));
	});

	// fetch('https://www.corezoid.com/api/2/json/public/1183175/4ca2acf3e28b9cf85af468ab1e147ff103d7828d', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Accept': 'application/json',
	// 		'Content-Type': 'application/json',
	// 		'Access-Control-Allow-Origin': '*',
	// 		'charset': 'utf8'
	// 	},
	// 	body: JSON.stringify({
	// 		"ops":[
	// 		  {
	// 			  "ref":"ref_1",
	// 			  "type":"create",
	// 			  "obj":"task",
	// 			  "conv_id":1160217,
	// 			  "data": {
	// 				"lat":"51.5085",
	// 				"lon":"-0.1257"
	// 			  }
	// 		  }
	// 		]
	// 	  })
	// 	})
	//    .then(response => response.json())
	//    .then(response => console.log(JSON.stringify(response)));

	//    console.log(body);

	// var xhr = new XMLHttpRequest();
	// var url = "https://www.corezoid.com/api/2/json/public/1183175/4ca2acf3e28b9cf85af468ab1e147ff103d7828d";
	// xhr.open("POST", url, true);
	// // xhr.setRequestHeader("Content-Type", "application/json");
	// xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

	// xhr.onreadystatechange = function () {
	// 	if (xhr.readyState === 4 && xhr.status === 200) {
	// 		var json = JSON.parse(xhr.responseText);
	// 		console.log("test");
	// 	}
	// };

	// var data = JSON.stringify({
	// 	"ops":[
	// 	  {
	// 		  "ref":"ref_1",
	// 		  "type":"create",
	// 		  "obj":"task",
	// 		  "conv_id":1160217,
	// 		  "data": {
	// 			"lat":"51.5085",
	// 			"lon":"-0.1257"
	// 		  }
	// 	  }
	// 	]
	//   });

	// xhr.send(data);
}

