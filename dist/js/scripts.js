
var coords = {lat:'', lon:''};
var serviceUrl;
/*------------------------------------------------------------------------*/
var calendar = function(timeClassContainer,dateClassContainer){

	var setDate = function(){
		var now = new Date();
		var DD = now.getDate();
		var MM = now.getMonth()+1;
		var YY = now.getFullYear();
		var hh = now.getHours();
		var mm = now.getMinutes();
		var ss = now.getSeconds();
		if (DD<10){DD = "0"+DD;}
		if (MM<10){MM = "0"+MM;}
		if (hh<10){hh = "0"+hh;}
		if (mm<10){mm = "0"+mm};
		if (ss<10){ss = "0"+ss};
		var readyTime = hh+':'+mm+':'+ss;
		var readyDate = DD+'.'+MM+'.'+YY;
		var dateCont = document.querySelector('.'+dateClassContainer).innerHTML=readyDate;
		var timeCont = document.querySelector('.'+timeClassContainer).innerHTML=readyTime;
	}
setInterval(setDate,1000);
};

/*------------------------------------------------------------------------*/
var getCoordinates = function(){
	navigator.geolocation.getCurrentPosition(function(pos){
		var crd = pos.coords;
		coords.lat = crd.latitude;
		coords.lon = crd.longitude;
		getData();
	});
};
/*------------------------------------------------------------------------*/
var getData = function(){
	serviceUrl =`https://api.wunderground.com/api/899e303598994b68/conditions/lang:PL/q/${coords.lat},${coords.lon}.json`;

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		 if (this.readyState == 4 && this.status == 200) {
			  var data = JSON.parse(this.responseText);
			  displayer(data);
		   }
	};
	xmlhttp.open("get", serviceUrl, true);
	xmlhttp.send();
};

/*------------------------------------------------------------------------*/
var displayer = function(data){

	var src = document.querySelectorAll('.kreciol');
	src.forEach(function(a){a.classList.remove("kreciol");})

	//mph to mps convert
	var toMpsFactor = 0.44704;

	document.querySelector('.cond-img img').src = data.current_observation.icon_url;
	document.querySelector('.cond-descr').innerHTML = data.current_observation.weather;
	document.querySelector('.val-temp').innerHTML = data.current_observation.temp_c;
	document.querySelector('.val-humidity').innerHTML = data.current_observation.relative_humidity;
	document.querySelector('.val-press').innerHTML = data.current_observation.pressure_mb;
	document.querySelector('.val-wind').innerHTML = Math.round(data.current_observation.wind_mph * toMpsFactor);

	var city = data.current_observation.observation_location.city.split(',',1);
	var country = data.current_observation.observation_location.country
	var location = city +', '+ country;
	document.querySelector('.city').innerHTML = location;
};
calendar('time','date');
getCoordinates();
