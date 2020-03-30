/**
 * http://usejsdoc.org/
 */



function headerFun(){
	
	let userInfo;
	
	xhrLoad('get', '/dashboard/userload', null, (res)=>{
		userInfo = JSON.parse(res);
		
		
		const header = document.querySelector('header');
		
		const header_div = addObject(header, 'div', '_header', true, (o)=>{
			
		});
		
		const header_ul = addObject(header_div, 'ul', '_ul', true, (o)=>{
			
		});
		
		const title_li = addObject(header_ul, 'li', 'title_li', true, (o)=>{
			o.innerHTML = '<a href="#" onclick="return false;">TASKTREE</a>';
			o.addEventListener('click', ()=>{
				location.href = '/dashboard';
			});
		});


		const nickName_li = addObject(header_ul, 'li', 'nickName_li', true, (o)=>{
			o.innerHTML = `${userInfo.mnick}`;
		});
		
		const letter_li = addObject(header_ul, 'li', 'letter_li', true, (o)=>{
			o.innerHTML = `<div style="
										overflow: hidden;
										background-color: #fff;
										border-radius: 3px;
										border: 1px solid #ccc;
										width: 25px;
										height: 20px;
										position: relative;
										top: 0px;">
    
										<div style="
										position: absolute;
										left: -1px;
										top: -19px;
										width: 25px;
										height: 25px;
										border: 1px solid #aaa;
										transform: rotate(45deg);"></div>
										
										<div style="
										position: absolute;
										bottom: 5px;
										left: 8.5px;
										width: 7px;
										height: 7px;
										border-radius: 50%;
										background-color: #a63232;">
										</div>
										</div>`;
			o.style.float = 'right';
			
			o.addEventListener('click', (e)=>{
				e.preventDefault();
				e.stopPropagation();
				
				e.target.setAttribute('disabled','true');
				const letterBox = document.querySelector('.letterBox');
				
				if(!letterBox) {
					const inputText0 = addObject(null, 'div', 'mainDiv', false, (o)=>{
						
						o.innerHTML=`<div class='dashlist'></div>			
									 <div class='msglist'></div>`;
						
						// 메세지 리스트 비동기 통신 가져오기
						printDashList(o);
						
					});
					
					
					const box = boxFun('쪽지 함', true,[inputText0],false,'msgBox',(o)=>{
						o.style.display="table";
						o.style.width='70%';
						o.style.height='70%';
						
					},true );
					
					
				}
			});
		});
		
		const profile_li = addObject(header_ul, 'li', 'profile_li', true, (o)=>{
			o.innerHTML = `<div class="header_profile_img"style="background-image : url('${userInfo.mimgpath}');"></div>`
		});
		
	}, false);
	
	console.log(userInfo);
	
	if(userInfo.mplatform !== 'home'){
		userInfo.mid = userInfo.mplatform + '에서 연동 중...';
	}
	
	return userInfo;
};




function printDashList (o){
	var divinner = "";
	
	
	xhrLoad('get', 'msg/dashlist',{'mid':`${userInfo.mid}`},(res)=>{
		let dashlist = JSON.parse(res);
		
			let sum = 0;
			for (let i = 0 ; i < dashlist.length; i++){
				sum+= dashlist[i].COUNT;
			}
				divinner += `<div class='divinner' title='all'><span title='all' >ALL</span> <span title='all' class='sum'>${sum}</span></div>`;
		
			for (let i = 0 ; i < dashlist.length ; i++){
				divinner += `<div class='divinner' title='${dashlist[i].DNO}'><span title='${dashlist[i].DNO}'>${dashlist[i].DNO}</span> <span title='${dashlist[i].DNO}' class='sum'>${dashlist[i].COUNT}</span></div>`;
		
	}
	}, false);

	
	o.children[0].innerHTML=divinner;
	
	var selectdno = o.firstElementChild.children;
	
	for(var i = 0 ; i<selectdno.length; i++){
		
		selectdno[i].addEventListener('click', invdmsg.bind(selectdno[i])); 	// invdmsg메소드에 this를 클릭한 객체로 바인딩 
	}
}

function invdmsg (){
	var o = this.parentElement.parentElement.children[1];
	
		while (o.firstChild) {
			o.removeChild(o.firstChild);}
		
		// 클릭했을 시 쪽지함 별 쪽지리스트 출력 
		console.log("what's this here=====>"+this);
		var dno = this.getAttribute('title');	// divinner의 title(dno) 속성을 가져옴 -> 어느 쪽지함인지 구분함 
		xhrLoad('get', 'msg/msgList',{'mid':`${userInfo.mid}`,'dno':dno}, (res)=>{
			let msglist = JSON.parse(res);

			
			for (let i = 0 ; i<msglist.length; i++){
				var listdiv = document.createElement("div");
				listdiv.setAttribute("class","msg");
				listdiv.innerHTML=`<a class='msgtitle'>${msglist[i].msgtitle}</a>
								<span class='msgfrom'>${msglist[i].msgfrom}</span>
								<span class='msgdate'>${msglist[i].msgdate}</span>
								<input type='hidden' id='msgno' value='${msglist[i].msgno}'/>
								<input type='hidden' id='msgopened' value='${msglist[i].msgopened}'/>`;
				
				if (msglist[i].msgopened==='Y'){
					listdiv.setAttribute("class","notopened");
				}	
				o.appendChild(listdiv);
				
				// 개별 쪽지 
				listdiv.addEventListener("click", openMsg.bind(o.children[i]));			
			}
			
		},false);
}

function openMsg(e){
	
	console.log('openMsg THIS ===>'+this);

	let msgopened = this.querySelector('#msgopened').getAttribute('value');
	let msgno = this.querySelector('#msgno').getAttribute('value');
	
	if (msgopened==='N')	xhrLoad('get', 'msg/msgopened',{'msgno':msgno},()=>{}, false);
	
	const msg = boxFun('ㅇ', false, null,false);
	
	
		
	
}



