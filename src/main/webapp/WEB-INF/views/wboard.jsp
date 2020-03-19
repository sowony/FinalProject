<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.4.1.min.js"></script>


<script type="text/javascript">
/*	function dragEnter(ev) {
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
*/
</script>

<script type="text/javascript" src="./resources/js/wboard.js"></script>
<link rel="stylesheet" href="./resources/css/wboard.css" type="text/css" />
<!-- 커스텀 유틸  -->
<link rel="stylesheet" href="./resources/css/defaultstyle.css" type="text/css" />
<script type="text/javascript" src="./resources/js/util.js"></script>
<script type="text/javascript" src="./resources/js/xhr.js"></script>
<!--  <script type="text/javascript" src="./resources/js/wboard.js"></script>-->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
</head>
<body>


	<div class="wboardcon">
		<h1>프로젝트 일정</h1>

		<div ondrop="drop(event)" ondragover="dragEnter(event)">
			<p>프로그램 전체 일정</p>

			<c:choose>
				<c:when test="${empty list }">
				지정된 업무가 없습니다
			</c:when>

				<c:otherwise>
					<c:forEach items="${list }" var="wlist">
						<input type="text" value="${wlist.wbtitle }" readonly
							draggable="true" ondragstart="drag(event)">
					</c:forEach>
				</c:otherwise>
			</c:choose>



		</div>

		<div ondrop="drop(event)" ondragover="dragEnter(event)">
			<p>나의 일정</p>
		</div>


		<div ondrop="drop(event)" ondragover="dragEnter(event)">
			<p>진행중 일정</p>
		</div>


		<div ondrop="drop(event)" ondragover="dragEnter(event)">
			<p>완료 일정</p>

		</div>
	</div>




</body>
</html>