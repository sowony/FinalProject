//
//window.onload = widget;
//
//
//function widget(){
//	const body  = document.querySelector('body');
//	
//	addObject(body, 'button', 'wno', true, (o)=>{
//		o.innerHTML = 'WNO';
//		o.addEventListener('click', (o)=>{
//			start();
//		});
//	});
//}
//
//function start(){
//	
//	const body  = document.querySelector('body');
//	
//	//코드작성툴 생성
//	addObject(body, 'textarea', 'editorArea', true, (o)=>{
////		o.innerHTML = `<!DOCTYPE html>
////<html>
////<head>
////<title>Insert title here</title>
////</head>
////<body>
////<h1>hello</h1>
////
////</body>
////</html>`;
//		
//		var val = document.querySelector('.editorArea');
//		
//		var editor = CodeMirror.fromTextArea(val, {
//			mode: "xml",
//			theme: "panda-syntax",
//			lineNumbers: true,
//			autoCloseTags: true
//		});
//		editor.setSize("500", "1000");
//		
//		//버튼 생성
//		addObject(body, 'button', 'run', true, (o)=>{
//			o.innerHTML = 'RUN';
//			o.addEventListener('click', ()=>{
////			$.ajax({
////				url: 'run',
////				method: 'post',
////				success: function(){
////					
////				}
////			});
//				console.log(val.value);
//			});
//		});
//	});
//	
//	//결과창 생성
//	addObject(body, 'div', 'result', true, (o)=>{
//		o.innerHTML = `<!DOCTYPE html>
//<html>
//<body>
//  <iframe src="editor.jsp"></iframe>
//</body>
//</html>`
//	});
//}

function update()
{
	var idoc = document.getElementById('iframe').contentWindow.document;

	idoc.open();
	idoc.write(editor.getValue());
	idoc.close();
}

function setupEditor()
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

</html>`,1); //1 = moves cursor to end

  editor.getSession().on('change', function() {
    update();
  });

  editor.focus();
  
  
  editor.setOptions({
    fontSize: "16pt",
    showLineNumbers: false,
    showGutter: false,
    vScrollBarAlwaysVisible:true,
    enableBasicAutocompletion: false, enableLiveAutocompletion: false
  });

  editor.setShowPrintMargin(false);
  editor.setBehavioursEnabled(false);
  
  console.log('setupeditor');
}

setupEditor();
update();