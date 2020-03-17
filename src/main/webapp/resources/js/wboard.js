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
		
	});*/
	
	//const allBox = ('모든 할일',);
	
	
};