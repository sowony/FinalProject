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
		const wbtodono = dragObj.dataset.wbtodono;
		const area = dragObj.parentNode;
		
		let chk = true;
		area.childNodes.forEach(item=>{
			if(item.tagName === 'input'){
				if(item.dataset.wbtodono === wbtodono){
					chk = false;
				}
			}
		});
		
		if(chk){
			const copyCheck = ev.dataTransfer.getData("copyCheck");
		
			if(copyCheck){
				var ccopy = dragObj.cloneNode(true);
				ev.target.appendChild(ccopy);
			} else {
				ev.target.appendChild(dragObj);
			}
		}
		
		dragObj.id = '';
	}

	
const summernoteConfig = {
		placeholder: 'content',
        minHeight: 220,
        maxHeight: null,
        focus: true, 
		toolbar: [
		    // [groupName, [list of button]]
		    ['style', ['bold', 'italic', 'underline', 'clear']],
		    ['fontsize', ['fontsize']],
		    ['color', ['color']],
		    ['para', ['ul', 'ol', 'paragraph']],
		    ['height', ['height']],
		    ['insert', ['picture', 'link', 'video', 'table']]
		  ]
}
	
//글목록 게시판 
function wblist(widget) {
	

	const wno = widget.info.wno;
	
	widget.websocket.planClient = client.subscribe('/sub/wplan/'+wno,(res)=>{
		const item = JSON.parse(res.body);
		console.log(item);
		const wtasklistAll = widget.querySelector('#wtasklistAll');
		schedulItemLoad(item, wtasklistAll, true, true);
	});
	
	const wboardcon = addObject(null, 'div', 'wboardcon',false,(o)=>{
		
		o.innerHTML = `
		<div class="wtasklist" id="wtasklistAll">
			<p class="cpwtasklist">프로그램 전체 일정</p>
	
		</div>
		<div class="wtasklist mytasklist" id="wtasklistMy" ondragover="dragEnter(event)">
			<p class="cpwtasklist">나의 일정
			</p><input class="wbtadd" type="button" value="+">
			
		</div>
		
		<div  class="wtasklist" id="wtasklistDo" ondrop="copydrop(event)"  ondragover="dragEnter(event)">
			<input type="hidden" name="wbtodo" value="N"/>
			<p>진행중 일정</p>
		</div>
		
		<div class="wtasklist" id="wtasklistDone" ondrop="copydrop(event)" ondragover="dragEnter(event)">
			<input type="hidden" name="wbtodo" value="Y"/>
			<p>완료 일정</p>
		</div>
		`;
		
		const wbtadd = o.querySelector('.wbtadd');
		
		schedulInsert(wbtadd, widget);
		
		$(o).on('click',(e)=>{
			widget.style.cursor = 'default';
		});
		
		if(!widget.info.preview){
		
			
			$(function() {

				//프로그램 전체 일정 
				$.ajax({
					url:'wbAllList',
					method:'post',
					data:{
						"wno":wno
					},
					success: function(data) {

						if(data){

							data.forEach(function(item){

								const wtasklistAll = widget.querySelector('#wtasklistAll');
								schedulItemLoad(item, wtasklistAll, true);

							});

						}

					},error: function(data) {
						alert("통신실패");
					}

				});

				//나의 일정 
				$.ajax({
					url:'wbMyList',
					method:'post',
					data:{
						"wno":wno
					},
					success:function(data){

						if(data){

							data.forEach(function(item){

								const wtasklistMy = widget.querySelector('#wtasklistMy');
								schedulItemLoad(item, wtasklistMy);

								if(item.wbtodo ==='Y'){

									const wtasklistDone = widget.querySelector('#wtasklistDone');
									schedulItemLoad(item, wtasklistDone);

								} else if(item.wbtodo === 'N'){

									const wtasklistDo = widget.querySelector('#wtasklistDo');
									schedulItemLoad(item, wtasklistDo);

								}

							});

						}
					},error:function(data){
						alert("통신실패");
						wbnewtask();
					}

				});

			});

		}
	
	});
	
	wboardcon.addEventListener('mouseover',(e)=>{
		widget.style.cursor = 'default';
	});

	widget.querySelector('.widgetContent').appendChild(wboardcon);
	
	
}

function schedulInsert(item, widget){
	
	console.log(item);
	
	const wno = widget.info.wno;
	const dno = widget.info.dno;
	
	$(item).on('click',function(){
		
		let wblistbox1 = document.querySelector('.wblistbox1');
		if(wblistbox1) wblistbox1.remove();
		
		const wblistdiv = addObject(null, 'div', 'wblistdiv');
		const wblistobj = addObject(wblistdiv, 'div', 'wblistobj',true,(o)=>{
		
			o.innerHTML=`
			<p><span>제목</span>
				<span class="sptag"><input type="text" id="wbtitle" name="wbtitle"  placeholder="제목"/></span></p>
			<p>
				<span>날짜</span>
				<span class="sptag">
					<input type="text" id="wbstartdate1" name="wbstartdate" >
					<input type="text" id="wbenddate1" name="wbenddate" >
				</span>
			</p>
			<textarea id="summernote" name="wbcontent"></textarea>
			`;
			
		    $(function() {
		    	//써머노트 호출 
		    	  $(o).find('#summernote').summernote(summernoteConfig);
		    	  
		    	  const calConfig = {
			    		    mode: 'range',
			    		    dateFormat: "Y-m-d",
			    		    onChange : function(selectedDates, dateStr, instance){
			    		    	
			    		    	var wbstartdate = $(o).find('#wbstartdate1');
				    			var wbenddate = $(o).find('#wbenddate1');
				    			
			    		    	if(selectedDates.length === 2){
			    		    		
			    		    		const dateArray = dateStr.split('to');
			    		    		
			    		    		const startDate = dateArray[0].trim();
			    		    		const endDate = dateArray[1].trim();
			    		    		
			    		    		wbstartdate.val(startDate);
			    		    		wbenddate.val(endDate);
			    		    		
			    		    	}
			    		    }
			    		};
		    	  
		    	  //플랫피커 호출 
		    	  let cal1 =	$(o).find("#wbstartdate1").flatpickr(calConfig);
		    	  let cal2 =	$(o).find("#wbenddate1").flatpickr(calConfig);
		    	  
		    	  
		    	});
			
		});
		
		
		const wbsend = addObject(null, 'input', 'grayBtn', false, (o)=>{
			
			o.type='button';
			o.style.marginRight = '5px';
			o.style.width = 'max-content';
			o.id='wbsend';
			o.value='글쓰기';
			o.name='wbsend';
			
			$(o).on('click',(e)=>{
				
				const wblistbox1 = e.target.parentNode;
				
				var wbtitle = $(wblistbox1).find('#wbtitle').val();
    			var wbstartdate = $(wblistbox1).find('#wbstartdate1').val();
    			var wbenddate = $(wblistbox1).find('#wbenddate1').val();
    			var wbcontent = $(wblistbox1).find('#summernote').val();
    			
    			let wbtodo;
    			
    			const nowDate = new Date();
    			const dateNum1 = hyphenDateFormat(wbstartdate);
    			const dateNum2 = hyphenDateFormat(wbenddate);
    			
    			if(dateNum1 <= nowDate && dateNum2 >= nowDate){
    				wbtodo = 'N';
    			} else if(dateNum1 > nowDate){
    				wbtodo = null;
    			} else if(dateNum2 < nowDate){
    				wbtodo = 'Y';
    			}
    			
    			$.ajax({
    				url:'summerwrite',
    				method:'post',
    				data:{
    					wno, wbtodo, dno,
    					"wbtitle":wbtitle,
    					"wbstartdate":wbstartdate,
    					"wbenddate":wbenddate,
    					"wbcontent":wbcontent
    				},
    				success: function(res) {
    					
    					if(res){
    						
    						client.send('/pub/wplan', {}, JSON.stringify(res));
    						
    						const wtasklistMy = widget.querySelector('#wtasklistMy');
    						schedulItemLoad(res, wtasklistMy, null, true);
    						
    						if(res.wbtodo ==='Y'){
    							
    							const wtasklistDone = widget.querySelector('#wtasklistDone');
    							schedulItemLoad(res, wtasklistDone, null, true);
    							
    						} else if(res.wbtodo === 'N'){
    							
    							const wtasklistDo = widget.querySelector('#wtasklistDo');
    							schedulItemLoad(res, wtasklistDo, null, true);
    							
    						}
    						
    						motionOnOff(o.parentNode, 0.8, false, { setting : 'offDefault' }, null, (o)=>{
    							o.remove();
    						});
    						
    					}else {
    						boxFun('저장에 실패하였습니다.');
    					}
    					
    				},error:function(res){
    					alert('통신실패');
    				}
    			});//아작스 끝 
			});
		});
		
		wblistbox1 = boxFun('일정 추가', false, [ wblistdiv, wbsend ],false,'wblistbox1',(o)=>{
			o.querySelector('.wblistdiv').style.textAlign = 'left';
		},true);
		
	});
}

function schedulItemLoad(item, area, all, write){
	
	let target;
	
	if(!all){
		target = $('<input class="wbinputMy" draggable="true" data-wbtodono="'+item.wbtodono+'"  type="text" readonly  ondragstart="drag(event)">');
	} else {
		target = $('<input class="wbinput" data-wbtodono="'+ item.wbtodono + '"  type="text" readonly>');
	}
	
	target.val(item.wbtitle);
	
	target.on('click',()=>{
		selectbtn(target.data('wbtodono'));
	});
	
	if(!write){
		$(area).append(target);
	} else {
		const firstInput = area.querySelector('input[type=text]');
		if(firstInput){
			$(firstInput).before(target);
		} else {
			$(area).append(target);
		}
	}
}



// 글 선택시 생성되는 박스
function selectbtn(selectno){
	
	let wbinnerBox = document.querySelector('.wbinnerBox');
	
	if(wbinnerBox) wbinnerBox.remove();
	
	writeContent = addObject(null, 'div', 'writeContent', false, (o)=>{
		
		$.ajax({
			url : 'wSelectOne',
			method : 'post',
			data : { selectno },
			success : (data)=>{
				
				let modifyBtn = ``;
				if(data.mid === userInfo.mid){
					modifyBtn = `<span class="modifyBtn"><img src="https://img.icons8.com/small/16/000000/edit.png"/></span>`
				}
				
				o.innerHTML = `
					<p class="wbwriterP">
						<span class="colName">담당자</span>
						<span>${data.mnick}</span>
					</p>
					<p class="wbtitleP">
						<span class="colName">일정명</span>
						<span class="wbtitle">${data.wbtitle}</span>`+modifyBtn+`
					</p>
					<p class="wbdateP">
						<span class="colName">기간</span>
						<span class="wbstartdate">${data.wbstartdate}</span>
						<span> ~ </span>
						<span class="wbenddate">${data.wbenddate}</span>`+modifyBtn+`
					</p>
					<div class="wbcontentDiv">${data.wbcontent !== null? data.wbcontent : ''}</div>
					`;
				
				const modifyBtns = o.querySelectorAll('.modifyBtn');
				
				if(modifyBtns){
					modifyBtns.forEach((btn,i)=>{
						if(i===0){
							btn.addEventListener('click', (e)=>{
								
								const target = e.currentTarget;
								const modifyTarget = target.previousSibling;
								const modifyTargetClass = modifyTarget.classList[0];
								
								const modifyInput = `
									<input type="text" style="
									width: 158px;
									vertical-align: middle;
									display: inline-block;
									margin: 0 !important;
									" class="grayBtn" name="${modifyTargetClass}" value="${modifyTarget.innerHTML}" placeholder="일정명"/>
									<input type="button" style="
									display: inline-block;
									width: max-content;
									height: 28px;
									margin: 0 !important;
									" class="grayBtn" value="적용"/>
								`;
								
								modifyTarget.innerHTML = modifyInput;
								modifyTarget.querySelector('input[type=button]').addEventListener('click',(e)=>{
									const wbtitle = modifyTarget.querySelector('input[type=text]').value;
									xhrLoad('post','titleupdate', { wbtodono : selectno, wbtitle }, (res)=>{
			    		    			if(res){
					    		    		modifyTarget.innerHTML = wbtitle;
			    		    			}
			    		    		});
								});
								
							});
						} else if(i===1){
							 const calConfig = {
						    		    mode: 'range',
						    		    dateFormat: "Y-m-d",
						    		    onChange : function(selectedDates, dateStr, instance){
						    		    	
						    		    	const p = instance.input.parentNode;
						    		    	
						    		    	console.log(p);
						    		    	
						    		    	var wbstartdate = p.querySelector('.wbstartdate');
							    			var wbenddate = p.querySelector('.wbenddate');
							    			
							    			
						    		    	if(selectedDates.length === 2){
						    		    		
						    		    		const dateArray = dateStr.split('to');
						    		    		
						    		    		const startDate = dateArray[0].trim();
						    		    		const endDate = dateArray[1].trim();
						    		    		
						    		    		xhrLoad('post','dateupdate', { wbtodono : selectno, wbstartdate : startDate, wbenddate : endDate }, (res)=>{
						    		    			
						    		    			if(res){
						    		    				wbstartdate.innerHTML = startDate;
								    		    		wbenddate.innerHTML = endDate;
						    		    			}
						    		    		});
						    		    		
						    		    	}
						    		    }
						    		};
					    	  
					    	  //플랫피커 호출 
					    	  let cal1 = $(btn).flatpickr(calConfig);
						}
						
					});
					
					if(modifyBtns){
						const wbcontentDiv = o.querySelector('.wbcontentDiv');
						
						function event(e){
							
							e.preventDefault();
							e.stopPropagation();
							
							const wbcontentDiv = e.currentTarget;
							const wno = wbcontentDiv.wno;
							const wbcontent = wbcontentDiv.wbcontent;
							
							wbcontentDiv.removeEventListener('click',event);
							
							wbcontentDiv.innerHTML = `
								<textarea id="summernote" name="wbcontent"></textarea>
								<div style="text-align:center;">
									<input type="button" style="display:inline-block; width:49%;" class="grayBtn" value="수정"/>
									<input type="button" style="display:inline-block; width:49%;" class="grayBtn" value="수정 취소"/>
								</div>
							`;
							
							const btns = wbcontentDiv.querySelectorAll('input[type=button]');
							
							
							btns[0].addEventListener('click', (e)=>{
								const wbcontent = $('#summernote').val();
								xhrLoad('post', 'conupdate', { wbtodono : selectno, wbcontent }, (res)=>{
									
									const obj = JSON.parse(res);
									
									$('#summernote').summernote('destroy');
									
									wbcontentDiv.innerHTML = obj.wbcontent;
									wbcontentDiv.wbcontent = obj.wbcontent;
									wbcontentDiv.addEventListener('click',event);
								});
							});
							
							btns[1].addEventListener('click', (e)=>{
								
								e.preventDefault();
								e.stopPropagation();
								
								$('#summernote').summernote('destroy');
								wbcontentDiv.innerHTML = wbcontentDiv.wbcontent;
								wbcontentDiv.addEventListener('click',event);
							});
							
							$('#summernote').summernote(summernoteConfig);
							
							$('#summernote').summernote('code',wbcontent);
						}
						wbcontentDiv.wno = selectno;
						wbcontentDiv.wbcontent = data.wbcontent;
						wbcontentDiv.addEventListener('click', event);
					}
					
				}
				
			}
			
		});
		
		
	});
	

	
//	const modifyBtn = addObject(null, 'input', 'grayBtn', false, (o)=>{
//		o.type='button';
//		o.value='수정';
//		o.style.width='max-content';
//		o.style.marginRight='5px';
//		o.addEventListener('click', (e)=>{
//			
//			const writeContent = o.parentNode.querySelector('.writeContent');
//			
//			$(writeContent).find('.wpic').fadeOut(400);
//			$(writeContent).find('.wtitle').fadeOut(400);
//			$(writeContent).find('.wdate').fadeOut(400);
//			$(writeContent).find('.wcontent').fadeOut(400);
//			$(writeContent).find('.winsertbtn').fadeOut(400);
//			$(writeContent).find('.wbinnerBox p').html('일정 수정');
//			
//			const wucontents = addObject(writeContent,'div','wucontents',true,(o)=>{
//				
//				o.innerHTML =`
//				
//				<p><span>제목</span><input id="wutitle" class="wutxt" type="text" placeholder="제목" name="wbtitle"/></p>
//				<p><span>날짜</span>
//				<input id="wbstartdate" class="wutxt" type="text" placeholder="날짜" name="wbstartdate"/>
//				<input id="wbenddate" class="wutxt" type="text" placeholder="날짜" name="wbenddate"/><p>
//				<div id="summernotediv"><textarea id="summernote" name="wbcontent"></textarea></div>
//				<p id="wbhibtn">
//				<input type="hidden" name="wbtodono" id="wbtodono">
//				<input type="button" value="취소" id="wbcancle">
//				<input type="button" value="수정완료" id="wbupdateres"></p>
//				`;
//				
//
//				$.ajax({
//					url: 'summerupdate',
//					// accept : 'application/json',
//					method: 'post',
//					// contentType : 'application/json; charset=utf-8;',
//					// async: false,
//					data: {"selectno":selectno},
//					success: function(res){
//						console.log(res);
//						// alert(res);
//						var id = res.mid;
//						var title = res.wbtitle;
//						var startdate = res.wbstartdate ;
//						var enddate =  res.wbenddate;
//						var content = res.wbcontent; 
//						console.log(id+" " +title+" " +" " +content);
//						$(".wutxt").eq(0).val(id);
//						$(".wutxt").eq(1).val(title);
//						$(".wutxt").eq(2).val(startdate);
//						$(".wutxt").eq(3).val(enddate);
//						$('#summernote').summernote('code',content);
//						//질문 수정시 섬머노트에 글 불러오기시 p테그 남아있음 
//
//					},
//					error: function(res){
//						alert("다시 선택해주세요!");
//						
//					}
//				});
//				
//				
//				$(function() {
//					   $("#wbstartdate").flatpickr({
//						    enableTime: false,
//						    dateFormat: "Y-m-d"
//						});
//					   $("#wbenddate").flatpickr({
//						    enableTime: false,
//						    dateFormat: "Y-m-d"
//						});
//					
//				});
//				
//			    $(document).ready(function() {
//			    	  $('#summernote').summernote({
//			     	    	placeholder: '내용을 입력하세요',
//			    	        minHeight: 220,
//			    	        maxHeight: null,
//			    	        focus: true, 
//			    	  });
//					
//			    	  
//			    	});
//				document.querySelector('#wbupdateres').addEventListener('click',(e)=>{
//					
//					document.querySelector('#wbtodono').value=selectno;
//						
//						var wbtodono = $('#wbtodono').val().trim();
//						var mid = $('#wupic').val();
//						var wbtitle = $('#wutitle').val();
//						var wbstartdate =$('#wbstartdate').val();
//						var wbenddate =$('#wbenddate').val();
//						var wbcontent =$('#summernote').val();
//
//						
//						var val = {
//								"wbtodono":selectno,
//								"mid":mid,
//								"wbtitle":wbtitle,
//								"wbstartdate":wbstartdate,
//								"wbenddate":wbenddate,
//								"wbcontent":wbcontent
//							}
//					
//					$.ajax({
//						
//						type:'post',
//						
//						url:'summerUpdateres',
//						
//						//contentType : 'application/json',
//						data:val,
//						
//						dataType:'text',
//						
//						success: function(res){
//							
//							if(res === 'true'){
//								alert("수정내용 저장성공하였습니다.");
//								$('.wbinnerBox').remove();
//								reloadList();
//								
//							}else{
//								alert("수정실패하였습니다");
//							}
//						},
//						error: function(res){
//							alert("실패");
//							
//						}
//						
//					});
//					
//
//					
//				});
//				
//			});
//
//		});
//		
//	});
	
	
		// 2번째,배경 투명 = false, 검정 = true/ true 4번째 취소버튼 없애기
	const box = boxFun('일정', false, [ writeContent ],false,'wbinnerBox',null,true);
	
	
	
	
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
						 $('.wbinnerBox').remove();
						reloadList();
						
					}else if(false){
						alert("삭제 실패 ");
					}
					
				
				},
				error: function(res){
					alert("실패");
					
				}
			});
		
		});
	
	});
}





//달력 자르기 기능 
function confirmbtn(that){
	
	// 수정
	
	const wblistobj = that.parentNode.parentNode.parentNode;
	
	//날짜
	var a =  wblistobj.getElementById('rangeDate').value;
	var st = a.replace("to"," ");
	var tri = st.trim(); //공백제거 안먹힘 ~ 
	var arr = tri.split("-");
	var day = arr[2].substr(0,2);//2번쨰 배열에 일 까지 
	var day2 = arr[2].substr(4,5);//2번째 배열에 연도까지 
	
	var wbst = arr[0]+arr[1]+day;
	var wben = day2+arr[3]+arr[4];
	
	console.log("이젠 나오나 보자  "+wbst +"끝날짜 "+ wben);
	
	wblistobj.querySelector('#wbstartdate1').value= wbst;
	wblistobj.querySelector('#wbenddate1').value= wben;
	

}	
	
//리스트 불러오기 

//function reloadList(widget){
//    
//	var mid = document.querySelector('#mid').value; 
//	var wno = document.querySelector('#wno').value;
//	
//	$('.wbinput').remove();
//	$('.wbinputMy').remove();
//	
//	//프로그램 전체 일정 
//	$.ajax({
//		url:'wbAllList',
//		method:'post',
//		data:{
//			"wno":wno},
//		success: function(data) {
//			
//			data.forEach(function(item){
//				var mid = item.mid;
//				var wbtodono = item.wbtodono; 
//				var wbcontent = item.wbcontent; 
//				var wbtitle = item.wbtitle; 
//				
//				 $('<input class="wbinput" data-wbtodono="'+wbtodono+'"  type="text" readonly>').val(mid+':'+wbtitle).appendTo('#wtasklistAll');
//
//			});
//			
//			 
//			 $('.wbinput').on('click',function(){
//				 
//				 var index = $(".wbinput").index(this);
//				 var selectno =$(".wbinput:eq(" + index + ")").data('wbtodono');
//				
//				 console.log(selectno);
//				 selectbtn(selectno);
//			 }); 
//
//			
//
//			//append와 appendTo 붙이는 방식 다르다 
//			//$('.wtasklist').append('<input type="text" value="쨘">');
//           //$('<input type="text" value="어라" readonly>').appendTo('.wtasklist');
//        
//
//				
//		},error: function(data) {
//			alert("통신실패");
//		}
//	
//	});
//	
//	//나의 일정 
//	$.ajax({
//		url:'wbMyList',
//		method:'post',
//		data:{
//			"wno":wno
//		},
//		success:function(data){
//			
//			data.forEach(function(item){
//				var mid = item.mid;
//				var wbtodono = item.wbtodono; 
//				var wbcontent = item.wbcontent; 
//				var wbtitle = item.wbtitle; 
//				
//				 $('<input class="wbinputMy" data-wbtodono="'+wbtodono+'"  type="text" readonly>').val(mid+':'+wbtitle).appendTo('#wtasklistMy');
//
//			});
//			
//			 
//			 $('.wbinputMy').on('click',function(){
//				 
//				 var index = $(".wbinputMy").index(this);
//				 var selectno =$(".wbinputMy:eq(" + index + ")").data('wbtodono');
//				
//				 selectbtn(selectno);
//			 }); 
//			
//			
//		},error:function(data){
//			alert("통신실패");
//			wbnewtask();
//		}
//		
//	});
//	
//}
	
	
	
	