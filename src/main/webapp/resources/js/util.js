/**
 * http://usejsdoc.org/
 */

const backgroundDiv = `<div id="bgBlack"></div>`;

function middlePositionFun(obj){
	const body = document.getElementsByTagName('body')[0];
	const width = obj.offsetWidth;
	const height = obj.offsetHeight;
	
	console.log(body.offsetWidth);
	
	obj.style.top = body.offsetHeight/2 - height/2 + 'px';
	obj.style.left = body.offsetWidth/2 - width/2 + 'px';
}

function utilBoxDelete(){
	const div = document.getElementById('utilDiv');
	div.remove();
}

function infoBar(obj, text){
	
	obj.addEventListener('mousemove',(e)=>{
		
		const x = e.pageX+10;
		const y = e.pageY+10;
		const infoBox = document.getElementsByClassName('infoBox')[0];
		if(!infoBox){
			const contentBox = `
				<div class='infoBox' style="top:${y}px; left:${x}px;">${text}</div>
			`
			const body = document.getElementsByTagName('body')[0];
			const div = document.createElement('div');
			div.setAttribute('id','utilDiv');
			div.innerHTML = contentBox;
			body.appendChild(div);
		} else {
			infoBox.style.top = y + 'px';
			infoBox.style.left = x + 'px';
		}
	});
	
	obj.addEventListener('mouseout',(e)=>{
		
		const div = document.getElementById('utilDiv');
		div.remove();
	
	});
}

function boxFun(text,bg, btnAdd){
	
	const box = document.getElementsByClassName('boxOpen')[0];
	
	if(!box){
		const contentBox = `
			<div class='boxOpen'>
				<p>${text}</p>`+ (btnAdd? btnAdd : ``) +`
				<button id="utilBoxCloseBtn">CLOSE</button> 
			</div>
			` + (bg === true? backgroundDiv : ``);
		
		const body = document.getElementsByTagName('body')[0];
		const div = document.createElement('div');
		
		div.setAttribute('id','utilDiv');
		div.innerHTML = contentBox;
		
		body.appendChild(div);
		
		const boxOpen = document.getElementsByClassName('boxOpen')[0];
		
		middlePositionFun(boxOpen);
		
		const utilBoxCloseBtn = document.getElementById('utilBoxCloseBtn');
		
		utilBoxCloseBtn.addEventListener('click',()=>{
			const div = document.getElementById('utilDiv');
			div.remove();
		});
		
	} else {
		const div = document.getElementById('utilDiv');
		div.remove();
		boxFun(text);
	}
	
}

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
