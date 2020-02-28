/**
 * http://usejsdoc.org/
 */


function infoBar(obj, text){
	
	obj.addEventListener('mousemove',(e)=>{
		
		const x = e.pageX+10;
		const y = e.pageY+10;
		const infoBox = document.getElementsByClassName('infoBox')[0];
		if(!infoBox){
			const contentBox = `
				<div class='infoBox' style="top:${y}px; left:${x}px;">${text}</div>
			`
			const body = document.getElementsByTagName('body')[0];
			const div = document.createElement('div');
			div.setAttribute('id','utilDiv');
			div.innerHTML = contentBox;
			body.appendChild(div);
		} else {
			infoBox.style.top = y + 'px';
			infoBox.style.left = x + 'px';
		}
	});
	
	obj.addEventListener('mouseout',(e)=>{
		
		const div = document.getElementById('utilDiv');
		div.remove();
	
	});
}