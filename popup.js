$(function(){
	$('#submit').click(function(){
			localStorage['quantity'] = $('#quantity').val() || 1;
			chrome.extension.getBackgroundPage().initApp();
			console.log("popup.js : call background to inject content scripts");
			document.getElementById('msg').innerText = 'Submited!';
	});
})
