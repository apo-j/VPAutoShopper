debugger;

function init(){
	//var self = this;
	var port = chrome.runtime.connect({name: "openlistitem"});
	//send list items urls to backgroundJS

	$('ul.subMenuEV>li').each(function(){
		console.log($(this).find('a').attr('href'));
		port.postMessage({url: $(this).find('a').attr('href')});
	});
	
	setTimeout(function(){
		chrome.runtime.sendMessage({action:"endop"});
	}, 50);
}

init();