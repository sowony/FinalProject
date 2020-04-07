
window.onload = widget;


const body  = document.querySelector('body');
function widget(){
	
	addObject(body, 'button', 'wno', true, (o)=>{
		o.innerHTML = 'WNO';
		o.addEventListener('click', (o)=>{
			start();
		});
	});
}



function start(){
	
	//코드 작성 div
	const container = addObject(body, 'div', 'container', true, (o)=>{
		
//		const div = document.querySelector('.container');
//		addObject(div, 'div', 'editor', true, null);
//		addObject(div, 'iframe', 'iframe', true, null);
		o.innerHTML = `<div id='editor'></div>
		<button id='run'>RUN</button>
		<iframe id='iframe' frameBorder="1"></iframe>`
		
	});
	
	editorSetup();
}


function update()
{
	var idoc = document.getElementById('iframe').contentWindow.document;

	idoc.open();
	idoc.write(editor.getValue());
	idoc.close();
}

function editorSetup()
{
  window.editor = ace.edit("editor", {
	  mode: "ace/mode/javascript",
	  selectionStyle: "text"
  });
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/html");
  editor.setValue(`<!DOCTYPE html>
<html>
<head>
</head>

<body>
</body>

</html>`,1); 


	document.getElementById('run').addEventListener('click',(o)=>{
//		let code = editor.getValue();
//		
//		console.log(code);
//		//let num = 1;//wno
//		let editorCode = {code};
//
//		$.ajax({
//			url: 'insertEditor',
//			accept: 'application/json',
//			method: 'post',
//			contentType: 'application/json; charset=utf-8;',
//			async: false,
//			data: JSON.stringify(editorCode),
//			success: function(res){
//				if(res){
//					boxFun(' success', true, null, false, 'updateSuc', (o)=>{
//						update();
//					},true);
//				} else{
//					boxFun(' fail', true, null, false, 'updateFail', null, true);
//				}
//			},
//			error: function(){
//				boxFun(' error', true, null, false, 'updateError', null, true);
//			}
//		
//		});
		update();
	});

  editor.focus();
  editor.setOptions({
    fontSize: "16pt",
    showLineNumbers: true,
    showGutter: true,
    vScrollBarAlwaysVisible:true,
    enableBasicAutocompletion: true, 
    enableLiveAutocompletion: true
  });

  editor.setShowPrintMargin(false);
  editor.setBehavioursEnabled(false);
  
}

//setupEditor();
//update();