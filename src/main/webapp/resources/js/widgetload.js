/**
 * http://usejsdoc.org/
 */

let widgets = []

function widgetload(){
	
	
	// 대시보드 초기화
	const widgetArea = document.querySelector('#widgetArea');
	
	let oldWidgets = widgetArea.querySelectorAll('.widget');
	
	oldWidgets.forEach(w=>{
		motionOnOff(w, 1, false, { onOff : 'off', opactiy : { num0 : 0 } }, null, (o)=>{
			o.remove();
		});
	});
	
	// 로드
	xhrLoad('get','widget/list', null, (res)=>{
		
		const widgetSettings = JSON.parse(res);
		
		for(let widgetSetting of widgetSettings){
			
			
			const widget = widgetFun(widgetSetting);
			widget['info'] = widgetSetting;
			
			motionOnOff(widget, 1, false, { onOff : 'on', opactiy : { num0 : 0, num1: 1 } }, {
				after : (o)=>{
					widgetArea.appendChild(o);
				}
			}, (o)=>{
				o.style.transitionDuration = '0s';
			});
			
			widget.mouseEventFun();
			widget.scaleEventFun();
			
			widgets.push(widget);
		}
	});
	
	
}