/**
 * http://usejsdoc.org/
 */


let userInfo;

function selectDashBoardLoad(){
	
	xhrLoad('get', 'board/select' + (arguments[0]? '/'+arguments[0] : '') , null, (res)=>{
		
		const jsonObj = JSON.parse(res);
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
		
		const widgetArea = dashboard.querySelector('.widgetArea');
		
		widgetArea.innerHTML = jsonObj.dtitle;
		
	});
	
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
		<div class = "widgetArea"></div>
		`;
	});
	
	openDashBoardList();
	selectDashBoardLoad();
};