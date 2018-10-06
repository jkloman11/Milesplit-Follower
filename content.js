window.addEventListener ("load", myMain, false);

function follow(){
	var id = getID()
	var runner = getRunnerData(id);
	insertRunner(runner);
}

function myMain (evt) {
    var header = document.getElementById("athleteName");
    var name = header.innerHTML;
	header.innerHTML =  name + "<button id=\'follow\'>Follow</button>";
	document.getElementById("follow").addEventListener("click", follow);
}

//get the id of the runner on the current page
function getID(){
	var url = window.location.href;
	var start = null;
	var end = null;

	for(var i = 0; i < url.length; i++){
		if(start == null && !isNaN(Number(url.charAt(i))))
			start = i;
		if(start != null && isNaN(Number(url.charAt(i))))
			end = i;
		if(end != null)
			break;
	}

	return url.substring(start, end);
}

//return a runner
function getRunnerData(id){
	var runner = {};
	var prs = {};
	var prElements = document.getElementsByClassName("personal-record");
	for(var i = 0; i < prElements.length; i++){
		var time = prElements[i].innerHTML;
		var eventElement = prElements[i].parentElement.parentElement.parentElement.parentElement;
		var event = eventElement.getElementsByClassName("event-heading")[0].innerHTML;
		var seasonElement = eventElement.parentElement;
		event = event + " (" + seasonElement.getAttribute("data-season") + ")";
		prs[event] = time;
	}

	runner[id] = prs;
	return runner;
}

//get append the runner to storage for runners
function insertRunner(runner){
	chrome.storage.local.set(runner);
}