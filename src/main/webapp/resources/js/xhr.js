/**
 * http://usejsdoc.org/
 */
function xhrLoad(method, url, loadTarget,reqeustObjet,callBack){
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onreadystatechange = function(){
        let {readyState, status, responseText} = xhr;
        if(readyState === xhr.DONE){
            if(status === 200){
                
                let jsonResult = JSON.parse(responseText);
                console.log(jsonResult);

                const mid = document.getElementById('mid');

                if(loadTarget === 'dashb'){
                    for(let i = 0 ; i < jsonResult.length ; i++){
                        let dashObj = jsonResult[i];
                        if(dashObj.downer === mid.dataset.mid){
                            dashBoardSort(dashObj,'owner');
                        } else {
                            dashBoardSort(dashObj,'belong');
                        }
                    }
                } else if(loadTarget === 'acc'){

                } else if(loadTarget === 'accup'){

                } else if(loadTarget === 'idSearch') {
                	if(responseText){
                		boxFun('아이디가 존재합니다.', true);
                		callBack();
                	} else {
                		boxFun('아이디가 존재하지 않습니다.',true);
                	}
                } else if(loadTarget === 'login'){
                	if(responseText){
                		location.reload();
                	}
                }
            }
        }
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    if(reqeustObjet) xhr.send(JSON.stringify(reqeustObjet));
    else xhr.send();
}