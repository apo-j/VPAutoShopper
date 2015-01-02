debugger;

function init(){
	var port = chrome.runtime.connect({name: "openarticle"});
	//send list items urls to backgroundJS	
	var baseAddr = location.href.substring(0, location.href.lastIndexOf('/') + 1);// TODO detection null
	var position = 0;
	setInterval(function(){
		var old = $(window).scrollTop();
		window.scrollTo(100, 2000000);
		var $eles = $('ul.artList>li');
		$eles.each(function(index, item){
				if(index >= position){
					//console.log('index : ' + index);
					if($(this).find('a').attr('href')){
						port.postMessage({url: baseAddr + $(this).find('a').attr('href')});
					}
				}
		});

        if(position == $eles.length){
            position = 0;
        }else{
            position = $eles.length;
        }


		console.log("Old : " + old + "; New : " + $(window).scrollTop());
		/*if($(window).scrollTop() == old){
			chrome.runtime.sendMessage({action:"endop"});
		}*/
	}, 50);
}

$(function(){
    if((new Date()).getFullYear() <= 2015) {
        init();
    }
})
