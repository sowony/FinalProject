/**
 * http://usejsdoc.org/
 */


window.onload = () => {
	
	pageLoad();
	
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
        		boxFun('입력이 잘못되었습니다.',true);
        	}
        });

    });
    
    const signUpBtn = document.querySelector('.signUpBtn');
    signUpBtn.addEventListener('click',(e)=>{
    	
    	e.preventDefault();
    	const signUpForm = addObject(null,'div','signUpDiv',false,(t)=>{
    		t.innerHTML = `
    			<input type="text" name="mid" placeholder="아이디"/>
    			<input type="password" name="mpw" autocomplete="new-password" placeholder="패스워드"/>
    			<input type="password" name="mpw_chk" autocomplete="new-password" placeholder="패스워드 확인"/>
    			<input type="text" name="mid" placeholder="닉네임"/>
    			<input type="email" name="mid" placeholder="E-mail"/>
    		`;
    	});
    	
    	const signUpCloseBtn = addObject(null,'input','grayBtn',false,(t)=>{
    		t.setAttribute('type','button');
    		t.style.width = 'max-content';
    		t.value='취소';
    		t.addEventListener('click', ()=>{
    			utilBoxDelete();
    		});
    	});
    	
    	boxFun('회원가입', true, [signUpForm, signUpCloseBtn], true, '.signUpDivBox');
    	
    });

};

