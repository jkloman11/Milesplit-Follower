
window.addEventListener ("load", myMain, false);

function myMain (evt) {
    var header = document.getElementById("athleteName");
    var name = header.innerHTML;
	header.innerHTML =  name + "<button id=\'follow\' onclick=\'follow()\'>Follow</button>";
}

