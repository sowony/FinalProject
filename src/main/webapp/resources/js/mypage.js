/**
 * http://usejsdoc.org/
 */


window.onload = ()=>{
	
	let userInfo = headerFun();
	
	console.log(userInfo);
	
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
					<p class="d_title">${dashItem.dtitle}</p>
					<p class="d_createdate">${new Intl.DateTimeFormat('ko-KR').format(new Date(dashItem.dcreatedate))}</p>`+
					((state === 'owner')? `<p class="d_nick">본인 소유</p>` : `<p class="d_nick">${dashItem.mnick}</p>`)
					+`
				</div>
				<div class="d_body">
					<p class="d_desc">${dashItem.ddesc}</p>
				</div>
				`;
			});
			
		}
		
	},false);
	
};