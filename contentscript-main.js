debugger;

function init(){
	chrome.runtime.sendMessage({action:"init_main", params:[]}, function(response){
		if(response !== undefined && response !== null){
			localStorage.total = response.length - 1;
			for(var i = 0; i < response.length; i = i + 1){
				localStorage[response[i].key] = response[i].value;
			}
			console.log("contentscript-main.js : init done");
			start();
		}
	});
}

function start(){
	console.log("contentscript-main.js : start");
	var sales = $('ul.currentlySales>li.trmSales');
	var dateTime = $(sales[sales.length - 1]).find('p.dateSales>em:first-child').text();
	
	if(dateTime.indexOf((new Date()).getDate()) === -1 || dateTime.indexOf(localStorage['time']) === -1){
		location.reload();
		chrome.runtime.sendMessage({action:"mainReload", params:[]});
		console.log('not found the target sale');
	}else{
		//find the current sale
		var url_camp = $(sales[sales.length - 1]).find('a[id^=linkAccess_]').attr('href');
		//$(sales[sales.length - 1]).find('a#linkSale').trigger('click');
		chrome.runtime.sendMessage({action:"inCamp", params:[url_camp]}, function(response){
			//chrome.runtime.sendMessage({action:"endop", tabid:id});
		});
	}
}

$(function(){
    if((new Date()).getFullYear() <= 2014){
	    init();
    }
})




