debugger;

function init(){
	//var self = this;
	var port = chrome.runtime.connect({name: "openlistitem"});
	//send list items urls to backgroundJS
    if(localStorage['reverse'] == 'true'){
        $($("ul.subMenuEV>li").get().reverse()).each(function() {
            console.log($(this).find('a').attr('href'));
            port.postMessage({url: $(this).find('a').attr('href')});
        });
    }else{
        $('ul.subMenuEV>li').each(function(){
            console.log($(this).find('a').attr('href'));
            port.postMessage({url: $(this).find('a').attr('href')});
        });
    }

	setTimeout(function(){
		chrome.runtime.sendMessage({action:"endop"});
	}, 50);
}

$(function(){
    if((new Date()).getFullYear() <= 2015) {
        init();
    }
})