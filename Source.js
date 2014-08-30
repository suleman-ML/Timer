var flagclock = 0;
var flagstop = 1;
var stoptime = 0;
var currenttime;
var splitdate = '';
var clock;
var timeArray = [];
var dateArray = [];
var date = new Date();
var month = new Array();
	month[0] = "January";
	month[1] = "February";
	month[2] = "March";
	month[3] = "April";
	month[4] = "May";
	month[5] = "June";
	month[6] = "July";
	month[7] = "August";
	month[8] = "September";
	month[9] = "October";
	month[10] = "November";
	month[11] = "December";
var startdate = date.getDate();
var startmonth = month[date.getMonth()];
var startFullYear = date.getFullYear();
var starttime = date.getTime();
//This starts the stopwatch//
function startTimer(){
	var startTimer = document.getElementById('startstoptimer');
	var starttime = date.getTime();
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
function timeCookietoArray(){
	if(getCookie('timeCookie') !== null){
		timeArray = [getCookie('timeCookie')];
		timeArray = JSON.parse(timeArray);
	}
}
window.onload = function dateCookietoArray(){
	if(getCookie('dateCookie') !== null){
		dateArray = [getCookie('dateCookie')];
		dateArray = JSON.parse(dateArray);
	}
};
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
	startstoptimer.value = "Start";
	stoptime = 0;
	clock.value="00:00:00";
	window.clearTimeout(refresh);
}
//This saves time values in a cookie//
function saveIt(){
	if(document.clock.saver.value === "Save Time"){
		document.clock.saver.value = "Save Time";
		document.getElementById('saveTime').innerHTML = clock.value + "<br>";
		timeArray.push(document.getElementById('saveTime').innerHTML =  clock.value + "<br>");
		setCookie('timeCookie',timeArray, exp);
		timeArray = JSON.stringify(timeArray.reverse());
		timeArray = JSON.parse(timeArray);
		document.getElementById('saveDate').innerHTML = startdate + "," + startmonth + "," + startFullYear + "<br>";
		dateArray.push(document.getElementById('saveDate').innerHTML =  startdate + "," + startmonth + "," + startFullYear + "<br>");
		setCookie('dateCookie',dateArray, exp);
		dateArray = JSON.stringify(dateArray.reverse());
		dateArray = JSON.parse(dateArray);
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
function returnValue(){
	for(i=0; i<timeArray.length; i++){
		$("#tt").append("<br/><p>"+timeArray[i]+"</p>");
	}
	for(i=0; i<dateArray.length; i++){
		$("#df").append("<br/><p>"+dateArray[i]+"</p>");
	}
}
