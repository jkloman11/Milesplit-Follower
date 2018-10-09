chrome.storage.local.get(null, displayRunners);

document.getElementById("unfollow").addEventListener("click", unfollow);
document.getElementById("select-all").addEventListener("click", selectAll);

function unfollow(){
	if(!confirm("Are you sure you want to unfollow all selected runners?"))
		return;
}

function selectAll(){

}

function loadRunner(id){
	const http = new XMLHttpRequest();
	const url = "http://milesplit.com/athletes/" + id + "/stats";
	http.open("GET", url);
	http.send();
	http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var html = this.responseText;
            var name = html.substring(html.indexOf("<title>")+7, html.indexOf("</title>")-8);
            var list = document.getElementById("runnersList");
            var runner = document.createElement("li");
            runner.innerHTML = name;
            list.appendChild(runner);
       }
    };	
}

function displayRunners(data){
	var ids = Object.keys(data);
	var names = [];
	for(var i = 0; i < ids.length; i++)
		loadRunner(ids[i]);
}