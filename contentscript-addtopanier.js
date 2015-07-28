debugger;

function init(){
	console.log('dd');
	var $nostock = $('#noStock');
	if($nostock.css('display') !== 'none'){
		location.reload();
		init();
	}

	addProduct();

	location.reload();
	setTimeout(function(){
		init();
	},50)

	//setTimeout(function(){
	//	chrome.runtime.sendMessage({action:"endop"});
	//}, 10);
}

function addProduct(){
	console.log('ha');
	var $quantity = $('select#qtt');
	if($quantity.length > 0){
		$quantity.val(1);
	}

	var $model = $('select#model');
	if($model.length > 0){
		$model.find('option').each(function(index, item){
			if(index != 0){
				$model.val($(item).val());
				$('#addToCartLink')[0].click();
				setTimeout(function(){
					$('#addToCartModal_closeModal')[0].click();
				}, 0);
			}
		});
	}else{
		$('#addToCartLink')[0].click();
	}
}

$(function(){
	init();
})




