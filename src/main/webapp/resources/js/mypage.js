/*
    loadTarget 종류

    - dashboard 대쉬보드 로드 -> div (id = owner_dash / belong_dash)
    - account 회원 정보 로드 -> div (id = accountinfo)
    - accountupdate 회원 정보 수정 로드 -> div (id = accountupdate)

*/

let dashAddObject = {
		'rule' : {}
};

function dashBoardSort(dashboard, status){

    const {dno, dtitle, ddesc, downer} = dashboard;

    const div = document.getElementById(status + '_dash');
    const dashAddBtn = document.getElementById('dashAddBtn');
    const dashItem = document.createElement('div');
    dashItem.setAttribute('class','dashitem');
    dashItem.setAttribute('data-dno',dno);
    const inputCon = `
        <div class="dashitem_head">
            <p>${dtitle}</p>
        </div>
        <div class="dashitem_body">
            <p>${ddesc}</p>
        </div>
        <div class="dashitem_foot">
            <p>${downer}</p>
        </div>`;
    dashItem.innerHTML = inputCon;
    
    div.insertBefore(dashItem,dashAddBtn);

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

function dashAddClose(){
	
	const section = document.getElementsByTagName('section')[0];
	const article_chk = document.getElementById('dashAddarticle');
	section.removeChild(article_chk);
	
}

function dashAddForm(){
	
	const section = document.getElementsByTagName('section')[0];
	const mid = document.getElementById('mid').dataset.mid;
	const article_chk = document.getElementById('dashAddarticle');
	
	if(article_chk) article_chk.remove();
	
	const article = document.createElement('article');
	
	article.setAttribute('id','dashAddarticle');
	
    const form0 = `
			<form id="dashAddForm">
				<input type="hidden" name="downer" value="${mid}"/>
				<p>DASHBOARD ADD</p>
				<div id="dashAddDiv">
					<p>DASHBOARD TITLE</p>
					<input type="text" name="dtitle"/>
					<p>DASHBOARD INFO</p>
					<textarea name="ddesc"></textarea>
				</div>
				<div id="dashRuleDiv">
					<p>DASHBOARD RULE ADD</p>
					<p>등급 순위<input type="number" name="dggrade" size="9999"/></p>
					<p>등급 별칭<input type="text" name="dgalias"/></p>
					<input type="button" value="권한 추가"/>
					<p>DASHBOARD RULE LIST</p>
					<div id="dashRuleArea">
						 <div class="dashRuleItem" data-dgalias="default" data-dggrade="0">DEFAULT<a class="delDRule">X</a></div>
					</div>
				</div>
				<div id="dashAddSubmit">
					<input type="button" onclick="dashAddClose();" value="CLOSE"/>
					<input type="button" class="next1" value="NEXT"/>
				</div>
			</form>
    `;
    
    
    article.innerHTML = form0;
    section.appendChild(article);
   
    const dashRuleItem = document.getElementsByClassName('dashRuleItem');
    
    for(let v of dashRuleItem){
    	const str = `${v.dataset.dgalias}(${v.dataset.dggrade})`;
    	infoBar(v,str);
    }
    
    const next1Btn = document.getElementsByClassName('next1')[0];
    next1Btn.addEventListener('click',(e)=>{
    	
    	const article = document.getElementById('dashAddarticle');
    	const dashRuleItems = document.getElementsByClassName('dashRuleItem');
    	
    	for(let item of dashRuleItems){
    		dashAddObject.rule[item.dataset.dgalias]=item.dataset.dggrade;
    	}
    	
    	const form1 = `
        	<form id="dashAddForm">
        		<p>DASHBOARD ADD</p>
        		<div id="dashAddMemberSearch">
        			<p>DASHBOARD MEMBER ADD</p>
        			<p>ID 검색<input type="text" name="mid"/></p>
        			<input type="button" value="ID 검색"/>
        			<p>DASHBOARD RULE</p>
        			<div id="dashRuleArea">
        			</div>
        		</div>
        		<div id="dashAddMemberList">
        			<p>DASHBOARD MEMBER LIST</p>
        			<div id="dashMemberArea">
        			</div>
        		</div>
        		<div id="dashAddSubmit">
					<input type="button" onclick="dashAddClose();" value="CLOSE"/>
					<input style="float:right;" type="button" class="create" value="CREATE"/>
					<input style="float:right;" type="button" class="prev" value="PREV"/>
				</div>
        	</form>
        `;
    	
    	article.innerHTML = form1;
    	
    	const dashRuleArea = document.getElementById('dashRuleArea');
    	
    	let ruleDiv = '';
    	
    	const keyArray = Object.keys(dashAddObject.rule);
    	keyArray.forEach((v)=>{
    		ruleDiv += `<div class="dashRuleItem" data-dgalias="${v}" data-dggrade="${dashAddObject.rule[v]}">DEFAULT<a class="delDRule">X</a></div>`
    	});
    	
    	dashRuleArea.innerHTML = ruleDiv;
    	
    	const prevBtn = document.getElementsByClassName('prev')[0];
    	prevBtn.addEventListener('click',()=>{
    		dashAddForm();
    	});

    	const createBtn = document.getElementsByClassName('create')[0];
    	createBtn.addEventListener('click',()=>{
    		console.log('아직 안 만듬');
    	});
    	
    	return false;
    });
    
    
};

window.onload = function(){

    const loadTargetObj = {
        dashboard : 'dashb',
        account : 'acc',
        accountupdate : 'accup'
    };

    const dashAddBtn = document.getElementById('dashAddBtn');
    
    dashAddBtn.addEventListener('click', dashAddForm);
    
    xhrLoad('get','mypage/dashload', loadTargetObj.dashboard);

}