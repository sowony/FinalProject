<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<style>

body {
	margin: 0;
	padding :0;
}



#room {
    position: fixed;
    top: 0;
    left: 0;
    width: max-content;
    min-width : 50px;
    height: max-content;
    min-height:50px;
    background-color: #eeeeee;
    border: 1px solid;
    padding: 20px;
    margin: 20px;
    display: inline-block;
}

#headline {

	text-align: center;
	font-size: 15px;
	font-weight: bold;
	border : 0.5px solid;

}

.room {
	float: left;
	width: 300px;
	height: 400px;
	padding : 10px;
	margin:  10px;
	background-color: #fff;
	border : 1px solid;
}

.click {
	box-shadow: 0px 0px 5px #4ecdffb8;
}

li {
	float:left;
}

ul {
	display: inline-block;
	padding : 5px;
	margin : 5px;
	list-style: none;
}

</style>
    <script src="${pageContext.request.contextPath}/resources/webjars/sockjs-client/sockjs.min.js"></script>
    <script src="${pageContext.request.contextPath}/resources/webjars/stomp-websocket/stomp.min.js"></script>
<script type="text/javascript">

function roomEnter(roomId){

	var writer = prompt('아이디 입력');
	var div = document.getElementById('room');
	var roomId = roomId;
	
	if(!document.getElementById(roomId)){
		var divRoom = document.createElement('div');
		divRoom.setAttribute('id',roomId);
		divRoom.setAttribute('class','room');
		
		var button = document.createElement('button');
		button.setAttribute('class','send');
		button.innerHTML = '전송';
		
		var inputText = document.createElement('input');
		inputText.setAttribute('class','sendMessage');
		
		var textBox = document.createElement('div');
		textBox.setAttribute('class','contentbox');
		
		var headline = document.createElement('p');
		headline.setAttribute('class','headline');
		headline.innerHTML = roomId;
		
		divRoom.appendChild(headline);
		divRoom.appendChild(textBox);
		divRoom.appendChild(inputText);
		divRoom.appendChild(button);
		
		div.appendChild(divRoom);
	}
	
	var roomDiv = document.getElementById(roomId);
	
	roomDiv.addEventListener('click',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();
	});
	// var xhr = new XMLHttpRequest();
	
	
	//xhr.onreadystatechange = function(){
		
	//	if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200){
			
		
			var sock = new SockJS('/socket/chatroom');
			var client = Stomp.over(sock);
			
			client.connect({}, function(){
				client.send('/pub/chat/join', {}, JSON.stringify({'chatRoomId': roomId, 'writer': writer}) );
				client.subscribe('/sub/chat/room/'+roomId, function (chat) {

					var content = JSON.parse(chat.body);
					
					var text = document.createElement('p');
					text.innerHTML = '(' + content.writer + ') >> '+ content.message;
	            	
					var contentBox = roomDiv.getElementsByClassName('contentbox')[0];
					console.log(contentBox);
					contentBox.appendChild(text);
				});
			});
			
		//}
		
	//};
	
	// xhr.open('GET','chat/'+roomId);
	// xhr.send();
	
	var roomButton = roomDiv.getElementsByClassName('send')[0];
	function messageEventHandler(e){
		
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();
		
		var message = roomDiv.getElementsByClassName('sendMessage')[0];
		client.send('/pub/chat/message/'+roomId, {}, JSON.stringify({'chatRoomId': roomId, 'writer': writer, 'message' : message.value}));
		message.value = '';
	}
	button.onclick = messageEventHandler;
}

window.onload = function(){
	
	var div = document.getElementById('room');
	
	var locSock = new SockJS('/socket/chatroom');
	var locClient = Stomp.over(locSock);
	
	locClient.connect({}, function(){
		
		locClient.subscribe('/sub/location', function (loc) {
			
			var content = JSON.parse(loc.body);
			
			console.log(content);
			
			var left = content.left;
			var top = content.top;
			
			div.style.left = left + "px";
			div.style.top = top + "px";
			
		});
		
	});
	 
	function onRemoveFun(e){
		
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();
		
    	if(div.classList.contains('click')) div.classList.remove('click');
    	document.onmousemove = '';
    	div.onmouseup = '';
        div.onmouseout = '';
        div.addEventListener('click',onclickFun);
        div.removeEventListener('click',onRemoveFun);
    } 
	 
	function onclickFun(e){
		
		e.preventDefault();
		e.stopImmediatePropagation();
		e.stopPropagation();
		
		var topStr = div.style.top; 
		var leftStr = div.style.left;
		
		var y = topStr.substring(0, topStr.length-2);
		var x = leftStr.substring(0, leftStr.length-2);
		
        var divX = e.clientX - ((x)? x : 0);
        var divY = e.clientY - ((y)? y : 0);
        
        div.classList.toggle('click');
        
        document.onmousemove = function(d){
        		
                var domX = d.clientX;
                var domY = d.clientY;
        
                var top = domY - divY;
                var left = domX - divX;
                
                div.style.top = top + "px";
                div.style.left = left + "px";
                
                locClient.send('/pub/box/location', {}, JSON.stringify({'left' : left , 'top' : top}));
                
        };
        
        div.removeEventListener('click',onclickFun);
        
        div.addEventListener('click',onRemoveFun);
        
        div.onmouseout = function(e){
        	
        	if(div.classList.contains('click')) div.classList.remove('click');
        	document.onmousemove = '';
        	div.onmouseup = '';
            div.onmouseout = '';
            div.addEventListener('click',onclickFun);
            
        };
        
        
	};
	 
	
	div.addEventListener('click',onclickFun);
	
/* 	div.addEventListener('mousedown', function(e){
		var x = e.clientX;
		var y = e.clientY;
		locClient.send('/pub/box/location', {}, JSON.stringify({left : x , top : y}));
		return false;
	}); */
	
	var rooms = document.getElementsByClassName('enter');
	var roomPlusBtn = document.getElementById('roomplus');
	
	roomPlusBtn.addEventListener('click', function(){
		
		var id = prompt('방번호 입력');
		
		if(!id){
			alert('입력하시오.');
			return false;
		}
		
		var ul = document.getElementById('btnlist');
		
		var li = document.createElement('li');
		
		var buttonPlus = document.createElement('button');
		buttonPlus.setAttribute('class', 'enter');
		buttonPlus.innerHTML = id;
		
		li.appendChild(buttonPlus);
		ul.appendChild(li);
		
		
	});
	
	for(var i = 0 ; i < rooms.length ; i++){
		rooms[i].addEventListener('click',function(){
			var roomId = this.innerHTML;
			//alert(roomId);
			roomEnter(roomId);
		});
	} 
};

</script>
</head>
<body>

<ul id="btnlist">
	<li><button class="enter">1</button></li>
	<li><button class="enter">2</button></li>
</ul>

<button id="roomplus">방추가</button>

<div id="room"></div>

</body>
</html>