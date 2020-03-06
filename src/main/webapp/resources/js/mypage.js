/*
    loadTarget 종류

    - dashboard 대쉬보드 로드 -> div (id = owner_dash / belong_dash)
    - account 회원 정보 로드 -> div (id = accountinfo)
    - accountupdate 회원 정보 수정 로드 -> div (id = accountupdate)

*/


let dashAddObject = {
		'dtitle' : '',
		'ddesc' : '',
		'member' : [],
		'rule' : []
};

function dashBoardSort(dashboard, status){

    const {dno, dtitle, ddesc, downer} = dashboard;

    const div = document.getElementById(status + '_dash');
    const dashAddBtn = document.getElementById('dashAddBtn');
    const dashItem = addObject(div, 'div','dashItem', false);
    dashItem.setAttribute('data-dno',dno);
    const inputCon = `
        <div class="dashItem_head">
            <p>${dtitle}</p>
        </div>
        <div class="dashItem_body">
            <p>${ddesc}</p>
        </div>
        <div class="dashItem_foot">
            <p>${downer}</p>
        </div>`;
    dashItem.innerHTML = inputCon;
    
    div.insertBefore(dashItem,dashAddBtn);
    
    const menu = document.querySelector('.customMenu');
	contextMenuFun(dashItem,menu,{
		'대시보드 자세히 보기' : ()=>{boxFun('아직 안 만듬 ㅋ',true)},
		'대시보드 수정' : ()=>{boxFun('아직 안 만듬 ㅋ',true)},
		'대시보드 삭제' : ()=>{boxFun('아직 안 만듬 ㅋ',true)}
	});

}

function dashAddClose(){
	
	const section = document.querySelector('section');
	const article_chk = document.getElementById('dashAddarticle');
	article_chk.remove();
}

function dashAddForm(){
	
	const section = document.querySelector('section');
	const mid = document.getElementById('mid').dataset.mid;
	const article_chk = document.getElementById('dashAddarticle');
	
	if(article_chk) article_chk.remove();
	
	const article = addObject(section,'article','',true);
	
	article.setAttribute('id','dashAddarticle');
	
    const form0 = `
			<form id="dashAddForm">
				<input type="hidden" name="downer" value="${mid}"/>
				<p>DASHBOARD ADD</p>
				<div id="dashAddDiv">
					<p>DASHBOARD TITLE</p>
					<input type="text" name="dtitle" value="${dashAddObject['dtitle']}"/>
					<p>DASHBOARD INFO</p>
					<textarea name="ddesc">${dashAddObject['ddesc']}</textarea>
				</div>
				<div id="dashRuleDiv">
					<p>DASHBOARD RULE ADD</p>
					<p>등급 순위<input type="number" name="dggrade" size="9999"/></p>
					<p>등급 별칭<input type="text" name="dgalias"/></p>
					<input id="addRuleBtn" type="button" value="권한 추가"/>
					<p>DASHBOARD RULE LIST</p>
					<div id="dashRuleArea">
					</div>
				</div>
				<div id="dashAddSubmit">
					<input type="button" onclick="dashAddClose();" value="CLOSE"/>
					<input type="button" class="next1" value="NEXT"/>
				</div>
			</form>
    `;
    
    
    article.innerHTML = form0;
    
    middlePositionFun(article);
    
    // 룰 추가 함수
    function ruleAddFun(dggrade,dgalias,page){
    	
    	const dashRuleArea = document.getElementById('dashRuleArea');
    	const deleteDiv = `<a class="delDRule">X</a>`;
    	const ruleDiv = addObject(dashRuleArea,'div','dashRuleItem',true);
    	ruleDiv.dataset.dggrade = dggrade;
    	ruleDiv.dataset.dgalias = dgalias;
    	ruleDiv.innerHTML = `${dgalias}` + ((page === 1)? deleteDiv : ``);
    	
    	infoBar(ruleDiv,`${dgalias}(${dggrade})`);
    	
    	if(page === 1){
    		
    		const delDRule = document.getElementsByClassName('delDRule');
    		for(let item of delDRule){
    			item.addEventListener('click',()=>{
    				const target = item.parentNode;
    				target.remove();
    				utilBoxDelete();
    			});
    		}
    		
    	} else if(page === 2){
    		
    		ruleDiv.addEventListener('click',()=>{
    			const chk = document.querySelector('.ruleCheck');
    			if(chk) chk.classList.remove('ruleCheck');
    			ruleDiv.classList.add('ruleCheck');
    		});
    		
    	}
    	
    }
    
    // 룰 추가 이벤트 연결
    
    const addRuleBtn = document.getElementById('addRuleBtn');
    
    addRuleBtn.addEventListener('click',()=>{
    	
    	const dggrade = document.querySelector('input[name="dggrade"]').value;
    	const dgalias = document.querySelector('input[name="dgalias"]').value;
    	
    	if(!dggrade) { boxFun('등급을 입력해주세요.', true); return false }
    	else if(!dgalias) { boxFun('명칭을 입력해주세요.', true); return false }
    	
    	const dashRuleItem = document.getElementsByClassName('dashRuleItem');
    	
    	for(let item of dashRuleItem){
    		if(item.dataset.dgalias === dgalias){
    			boxFun('중복된 명칭의 조건이 있습니다.',true);
    			return false;
    		}
    	}
    	
    	ruleAddFun(dggrade, dgalias, 1);
    	
    });
    
    
    // 룰 리스트 출력
    
    if(dashAddObject.rule.length > 0){
    	
    	dashAddObject.rule.forEach((v)=>{
    		ruleAddFun(v.dggrade, v.dgalias, 1);
    	});
    	
    } else {
    	
    	ruleAddFun(0, 'default', 1);
    
    }
    
    
    
    // 다음 페이지 체크
    
    const next1Btn = document.querySelector('.next1');
    next1Btn.addEventListener('click',(e)=>{
    	
    	const article = document.getElementById('dashAddarticle');
    	const dashRuleItems = document.getElementsByClassName('dashRuleItem');
    	
    	dashAddObject.dtitle = document.querySelector('input[name="dtitle"]').value;
    	dashAddObject.ddesc = document.querySelector('textarea[name="ddesc"]').value;
    	
    	dashAddObject.rule = [];
    	
    	for(let item of dashRuleItems){
    		const dggrade = item.dataset.dggrade;
    		const dgalias = item.dataset.dgalias;
    		dashAddObject.rule.push({ dggrade, dgalias });
    	}
    	
    	const form1 = `
        	<form id="dashAddForm">
        		<p>DASHBOARD ADD</p>
        		<div id="dashAddMemberSearch">
        			<p>DASHBOARD MEMBER ADD</p>
        			<p>ID 검색<input type="text" name="mid"/><input name="idSearchBtn" type="button" value="ID 검색"/></p>
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
    	
    	
    	
    	
    	// 2page 룰 리스트 출력
    	dashAddObject.rule.forEach((v)=>{
    		ruleAddFun(v.dggrade,v.dgalias,2);
    	});
    	
    	
    	
    	// 맴버 리스트 출력
    	const memberList = document.querySelector('#dashMemberArea');
    	
    	// memberItem 만드는 funtion
    	function addMemberItem(obj){
    		// 맴버리스트에 추가할 DIV 태그 생성 
			const addMemberItem = addObject(memberList,'div', 'memberItem', true,(t)=>{
				t.innerHTML = `${obj.dmmid}`;
				// 맴버 삭제 버튼 생성
				const deleteBtn = addObject(t, 'a','delMember', true, (a)=>{
					a.innerHTML = `X`;
					// 이벤트 연결
					a.addEventListener('click',()=>{
						t.remove();
						utilBoxDelete();
					});
				});
				infoBar(t, `${obj.dmmid}(${obj.dgalias} | ${obj.dggrade})`);
			});
    	}
    	
    	// 맴버 리스트 출력
    	for(let v of dashAddObject.member){
    		addMemberItem(v);
    	}
    	
    	
    	
    	
    	
    	// 맴버 추가 & 맴버에 권한 부여
    	const idSearchBtn = document.querySelector('input[name="idSearchBtn"]');
    	idSearchBtn.addEventListener('click',()=>{
    		const mid = document.querySelector('input[name="mid"]');
    		if(mid.value === document.getElementById('mid').dataset.mid){
    			boxFun('본인의 아이디 입니다.',true);
    			return false;
    		}
    		
    		for(let v of dashAddObject.member){
        		if(mid.value === v.dmmid){
        			boxFun('등록된 아이디 입니다.',true);
        			return false;
        		}
        	}
    		
    		// ID Search AJAX
    		xhrLoad('post','mypage/idsearch','idSearch',{ 'mid' : mid.value  },()=>{
    			// ID가 있을 시 맴버 추가 버튼 생성하는 콜백 함수
    			const addBtn = addObject(idSearchBtn.parentNode, 'input', '', true, (t)=>{
    				t.setAttribute('type','button');
    				t.value='맴버 추가';
    				t.style.marginLeft = '8px';
    				
    				// 버튼에 이벤트 연결
    				t.addEventListener('click',()=>{
    					const ruleCheck = document.querySelector('.ruleCheck');
    					if(ruleCheck){
    						
    						addMemberItem({
								'dmmid' : mid.value,
								'dgalias' : ruleCheck.dataset.dgalias,
								'dggrade' : ruleCheck.dataset.dggrade
							});
    						
    						dashAddObject.member.push({
								'dmmid' : mid.value,
								'dgalias' : ruleCheck.dataset.dgalias,
								'dggrade' : ruleCheck.dataset.dggrade
							});
    						
    					} else {
    						boxFun('권한을 선택해주세요.');
    						return false;
    					}
    					
    					// 추가후 초기화
    					mid.value = '';
    					ruleCheck.classList.remove('ruleCheck');
    					t.remove();
    				});
    			});
    		});
    		
    	});
    	
    	// 뒤로가기 버튼
    	const prevBtn = document.querySelector('.prev');
    	prevBtn.addEventListener('click',()=>{
    		dashAddForm();
    	});
    	
    	
    	// 만들기 버튼
    	const createBtn = document.querySelector('.create');
    	createBtn.addEventListener('click',()=>{
    		boxFun('아직 안 만듬',true);
    	});
    	return false;
    });
    
    
};

window.onload = function(){

	
	// section 객체에 커스텀 메뉴 등록
	const menuObject = addObject(document.querySelector('body'), 'div', 'customMenu', true, (t)=>{
		t.style.display='none';
		const section = document.querySelector('section');
		
		contextMenuFun(section,t,{
			'대시보드 추가' : dashAddForm
		});
		
	});
	
    const loadTargetObj = {
        dashboard : 'dashb',
        account : 'acc',
        accountupdate : 'accup'
    };

    const dashAddBtn = document.getElementById('dashAddBtn');
    
    dashAddBtn.addEventListener('click', dashAddForm);
    
    xhrLoad('get','mypage/dashload', loadTargetObj.dashboard);

}