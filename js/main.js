"use strict";var coords={lat:"",lon:""},serviceUrl,calendar=function e(v,m){var t;setInterval(function e(){var t=new Date,r=t.getDate(),n=t.getMonth()+1,o=t.getFullYear(),i=t.getHours(),a=t.getMinutes(),c=t.getSeconds();r<10&&(r="0"+r),n<10&&(n="0"+n),i<10&&(i="0"+i),a<10&&(a="0"+a),c<10&&(c="0"+c);var u=i+":"+a+":"+c,s=r+"."+n+"."+o,l=document.querySelector("."+m).innerHTML=s,d=document.querySelector("."+v).innerHTML=u},1e3)},getCoordinates=function e(){navigator.geolocation.getCurrentPosition(function(e){var t=e.coords;coords.lat=t.latitude,coords.lon=t.longitude,getData()})},getData=function e(){var t="https://api.weatherbit.io/v2.0/current";serviceUrl="urlBase";var r=new XMLHttpRequest;r.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=JSON.parse(this.responseText);displayer(e)}},r.open("get",serviceUrl,!0),r.send()},displayer=function e(t){var r;document.querySelectorAll(".kreciol").forEach(function(e){e.classList.remove("kreciol")});var n=.44704;document.querySelector(".cond-img img").src=t.current_observation.icon_url,document.querySelector(".cond-descr").innerHTML=t.current_observation.weather,document.querySelector(".val-temp").innerHTML=t.current_observation.temp_c,document.querySelector(".val-humidity").innerHTML=t.current_observation.relative_humidity,document.querySelector(".val-press").innerHTML=t.current_observation.pressure_mb,document.querySelector(".val-wind").innerHTML=Math.round(t.current_observation.wind_mph*n);var o,i,a=t.current_observation.observation_location.city.split(",",1)+", "+t.current_observation.observation_location.country;document.querySelector(".city").innerHTML=a};calendar("time","date"),getCoordinates();
//# sourceMappingURL=main.js.map