/**
 * http://usejsdoc.org/
 */



function headerFun(){
	
	let userInfo;
	
	xhrLoad('get', 'userload', null, (res)=>{
		userInfo = JSON.parse(res);
		
		const header = document.querySelector('header');
		
		const header_div = addObject(header, 'div', '_header', true, (o)=>{
			
		});
		
		const header_ul = addObject(header_div, 'ul', '_ul', true, (o)=>{
			
		});
		
		const title_li = addObject(header_ul, 'li', 'title_li', true, (o)=>{
			o.innerHTML = 'TASKTREE';
		});


		const nickName_li = addObject(header_ul, 'li', 'nickName_li', true, (o)=>{
			o.innerHTML = `${userInfo.mnick}`;
		});
		
		const profile_li = addObject(header_ul, 'li', 'profile_li', true, (o)=>{
			o.innerHTML = `<div class="header_profile_img"style="background-image : url('${userInfo.mimgpath}');"></div>`
		});
		
	}, false);
	
	if(userInfo.mplatform !== 'home'){
		userInfo.mid = userInfo.mplatform + '에서 연동 중...';
	}
	
	return userInfo;
};

