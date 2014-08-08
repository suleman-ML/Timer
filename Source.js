var flagclock = 0;
var flagstop = 1;
var stoptime = 0;
var currenttime;
var splitdate = '';
var clock;
var myArray = [];
//This starts the stopwatch//
function startTimer(){
	var startTimer = document.getElementById('startstoptimer');
	var startdate = new Date();
	var starttime = startdate.getTime();
	if(flagclock===0){
		startTimer.value = 'Stop';
		flagclock = 1;
		counter(starttime);
	}
	else{
	startTimer.value = 'Start';
		flagclock = 0;
		flagstop = 1;
		splitdate = '';
	}
}
//sets array value to cookie//
function cookietoArray(){
	if(getCookie('myCookie') !== null){
		myArray = [getCookie('myCookie')];
		myArray = JSON.parse(myArray);
	}
}
//sets the date and sets the values of start/stop button//
function counter(starttime){
	clock = document.getElementById('clock');
	currenttime = new Date();
	var timediff = currenttime.getTime() - starttime;
	if(flagstop == 1){
		timediff = timediff + stoptime;
	}
	if(flagclock == 1){
		clock.value = formattime(timediff,'');
		refresh = setTimeout('counter(' + starttime + ');',10);
	}
	else{
		window.clearTimeout(refresh);
		stoptime = timediff;
	}
}
//This formats the time//
function formattime(rawtime,roundtype){
	if(roundtype == 'round'){
		var ds = Math.round(rawtime/100) + '';
	}
	else{
		var ds = Math.floor(rawtime/100) + '';
	}
	var sec = Math.floor(rawtime/1000);
	var min = Math.floor(rawtime/60000);
	var hour = Math.floor(rawtime/3600000);
	ds = ds.charAt(ds.length - 1);
	if(hour >= 24){
	startTimer();
	}
	sec = sec - 60 * min + '';
	if(sec.charAt(sec.length - 2) !== ''){
		sec = sec.charAt(sec.length - 2) + sec.charAt(sec.length - 1);
	}
	else{
		sec = 0 + sec.charAt(sec.length - 1);
	}	
	min = min - 60 * hour + '';
	if(min.charAt(min.length - 2) !== ''){
		min = min.charAt(min.length - 2) + min.charAt(min.length - 1);
	}
	else{
		min = 0 + min.charAt(min.length - 1);
	}	
	hour = hour + '';
	if(hour.charAt(hour.length - 2) !== ''){
		hour = hour.charAt(hour.length - 2)+hour.charAt(hour.length - 1);
	}
	else{
		hour = 0 + hour.charAt(hour.length - 1);
	}
	return hour + ':' + min + ':' + sec;
}
function resetIt(){
	sec = 0;
	min = 0;
	hour = 0;
	if(startstoptimer.value === "Stop"){
		startstoptimer.value = "Start";
		clock.value = "00:00:00";
	}
	else{
		startstoptimer.value = "Stop";
	}
	window.clearTimeout(refresh);
}
//This saves time values in a cookie//
function saveIt(){
	if(document.clock.saver.value === "Save Time"){
		document.clock.saver.value = "Save Time";
		document.getElementById('saveTime').innerHTML = "Time = " + clock.value + ", Date = " + currenttime;
		myArray.push(document.getElementById('saveTime').innerHTML = "Time = " + clock.value + ", Date = " + currenttime);
		setCookie('myCookie',myArray, exp);
		myArray = JSON.stringify(myArray);
		myArray = JSON.parse(myArray);
		return;
	}
}
function setCookie(name, value, expires){
	document.cookie = name + "=" + escape(value) + "; path=/" + ((expires === null) ? "" : "; expires=" + expires.toGMTString());
}
function getCookie(name){
	var cname = name + "=";               
	var dc = document.cookie;
	if(dc.length > 0){              
		begin = dc.indexOf(cname);       
		if(begin != -1){           
			begin += cname.length;       
			end = dc.indexOf(";", begin);
			if(end == -1) end = dc.length;
			return unescape(dc.substring(begin, end));
		} 
	}
	return null;
}
var exp = new Date();                                  
exp.setTime(exp.getTime() + (1000 * 60 * 60 * 24 * 30));
