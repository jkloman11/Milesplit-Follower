window.addEventListener ("load", myMain, false);

function follow(){
	var id = getID();
	var runner = getRunnerData(id);
	console.log(runner);
	chrome.storage.local.set(runner);
	location.reload();
}

function unfollow(){
	var id = getID();
	console.log(id);
	chrome.storage.local.remove(id);
	location.reload();
}

function myMain (evt) {
    var header = document.getElementById("athleteName");
    var name = header.innerHTML;

    //check if we are already following
    var id = getID();
    var size = chrome.storage.local.getBytesInUse(id, function response(size){
    	console.log(size);
	    if(size > 0){
	    	header.innerHTML =  name + "<button id=\'follow\'>Unfollow</button>";
			document.getElementById("follow").addEventListener("click", unfollow);
		}
		else{
			header.innerHTML =  name + "<button id=\'follow\'>Follow</button>";
			document.getElementById("follow").addEventListener("click", follow);
		}
    });

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