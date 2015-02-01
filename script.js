
var form = document.createElement("form");
form.style.position = "absolute";
form.style.left = form.style.top = "0px";
form.style.width = "99%";
form.style.height = "99px";
form.style.padding = "10px";
form.style.backgroundColor = "#202020";
form.style.color = "white";
form.zIndex = "99999";

form.innerHTML = 'Zybez Auto Poster by public_int_i<br><br>Quantity:<input type="text" id="quantity" size="6"> &nbsp; &nbsp;Price: <input type="text" id="price" size="10"> &nbsp; &nbsp; Post Every: <input type="text" id="time" size="6"> &nbsp; &nbsp; Buying: <input type="checkbox" id="buying"> &nbsp; &nbsp; Remove old: <input type="checkbox" id="remove"> &nbsp; &nbsp;<input type="button" value="Start" id="goBtn" onclick="onGo()">';

document.body.appendChild(form);



var qtyTxt = document.getElementById("quantity");
var priceTxt = document.getElementById("price");
var timeTxt = document.getElementById("time");
var buyChk = document.getElementById("buying");
var removeChk = document.getElementById("remove");


var ifrm = document.createElement("iframe");
ifrm.style.position = "absolute";
ifrm.style.left = "0px";
ifrm.style.top = "100px";
ifrm.style.width = "99%";
ifrm.style.height = "80%";
ifrm.zIndex = "99999";

ifrm.src = window.location;

document.body.appendChild(ifrm);


var running = false;
var timeStart = 0;
var timeMax = 0;
var buying = false;
var price = 0;
var quantity = 0;
var remove = false;


function removeOld() {
	var zybPage = ifrm.contentDocument || ifrm.contentWindow.document;

	var res = zybPage.querySelector("img[src='http://www.sublimism.com/misc/idb/img/cross.png']");

	if (res) {
		ifrm.onload = tick;
		ifrm.src = res.parentNode.href;
	} else {
		tick();
	}
}

function tick() {
	ifrm.onload = 0;
	var zybPage = ifrm.contentDocument || ifrm.contentWindow.document;

	var formEle = zybPage.getElementsByClassName("ipsBox_container ipsSideMenu do")[0].children[1];

	var buySellSelect = formEle.children[2];
	var qtyInput = formEle.children[3];
	var priceInput = formEle.children[4];

	if (buying) {
		buySellSelect.selectedIndex = 0;
	} else {
		buySellSelect.selectedIndex = 1;
	}

	qtyInput.value = quantity;
	priceInput.value = price;

	formEle.submit();
}


function run() {

	if (running) {
		if (Date.now()-timeStart >= timeMax) {
			if (remove) {
				removeOld();
			} else {
				tick();
			}

			timeStart = Date.now();
		}
	}

	setTimeout(run,500);
}
run();

function onGo() {
	running = !running;
	document.getElementById("goBtn").value = running ? "Stop" : "Start";

	timeMax = parseFloat(timeTxt.value)*60000.0;
	timeStart = Date.now();

	buying = buyChk.checked;
	remove = removeChk.checked;
	quantity = qtyTxt.value;
	price = priceTxt.value;
}
