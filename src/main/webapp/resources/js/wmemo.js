/**
 * http://usejsdoc.org/
 */


// 글꼴 | 사이즈 | 굵기 | 이미지 업로드
function wmemoBox(widget){
	
	const widgetContent = widget.querySelector('.widgetContent');
	
	const wmemoDiv = addObject(widgetContent, 'div', 'wmemoDiv', true, (o)=>{
		
		o.innerHTML = `
			
			<div class="wmSetting">
				<button class="fontBtn">글꼴</button>
				<button class="fontSizeBtn">글꼴 크기</button>
				<button class="fontWeigthBtn">B</button>
				<button class="imagesUploadBtn">이미지 업로드</button>
			</div>
			<div contenteditable="true" class="wmContent"></div>
			<div class="pop"></div>
			
		`;
		
		
		const wmContent = o.querySelector('.wmContent');
		
		wmContent.addEventListener('keypress',(e)=>{
			
			
			if(e.keyCode === 13){
				document.execCommand('formatBlock', false, 'p');
			}
			
		});
		
		const pop = o.querySelector('.pop');
		
		const fontBtn = o.querySelector('.fontBtn');
		
		fontBtn.addEventListener('click', (e)=>{
			
			const con = `
				<li style="font-family: 'Noto Sans KR', sans-serif;">Noto Sans KR</li>
				<li style="font-family: 'Nanum Gothic', sans-serif;">나눔 고딕</li>
				<li style="font-family: 'Nanum Myeongjo', sans-serif;">나눔 명조</li>
			`;
			
			btnList(pop, fontBtn, 'fontUl', con, [
				()=>{
					wmContent.focus();
					document.execCommand('fontName', false,'Noto Sans KR');
				},
				()=>{
					wmContent.focus();
					document.execCommand('fontName', false,'NanumGothic');
				},
				()=>{
					wmContent.focus();
					document.execCommand('fontName', false,'Nanum Myeongjo');
				}
			]);
			
		});
		
		
		const fontSizeBtn = o.querySelector('.fontSizeBtn');
		
		fontSizeBtn.addEventListener('click', (e)=>{
			
			const con = `
				<li style = "font-size:8pt;">가나다라마</li>
				<li style = "font-size:10pt;">가나다라마</li>
				<li style = "font-size:12pt;">가나다라마</li>
				<li style = "font-size:14pt;">가나다라마</li>
				<li style = "font-size:18pt;">가나다라마</li>
				<li style = "font-size:24pt;">가나다라마</li>
				<li style = "font-size:36pt;">가나다라마</li>
			`;
			
			btnList(pop, fontSizeBtn, 'fontSizeUl', con, [
				()=>{
					wmContent.focus();
					document.execCommand('fontSize', false, '1');
				},
				()=>{
					wmContent.focus();
					document.execCommand('fontSize', false, '2');
				},
				()=>{
					wmContent.focus();
					document.execCommand('fontSize', false, '3');
				},
				()=>{
					wmContent.focus();
					document.execCommand('fontSize', false, '4');
				},
				()=>{
					wmContent.focus();
					document.execCommand('fontSize', false, '5');
				},
				()=>{
					wmContent.focus();
					document.execCommand('fontSize', false, '6');
				},
				()=>{
					wmContent.focus();
					document.execCommand('fontSize', false, '7');
				}
			]);
			
		});
		
		
		
		const fontWeigthBtn = o.querySelector('.fontWeigthBtn');

		fontWeigthBtn.addEventListener('mousedown', (e)=>{
			
			wmContent.focus();
			
			if(fontWeigthBtn.classList.contains('boldSelect')){
				fontWeigthBtn.classList.remove('boldSelect');
			} else {
				fontWeigthBtn.classList.add('boldSelect');
			}
			
			document.execCommand('bold');
			
		});
		
		const imagesUploadBtn = o.querySelector('.imagesUploadBtn');
		
		
		
	});
	
};