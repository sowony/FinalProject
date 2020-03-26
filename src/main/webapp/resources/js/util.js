/**
 * http://usejsdoc.org/
 */



// 검정색 백그라운드
const backgroundDiv = addObject(null,'div',null,false,(t)=>{
	t.setAttribute('id','bgBlack');
});


function logout(){
	
	xhrLoad('get','logout', null, (res)=>{
		if(res === 'true'){
			location.reload();
		}
	});
		
}

// 배열 정렬
function arrSort(arr){
	
	let chkNum = 0;
	const len = arr.length;
	
	let returnArr = [];
	
	for(let i = 0 ; i < len ; i++ ){
		returnArr.push('');
	}
	
	arr.forEach(val=>{
		arr.forEach((checkVal,i)=>{
			if(val > checkVal){
				chkNum++;
			}
			if(i === len-1){
				returnArr[chkNum] = val;
				chkNum = 0;
			}
		});
	});
	
	return returnArr;
}

function mouseEventFun(){
	
	const widgetArea = this.parentNode;
	const widgetHeader = this.querySelector('.widgetHeader');
	const widget = widgetHeader.parentNode;
	
	let originX, originY;
	let mouseX, mouseY;
	
	function mousemove(e){
		
		widget.style.top = originY - (mouseY - e.pageY) + 'px';
		widget.style.left = originX - (mouseX - e.pageX) + 'px';
	}
	
	function mousedown(e){
		
		originX = widget.offsetLeft;
		originY = widget.offsetTop;
		mouseX = e.pageX;
		mouseY = e.pageY;
		
		widgetArea.addEventListener('mousemove', mousemove);
		widgetHeader.addEventListener('mouseup', mouseOutAndUp);
		
	}
	
	function mouseOutAndUp(e){
		
		widgetArea.removeEventListener('mousemove', mousemove);
		widgetHeader.removeEventListener('mouseup', mouseOutAndUp);
		
	}
	
	widgetHeader.addEventListener('mousedown', mousedown);
	
}


function widgetFun(setting){
	
	const widget = addObject(null, 'div', 'widget', false, (o)=>{
		
		o.style.width = setting['wwidth']+'px';
		o.style.height = setting['wheight']+'px';
		o.style.zIndex = setting['wzindex'];
		o.style.position = setting['position'];
		
		if(!setting['wtitlecolor']){
			setting['wtitlecolor'] = 'rgb(65, 198, 241)';
		}
		
		if(!setting['wcontentcolor']){
			setting['wcontentcolor'] = 'rgb(255, 255, 255)';
		}
		
		const wtitlefontcolor = fontColorCheck(setting['wtitlecolor']);
		const wcontentfontcolor = fontColorCheck(setting['wcontentcolor']);
		
		o.style.backgroundColor = setting['wcontentcolor'];
		
		o.innerHTML = `
			<div class="widgetHeader" style="color:${wtitlefontcolor};background-color:${setting['wtitlecolor']};">
				<p style="color: inherit;"><span>${setting['wcategory']}</span><span>${setting['wtitle']}</span></p>
			</div>
			<div class="widgetContent" style="color:${wcontentfontcolor};">
			</div>
			<div class="widgetFooter">
			</div>
		`;
		
	});
	
	widget['mouseEventFun'] = mouseEventFun;
	
	return widget;
}

function colorPickerBtn(parentNode, beforeNode, submit){
	
	const btn = addObject(null, 'div', 'colorPickerBtn', false, (o)=>{
		o.addEventListener('click', (e)=>{
			
			e.preventDefault();
			e.stopPropagation();
			
			const colorObject = new colorPickerFun((color,btn)=>{
				submit(color,btn);
			},btn);
		});
	});
	
	if(beforeNode){
		parentNode.insertBefore(btn, beforeNode);
	} else {
		parentNode.appendChild(btn);
	}
	
	return btn;
}

function colorPickerFun(callback,btn){
	
	const oldColorPicker = document.querySelector('.colorBox');
	
	if(oldColorPicker){
		motionOnOff(oldColorPicker, 0.8, false, { setting : 'offDefault '},null, (o)=>{
			o.remove();
		});
	}
	
	this.colorValue = 'rgb(255,255,255)';
	
	const colorPicker = addObject(null, 'div', 'colorPicker', false, (o)=>{});
	
	const colorPointer = addObject(colorPicker, 'div', 'colorPointer', true, (o)=>{});
	
	const colerArea = addObject(colorPicker, 'div', 'colorArea', true, (o)=>{
		o.style.background = `-webkit-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%,
			hsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),
			-webkit-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%)`;
		o.style.backgroundColor = 'hsl(0, 100%, 50%)';
		
		o.appendChild(colorPointer);
		
		function mousemove(e){
		
			colorPointer.style.top = e.offsetY + 'px';
			colorPointer.style.left = e.offsetX + 'px';
			
			const S = Math.round(e.offsetX/o.offsetHeight * 100);
			const L = Math.round(100-(e.offsetY/o.offsetWidth * 100));
			
			const colorView = document.querySelector('.colorView');
			const colorHue = document.querySelector('.colorHue');
			
			o.dataset.s = S;
			o.dataset.l = L;
			
			colorView.style.backgroundColor = `hsl(${colorHue.value},${S}%,${L}%)`;
			
		}
		
		function mouseup(e){
			
			const colorView = document.querySelector('.colorView');
			
			colorPickerFun['colorValue'] = colorView.style.backgroundColor;
			
			e.target.removeEventListener('mousemove', mousemove);
			
		}
		
		o.addEventListener('mousedown', (e)=>{
			
			colorPointer.style.top = e.offsetY + 'px';
			colorPointer.style.left = e.offsetX + 'px';
			
			const S = Math.round(e.offsetX/o.offsetHeight * 100);
			const L = Math.round(100-(e.offsetY/o.offsetWidth * 100));
			
			const colorView = document.querySelector('.colorView');
			const colorHue = document.querySelector('.colorHue');
			
			o.dataset.s = S;
			o.dataset.l = L;
			
			colorView.style.backgroundColor = `hsl(${colorHue.value},${S}%,${L}%)`;
			
			o.addEventListener('mousemove', mousemove);
			
			o.addEventListener('mouseup', mouseup);
			
		});
		
	});
	
	const colorView = addObject(colorPicker, 'div', 'colorView', true, (o)=>{});
	
	const colorHue = addObject(colorPicker, 'input', 'colorHue', true, (o)=>{
		
		o.type = 'range';
		o.max = '359';
		o.min = '0';
		o.value = '0';
		
		o.addEventListener('input', (e)=>{
			
			const colorArea = document.querySelector('.colorArea');
			const colorView = document.querySelector('.colorView');
			
			colerArea.style.backgroundColor = `hsl(${o.value}, 100%, 50%)`;
			
			const S = colorArea.dataset.s;
			const L = colorArea.dataset.l;
			
			colorView.style.backgroundColor = `hsl(${o.value}, ${S}%, ${L}%)`;
		});
	});
	
	const colorSubmit = addObject(null, 'input', ['colorSubmit', 'grayBtn'], false, (o)=>{
		
		o.type = 'button';
		o.value = '선택';
		o.style.float = 'left';
		o.style.width = 'max-content';
		o.addEventListener('click', ()=>{
			callback(colorPickerFun['colorValue'],btn);
			const box = o.parentNode;
			motionOnOff(box, 0.8, false, { setting : 'offDefault' },null, (o)=>{
				o.remove();
			});
		});
	});
	
	const colorClose = addObject(null, 'input', ['colorClose', 'grayBtn'], false, (o)=>{
		
		o.type = 'button';
		o.value = '닫기';
		o.style.float = 'right';
		o.style.width = 'max-content';
		
		o.addEventListener('click',()=>{
			
			const box = o.parentNode;
			motionOnOff(box, 0.8, false, { setting : 'offDefault' }, null, (o)=>{
				o.remove();
			});
		});
	});
	
	boxFun(null, false, [colorPicker,colorSubmit, colorClose], true, 'colorBox', null, true);

}

function fontColorCheck(rgb){
	
	const colorArray = rgb.split('(')[1].split(',');
	
	const R = colorArray[0];
	const G = colorArray[1];
	const B = colorArray[2].substring(0, colorArray[2].indexOf(')'));
	
	let fontColor = '';
	
	if((R < 125 && G < 125) || (G < 125 && B < 125) || (R < 125 && B < 125)){
		fontColor = '#fff';
	} else {
		fontColor = '#3d3d3d';
	}
	
	return fontColor;
}

function randomColor(){
	
	const R = Math.round((Math.random() * 255) + 0);
	const G = Math.round((Math.random() * 255) + 0);
	const B = Math.round((Math.random() * 255) + 0);
	
	const rgb = `rgb(${R}, ${G}, ${B})`;
	
	const fontColor = fontColorCheck(rgb);
	
	return [rgb, fontColor];
}

function brChange(val, chk){
	if(chk){
		let res = '';
		res = val.split('\n').join('<br>');
		return res;
	} else {
		let res = '';
		res = val.split('<br>').join('\r\n');
		return res;	
	}
}

function backgroundMotion(){
	
	const backgroundImg = document.querySelectorAll('.backgroundImg');
	
	let count = 0;
	
	backgroundImg[count].style.transitionDuration = '5s';
	backgroundImg[count].style.opacity = 1;
	backgroundImg[count].style.top = 0;
	backgroundImg[count].style.left = 0;
	backgroundImg[count].style.backgroundSize = '100%';
	backgroundImg[count].classList.add('openImg');
	
	count++;
	
	window.setInterval(()=>{
		
		if(count === backgroundImg.length-1){
			count = 0;
		}
		
		let oldTarget = document.querySelector('.openImg');
		
		motionOnOff(oldTarget, 5, false, {
			onOff : 'off',
			opacity : {
				num0 : 0
			},
			property : {
				mpp : 'position'
			}, block : 'off'
		}, {
			after : (o)=>{
				o.classList.remove('openImg');
				o.style.top = Math.floor((Math.random() * 6) - 3) + '%';
				o.style.left = Math.floor((Math.random() * 6) - 3) + '%';
				o.style.backgroundSize = Math.floor((Math.random() * 20) + 100) + "%";
			}
		});
		
		let target = backgroundImg[count];
		
		motionOnOff(target, 5, false, {
			onOff : 'on',
			opacity : {
				num0 : 0,
				num1 : 1
			},
			property : {
				mpp : 'position',
			}
		}, {
			after : (o)=>{
				o.style.top = Math.floor((Math.random() * 6) - 3) + '%';
				o.style.left = Math.floor((Math.random() * 6) - 3) + '%';
				o.style.backgroundSize = Math.floor((Math.random() * 20) + 120) + "%";
			},
			before : (o)=>{
				o.style.top = 0;
				o.style.left = 0;
				o.style.backgroundSize = "100%";
				o.classList.add('openImg')
			}
		});
		
		count++;
		
	}, 5000);
	

	
}


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

function motionOnOff(obj, time, bg, option, addMotion, complete){
	
	if(addMotion) if(addMotion['after']) addMotion['after'](obj);
	
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
		if(!op['block']){
			disabledDiv = addObject(document.querySelector('body'), 'div', 'disabledDiv', true, (o)=>{
			
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
		
			if(addMotion) if(addMotion['before']) addMotion['before'](obj);
		
			if(op['property']){
			
				x = op['property']['x'] || 0;
				y = op['property']['y'] || 0;
			
			if(mpp === 'position'){
			
				obj.style.top = Number(obj.style.top.substring(0,obj.style.top.indexOf('%'))) + ((y instanceof Object ? 0 : y) + (y.num1 || 0)) + '%';
				obj.style.left = Number(obj.style.left.substring(0,obj.style.left.indexOf('%'))) + ((x instanceof Object ? 0 : x) + (x.num1 || 0)) + '%';
				
				
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
	
	obj.style.position = 'absolute';
	obj.style.top = '50%';
	obj.style.left = '50%';
	if(obj.style.transform){
		
		const transformArray = obj.style.transform.split(' ');
		const tmpArray = [];
		transformArray.forEach(style=>{
			if(!style.indexOf('translateX') > 0 || !style.indexOf('translateY') > 0 ){
				tmpArray.push(style);
			}
		});
		
		obj.style.transform = style.toString().replace(/,/g,' ') + 'translateX(-50%) translateY(-50%)';
		
	} else obj.style.transform = 'translateX(-50%) translateY(-50%)';

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
	
	// 툽팁 삭제 내장 함수
	infoBar['infoBoxRemove'] = ()=>{
		const infoBox = document.querySelector('.infoBox');
		infoBox.remove();
	}
	
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
			
			contentBox['closeDisabledDelete'] = (callObject)=>{
				
				if(callObject.tagName === 'A'){
					if(callObject.getAttribute('style')) callObject.setAttribute('style', callObject.getAttribute('style') + 'pointer-events: none;');
					else callObject.setAttribute('style', 'pointer-events: none;');
				} else {
					callObject.setAttribute('disabled', 'true');
				}
				
				closeBtn.addEventListener('click', (e)=>{
					if(callObject.tagName === 'A'){
						
						let styleArray = callObject.getAttribute('style').split(';');
						styleArray.splice(styleArray.length-2, 1);
						const styleStr = styleArray.toString().replace(/,/g, ';');
						callObject.setAttribute('style',styleStr );
						
					} else callObject.removeAttribute('disabled');
				});
			};
			
		}
		
		contentBox['removeDisabledDelete'] = (callObject)=>{
			console.log(callObject);
			if(callObject.tagName === 'A'){
				
				let styleArray = callObject.getAttribute('style').split(';');
				styleArray.splice(styleArray.length-2, 1);
				const styleStr = styleArray.toString().replace(/,/g, ';');
				callObject.setAttribute('style',styleStr);
				console.log(callObject.getAttribute('style'));
				
			} else callObject.removeAttribute('disabled');
		};
		
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
		return boxFun(text,bg, addTagObject, closeBtnDelete, "_"+boxSelector, callback, autoMotion);
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
function contextMenuFun(target, setting){
	
	target.addEventListener('contextmenu',(e)=>{
		
		e.preventDefault();
		e.stopPropagation();
		
		const oldMenu = document.querySelector('.customMenu');
		
		if(oldMenu) oldMenu.remove();
		
		const menu = addObject(document.querySelector('body'), 'div', 'customMenu', true);

		menu.style.top = e.clientY + 'px';
		menu.style.left = e.clientX + 'px';
			
		const ul = addObject(menu,'ul','menuUl', true);
		
		const valArray = Object.values(setting);
		
		valArray.forEach((value, i)=>{
			const keyArray = Object.keys(value);
			
			keyArray.forEach((k,keyIndex)=>{
				addObject(ul, 'li', 'menuLi', true, (l)=>{
					l.innerHTML = k;
					if(keyIndex === keyArray.length-1){
						if(i !== valArray.length - 1){
							l.style.borderBottom = '1px solid #ccc';
						}
					}
					l.addEventListener('click',value[k]);
					l.addEventListener('click',()=>{
						
						menu.remove();
						
					});
				});
			});
		});
		
		
	});
	
	document.addEventListener('click',(e)=>{
		
		e.preventDefault();
		e.stopPropagation();
		
		const menu = document.querySelector('.customMenu');
		
		if(menu)
		menu.remove();
	
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