	function dragEnter(ev) {
		ev.preventDefault();
	}

	function drag(ev) {
		console.dir(ev.target);
		ev.target.id = 'drag';
		ev.dataTransfer.setData("text", ev.target.id);
	}
//target : 태그 오브젝트 에대애서 반영한다. id의 프로퍼티를 정의해주고 (가상의id를 만들어줌)
//dataTransfer : "text" 라는 오브젝트에 넣어서 drop 할때의 값에 적용해 준다 	
	
	function drop(ev) {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		var dragObj = document.querySelector('#' + data);
		ev.target.appendChild(dragObj);
		dragObj.id = '';
	}
//dragObj.id = ''; 가상의 아이디를 삭제 ->매번 중복된 값을 새로 id를 만들어 주어야 하기때문 	









/*
window.onload = ()=>{
	
	const body = document.querySelector('body');
	
	//편하게 오브젝트 만들기 
	//addObject(parentNode, tagName, className, defaultLocation, callback)
	const section = addObject(body,'section','section',true,(o)=>{
		
	});
	
	const bTitle = addObject(null,'input','bTitle',false,(o)=>{
		o.type='text';
		o.value ='전체 할일';
		infoBar(o,'프로젝트의 전원의 할일');
	});
	/*
	const bList = addObject(null,'table','bList',false,(o)=>{
		
		o.innerHTML =  `<tr><td>여기안에 정보를 넣으려면 어떻게 해야할까 </td></tr> `;
		
/*		xhr => jsonObj
		
		{
			list : [
				{
				 id : 1
				 title : 야호
				},{
					 id : 1
					 title : 야호
					},{
						 id : 1
						 title : 야호
						}
				
			]
			
		}
		
		let content;
		
		for(let item of jsonObj.list){
			content += `<tr><td>${item.id}</td><td>${item.title}</td></tr>`
		}
		o.innerHTML = content 
		
	});
	
	//const allBox = ('모든 할일',);
	
	
};

*/