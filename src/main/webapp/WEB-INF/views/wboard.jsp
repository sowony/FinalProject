<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<script type="text/javascript"
	src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

<script type="text/javascript" src="./resources/js/wboard.js"></script>
<link rel="stylesheet" href="./resources/css/wboard.css" type="text/css" />

<!-- 커스텀 유틸  -->
<link rel="stylesheet" href="./resources/css/defaultstyle.css"
	type="text/css" />
<script type="text/javascript" src="./resources/js/util.js"></script>
<script type="text/javascript" src="./resources/js/xhr.js"></script>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
</head>
<body>


	<div class="wboardcon">
		<h1>프로젝트 일정</h1>

		<div class="wtasklist">
			<p>프로그램 전체 일정</p>

			<c:choose>
				<c:when test="${empty list }">
				지정된 업무가 없습니다
			</c:when>

				<c:otherwise>
					<c:forEach items="${list }" var="wlist">
						<input type="text" value="${wlist.wbtitle }" readonly draggable="false" >
					</c:forEach>
				</c:otherwise>
			</c:choose>



		</div>

		<div class="wtasklist" ondrop="drop(event)" ondragover="dragEnter(event)">
			<p>나의 일정</p>

			<c:choose>
				<c:when test="${empty list }">
				지정된 업무가 없습니다
			</c:when>

				<c:otherwise>
					<c:forEach items="${list }" var="wlist">
						<input type="text" value="${wlist.wbtitle }" 
						readonly draggable="true" ondragstart="drag(event)"
						 onclick="selectbtn(${wlist.wbtodono})">
					</c:forEach>
				</c:otherwise>
			</c:choose>

		</div>


		<div class="wtasklist" ondrop="drop(event)" ondragover="dragEnter(event)">
			<p>진행중 일정</p>
		</div>


		<div class="wtasklist" ondrop="drop(event)" ondragover="dragEnter(event)">
			<p>완료 일정</p>

		</div>
		
		<input type="button" value="연습버튼" onclick="selectbtn();" >
		
	</div>


</body>
</html>