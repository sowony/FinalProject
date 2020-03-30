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
				<button class="fontSmallBtn">S</button>
				<button class="fontBoldBtn">B</button>
				<button class="imagesUploadBtn">이미지 업로드</button>
				<span class="wmMsg"></span>
			</div>
			<div contenteditable="true" class="wmContent"></div>
			<div class="pop"></div>
			
		`;
		
		const wmMsg = o.querySelector('span.wmMsg');
		
		const wmContent = o.querySelector('.wmContent');
		
		o.addEventListener('mousemove',(e)=>{
			e.preventDefault();
			e.stopPropagation();
			widget.style.cursor = 'default';
		});
		
		
		
		wmContent.addEventListener('input',(e)=>{
			
			if(e.keyCode === 13){
				document.execCommand('formatBlock', false, 'p');
			}
			
			if(wmContent['saveTimeoutCheckId']) window.clearTimeout(wmContent['saveTimeoutCheckId']);
			
			wmContent['saveTimeoutCheckId'] = window.setTimeout(()=>{
				wmMsg.innerHTML = '자동 저장되었습니다.';
				motionOnOff(wmMsg,1,false, { setting : 'onDefault'});
				window.setTimeout(()=>{
					motionOnOff(wmMsg, 1,false, { setting : 'offDefault'}, null, (o)=>{
						o.innerHTML = '';
					});
				},2000);
				
			},3000);
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
					document.execCommand('fontName', false,'Nanum Gothic');
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
		
		
		
		const fontBoldBtn = o.querySelector('.fontBoldBtn');

		fontBoldBtn.addEventListener('mousedown', (e)=>{
			
			wmContent.focus();
			
			const target = e.target;
			
			if(target.classList.contains('boldSelect')){
				target.classList.remove('boldSelect');
			} else {
				target.classList.add('boldSelect');
			}
			
			document.execCommand('bold');
			
		});
		
		const imagesUploadBtn = o.querySelector('.imagesUploadBtn');
		
		imagesUploadBtn.addEventListener('mousedown',(e)=>{
			
			imagesUploadBtn.disabled = 'true';
			
			const imageDiv = addObject(null,'div','imageDiv',false, (o)=>{
				
				o.innerHTML = `
					<div>
						<p>파일 업로드 </p>
						<div style = "position: relative;">
							<input type="text" class="fileUploadName" readonly="readonly" placeholder="파일 선택"/>
							<label class="fileLabel">파일 선택</label>
							<input type="file"/>
						</div>
					</div>
					<div>
						<p>이미지 링크 </p>
						<div><input style="width: 90%;margin: 10px 5px;" type="text" name="fileURL"/></div>
					</div>
				`;
				
				const fileUploadName = o.querySelector('.fileUploadName');
				const fileLabel = o.querySelector('.fileLabel');
				const file = o.querySelector('input[type="file"]');
				
				file.addEventListener('change',()=>{
					let reader = new FileReader();

					if(file.files){
						reader.addEventListener('load',(e)=>{
							
							const fileInfo = e.target.result.split(',')[0];
							
							const res = fileInfo.indexOf('image');
							
							if(res > -1){
								
								wmContent.focus();
								
								document.execCommand('insertImage', false, e.target.result);
								
								const imageBox = imageDiv.parentNode;
								
								motionOnOff(imageBox,0.8, false,{setting : 'offDefault'},null,(o)=>{
									o.remove();
								});
								
							} else {
								boxFun('이미지만 업로드 할 수 있습니다.', false, false, false, 'failUpload', false, true);
							}
							
						});
						
						reader.readAsDataURL(file.files[0]);
					}
					
				});
				
				fileLabel.addEventListener('mousedown', (e)=>{
					file.click();
				});
				
			});
			
			const imageInsert = addObject(null, 'input', ['grayBtn', 'imageInsert'], false, (o)=>{
				o.type='button';
				o.value='이미지 삽입';
				o.style.marginRight = '5px';
				o.style.width = 'max-content';
				o.addEventListener('mousedown',(e)=>{
					
					const fileURL = imageDiv.querySelector('input[name=fileURL]');
					wmContent.focus();
					document.execCommand('insertImage', false, fileURL.value);
					
					const imageBox = o.parentNode;
					
					motionOnOff(imageBox,0.8, false,{setting : 'offDefault'},null,(o)=>{
						o.remove();
					});
					
				});
			});
			
			const imageBox = boxFun(null, false, [imageDiv, imageInsert], false, 'imageBox',false, true);
			
			imageBox.removeDisabledDelete(imagesUploadBtn);
			
		});
		
		
	});
	
};