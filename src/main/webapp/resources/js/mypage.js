/*
    loadTarget 종류

    - dashboard 대쉬보드 로드 -> div (id = owner_dash / belong_dash)
    - account 회원 정보 로드 -> div (id = accountinfo)
    - accountupdate 회원 정보 수정 로드 -> div (id = accountupdate)

*/

function dashBoardSort(dashboard, status){

    const {dno, dtitle, ddesc, downer} = dashboard;

    const div = document.getElementById(status + '_dash');
    
    const inputCon = `
    <div class="dashitem" data-dno="${dno}">
        <div class="dashitem_head">
            <p>${dtitle}</p>
        </div>
        <div class="dashitem_body">
            <p>${ddesc}</p>
        </div>
        <div class="dashitem_foot">
            <p>${downer}</p>
        </div>
    </div>
    `;
    
    div.appendChild(inputCon);
}

function xhrLoad(method, url, loadTarget){
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.onreadystatechange = function(){
        let {readyState, status, responseText} = xhr;
        if(readyState === xhr.DONE){
            if(status === 200){
                
                let jsonResult = JSON.parse(responseText);
                console.log(jsonResult);

                const myid = document.getElementById('mid').dataset.mid;

                if(loadTarget === 'dashb'){
                    for(let i = 0 ; i < jsonResult.length ; i++){
                        let dashObj = jsonResult[i];
                        if(dashObj.downer === myid){
                            dashBoardSort(dashObj,'owner');
                        } else {
                            dashBoardSort(dashObj,'belong');
                        }
                    }
                } else if(loadTarget === 'acc'){

                } else if(loadTarget === 'accup'){

                }
            }
        }
    };

    xhr.setRequestHeader('Content-Type', 'application/json');    
    xhr.send();

}

function dashAddForm(){

    const form = `
        
    `;

};

window.onload = function(){

    const loadTargetObj = {
        dashboard : 'dashb',
        account : 'acc',
        accountupdate : 'accup'
    };

    const dashAddBtn = document.getElementById('dashAddBtn');
    
    xhrLoad('get','mypage/dashload', loadTargetObj.dashboard);

};