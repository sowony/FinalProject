/**
 * http://usejsdoc.org/
 */



// 회원 폼 input 조건 체크 결과 함수

let signUpCheck = true;

function inputCheck(i,state,text){
    			
    const span = i.parentNode.querySelector('.noneCheck');
	if(state) span.setAttribute('style','box-shadow: inset -2px -1px 5px 3px #3edb3e;background-color:#fff;');
	else span.setAttribute('style','box-shadow: inset -2px -1px 5px 3px #ed1f59;background-color:#fff;');
	signUpCheck = state;
	infoBar(i.parentNode, text);
    			
}

window.onload = () => {
	
	//pageLoad();
	
	document.querySelector('.faceSignInBtn').addEventListener('click',()=>{
		boxFun('테스트중',false, false, false, false, (o)=>{
		});
	});
	
	motionOnOff(document.querySelector('body'), 1, false, {
		opacity : {
			num0 : 0,
			num1 : 1
		}
	});
	
	
	const con = document.querySelector('#con');
	
	motionOnOff(con, 1, false, {
		property : {
			mpp : 'margin',
			y : {
				num0 : -80,
				num1 : 30
			}
		}
	});
	
	const loginForm = document.getElementById('loginForm');
	
    loginForm.addEventListener('submit', (e)=>{

        e.preventDefault();

        const mid = e.target.mid.value;
        const mpw = e.target.mpw.value;

        const data = { mid, mpw };

        xhrLoad('post','login',data, (responseText)=>{
        	
        	const resCheck = (responseText === 'true');
        	if(resCheck){
        		location.reload();
        	} else {
        		boxFun('입력이 잘못되었습니다.',false, false, false, false, false, true);
        	}
        });

    });
    
    const signUpBtn = document.querySelector('#signUp');
    signUpBtn.addEventListener('click',(e)=>{
    	
    	e.preventDefault();
    	
    	// 회원가입 폼 DIV 생성 ----------------------------------------------
    	const signUpForm = addObject(null,'div','signUpDiv',false,(t)=>{
    		t.innerHTML = `
    			<fieldset style="border: 1px solid #ddd;border-radius: 8px;padding: 5px 15px;">
    			<legend><div class="signUpImgDiv"><a class="signUpImg"><img class="proImg signUpImg"><span class="ImgText">프로필 사진을 넣어주세요.</span><input type="file" accept="image/*" name="mimgpath" title/></a></div></legend>
    			<p><input type="text" name="mid" placeholder="아이디(영문 숫자 8자리 이상)"/><span class="noneCheck"></span></p>
    			<p><input type="password" name="mpw" autocomplete="new-password" placeholder="패스워드(영문 숫자 8자리 이상)"/><span class="noneCheck"></span></p>
    			<p><input type="password" name="mpw_chk" autocomplete="new-password" placeholder="패스워드 확인"/><span class="noneCheck"></span></p>
    			<p><input type="text" name="mnick" placeholder="닉네임"/><span class="noneCheck"></span></p>
    			<p><input type="text" name="mname" placeholder="이름"/><span class="noneCheck"></span></p>
    			<div style="display: block;">
    				<input type="email" name="memail" placeholder="E-mail" style="width: 140px;display: inline-block;margin: 0; margin-bottom: 0.7em;"/>
    				<input type="button" name="memail_chk" class="grayBtn" style="width:max-content;padding:6px 5px;margin: 0; background-color:#ccc;" value="메일 인증" disabled/>
    			</div>
    			<div style="display: block;">
    				<input type="text" name="addr_search" placeholder="지번명/도로명 검색" style="width: 140px;display: inline-block;margin: 0;">
    				<input type="button" name="addr_search_btn" id="addrSearchBtn" class="grayBtn" style="width:max-content;padding:6px 5px;margin: 0;" value="주소 검색">
    			</div>			
    			<p><input type="text" name="maddr_0" placeholder="지번 주소" disabled/><span class="noneCheck"></span></p>
    			<p><input type="text" name="maddr_1" placeholder="도로 주소" disabled/><span class="noneCheck"></span></p>
    			<p><input type="text" name="maddr_2" placeholder="나머지주소"/><span class="noneCheck"></span></p>
    			<p><input type="tel" name="mphone" placeholder="핸드폰"/><span class="noneCheck"></span></p>
    			</fieldset>
    		`;
    		
    	});
    
    	// 박스 Close 버튼 생성 ---------------------------------------------
    	const signUpCloseBtn = addObject(null,'input','grayBtn',false,(t)=>{
    		
    		t.setAttribute('type','button');
    		t.style.width = 'max-content';
    		t.value='취소';
    		t.addEventListener('click', ()=>{
    			utilBoxDelete(true);
    		},true);
    		
    	});
    	
    	// 회원 가입 성공 버튼 생성 ---------------------------------------------
    	
    	const signUpSummitBtn = addObject(null, 'input', 'grayBtn', false, (t)=>{
    		t.setAttribute('type','button');
    		t.style.width = 'max-content';
    		t.style.marginRight = '5px';
    		t.classList.add('signUpBtn');
    		t.value='회원가입';
    		t.addEventListener('click', ()=>{
    			
    			const userInfo = {};
    			
    			const signUpInput = document.querySelectorAll('div.signUpDiv input');
    			signUpInput.forEach(input=>{
    				if(input.type !== 'button' || input.type !== 'submit'){
    					if(input.name === 'maddr_0' || input.name === 'maddr_1'){
    						if(!input.value){
    							inputCheck(input,false,'주소를 검색해주세요.');
    						} else {
    							inputCheck(input,true,null);
    						}
    					} else { 
    						input.focus();
    						input.blur();
    					}
    					
    					if(input.name === 'mimgpath'){
    						const signUpImg = document.querySelector('.proImg');
    						userInfo[input.name] = signUpImg.src;
    					} else {
    						if(signUpCheck){
    							if(input.name === 'maddr_0'){
    								userInfo['maddr'] = input.value;
    							} else if(input.name === 'maddr_1'){
    								userInfo['maddr'] += "(" + input.value + ")";
    							} else if(input.name === 'maddr_2'){
    								userInfo['maddr'] += input.value;
    							}else {
    								userInfo[input.name] = input.value;
    							}
    						}
    					}
    				}
    			});
    			
    			if(signUpCheck){
    				xhrLoad('post','signup',userInfo,data=>{
    					if(data !== 'null'){
    						const jsonObj = JSON.parse(data);
    						
    						const profileImg = addObject(null,'div','welcomeDiv', false, t=>{
    							t.innerHTML = `
    								<p style="text-align:center;"><a class="signUpImg"><img class="proImg signUpImg" src="${jsonObj['mimgpath']}" style="position: relative;"/></a></p>
    							`;
    							t.style.display = 'block';
    						});
    						
    						const mabout = addObject(profileImg,'textarea',null, true, t=>{
								t.placeholder = '프로필에 남기실 한마디를 적어주세요!';
								t.style.display = 'block';
								t.style.width = '200px';
								t.style.height = '85px';
								t.style.padding = '10px';
								t.style.margin = '10px auto';
    						});
    						
    						console.log(jsonObj);
    						
    						const btnFun = addObject(null, 'input', 'grayBtn', false, t=>{
    							t.type='button';
    							t.style.width = 'max-content';
    							t.value="확인";
    							t.addEventListener('click',()=>{
    								xhrLoad('post','mabout',{ 'mabout' : mabout.value, 'mno' : jsonObj.mno },data=>{
    									if(data){
    										utilBoxDelete(true);
    									}
    								});
    							});
    						});
    						
    						boxFun(jsonObj['mnick']+'님 환영합니다.', false, [profileImg,mabout,btnFun], true, 'successSign', null, true);
    					} else {
    						boxFun('가입에 실패했습니다', false, false, false, 'failSign1', false, true);
    					}
    				});
    			} else {
    				boxFun('정보를 정확히 입력해주십시오.', false, false, false, 'failSign2', false, true);
    			}
    		});
    	});
    	
    	// 회원가입 박스 -----------------------------------------
    	const signBox = boxFun(false, true, [signUpForm, signUpSummitBtn, signUpCloseBtn], true, 'signUpDivBox',(contentBox)=>{
    		
    		contentBox.style.paddingLeft = '30px';
    		contentBox.style.paddingRight = '30px';
    		
    		// 프로필 사진 미리보기 -----------------------------------
    		let mimgpathBtn = document.querySelector('input[name="mimgpath"]');
    		mimgpathBtn.addEventListener('change',()=>{
    			
    			let reader = new FileReader();

    			if(mimgpathBtn.files){
    				reader.addEventListener('load',(e)=>{
    					
    					const fileInfo = e.target.result.split(',')[0];
    					const res = fileInfo.indexOf('image');
    					if(res > -1){
    						const signUpImg = document.querySelector('img.proImg');
    						signUpImg.src = e.target.result;
    						const ImgText = document.querySelector('.ImgText');
    						ImgText.style.display='none';
    					} else {
    						const closeBtn = addObject(null,'input','grayBtn', false, (t)=>{
    							//mimgpathBtn.select();
        						//document.selection.clear();
    							mimgpathBtn.value = '';
    							t.width = 'max-content';
        						t.type = 'button';
    							t.value = '확인';
    							t.addEventListener('click',()=>{
    								const target = document.querySelector('.failUpload');
    								target.remove();
    							});
    						});
    						boxFun('이미지만 업로드 할 수 있습니다.', false, [ closeBtn ], true, 'failUpload', false, true);
    					}
    					
    				});
    				reader.readAsDataURL(mimgpathBtn.files[0]);
    			}
    			
    		});
    		
    		// 유효성 검사 및 이벤트 연결 ------------------------------------------
    		const signUpInput = document.querySelectorAll('div.signUpDiv input');
    		
    		signUpInput.forEach((input,index)=>{
    			
    			if(input.name === 'memail'){
    				
    				const email_chkBtn = document.querySelector('input[name="memail_chk"]');
    				
    				valueCheck(input, /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/,(i)=>{
    					//inputCheck(i,true,null);
    					email_chkBtn.style.backgroundColor = '#599ed6';
    					delete email_chkBtn.style.disabled;
    					infoBar(email_chkBtn.parentNode, null);
    					
    				}, (i)=>{
    					//inputCheck(i,false,'조건에 맞지 않습니다.');
    					email_chkBtn.style.backgroundColor = '#ed1f59';
    					email_chkBtn.style.disabled = 'disabled';
    					infoBar(email_chkBtn.parentNode, '이메일 양식에 맞춰 주세요.');
    					
    				});
    			} else if(input.name === 'mphone'){
    				valueCheck(input,  /^[0-9]{10,11}$/,(i)=>{
    					inputCheck(i,true,null);
    				}, (i)=>{
    					inputCheck(i,false,'조건에 맞지 않습니다.');
    				});
    			} else if(input.name === 'mnick'){
    				valueCheck(input, /^[a-zA-Z가-힣0-9]{2,15}$/,(i)=>{
    					
    					// 닉네임 중복 체크
    					xhrLoad('post','mypage/nicksearch',{ 'mnick' : i.value  },(responseText)=>{
    						
    						const resCheck = (responseText === 'true');

    						if(resCheck){
    		    				inputCheck(i,false,'중복된 닉네임이 있습니다.');
    		    			} else {
    		    				inputCheck(i,true,null);
    		    			}
    						
    					});
    				}, (i)=>{
    					inputCheck(i,false,'2자 이상 15자 이하이어야 합니다.');
    				});
    				
    			} else if(input.name === 'mpw_chk'){
    				const inputMpw = document.querySelector('div.signUpDiv input[name="mpw"]');
    				
    				input.addEventListener('keyup',()=>{
    					if(inputMpw.value === input.value && input.value){
    						inputCheck(input,true,null);
    					} else {
    						inputCheck(input,false,'비밀번호를 확인해주세요');
    					}
    				});
    				
    				input.addEventListener('blur',()=>{
    					if(inputMpw.value === input.value && input.value){
    						inputCheck(input,true,null);
    					} else {
    						inputCheck(input,false,'비밀번호를 확인해주세요');
    					}
    				});
    				
    			} else if(input.name ==='mid'){
    				
    				valueCheck(input, /(?=.*[a-zA-Z])([A-Za-z0-9]){8,12}$/,(i)=>{
    					
    					// id 중복 체크
    					xhrLoad('post','mypage/idsearch',{ 'mid' : i.value  },(responseText)=>{

    						const resCheck = (responseText === 'true');

    						if(resCheck){
    		    				inputCheck(i,false,'중복된 아이디가 있습니다.');
    		    			} else {
    		    				inputCheck(i,true,null);
    		    			}
    					});
    					
    				}, (i)=>{
   						inputCheck(i,false,'영문 숫자 8자 이상 12자 이하이어야 합니다.');
   					});
    				
   				} else if(input.name ==='mpw'){
    				valueCheck(input, /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/,(i)=>{
    					inputCheck(i,true,null);
    				}, (i)=>{
   						inputCheck(i,false,'영문 숫자 8자 이상 20자 이하이어야 합니다.');
   					});
    				
    				const inputMpwChk = document.querySelector('div.signUpDiv input[name="mpw_chk"]');
    				input.addEventListener('keyup',()=>{
    					if(inputMpwChk.value === input.value && inputMpwChk.value){
    						inputCheck(inputMpwChk,true,null);
    					} else {
    						inputCheck(inputMpwChk,false,'비밀번호를 확인해주세요');
    					}
    				});
    				
    				
   				} else if(input.name === 'addr_search_btn') {
   					
   					// 주소 검색 이벤트 연결 ---------------------------------
   		    		const addrSearchBtn = input;
   		    		addrSearchBtn.addEventListener('click',()=>{
   		    			const searchKey = document.querySelector('input[name="addr_search"]');
   		    			if(searchKey.value){
   		    				infoBar(searchKey.parentNode, null);
   		    				const addrList = addObject(null,'div','addrList', false, (t)=>{
   		    				
   		    					new daum.Postcode({
   		    						oncomplete : (data)=>{
   		    						
   		    							let roadAddr = data.roadAddress;
   		    							let jibunAddr = data.jibunAddress;
   		    						
   		    							const jibun = document.querySelector('input[name="maddr_0"]');
   		    							jibun.value = jibunAddr;
   		    						
   		    							const road = document.querySelector('input[name="maddr_1"]');
   		    							road.value = roadAddr
   		    						
   		    							searchKey.value = '';
   		    							
   		    							inputCheck(jibun,true,null);
	   		    						inputCheck(road,true,null);
	   		    						const addrBox = document.querySelector('.addrBox');
	   		    							
	   		    						motionOnOff(addrBox, 0.8, false, { 
	   		    							onOff : 'off',
	   		    							opacity : { 
	   		    								num1 : 0 
	   		    							},
	   		    							property : {
	   		    								mpp : 'position',
	   		    								y : 1
	   		    							}
	   		    						}, null, (obj)=>{ 
	   		    								obj.remove();
	   		    						});
   		    							
   		    						}
   		    					}).embed(t,{
   		    						q : searchKey.value,
   		    						autoClose : false
   		    					});
   		    				});
   		    				
   		    				const closeBtn = addObject(null, 'input', 'grayBtn', false, (t)=>{
   		    					t.type = 'button';
   		    					t.value = '닫기';
   		    					t.addEventListener('click',()=>{
   		    						motionOnOff(addrBox, 0.8, false, { 
   		    							onOff : 'off',
   		    							opacity : { 
   		    								num1 : 0 
   		    							},
   		    							property : {
   		    								mpp : 'position',
   		    								y : 1
   		    							}
   		    						}, null, (obj)=>{ 
   		    								obj.remove();
   		    						});
   		    					});
   		    				});
   		    				
   		    				const addrBox = boxFun('주소 리스트',false, [addrList, closeBtn], true, 'addrBox', false, true);
   		    				
   		    			} else {
   		    				searchKey.focus();
   		    				infoBar(searchKey.parentNode, '지번 및 도로명 주소를 입력해주세요.');
   		    			}
   		    		});
   					
   				} else if(input.name === 'maddr_2') {
   					
   					input.addEventListener('keyup',()=>{
   						if(input.value){
   							inputCheck(input,true,null);
   						} else {
   							inputCheck(input,false,'정보를 입력해주세요.');
   						}
   					});
   					
   					input.addEventListener('blur',()=>{
   						if(input.value){
   							inputCheck(input,true,null);
   						} else {
   							inputCheck(input,false,'정보를 입력해주세요.');
   						}
   					});
   						
   				} else if (input.name === 'mname'){
   					valueCheck(input, /^[a-zA-Z가-힣]{2,8}$/,(i)=>{
   						inputCheck(i,true,null);
    				}, (i)=>{
    					inputCheck(i,false,'한글 혹은 영문 대소문자 2자 이상 8자 이하여야 합니다.');
    				});
   				}
    		});
    	},true);
    	
    });

};

