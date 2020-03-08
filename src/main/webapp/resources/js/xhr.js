/**
 * http://usejsdoc.org/
 */
function xhrLoad(method, url, reqeustObjet,callBack){
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function(){
        let {readyState, status, responseText} = xhr;
        if(readyState === xhr.DONE){
            if(status === 200){
            	
            	callBack(responseText);
            	
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    if(reqeustObjet) xhr.send(JSON.stringify(reqeustObjet));
    else xhr.send();
}