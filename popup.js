$(function(){
	$('#submit').click(function(){
		localStorage.clear();
		localStorage['time'] = $('#time').val();
		var marquesRaw = $('#marque').val() || '';
		var marques = marquesRaw.split(',');
		length = marques.length;
		if(marquesRaw !== '' && length !== 0){
			localStorage['total'] = length;
			for(var i = 0; i < length; i = i + 1){
				localStorage['marque_' + i] = marques[i].trim();
			}
			
			localStorage['quantity'] = $('#quantity').val() || 1;	
			chrome.extension.getBackgroundPage().initApp();
			console.log("popup.js : call background to inject content scripts");
			document.getElementById('msg').innerText = 'Submited!';
		}else{
			console.log('no marques');
			document.getElementById('error').innerText = 'Marques sont obligatoires!';
		}	
	});
})