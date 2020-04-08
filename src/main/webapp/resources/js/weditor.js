


function editorStart(widget){
	
	const widgetContent = widget.querySelector('.widgetContent');
	
	//코드 작성 div
	const container = addObject(widgetContent, 'div', 'container', true, (o)=>{
		o.innerHTML = `<div id='editor'></div>
		<iframe id='iframe' frameBorder="1"></iframe>`
	});
	
	const runBtn = addObject(null, 'button', 'grayBtn', false, (o)=>{
		o.id = 'run';
		o.innerHTML = '코드 실행';
	});
	
	widgetContent.insertBefore(runBtn,container);
	
	editorSetup(widget);

}


function editorUpdate(widget){
	
	var idoc = widget.querySelector('#iframe').contentWindow.document;

	idoc.open();
	idoc.write(widget.editor.getValue());
	idoc.close();

}

function editorSetup(widget){
	
	widget.editor = ace.edit("editor", {
		mode: "ace/mode/javascript",
		selectionStyle: "text"
	});
	
	widget.editor.setTheme("ace/theme/monokai");
	widget.editor.getSession().setMode("ace/mode/html");
	widget.editor.setValue(`
<!DOCTYPE html>
<html>
<head>
</head>

<body>
</body>

</html>`,1); 


	widget.querySelector('#run').addEventListener('click',(o)=>{
		editorUpdate(widget);
	});

	widget.editor.focus();
	widget.editor.setOptions({
		fontSize: "10pt",
		showLineNumbers: true,
		showGutter: true,
		vScrollBarAlwaysVisible:true,
		enableBasicAutocompletion: true, 
		enableLiveAutocompletion: true
	});

	widget.editor.setShowPrintMargin(false);
	widget.editor.setBehavioursEnabled(false);
  
}
