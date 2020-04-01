//드래그앤 드롭 
function dragEnter(ev) {
		ev.preventDefault();
	}

/*
 * function drag(ev) { console.dir(ev.target); ev.target.id = 'drag';
 * ev.dataTransfer.setData("text", ev.target.id); }
 */
	
	// 드래그 했을때
	function drag(ev) {
		console.dir(ev.target);
		ev.target.id = 'drag';
		
		const classArr = ev.target.parentNode.className.split(' ');
		
		// ondrag시 원하는 클래스에 복사붙여넣기를 할 수 있게 만드는 코드 , true값을 "copyCheck"에 담아서 전송해줌
		if(classArr[1]){
			ev.dataTransfer.setData("copyCheck", true);	
		}
		ev.dataTransfer.setData("text", ev.target.id);

	}
// target : 태그 오브젝트 에대애서 반영한다. id의 프로퍼티를 정의해주고 (가상의id를 만들어줌)
// dataTransfer : "text" 라는 오브젝트에 넣어서 drop 할때의 값에 적용해 준다
	
	
	// 복사 드래그앤 드롭
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
// dragObj.id = ''; 가상의 아이디를 삭제 ->매번 중복된 값을 새로 id를 만들어 주어야 하기때문
		
	
	// 일반 드래그앤 드롭
	function nomaldrop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		var dragObj = document.querySelector('#' + data);
		ev.target.appendChild(dragObj);
		dragObj.id = '';
	}
	
//글목록 게시판 
function wblist() {
	
	
	//프로그램 전체 일정 
	$.ajax({
		url:'wbAllList',
		method:'post',
		data:{
			"wno":wno},
		success: function(data) {
			
			
			data.forEach(function(item){
				var mid = item.mid;
				var wbtodono = item.wbtodono; 
				var wbcontent = item.wbcontent; 
				var wbtitle = item.wbtitle; 
				
				 $('<input class="wbinput" data-wbtodono="'+wbtodono+'"  type="text" readonly>').val(mid+':'+wbtitle).appendTo('#wtasklistAll');

			});
			
			 
			 $('.wbinput').on('click',function(){
				 
				 var index = $(".wbinput").index(this);
				  var selectno =$(".wbinput:eq(" + index + ")").data('wbtodono');
				
				   console.log(selectno);
				 selectbtn(selectno);
			 }); 
			

			

			//append와 appendTo 붙이는 방식 다르다 
			//$('.wtasklist').append('<input type="text" value="쨘">');
            //$('<input type="text" value="어라" readonly>').appendTo('.wtasklist');
         

				
		},error: function(data) {
			alert("통신실패");
		}
	
	});
	
	//나의 일정 
	$.ajax({
		url:'wbMyList',
		method:'post',
		data:{
			"mid":mid, //로그인 세션에서 가져와야 할 mid 
			"wno":wno
		},
		success:function(data){
			
			data.forEach(function(item){
				var mid = item.mid;
				var wbtodono = item.wbtodono; 
				var wbcontent = item.wbcontent; 
				var wbtitle = item.wbtitle; 
				
				 $('<input class="wbinputMy" data-wbtodono="'+wbtodono+'"  type="text" readonly>').val(mid+':'+wbtitle).appendTo('#wtasklistMy');

			});
			
			 
			 $('.wbinputMy').on('click',function(){
				 
				 var index = $(".wbinputMy").index(this);
				 var selectno =$(".wbinputMy:eq(" + index + ")").data('wbtodono');
				
				 selectbtn(selectno);
			 }); 
			
			
		},error:function(data){
			alert("통신실패");
		}
		
	});
	
	
	
	
	const wbwraplist = addObject(null, 'div', 'wbwraplist');
	const wboardcon = addObject(wbwraplist, 'div', 'wboardcon',true,(o)=>{
		o.innerHTML = `
		<div class="wtasklist" id="wtasklistAll">
			<p class="cpwtasklist">프로그램 전체 일정
			<input class="wbtadd" type="button" value="+">
			</p>
			
	
		</div>
		<div class="wtasklist mytasklist" id="wtasklistMy" ondragover="dragEnter(event)">
			<p class="cpwtasklist">나의 일정
			<input class="wbtadd" type="button" value="+">
			</p>	
			
		</div>
		
		<div  class="wtasklist" id="wtasklistDo" ondrop="copydrop(event)"  ondragover="dragEnter(event)">
			<input type="hidden" name="wbtodo" value="N"/>
			<p>진행중 일정</p>
		</div>
		
		<div class="wtasklist" id="wtasklistDone" ondrop="nomaldrop(event)" ondragover="dragEnter(event)">
			<input type="hidden" name="wbtodo" value="Y"/>
			<p>완료 일정</p>

		</div>
		
		`;
		
		o.querySelector('.wbtadd').addEventListener('click',(e)=>{
			alert('ddddddd');
		});
		
		
	});

	
	const wblistbox = boxFun('글목록', false, [ wboardcon ],false,'wblistbox',null,true);
	
}




// 글 선택시 생성되는 박스
function selectbtn(selectno){
	console.log("로그부분에서 찍혀오는 값"+selectno);
	                                                                  // ↓닫힘 버튼 눌렀을때 배경화면 사라짐
// const box = boxFun('박스에 박스', false, null, false, 'innerBox', null, true);

	
	$.ajax({
		url: 'wSelectOne',
		// accept : 'application/json',
		method: 'post',
		// contentType : 'application/json; charset=utf-8;',
		// async: false,
		data: {"selectno":selectno},
		success: function(res){
			console.log(res);
			// alert(res);
			var id = res.mid;
			var title = res.wbtitle;
			var date = res.wbstartdate +"~"+ res.wbenddate;
			var content = res.wbcontent; 
			console.log(id+" " +title+" " +date+" " +content);
			$(".wtxt").eq(0).val(id);
			$(".wtxt").eq(1).val(title);
			$(".wtxt").eq(2).val(date);
			$(".wcontent").html(content);
		},
		error: function(res){
			alert("다시 선택해주세요!");
			
		}
	});
 
	
	
	const  writeContent = addObject(null, 'div', 'writeContent');
	
	const wpic = addObject(writeContent, 'p', 'wpic', true, (o)=>{
		o.innerHTML = `<span>담당자</span><input class="wtxt" type="text" placeholder="담당자" readonly />`;
	});
	const wtitle = addObject(writeContent, 'p', 'wtitle', true, (o)=>{
		o.innerHTML = `<span>제목</span><input class="wtxt" type="text" placeholder="제목" readonly/>`;
	});
	const wdate = addObject(writeContent, 'p', 'wdate', true, (o)=>{
		o.innerHTML = `<span>날짜</span><input class="wtxt" type="text" placeholder="날짜" readonly />`;
	});
	const wcontent = addObject(writeContent, 'div', 'wcontent', true, (o)=>{
		o.innerHTML = "내용 ";
		
	});
		// 2번째,배경 투명 = false, 검정 = true/ true 4번째 취소버튼 없애기
	const box = boxFun('일정', true, [ writeContent ],false,'wbinnerBox',null,true);
	
	
	const winsertbtn = addObject(writeContent,'p','winsertbtn',true,(o)=>{
		o.innerHTML = `
		<input type="button" value="삭제" id="wbdelete">
		<input type="button" value="수정" id="wbupdate" >
		`;
		
		document.querySelector('#wbdelete').addEventListener('click', (e)=>{

			$.ajax({
				url: 'wDelete',
				// accept : 'application/json',
				method: 'post',  
				// contentType : 'application/json; charset=utf-8;',
				// async: false,
				data: {"selectno":selectno},
				success: function(res){
					
					console.log(res);
					if(true){
						alert("삭제되었습니다.");	
						location.href="wboard";
					}else if(false){
						alert("삭제 실패 ");
					}
					
				
				},
				error: function(res){
					alert("실패");
					
				}
			});
		
		});
		document.querySelector('#wbupdate').addEventListener('click', (e)=>{
				
			$('.wpic').hide();
			$('.wtitle').hide();
			$('.wdate').hide();$('.wcontent').hide();$('.winsertbtn').hide();
			$('.wbinnerBox p').html('일정 수정');
			//action="summerUpdateres" method="post"
			const wucontents = addObject(writeContent,'div','wucontents',true,(o)=>{
				o.innerHTML =`
				<form id="summerUpdateres" name="summerUpdateres" >
				<p><span>담당자</span><input id="wupic" class="wutxt" type="text" placeholder="담당자" name="mid"/></p>
				<p><span>제목</span><input id="wutitle" class="wutxt" type="text" placeholder="제목" name="wbtitle"/></p>
				<p><span>날짜</span>
				<input id="wbstartdate" class="wutxt" type="text" placeholder="날짜" name="wbstartdate"/>
				<input id="wbenddate" class="wutxt" type="text" placeholder="날짜" name="wbenddate"/><p>
				<div id="summernotediv"><textarea id="summernote" name="wbcontent"></textarea></div>
				<p id="wbhibtn">
				<input type="hidden" name="wbtodono" id="wbtodono">
				<input type="button" value="취소" id="wbcancle">
				<input type="button" value="수정완료" id="wbupdateres"></p>
				</form>
				`;
				

				$.ajax({
					url: 'summerupdate',
					// accept : 'application/json',
					method: 'post',
					// contentType : 'application/json; charset=utf-8;',
					// async: false,
					data: {"selectno":selectno},
					success: function(res){
						console.log(res);
						// alert(res);
						var id = res.mid;
						var title = res.wbtitle;
						var startdate = res.wbstartdate ;
						var enddate =  res.wbenddate;
						var content = res.wbcontent; 
						console.log(id+" " +title+" " +" " +content);
						$(".wutxt").eq(0).val(id);
						$(".wutxt").eq(1).val(title);
						$(".wutxt").eq(2).val(startdate);
						$(".wutxt").eq(3).val(enddate);
						$('#summernote').summernote('code',content);
						//질문 수정시 섬머노트에 글 불러오기시 p테그 남아있음 

					},
					error: function(res){
						alert("다시 선택해주세요!");
						
					}
				});
				
				
				$(function() {
					   $("#wbstartdate").flatpickr({
						    enableTime: false,
						    dateFormat: "Y-m-d"
						});
					   $("#wbenddate").flatpickr({
						    enableTime: false,
						    dateFormat: "Y-m-d"
						});
					
				});
				
			    $(document).ready(function() {
			    	  $('#summernote').summernote({
			     	    	placeholder: '내용을 입력하세요',
			    	        minHeight: 220,
			    	        maxHeight: null,
			    	        focus: true, 
			    	  });
					
			    	  
			    	});
				document.querySelector('#wbupdateres').addEventListener('click',(e)=>{
					
					document.querySelector('#wbtodono').value=selectno;
						
						var wbtodono = $('#wbtodono').val().trim();
						var mid = $('#wupic').val();
						var wbtitle = $('#wutitle').val();
						var wbstartdate =$('#wbstartdate').val();
						var wbenddate =$('#wbenddate').val();
						var wbcontent =$('#summernote').val();

						
						var val = {
								"wbtodono":selectno,
								"mid":mid,
								"wbtitle":wbtitle,
								"wbstartdate":wbstartdate,
								"wbenddate":wbenddate,
								"wbcontent":wbcontent
							}
					
					$.ajax({
						type:'post',
						url:'summerUpdateres',
						//contentType : 'application/json',
						data:val,
						dataType:'text',
						
						success: function(res){
							if(true){
								alert("수정내용 저장성공하였습니다.");
								location.reload();
								//location.href="wboard"; //목록으로~
							}else{
								alert("수정실패하였습니다");
							}
						},
						error: function(res){
							alert("실패");
							
						}
						
					});
					

					
				});
				
			});
			
			
			

	});
	
	});
}




//글 새로 쓰기 버튼 
function wbnewtask() {
	const gggg = addObject(null, 'div', 'gggg');
	const wblistbox1 = boxFun('글을 추가 하자', false, [ gggg ],false,'wblistbox1',null,true);
	
}

	
	
	
	
	
	
	