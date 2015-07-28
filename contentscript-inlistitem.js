debugger;

function init(){
	var port = chrome.runtime.connect({name: "openarticle"});
	//send list items urls to backgroundJS	
	var baseAddr = 'http://fr.vente-privee.com';//location.href.substring(0, location.href.lastIndexOf('/') + 1);// TODO detection null
	var position = 0;
	var shouldStopScroll = false;

	var interval = setInterval(function(){
		var $eles;
		if(!shouldStopScroll){
			$eles = $('ul.artList>li');
			var old = $(window).scrollTop();
			window.scrollTo(100, 2000000);
		}

		for(var i = position; i < $eles.length; i++){
			port.postMessage({url: baseAddr + $($eles[i]).find('a').attr('href')});
		}

		//$eles.each(function(index, item){
		//		if(index >= position){
		//			if($(this).find('a').attr('href')){
		//				port.postMessage({url: baseAddr + $(this).find('a').attr('href')});
		//			}
		//		}
		//});

		position = $eles.length;
		if($(window).scrollTop() == old){
			shouldStopScroll = true;
			position = 0;
			clearInterval(interval);
			//chrome.runtime.sendMessage({action:"endop"});
		}
	}, 50);
}

$(function(){
	init();
})
