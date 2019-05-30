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

	serviceUrl = `urlBase`;


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

	let src = document.querySelectorAll('.kreciol');
	src.forEach(function (a) {
		a.classList.remove("kreciol");
	})

	//mph to mps convert
	let toMpsFactor = 0.44704;

	document.querySelector('.cond-img img').src = data.current_observation.icon_url;
	document.querySelector('.cond-descr').innerHTML = data.current_observation.weather;
	document.querySelector('.val-temp').innerHTML = data.current_observation.temp_c;
	document.querySelector('.val-humidity').innerHTML = data.current_observation.relative_humidity;
	document.querySelector('.val-press').innerHTML = data.current_observation.pressure_mb;
	document.querySelector('.val-wind').innerHTML = Math.round(data.current_observation.wind_mph * toMpsFactor);

	let city = data.current_observation.observation_location.city.split(',', 1);
	let country = data.current_observation.observation_location.country
	let location = city + ', ' + country;
	document.querySelector('.city').innerHTML = location;
};
calendar('time', 'date');
getCoordinates();