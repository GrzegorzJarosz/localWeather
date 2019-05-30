let coords = {
	lat: '',
	lon: ''
};
let serviceUrl;
/*------------------------------------------------------------------------*/
let calendar = function (timeClassContainer, dateClassContainer) {

	let setDate = function () {
		let now = new Date();
		let DD = now.getDate();
		let MM = now.getMonth() + 1;
		let YY = now.getFullYear();
		let hh = now.getHours();
		let mm = now.getMinutes();
		let ss = now.getSeconds();
		if (DD < 10) {
			DD = "0" + DD;
		}
		if (MM < 10) {
			MM = "0" + MM;
		}
		if (hh < 10) {
			hh = "0" + hh;
		}
		if (mm < 10) {
			mm = "0" + mm
		};
		if (ss < 10) {
			ss = "0" + ss
		};
		let readyTime = hh + ':' + mm + ':' + ss;
		let readyDate = DD + '.' + MM + '.' + YY;
		let dateCont = document.querySelector('.' + dateClassContainer).innerHTML = readyDate;
		let timeCont = document.querySelector('.' + timeClassContainer).innerHTML = readyTime;
	}
	setInterval(setDate, 1000);
};

/*------------------------------------------------------------------------*/
let getCoordinates = function () {
	navigator.geolocation.getCurrentPosition(function (pos) {
		let crd = pos.coords;
		coords.lat = crd.latitude;
		coords.lon = crd.longitude;
		getData();
	});
};
/*------------------------------------------------------------------------*/
let getData = function () {

	const urlBase = 'https://api.weatherbit.io/v2.0/current';

	serviceUrl = `${urlBase}?lat=${coords.lat}&lon=${coords.lon}&key=0a139ed8e06e4e6189c6a12846622f67`;


	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			let data = JSON.parse(this.responseText);

			displayer(data);
		}
	};
	xmlhttp.open("get", serviceUrl, true);
	xmlhttp.send();
};

/*------------------------------------------------------------------------*/
let displayer = function (data) {

	const d = data.data[0];
	let src = document.querySelectorAll('.kreciol');
	src.forEach(function (a) {
		a.classList.remove("kreciol");
	})


	document.querySelector('.cond-img img').src = `img/icons/${d.weather.icon}.png`;
	document.querySelector('.cond-descr').innerHTML = d.weather.description;
	document.querySelector('.val-temp').innerHTML = d.temp;
	document.querySelector('.val-humidity').innerHTML = d.rh;
	document.querySelector('.val-press').innerHTML = Math.round(d.pres);
	document.querySelector('.val-wind').innerHTML = Math.round(d.wind_spd);

	let city = d.city_name;
	let country = d.country_code;
	let location = city + ', ' + country;
	document.querySelector('.city').innerHTML = location;
};
calendar('time', 'date');
getCoordinates();