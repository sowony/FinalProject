/**
 * http://usejsdoc.org/
 */



// 검정색 백그라운드
const backgroundDiv = addObject(null,'div',null,false,(t)=>{
	t.setAttribute('id','bgBlack');
});


// 정규표현식 확인 함수
function valueCheck(o, str, success, fail){
	
	let c;
	
	o.addEventListener('keyup',()=>{
		if(str.test(o.value)){
			success(o);
		} else {
			fail(o);
		}
	});
	
	o.addEventListener('blur',()=>{
		if(str.test(o.value)){
			success(o);
		} else {
			fail(o);
		}
	});
	
}

/*
function motionClose(obj, time, distance, complete){
	
	let loc = (distance)? distance : '10';
	
	const top = obj.style.top;
	const left = obj.style.left;
	
	obj.style.opacity = '0';
	obj.style.top = Number(obj.style.top.substring(0,obj.style.top.indexOf('px'))) - loc +'px';
	obj.style.transitionDuration = time + 's';
	
	if(complete){
		window.setTimeout(()=>{
			complete(obj);
		}, time*1000);
	}
	
}
*/
function motionOnOff(obj, time, bg, option, addMotion, complete){
	
	if(addMotion) addMotion['after'](obj) || '';
	
	let op = option || {};
	
	if(op['setting'] === 'onDefault'){
		op = {
				onOff : 'on',
				opacity : {
					num0 : 0,
					num1 : 1
				},
				property : {
					mpp : 'position',
					y : -1
				}
		}
	} else if(op['setting'] === 'offDefault') {
		op = {
				onOff : 'off',
				opacity : {
					num0 : 0
				},
				property : {
					mpp : 'position',
					y : 1
				}
		}
	}
	
	obj.style.opacity = (op['opacity'])? (op['opacity']['num0'] || '0' ) : '0';
	
	let x, y;
	let top, left;
	let marginLeft, marginTop;
	let tmp;
	let disabledDiv = document.querySelector('.disabledDiv');
	
	const mpp = op['property']? (op['property']['mpp'] || 'position' ) : 'position';
	
	if(op['onOff'] === 'off' && !disabledDiv){
		
		disabledDiv = addObject(document.querySelector('body'), 'div', 'disabledDiv', true, (o)=>{
			
			console.log(obj.offsetWidth,obj.offsetHeight);
			o.style.position = 'fixed';
			o.style.width = obj.offsetWidth + 'px';
			o.style.height = obj.offsetHeight + 'px';
			o.style.top = obj.style.top;
			o.style.left = obj.style.left;
			o.style.backgroundColor = 'red';
			o.style.transform = obj.style.transform;
			o.style.opacity = 0;
			o.style.zIndex = 20000;
			o.addEventListener('click',(e)=>{
				e.preventDefault();
				e.stopPropagation();
			});
			
		});
	}
	
	if(op['property']){
		
		x = op['property']['x'] || 0;
		y = op['property']['y'] || 0;
		
		if(mpp === 'position'){
			
			obj.style.top = Number(obj.style.top.substring(0,obj.style.top.indexOf('%'))) - ((y instanceof Object ? 0 : y) + (y.num0 || 0)) + '%';
			obj.style.left = Number(obj.style.left.substring(0,obj.style.left.indexOf('%'))) - ((x instanceof Object ? 0 : x) + (x.num0 || 0)) + '%';
			
		} else {
				
			tmp = (obj.style[mpp]? obj.style[mpp] : '0px 0px').split(' ');
			marginLeft = x !== 0 ? (Number(tmp[0].substring(0, tmp[0].indexOf('px'))) - ((x instanceof Object ? 0 : x) + (x.num0 || 0))) + 'px' : 'auto';
			marginTop = y !== 0 ? (Number(tmp[1].substring(0, tmp[1].indexOf('px'))) - ((y instanceof Object ? 0 : y) + (y.num0 || 0))) + 'px' : 'auto';
			obj.style[mpp] = marginTop + ' ' + marginLeft;
		}
		
	}
	
	if(!op['onOff'] || op['onOff']=== 'on'){
		window.setTimeout(()=>{
		
			obj.style.opacity = (op['opacity'])? (op['opacity']['num1'] || '1' ) : '1';
		
			if(addMotion) addMotion['before'](obj) || '';
		
			if(op['property']){
			
				x = op['property']['x'] || 0;
				y = op['property']['y'] || 0;
			
			if(mpp === 'position'){
			
				obj.style.top = Number(obj.style.top.substring(0,obj.style.top.indexOf('%'))) + ((y instanceof Object ? 0 : y) + (y.num1 || 0)) + '%';
				obj.style.left = Number(obj.style.left.substring(0,obj.style.left.indexOf('%'))) + ((x instanceof Object ? 0 : x) + (x.num1 || 0)) + '%';
				
				console.log(obj.style.top, obj.style.left);
				
			} else {
				
				tmp = obj.style[mpp];
				marginLeft = x !== 0? (Number(tmp[0].substring(0, tmp[0].indexOf('px'))) + ((x instanceof Object ? 0 : x) + (x.num1 || 0))) + 'px' : 'auto';
				marginTop = y !== 0? (Number(tmp[1].substring(0, tmp[1].indexOf('px'))) + ((y instanceof Object ? 0 : y) + (y.num1 || 0))) + 'px' : 'auto';
				obj.style[mpp] = marginTop + ' ' + marginLeft;
				
			}
		}
			
		obj.style.transitionDuration = time + 's';
			
		},1);
	} else {
		obj.style.transitionDuration = time + 's';
	}
	
	if(bg){
		if(!op['onOff'] || op['onOff']=== 'on') motionOnOff(backgroundDiv, time, null, { onOff : 'on', opacity : { num0 : 0, num1 : 1 }}, null, complete);
		else motionOnOff(backgroundDiv, time, null, { onOff : 'off', opacity : { num0 : 0 }}, null, complete);
	}
	
	if(complete){
		
		window.setTimeout(()=>{
			complete(obj);
			
		}, time*1000);
	}
	if(disabledDiv){
		window.setTimeout(()=>{
			disabledDiv.remove();
		}, time*1000);
	}
}


// 오브젝트 중앙 정렬
function middlePositionFun(obj){
	/*
	const width = obj.offsetWidth;
	const height = obj.offsetHeight;
	
	obj.style.top = window.innerHeight/2 - height/2 - 30 + 'px';
	obj.style.left = window.innerWidth/2 - width/2 + 'px';
	
	if(Number(obj.style.top.substring(0,obj.style.top.indexOf('px'))) < 0){
		obj.style.top = '20px';
	}
	*/
	obj.style.top = '50%';
	obj.style.left = '50%';
	obj.style.transform = 'translateX(-50%) translateY(-50%)';
}

// 유틸 오브젝트 모두 삭제 함수
function utilBoxDelete(slide){
	
	const div = document.getElementById('utilDiv');
	
	const childNode = div.childNodes;
	
	if(slide){
		for(let n of childNode){
			motionOnOff(n, 1, null, {
				onOff : 'off',
				opacity :{ num0 : 0 },
				property : {
					mpp : 'margin',
					y : 10
				}
			}, null, (obj)=>{
				n.remove();
			});
		}
	} else {
		div.remove();
	}
}



// 툴팁 생성 함수
function infoBar(obj, text){
	
	// 툴팁 마우스 움직임 콜백 함수 1
	function tooltipMove(e){
		
		e.preventDefault();
		e.stopPropagation();
		
		const x = e.pageX+10;
		const y = e.pageY+10;
		const infoBox = document.querySelector('.infoBox');
		
		const body = document.querySelector('body');
		let utilBox = document.getElementById('utilDiv');
		
		if(!utilBox){
			utilBox = addObject(body,'div',null,true,(t)=>{
				t.setAttribute('id','utilDiv');
			});
		}
		
		if(!infoBox){
			
			const contentBox = addObject(utilBox,'div','infoBox',false,(t)=>{
					t.style.top = y + 'px';
					t.style.left = x + 'px';
					t.innerHTML = text;
				});
				
			const bg = document.getElementById('bgBlack');
			if(bg){
				utilBox.insertBefore(contentBox,bg);
			} else {
				utilBox.appendChild(contentBox);
			}
			
		} else {
			infoBox.innerHTML = text;
			infoBox.style.top = y + 'px';
			infoBox.style.left = x + 'px';
			infoBox.style.display = '';
		}
		
	}

	// 툴팁 마우스 움직임 콜백 함수 2
	function tooltipOut(e){
		
		e.preventDefault();
		e.stopPropagation();
		
		const infoBox = document.querySelector('.infoBox');
		if(infoBox) infoBox.remove();
		
	}
	
	function tooltipDisabled(){
		if(!text){
			const infoBox = document.querySelector('.infoBox');
			if(infoBox) infoBox.style.display = 'none';
		}
	}
	
	if(text){
		obj.addEventListener('mousemove',tooltipMove);
		obj.addEventListener('mouseout',tooltipOut);
	} else {
		obj.addEventListener('mousemove',tooltipDisabled);
		obj.addEventListener('mouseout',tooltipDisabled);
	}
	
}

// 박스 만들기 함수
function boxFun(text,bg, addTagObject, closeBtnDelete, boxSelector, callback, autoMotion){

	const box = document.querySelector((boxSelector)? '.'+ boxSelector : '.boxOpen');
	
	if(!box){
		
		const contentBox = addObject(null, 'div', 'boxOpen', false, (t)=>{
			if(boxSelector) t.classList.add(boxSelector);
			t.innerHTML = ((text)? `<p>${text}</p>` : ``)+ ((closeBtnDelete)? `` : `<button class="___utilBoxCloseBtn grayBtn ${"_close_"+boxSelector}" id="utilBoxCloseBtn">닫기</button>`);
		});
		
		const body = document.querySelector('body');
		
		let utilBox = document.getElementById('utilDiv');
		
		if(!utilBox){
			utilBox = addObject(body,'div',null,true,(t)=>{
				t.setAttribute('id','utilDiv');
			});
		}
		
		utilBox.appendChild(contentBox);
		if(bg) utilBox.appendChild(backgroundDiv);
		
		const boxOpen = document.querySelector((boxSelector)? '.'+ boxSelector : '.boxOpen');
		const closeBtnAll = document.querySelectorAll('.___utilBoxCloseBtn');
		
		let closeBtn;
		
		if(boxSelector){
			for(let item of closeBtnAll){
				if(item.classList.contains("_close_"+boxSelector)){
					closeBtn = item;
				}
			}
		} else {
			closeBtn = closeBtnAll[0];
		}
		
		if(closeBtn){
			closeBtn.addEventListener('click',()=>{
				if(boxOpen) {
					if(autoMotion) {
						motionOnOff(boxOpen, 0.8, bg, { setting : 'offDefault' }, null, (o)=>{
							o.remove();
						});
					} else boxOpen.remove();
				}
			});
		}
		if(addTagObject){
			for(let tag of addTagObject){
				if(closeBtn) boxOpen.insertBefore(tag, closeBtn);
				else boxOpen.appendChild(tag);
			}
		}
		
		
		if(autoMotion) {
			motionOnOff(boxOpen, 0.8, bg, { setting : 'onDefault' });
		}
		
		middlePositionFun(boxOpen);
		
		if(callback){
			callback(contentBox, contentBox.childNodes, boxSelector);
		}
		
		return contentBox;
		
	} else {
		boxFun(text,bg, addTagObject, closeBtnDelete, "_"+boxSelector, callback, autoMotion);
	}
	
}

// 편하게 오브젝트 만들기
function addObject(parentNode, tagName, className, defaultLocation, callback){
	
	const tag = document.createElement(tagName);
	if(className){
		if(className instanceof Array){
			for(let c of className){
				tag.classList.add(c);
			}
		} else {
			tag.classList.add(className);
		}
	}
	if(defaultLocation){
		parentNode.appendChild(tag);
	}
	if(callback){
		callback(tag);
	}
	return tag;
	
}


// 객체에 메뉴 등록 함수
function contextMenuFun(target, menu, setting){
	
	target.addEventListener('contextmenu',(e)=>{
		e.preventDefault();
		e.stopPropagation();
		
		const oldUl = document.querySelector('.menuUl');
		if(oldUl){
			oldUl.remove();
		}
		
		menu.style.display='block';
		menu.style.top = e.clientY + 'px';
		menu.style.left = e.clientX + 'px';
		
		const ul = addObject(menu,'ul','menuUl', true);
		
		const keyArray = Object.keys(setting);
		for(let k of keyArray){
			addObject(ul, 'li', 'menuLi', true, (l)=>{
				l.innerHTML = k;
				l.addEventListener('click',setting[k]);
				l.addEventListener('click',()=>{
					menu.style.display='none';
				});
			});
			
		}
		
	});
	
	document.addEventListener('click',(e)=>{
		e.preventDefault();
		e.stopPropagation();
		menu.style.display='none';
	});
}


// 인증 박스
function authBoxFun(minute, data, cate, className, callback){
	let authTimeMm = minute;
	let authTimeS = 0;
	let authString = data;
	const authTime = addObject(false, 'p', false, false, (o)=>{
		o.innerHTML = `인증번호 만료까지 ${String(authTimeMm).length === 1? '0' : ''}${authTimeMm}분 ${String(authTimeS).length === 1? '0' : ''}${authTimeS}초`;
		o.style.fontSize = '12px';
	});
	
	const auth = addObject(false, 'input', false, false, (o)=>{
		o.type = 'text';
	});
		
	const submitBtn = addObject(false, 'input', 'grayBtn', false, (o)=>{
		o.type = 'button';
		o.style.width = 'max-content';
		o.style.marginRight = '5px';
		o.value = '확인';
	});
	
	function timeCheck(){
		
		if(authTimeS === 0){
			authTimeS = 59;
			authTimeMm -=1;
		} else {
			authTimeS -=1;
		}
		
		authTime.innerHTML = `인증번호 만료까지 ${String(authTimeMm).length === 1? '0' : ''}${authTimeMm}분 ${String(authTimeS).length === 1? '0' : ''}${authTimeS}초`;
		
	}
	
	const timeInterval = window.setInterval(timeCheck,1000);
	
	window.setTimeout(()=>{
		clearInterval(timeInterval);
		authString = '';
	}, minute * 60000);
	
	boxFun('<span style="color:#3d3d3d;">'+ cate + '(으)로 인증 번호가 <br> 발송되었습니다.</span>',false, [authTime, auth, submitBtn], false, className,(o)=>{
		callback(o, auth, authTime, submitBtn);
	},true);
}