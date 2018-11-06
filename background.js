function checkForValidUrl(tabId, changeInfo, tab) {
	if (tab.url.indexOf('milesplit.com') > -1) {
		var id;
		chrome.storage.local.get(null, function response(data){
			var ids = Object.keys(data);
			for(var i=0; i<ids.length; ++i){
				if(ids[i] != 'notifications'){
					prRequest(ids[i], data[ids[i]]);
				}
			}
			chrome.pageAction.show(tabId);
		});
	}
};

function prRequest(id, runner){
	var doc = document.createElement("html");
	var request = new XMLHttpRequest();
    request.open("GET", "http://milesplit.com/athletes/pro/"+id+"/stats");
	request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) {
				var url = this.responseText.substring(37,this.responseText.length-7);
                doc.innerHTML = url;
				generateNotifications(doc, id, runner);
            }
            else { console.log("Error"); }
        }
    };
	request.send();
}

function isEquivalent(a, b) {
	//Maybe we will do for better notifications
}

function generateNotifications(doc, id, runner){
	var newrunner = getRunnerData(doc, id)[id];
	var oldrunner = runner;
	if(newrunner.toString() != oldrunner.toString()){
		newrunner["pr?"] = true
		chrome.storage.local.set({id : newrunner});
	}
}


function getName(doc, id){
	var title = doc.getElementsByTagName("title")[0];
	var name = title.innerHTML.substring(0, title.innerHTML.indexOf("-")-1);
	return name;
}

//return a runner
function getRunnerData(doc, id){
	var runner = {};
	var prs = {};
	var prElements = doc.getElementsByClassName("personal-record");
	for(var i = 0; i < prElements.length; i++){
		var time = prElements[i].innerHTML.trim();
		var eventElement = prElements[i].parentElement.parentElement.parentElement.parentElement;
		var event = eventElement.getElementsByClassName("event-heading")[0].innerHTML.trim();
		var seasonElement = eventElement.parentElement;
		event = event + " (" + seasonElement.getAttribute("data-season").trim() + ")";
		prs[event] = time;
	}
	prs["name"] = getName(doc, id);
	prs["pr?"] = false;
	runner[id] = prs;
	return runner;
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);
