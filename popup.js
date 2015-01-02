
$(function(){
    if((new Date()).getFullYear() <= 2015){
        $('#submit').click(function(){
            localStorage.clear();
            localStorage['camp'] = $('#camp').val();
            //localStorage['time'] = $('#time').val();
            localStorage['reverse'] = 'true';
            localStorage['reverse'] = $('#reverse').is(':checked');
            var marquesRaw = $('#marque').val() || '';
            var marques = marquesRaw.split(',');
            length = marques.length;
            if(marquesRaw !== '' && length !== 0){
                localStorage['total'] = length;
                for(var i = 0; i < length; i = i + 1){
                    localStorage['marque_' + i] = marques[i].trim();
                }

                chrome.extension.getBackgroundPage().initApp();
                console.log("popup.js : call background to inject content scripts");
                document.getElementById('msg').innerText = 'Submited!';
            }else{
                console.log('no marques');
                document.getElementById('error').innerText = 'Marques sont obligatoires!';
            }
        });
    }
})
