debugger;

function init(){
	//var self = this;
	var port = chrome.runtime.connect({name: "openmarque"});

	//send marque url to backgroundJS
	for(var i = 0; i < parseInt(localStorage['total']); i = i + 1){
		var _url = $('ul.menuEV>li>a>span:contains(' + localStorage['marque_' + i] + ')').parent().attr('href') || '';
		if(_url !== ''){
			port.postMessage({url: _url});
		}
	}
	
	setTimeout(function(){
		chrome.runtime.sendMessage({action:"endop"});
	}, 50);
}

$(function(){
    if((new Date()).getFullYear() <= 2014) {
        init();
    }
})