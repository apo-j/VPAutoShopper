debugger;

function init(){
	var $quantity = $('select[name="quantity"]');
	if($quantity.length > 0){
		$quantity.val(1);
	}
	
	var $model = $('select[name="productId"]');
	if($model.length > 0){
		$('select[name="productId"]>option').each(function(index, item){
			if(index != 0){
				$model.val($(item).val());
				$('#addToCart').trigger('click');
				setTimeout(function(){
					$('#addedToCart .commandActionLink>a').trigger('click');
				}, 50);
			}
		});
	}else{
		$('#addToCart').trigger('click');
	}
	
	setTimeout(function(){
		chrome.runtime.sendMessage({action:"endop"});
	}, 50);
}

$(function(){
    init();
})





