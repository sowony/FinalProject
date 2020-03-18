/**
 * http://usejsdoc.org/
 */


window.onload = ()=>{
	
	let userInfo = headerFun();
	
	backgroundMotion();
	
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
				<p id="p_mnick">${userInfo.mnick}(${userInfo.mid})</p>
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
			
			const textarea = addObject(mabout.parentNode, 'textarea', 'mabout', true, (o)=>{
				o.name = 'mabout';
				o.value = mabout.innerHTML;
				o.style.width = '90%';
				o.style.height = '70px';
				o.style.padding = '12px';
				mabout.remove();
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
						'로그아웃' : ()=>{console.log('로그아웃');}
					}
				});
			});
			
		}
		
	},false);
	
	
	function logout(){
		
		xhrLoad('get','logout', null, (res)=>{
			if(res === 'true'){
				location.reload();
			}
		});
		
	}
	
		
	const body = document.querySelector('body');
	contextMenuFun(body,{
		'newDash' : {
			'대시보드 추가' : ()=>{console.log('작동 테스트');}
		},
		'messageMenu' : {
			'쪽지함 보기' : ()=>{alert('쪽지함 함수');},
			'쪽지 작성' : ()=>{alert('쪽지 작성 함수');}
		},
		'alramMenu' : {
			'알람 보기' : ()=>{alert('알람 함수');}
		},
		'logout' : {
			'로그아웃' : ()=>{console.log('로그아웃');}
		}
	});
		
	
};