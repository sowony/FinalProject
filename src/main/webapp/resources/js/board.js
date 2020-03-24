/**
 * http://usejsdoc.org/
 */


let userInfo;
let dashboardInfo = {};

function widgetAdd(){
	
	
	//1p
	const widgetAddBox1 = boxFun(null, false, null, true, 'widgetAddBox', (o)=>{
		
		
		const widgetSetting = addObject(o, 'div', 'widgetSetting', true, (o)=>{
			o.style.textAlign = 'left';
			o.innerHTML = `
				<p style="display:block;">위젯 만들기</p>
				<fieldset>
					<div>
						<p>위젯 이름</p>
						<input type="text" name="wtitle" value="테스트 중입니다."/>
					</div>
					<div>
						<p>위젯 종류</p>
						<select name="wcategory">
							<option value="MENO">메모</option>
						</select>
					</div>
					<div>
						<p>위젯 가로</p>
						<input type="number" name="wwidth" value="180" placeholder="가로"/>
					</div>
					<div>
						<p>위젯 세로</p>
						<input type="number" name="wheight" value="220" placeholder="세로"/>
					</div>
					<div>
						<p>위젯 Z축</p>
						<input type="number" name="wzindex" value="1"/>
					</div>
					<div>
						<p>위젯 제목 배경색</p>
					</div>
					<div>
						<p>위젯 본문 배경색</p>
					</div>
				</fieldset>
				<fieldset style="height: 339.333px;">
					<div style="height: 100%;">
						<p style="display:block;">위젯 미리보기</p>
						<div class="widgetPreview">
							<div class="line1"></div>
							<div class="line2"></div>
						</div>
					</div>
				</fieldset>
			`;
			
			const colorDiv1 = o.querySelector('.widgetSetting > fieldset > div:nth-last-child(2)');
			const colorTitle = colorPickerBtn(colorDiv1, false, (color,btn)=>{
				btn.style.backgroundColor = color;
				const widgetHeader = widgetSetting.querySelector('.widget .widgetHeader');
				widgetHeader.style.backgroundColor = color;
				widgetHeader.style.color = fontColorCheck(color);
			});
			
			colorTitle.style.width = '25px';
			colorTitle.style.height = '25px';
			colorTitle.style.position = 'relative';
			colorTitle.style.top = '7px';
			
			const colorDiv2 = o.querySelector('.widgetSetting > fieldset > div:nth-last-child(1)');
			const colorContent = colorPickerBtn(colorDiv2, false, (color,btn)=>{
				btn.style.backgroundColor = color;
				const widget = widgetSetting.querySelector('.widget');
				widget.style.backgroundColor = color;
			});
			
			colorContent.style.width = '25px';
			colorContent.style.height = '25px';
			colorContent.style.position = 'relative';
			colorContent.style.top = '7px';
			
			
		});
		
		const wtitle = widgetSetting.querySelector('input[name=wtitle]');
		const wcategory = widgetSetting.querySelector('select[name=wcategory]');
		const wwidth = widgetSetting.querySelector('input[name=wwidth]');
		const wheight = widgetSetting.querySelector('input[name=wheight]');
		const wzindex = widgetSetting.querySelector('input[name=wzindex]');
		const wtitlecolor = widgetSetting.querySelectorAll('.colorPickerBtn')[0];
		const wcontentcolor = widgetSetting.querySelectorAll('.colorPickerBtn')[1];
		
		const widget = widgetFun({
			'wtitle' : wtitle.value,
			'wcategory' : wcategory.value,
			'wwidth' : wwidth.value,
			'wheight' : wheight.value,
			'wzindex' : wzindex.value,
			'wtitlecolor' : wtitlecolor.style.backgroundColor,
			'wcontentcolor' : wcontentcolor.style.backgroundColor,
			'wposition' : 'absolute' 
		});

		
		const widgetPreview = widgetSetting.querySelector('.widgetPreview');
		widgetPreview.insertBefore(widget,widgetPreview.childNodes[0]);
		
		wtitle.addEventListener('keyup',(e)=>{
			e.preventDefault();
			e.stopPropagation();
			const title = widget.querySelector('.widgetHeader p span:nth-child(2)');
			title.innerHTML = e.target.value;
		});
		
		wheight.addEventListener('change', (e)=>{
			
			e.preventDefault();
			e.stopPropagation();
			
			widget.style.height = e.target.value + 'px';
			middlePositionFun(widget);
			
		});
		
		wwidth.addEventListener('change', (e)=>{
			
			e.preventDefault();
			e.stopPropagation();
			
			widget.style.width = e.target.value + 'px';
			middlePositionFun(widget);
			
		});
		
		wzindex.addEventListener('change', (e)=>{
			
			e.preventDefault();
			e.stopPropagation();
			
			widget.style.zIndex = e.target.value;
			middlePositionFun(widget);
			
		});
		
	});
	
}

function selectDashBoardLoad(){
	
	dashboardInfo = {};
	
	xhrLoad('get', 'board/select' + (arguments[0]? '/'+arguments[0] : '') , null, (res)=>{
		
		const jsonObj = JSON.parse(res);
		
		dashboardInfo.dashboard = jsonObj;
		
		const dashboard = document.querySelector('.dashboard');
		dashboard.dataset.dno = jsonObj.dno;
		
		const dashOpenItem = document.querySelectorAll('._dashItem');
		
		const selectDash = document.querySelector('.selectDash');
		
		
		dashOpenItem.forEach(item=>{
			
			
			if(Number(item.dataset.dno) === jsonObj.dno){
				
				if(selectDash) selectDash.classList.remove('selectDash');
				item.classList.add('selectDash');
			}
			
		});
		
		xhrLoad('get', 'board/rules', null, (res)=>{
			
			dashboardInfo.dashgrade = JSON.parse(res);
			
			xhrLoad('get', 'board/members', null, (res)=>{
				
				dashboardInfo.dashmember = JSON.parse(res);
				
			});
			
		}, false);
		
		const widgetArea = dashboard.querySelector('.widgetArea');
		
		console.log(dashboardInfo);
		
	},false);
	
}

function openDashBoardList(){
	xhrLoad('get', 'board/selectList', null, (res)=>{
		const jsonObj = JSON.parse(res);
		
		
		const _ul = document.querySelector('._ul');
		const nickName_li = document.querySelector('.nickName_li');
		
		const _dashLi = addObject(null, 'li', '_dashLi', false, (o)=>{
			_ul.insertBefore(o, nickName_li);
			
			const _dashUl = addObject(o, 'ul', '_dashUl', true, (o)=>{
				
				jsonObj.forEach(item => {
					
					addObject(o, 'li', '_dashItem', true, (o)=>{
						
						o.dataset.dno = item.dno;
						o.style.float.left;
						o.innerHTML = `${item.dtitle}<a href="#" onclick = "return false;"><span class="dashboardCloseBtn">X</span></a>`;
						
						const dashboardCloseBtn = o.querySelector('.dashboardCloseBtn');
						
						dashboardCloseBtn.addEventListener('click', (e)=>{
							
							e.preventDefault();
							e.stopPropagation();
							
							const dashItem = e.target.parentNode.parentNode;
							const dno = dashItem.dataset.dno;
							
							xhrLoad('get', 'board/dashboardClose', { dno }, (res)=>{
								
								const dno = Number(res)
								
								if(dno > 0){
									const dashboard = document.querySelector('.dashboard');
									
									if(dashboard.dataset.dno !== dno){
										selectDashBoardLoad(dno);
									}
									
									dashItem.remove();
									
								} else {
									location.href = '/dashboard';
								}
								
							});
							
						});
						
						o.addEventListener('click', (e)=>{
							
							e.preventDefault();
							e.stopPropagation();
							
							selectDashBoardLoad(e.target.dataset.dno);
							
						});
					});
					
				});
				
				
			});
			
		});
		
	});
}

window.onload = ()=>{
	
	userInfo = headerFun();
	
	const con = document.querySelector('#content');
	
	const dashboard = addObject(con, 'div', 'dashboard', true, (o)=>{
		o.innerHTML = `
		<div style = "display:block; position:relative; top :0; left:0; width:100%; height:34px;"></div>
		<div id = "widgetArea"></div>
		`;
	});
	
	openDashBoardList();
	selectDashBoardLoad();
	
	const widgetArea = document.querySelector('#widgetArea');
	
	contextMenuFun(widgetArea, {
		'new' : {
			'새 위젯 만들기' : ()=>{
				widgetAdd();
			}
		},
		'widget' : {
			'위젯 수정' : ()=>{},
			'위젯 삭제' : ()=>{}
		},
		'dashboardInfo' : {
			'대시보드 자세히 보기' : ()=>{}
		},
		'letter' : {
			'쪽지함 보기' : ()=>{},
			'쪽지 작성' : ()=>{}
		},
		'alram' : {
			'말람함 보기' : ()=>{}
		},
		'myInfo' : {
			'내 정보 보기' : ()=>{},
			'로그아웃' : ()=>{logout();}
		}
		
	});
};