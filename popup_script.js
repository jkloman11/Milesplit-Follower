var runners = new Array();

window.onload = init;

function init() {
    getRunnerData();
}

function getRunnerData() {
    var request = new XMLHttpRequest();
    request.open("GET", "runners.json");
    request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) {
                parseRunners(this.responseText)
                loadList();
            }
            else { console.log("Error"); }
        }
    };
    request.send();
}

function parseRunners(runnersJSON) {
    if (runnersJSON == null) {
        return;
    }
    var runnersArray = JSON.parse(runnersJSON);
    if (runnersArray.length == 0) {
        return;
    }
    for (var i = 0; i < runnersArray.length; i++) {
        var runner = runnersArray[i];
        runners.push(runner);
    }
}

function loadList() {
    var ul = document.getElementById("runnersList");
    for (var i = 0; i < runners.length; i++) {
        var runner = runners[i];
        var li = document.createElement("li");
        li.innerHTML = "<a href='"+runner.link+"'>"+ runner.name +"</a>" ;;

        ul.appendChild(li);
    }
}

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.update({url:e.target.href})
  }
})

function clearList() {
  var ul = document.querySelector('runnersList');

  for (i = 0; i < ul.children.length; i++) {
    ul.childNodes[i].removeChild();
  }
}
