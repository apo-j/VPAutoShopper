debugger;

function init(){
	chrome.runtime.sendMessage({action:"init_main", params:[]}, function(response){
		if(response !== undefined && response !== null){
			localStorage.total = response.length - 1;
			for(var i = 0; i < response.length; i = i + 1){
				localStorage[response[i].key] = response[i].value;
			}
			console.log("contentscript-main.js : init done");
			start(response);
		}
	});
}

function start(response){
	console.log("contentscript-main.js : start");
	var $lastSale = $('ul.currentlySales>li.trmSales').last();
	var capName = $lastSale.find('a.linkAccess>h4').text();

	if(capName.toLowerCase().indexOf(localStorage['camp'].toLowerCase()) === -1){
		location.reload();
		chrome.runtime.sendMessage({action:"mainReload", params:[]});
		console.log('not found the target sale');
	}else{
		var marques = _.filter(response, function(res){
			return /Marque/i.test(res.key);
		})

		var $availableMarques = $lastSale.find('ul.trmLinks>li>a');

		_.each(marques, function(marque){

			var match = $availableMarques.each(function(idx, item){
				if($(item).text().trim().toLowerCase() == marque.value.toLowerCase()){
					chrome.runtime.sendMessage({action:"inMarque", params:[$(item).attr('href')]}, function(response){
						//chrome.runtime.sendMessage({action:"endop", tabid:id});
					});
					return;
				}
			});

		})

		/*var url_camp = $lastSale.find('a[id^=linkAccess_]').attr('href');
		//$(sales[sales.length - 1]).find('a#linkSale').trigger('click');
		chrome.runtime.sendMessage({action:"inCamp", params:[url_camp]}, function(response){
			//chrome.runtime.sendMessage({action:"endop", tabid:id});
		});*/
	}
}

/*function start(){
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
}*/

$(function(){
    if((new Date()).getFullYear() <= 2015){
	    init();
    }
})




