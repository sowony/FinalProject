/**
 * http://usejsdoc.org/
 */


// 글꼴 | 사이즈 | 굵기 | 이미지 업로드
function wmemoBox(widget){
	
	const widgetContent = widget.querySelector('.widgetContent');
	
	const wmemoDiv = addObject(widgetContent, 'div', 'wmemoDiv', true, (o)=>{
		o.style.fontWeight = 'normal';
		
		o.innerHTML = `
			
			<div class="wmSetting">
				<div class="wmFont">

				</div>
			</div>
		
		`;
		
		
	});
	
};