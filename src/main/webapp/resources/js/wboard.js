//드래그앤 드롭 
function dragEnter(ev) {
		ev.preventDefault();
	}

/*
	function drag(ev) {
		console.dir(ev.target);
		ev.target.id = 'drag';
		ev.dataTransfer.setData("text", ev.target.id);
	}
	*/
	
	//드래그 했을때
	function drag(ev) {
		console.dir(ev.target);
		ev.target.id = 'drag';
		
		const classArr = ev.target.parentNode.className.split(' ');
		
		//ondrag시 원하는 클래스에 복사붙여넣기를 할 수 있게 만드는 코드 , true값을 "copyCheck"에 담아서 전송해줌
		if(classArr[1]){
			ev.dataTransfer.setData("copyCheck", true);	
		}
		ev.dataTransfer.setData("text", ev.target.id);

	}
//target : 태그 오브젝트 에대애서 반영한다. id의 프로퍼티를 정의해주고 (가상의id를 만들어줌)
//dataTransfer : "text" 라는 오브젝트에 넣어서 drop 할때의 값에 적용해 준다 	
	
	
	//복사 드래그앤 드롭
	function copydrop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		var dragObj = document.querySelector('#' + data);
		
		// 복사된 것을 자식 객체에 붙이기 
		const copyCheck = ev.dataTransfer.getData("copyCheck");
		
		console.log(copyCheck);
		
		if(copyCheck){
			var ccopy = dragObj.cloneNode(true);
			
				ev.target.appendChild(ccopy);	
			
			
		} else {
			ev.target.appendChild(dragObj);
		}
		
		
		dragObj.id = '';
	}
//dragObj.id = ''; 가상의 아이디를 삭제 ->매번 중복된 값을 새로 id를 만들어 주어야 하기때문
		
	
	//일반 드래그앤 드롭
	function nomaldrop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		var dragObj = document.querySelector('#' + data);
		ev.target.appendChild(dragObj);
		dragObj.id = '';
	}
	
	
	
//글 선택시 생성되는 박스 
function selectbtn(selectno){
	console.log("로그부분에서 찍혀오는 값"+selectno);
	//                                                                   ↓닫힘 버튼 눌렀을때 배경화면 사라짐
//	const box = boxFun('박스에 박스', false, null, false, 'innerBox', null, true);

	
	$.ajax({
		url: 'wSelectOne',
		//accept : 'application/json',
		method: 'post',
		//contentType : 'application/json; charset=utf-8;',
		//async: false,
		data: {"selectno":selectno},
		success: function(res){
			console.log(res);
			//alert(res);
			var id = res.mid;
			var title = res.wbtitle;
			var date = res.wbstartdate +"~"+ res.wbenddate;
			var content = res.wbcontent; 
			console.log(id+" " +title+" " +date+" " +content);
			$(".wtxt").eq(0).val(id);
			$(".wtxt").eq(1).val(title);
			$(".wtxt").eq(2).val(date);
			$(".wcontent").val(content);
		},
		error: function(res){
			alert("다시 선택해주세요!");
			
		}
	});
 
	
	
	const div1 = addObject(null, 'div', 'writeContent');
	
	const wpic = addObject(div1, 'p', 'wpic', true, (o)=>{
		o.innerHTML = `<span>담당자</span><input class="wtxt" type="text" placeholder="담당자"/>`;
	});
	const wtitle = addObject(div1, 'p', 'wtitle', true, (o)=>{
		o.innerHTML = `<span>제목</span><input class="wtxt" type="text" placeholder="제목"/>`;
	});
	const wdate = addObject(div1, 'p', 'wdate', true, (o)=>{
		o.innerHTML = `<span>날짜</span><input class="wtxt" type="text" placeholder="날짜"/>`;
	});
	const wcontent = addObject(div1, 'textarea', 'wcontent', true, (o)=>{
		o.placeholder = "내용 ";
	});
		//2번째,배경 투명 = false, 검정 = true/ true 4번째 취소버튼 없애기 
	const box = boxFun('일정', true, [ div1 ],false,'innerBox',null,true);
	
	
	const winsertbtn = addObject(div1,'p','winsertbtn',true,(o)=>{
		o.innerHTML = `
		<input type="button" value="삭제" id="wbdelete">
		<input type="button" value="수정" id="wbupdate" >
		`;
		
		document.querySelector('#delete').addEventListener('click', (e)=>{
			
		
		});
		document.querySelector('#add').addEventListener('click', (e)=>{
			
			
		});
	});
 
	

}




//글 새로 쓰기 버튼 
function insertbtn() {
	
	const box = boxFun('일정 추가',true,[]);
	
}








