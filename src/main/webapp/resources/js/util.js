/**
 * http://usejsdoc.org/
 */

// 검정색 백그라운드
const backgroundDiv = addObject(null,'div',null,false,(t)=>{
	t.setAttribute('id','bgBlack');
});


// 페이지 부드럽게 로드

function pageLoad(){
	
	const body = document.querySelector('body');
	
	body.setAttribute('style', 'display:block;transition-duration:1.5s;opacity:1;');
	
	
}

// 오브젝트 중앙 정렬
function middlePositionFun(obj){
	const width = obj.offsetWidth;
	const height = obj.offsetHeight;
	
	obj.style.top = window.innerHeight/2 - height/2 - 30 + 'px';
	obj.style.left = window.innerWidth/2 - width/2 + 'px';
}

// 유틸 오브젝트 모두 삭제 함수
function utilBoxDelete(){
	const div = document.getElementById('utilDiv');
	div.remove();
}


// 툴팁 함수
function infoBar(obj, text){
	
	obj.addEventListener('mousemove',(e)=>{
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
			infoBox.style.top = y + 'px';
			infoBox.style.left = x + 'px';
		}
	});
	
	obj.addEventListener('mouseout',(e)=>{
		e.preventDefault();
		e.stopPropagation();
		
		const utilBox = document.getElementById('utilDiv');
		
		if(utilBox.childNodes.length < 2){
			utilBox.remove();
		} else {
			const infoBox = document.querySelector('.infoBox');
			if(infoBox) infoBox.remove();
		}
		
	});
}

// 박스 만들기 함수
function boxFun(text,bg, addTagObject, closeBtnDelete, boxName){

	let boxSelector = (boxName)? boxName : '.boxOpen';
	const box = document.querySelector(boxSelector);
	
	if(!box){
		const contentBox = addObject(null, 'div', 'boxOpen', false, (t)=>{
			t.classList.add(boxSelector.substring(1,boxSelector.length));
			t.innerHTML = `<p>${text}</p>`+ ((closeBtnDelete)? `` : `<button class="grayBtn" id="utilBoxCloseBtn">CLOSE</button>`);
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
		
		const boxOpen = document.querySelector(boxSelector);
		const utilBoxCloseBtn = document.getElementById('utilBoxCloseBtn');
		if(utilBoxCloseBtn){
			utilBoxCloseBtn.addEventListener('click',()=>{
				if(utilBox.childNodes.length < 3){
					utilBox.remove();
				} else {
					if(boxOpen) boxOpen.remove();
				}
			});
		}
		if(addTagObject){
			for(let tag of addTagObject){
				if(utilBoxCloseBtn) boxOpen.insertBefore(tag, utilBoxCloseBtn);
				else boxOpen.appendChild(tag);
			}
		}
		
		middlePositionFun(boxOpen);
		
	} else {
		const div = document.getElementById('utilDiv');
		div.remove();
		boxFun(text);
	}
	
}

// 편하게 오브젝트 만들기
function addObject(parentNode, tagName, className, defaultLocation, callback){
	
	const tag = document.createElement(tagName);
	if(className){
		tag.classList.add(className);
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
