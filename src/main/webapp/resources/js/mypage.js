/**
 * http://usejsdoc.org/
 */


let selectTmpNick = '';
let selectTmpRule = '';
let dashCreateInfo = {};

function logout(){
		
	xhrLoad('get','logout', null, (res)=>{
		if(res === 'true'){
			location.reload();
		}
	});
		
}

function dashRuleAdd(){
	
	const dashRuleAddBtn = document.querySelector('input[name=dashRuleAddBtn]');
	
	dashRuleAddBtn.addEventListener('click', ()=>{
		
		const dggrade = document.querySelector('input[name=dggrade]');
		const dgalias = document.querySelector('input[name=dgalias]');
		
		if(!dggrade.value){
			boxFun('등급을 지어주세요.');
			return
		} else if(!dgalias.value){
			boxFun('등급 별칭을 정해주세요.');
			return
		}
		
		const dashRuleList = document.querySelector('.dashRuleList');
		
		const ruleBox = addObject(dashRuleList, 'span', 'dashRuleItem', true , (o)=>{
			
			const colorArray = randomColor();
			
			o.dataset.dgalias = dgalias.value;
			o.dataset.dggrade = dggrade.value;
			
			o.style.backgroundColor = colorArray[0];
			o.style.color = colorArray[1];
			
			o.innerHTML = `${dgalias.value}`;
			infoBar(o, `${dgalias.value} (우선 순위 : ${dggrade.value})`);
			
		});
		
	});
	
}


function nickSearch(){
	
	const nickSearchBtn = document.querySelector('input[name=nickSearchBtn]');
	
	nickSearchBtn.addEventListener('click',()=>{
		
		const mnickInput = document.querySelector('input[name=mnick]');
		
		xhrLoad('get', 'nickcheck', { mnick : mnickInput.value }, (res)=>{
			
			if(res){
				boxFun('초대 가능한 유저입니다.');
				const jsonObj = JSON.parse(res);
				selectTmpMember = jsonObj;
			} else {
				boxFun('존재하지 않는 유저입니다.');
				selectTmpMember = '';
			}
		}, false);
		
	});
}

function addDashBoardFun(){
	
	
	// 1p
	const dashInfoDiv = addObject(null, 'div', 'dashInfoDiv', false, (o)=>{
		
		o.innerHTML = `
			<p>대시보드 만들기</p>
			<fieldset>
				<div>
					<p>대시보드명</p>
					<input type="text" name="dtitle"/>
				</div>
				<div>
					<p>대시보드 소개</p>
					<textarea name="ddesc"></textarea>
				</div>
			</fieldset>
		`;
	});
	
	
	const dashRuleDiv = addObject(null, 'div', 'dashRuleDiv', false, (o)=>{
		
		o.innerHTML = `
			<fieldset>
				<div>
					<p>대시보드 권한 추가</p>
					<input type="number" name="dggrade" placeholder="등급 우선 순위"/>
					<input type="text" name="dgalias" placeholder="등급 별칭"/>
					<input class="grayBtn" type="button" name="dashRuleAddBtn" value="권한 추가"/>
				</div>
				<div>
					<p>대시보드 룰 리스트</p>
					<div class="dashRuleList"></div>
				</div>
			</fieldset>
		`;
		
	});
	
	// 2p
	const dashMemberDiv = addObject(null, 'div', 'dashMemberDiv', false, (o)=>{
		
		o.innerHTML = `
			<p>대시보드 만들기</p>
			<fieldset>
				<div>
					<p>대시보드 맴버 추가</p>
					<input style="width: 66%; float: left;" type="text" name="mnick" placeholder="맴버 닉네임 검색"/>
					<input type="button" class="grayBtn" name="nickSearchBtn" value="검색"/> 
				</div>
				<div style="clear:both;display: inline-block;width: 100%;">
					<p>대시보드 룰 리스트</p>
					<div class="dashRuleList"></div>
				</div>
			</fieldset>
		`;
		
	});
	
	
	const dashMemberListDiv = addObject(null, 'div', 'dashMemberListDiv', false, (o)=>{
		
		o.innerHTML = `
			<fieldset>
				<div>
					<p>대시보드 권한 추가</p>
					<div class="dashMemberList"></div>
				</div>
			</fieldset>
		`;
		
	});	
	
	
	const addDashPrevBtn = addObject(null, 'input', ['addDashPrevBtn', 'grayBtn'], false, (o)=>{
		o.type = 'button';
		o.style.float = 'right';
		o.style.width = 'max-content';
		o.style.margin = '0';
		o.value = '이전';
		o.addEventListener('click', ()=>{
			
			const addDashForm = o.parentNode;
			
			motionOnOff(addDashForm, 0.8, false, { onOff : 'off',
				opacity : { 
					num0 : 0 
					},
				property : {
					mpp : 'position',
					x : {
						num0 : -5
					}
				}
			},false, (o)=>{
				o.remove();
			});
			
			boxFun(null, false, [dashInfoDiv, dashRuleDiv, addDashNextBtn, closeDashCloseBtn], true, 'addDashBox1', (o)=>{}, true);
			
		});
	});
	
	const addDashNextBtn = addObject(null, 'input', ['addDashNextBtn', 'grayBtn'], false, (o)=>{
		o.type = 'button';
		o.style.float = 'right';
		o.style.width = 'max-content';
		o.style.margin = '0';
		o.value = '다음';
		o.addEventListener('click', ()=>{
			
			const addDashForm = o.parentNode;
			
			motionOnOff(addDashForm, 0.8, false, { onOff : 'off',
				opacity : { 
					num0 : 0 
					},
				property : {
					mpp : 'position',
					x : {
						num0 : 5
					}
				}
			},false, (o)=>{
				o.remove();
			});
			
			boxFun(null, false, [dashMemberDiv, dashMemberListDiv, addDashPrevBtn, closeDashCloseBtn], true, 'addDashBox2', (o)=>{
				nickSearch();
				
			}, true);
		});
	});
	
	const closeDashCloseBtn = addObject(null, 'input', ['closeDashCloseBtn', 'grayBtn'], false, (o)=>{
		o.type = 'button';
		o.style.float = 'left';
		o.style.width = 'max-content';
		o.style.margin = '0';
		o.value = '닫기';
		o.addEventListener('click', ()=>{
			motionOnOff(o.parentNode, 0.8, false, { setting : 'offDefault' }, null, (o)=>{
				o.remove();
			});
		});
	});
	
	boxFun(null, false, [dashInfoDiv, dashRuleDiv, addDashNextBtn, closeDashCloseBtn], true, 'addDashBox1', (o)=>{
		dashRuleAdd();
		
	}, true);
	
};









window.onload = ()=>{
	
	let userInfo = headerFun();
	
	backgroundMotion();
	
	
	
	// mypage 만들기
	const content = document.querySelector('#content');
	
	const myBox = addObject(content, 'div', 'myPageContent', true, (o)=>{
		motionOnOff(o, 0.8, false, { setting : 'onDefault' }, {
			after : (o)=>{
				o.style.top = '20%';
				o.style.left = '50%';
				o.style.transform = 'translateX(-50%)';
			}
		});
	});

	
	const myProfileBox = addObject(myBox, 'div', 'myProfileBox', true, (o)=>{
		
		o.innerHTML = `
		<div id="myProfile">
			<div id="p_header">
				<p id="p_mnick"><span>${userInfo.mnick}</span><span>(${userInfo.mid})</span></p>
			</div>
			<div id="p_body">
				<p id="p_mabout">${userInfo.mabout}</p>
			</div>
		</div>
		`;
		
		const myImgBox = addObject(o, 'div', 'myImgBox', true, (o)=>{
			o.style.backgroundImage = `url('${userInfo.mimgpath}')`;
		});
		
		const mabout = document.querySelector('#p_mabout');
		
		mabout.addEventListener('click', ()=>{
			
			const p_body = document.querySelector('#p_body');
			
			const text = mabout.innerHTML;
			
			const textarea = addObject(p_body, 'textarea', 'mabout', true, (o)=>{
				o.name = 'mabout';
				o.value = brChange(text);
				o.style.display = 'block';
				o.style.width = '90%';
				o.style.height = '70px';
				o.style.padding = '12px';
				mabout.style.display = 'none';
			});
			
			const maboutSubmitBtn = addObject(p_body, 'button', 'grayBtn', true, (o)=>{
				o.innerHTML = '수정';
				o.style.display = 'inline-block';
				o.addEventListener('click', ()=>{
					
					xhrLoad('post', 'mabout', { mno : userInfo.mno, mabout : textarea.value }, (res)=>{
						
						if(res === 'true'){
							mabout.innerHTML = brChange(textarea.value, true);
							userInfo['mabout'] = brChange(textarea.value, true);
							textarea.remove();
							maboutCloseBtn.remove();
							o.remove();
							mabout.style.display = 'block';
						}
					});
					
				});
			});
			
			const maboutCloseBtn = addObject(p_body, 'button', 'grayBtn', true, (o)=>{
				o.innerHTML = '취소';
				o.style.display = 'inline-block';
				o.style.margin = '0 5px';
				o.addEventListener('click', ()=>{
					textarea.remove();
					maboutSubmitBtn.remove();
					o.remove();
					mabout.style.display = 'block';
				});
			});
			
		});
		
	});
	
	const ownerDashBoard = addObject(myBox, 'div', 'ownerDashBoard', true, (o)=>{
		
		o.innerHTML = `
			<fieldset>
				<legend>내가 소유한 대시보드</legend>
				<div id="owner_list"></div>
			</fieldset>
			`;
			
		
	});
	
	const belongDashBoard = addObject(myBox, 'div', 'belongDashBoard', true, (o)=>{
		
		o.innerHTML = `
			<fieldset>
				<legend>내가 참여한 대시보드</legend>
				<div id="belong_list"></div>
			</fieldset>
			`;
		
	});
	
	xhrLoad('get','mypage/dashboard', null, (res)=>{
	
		let dashboardList = JSON.parse(res);
	
		for(let dashItem of dashboardList){
			
			let state;
			
			if(dashItem.mnick === userInfo.mnick){
				state = 'owner';
			} else {
				state = 'belong';
			}
			
			const dashList = document.querySelector('#'+state+'_list');
			
			const dashItemDiv = addObject(dashList, 'div', ['dashItem', '_'+state], true, (o)=>{
				
				motionOnOff(o, 0.5, false, {
					opacity : {
						num0 : 0,
						num1 : 1
					},
					property : {
						mpp : 'margin',
						y : { num0 : -6, num0 : 6 },
						x : 6
					}
				})
				
				o.innerHTML = `
				<div class="d_header">
					<p class="d_title"><span>${dashItem.dtitle}</span><span>${new Intl.DateTimeFormat('ko-KR').format(new Date(dashItem.dcreatedate))}</span></p>
					<p class="d_nick">
						<span style="background-image:url('${dashItem.mimgpath}');"></span><span>
				`+
					((state === 'owner')? `본인 소유` : `${dashItem.mnick}`)
					+`
					</span></p>
				</div>
				<div class="d_body">
					<p class="d_desc">${dashItem.ddesc}</p>
				</div>
				`;
				
				contextMenuFun(o,{
					'newDash' : {
						'대시보드 추가' : ()=>{console.log('작동 테스트');}
					},
					'dashMenu' :{
						'대시보드 자세히 보기' : ()=>{alert('자세히보기 함수');},
						'대시보드 수정' : ()=>{alert('수정 함수');},
						'대시보드 삭제' : ()=>{alert('삭제 함수')}
					},
					'messageMenu' : {
						'쪽지함 보기' : ()=>{alert('쪽지함 함수');},
						'쪽지 작성' : ()=>{alert('쪽지 작성 함수');}
					},
					'alramMenu' : {
						'알람 보기' : ()=>{alert('알람 함수');}
					},
					'logout' : {
						'로그아웃' : ()=>{ logout(); }
					}
				});
			});
			
		}
		
	},false);
		
	const body = document.querySelector('body');
	contextMenuFun(body,{
		'newDash' : {
			'대시보드 추가' : ()=>{addDashBoardFun();}
		},
		'messageMenu' : {
			'쪽지함 보기' : ()=>{alert('쪽지함 함수');},
			'쪽지 작성' : ()=>{alert('쪽지 작성 함수');}
		},
		'alramMenu' : {
			'알람 보기' : ()=>{alert('알람 함수');}
		},
		'logout' : {
			'로그아웃' : ()=>{ logout(); }
		}
	});
		
	
};