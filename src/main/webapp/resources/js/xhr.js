/**
 * http://usejsdoc.org/
 */
function xhrLoad(method, url, reqeustObjet,callBack){
    const xhr = new XMLHttpRequest();
    if(method === 'get'){
    	
    	let params = '';
    	if(reqeustObjet){
    		Object.keys(reqeustObjet).forEach((k)=>{
    			params += k +"=" + reqeustObjet[k] + "&";
    		});
    	}
    	xhr.open(method, url + "?"+params);
    } else {
    	xhr.open(method, url);
    }
    
    xhr.onreadystatechange = function(){
        let {readyState, status, responseText} = xhr;
        if(readyState === xhr.DONE){
            if(status === 200){
            	callBack(responseText);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //xhr.setRequestHeader('X-HTTP-Method-Override', method);
    if(method !== 'get'){
    	if(reqeustObjet) xhr.send(JSON.stringify(reqeustObjet));
    	else xhr.send();
    } else xhr.send();
    
  
    
}