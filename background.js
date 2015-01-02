
var lastTabId = 0;
var baseUrl = 'http://fr.vente-privee.com';
// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
	lastTabId = tabId;
  // If the letter 'g' is found in the tab's URL...
  if (tab.url.indexOf('fr.vente-privee.com') > -1 && tab.url.indexOf('https://secure.fr.vente-privee.com') === -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
};

var msg = function(key, value, code){
	var self = this;
	self.key = key;
	self.value = value;
	self.code = code || 'ok';
}

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(request.action === "init_main"){
		var values = [];
        values.push(new msg('reverse', localStorage['reverse']));
		values.push(new msg('camp', localStorage['camp']));
		var length = parseInt(localStorage['total']);
		for(var i = 0; i < length; i = i + 1){
			var key = 'marque_' + i;
			values.push(new msg(key, localStorage[key]));
		}
		sendResponse(values);
	}else if(request.action === "inCamp"){
		//console.log("background.js : inCamp called");
		chrome.tabs.create({ url: baseUrl + request.params[0]});
		//inject js
		injectJS("contentscript-incamp.js");
		sendResponse(new msg());
	}else if(request.action === "inMarque"){
		//console.log("background.js : inCamp called");
		chrome.tabs.create({ url: baseUrl + request.params[0]});
		//inject js
		injectJS("contentscript-inmarque.js");
		sendResponse(new msg());
	}else if(request.action === "endop"){
		//nothing need to be done
		chrome.tabs.remove(sender.tab.id, function(){
			console.log("tab : " + sender.tab.id + ' closed');
		});
	}else if(request.action === "mainReload"){
		injectJS("contentscript-main.js");
	}
  })
  

chrome.runtime.onConnect.addListener(function(port) {
	if(port.name == "openmarque"){
		port.onMessage.addListener(function(msg) {
			//console.log("background.js : on openmarque");
			msg.url = msg.url || '';
			if (msg.url !== ''){
				chrome.tabs.create({ url: baseUrl + msg.url });
				injectJS("contentscript-inmarque.js");
			}else{
				port.postMessage({status: 'end'});
			}
		});
	}else if(port.name == "openlistitem"){
		port.onMessage.addListener(function(msg) {
			//console.log("background.js : on openlistitem");
			//console.log('test :' + msg.url);
			msg.url = msg.url || '';
			if (msg.url !== ''){
				//console.log("background.js : on openlistitem -- " + msg.url);
				chrome.tabs.create({ url: baseUrl + msg.url });
				injectJS("contentscript-inlistitem.js");
			}else{
				port.postMessage({status: 'end'});
			}
		});
	}else if(port.name == "openarticle"){
		port.onMessage.addListener(function(msg) {
			//console.log("background.js : on openarticle");
			msg.url = msg.url || '';
			if (msg.url !== ''){
				chrome.tabs.create({ url: msg.url });
				injectJS("contentscript-addtopanier.js");
			}else{
				port.postMessage({status: 'end'});
			}
		});
	}
});
 
function injectJS(contentScriptName){
	chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
		var specTab = tabs[0];
		chrome.tabs.executeScript(specTab.id, {file:"jquery-2.0.3.min.js"});

		console.log("underscore.js");
		chrome.tabs.executeScript(specTab.id, {file:"underscore.js"});
		chrome.tabs.executeScript(specTab.id, {file:contentScriptName});
	});
}


function initApp(){
    if((new Date()).getFullYear() <= 2015){
        injectJS("contentscript-main.js");
    }
}
//chrome.browserAction.onClicked.addListener(click);