<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- 커스텀 유틸  -->
<link rel="stylesheet" href="./resources/css/defaultstyle.css" type="text/css"/>
<script type="text/javascript" src="./resources/js/util.js"></script>
<script type="text/javascript" src="./resources/js/xhr.js"></script>
<!--  <script type="text/javascript" src="./resources/js/wboard.js"></script>-->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
</head>
<body>
	
	<table border=1>
	
		<tr>
			<th>전체 할 일</th>
			<th>나의 할 일</th>
			<th>나의 진행 중  목록</th>
			<th>완성 목록</th>
		</tr>
		<tr>
			<c:choose>
				<c:when test="${empty list }">
					<tr><td colspan="4">-----작성 글이 없습니다-----</td></tr>
				</c:when>
				<c:otherwise>
					<c:forEach items="${list }" var ="boardlist">
						<tr>
						<td>${boardlist.wbtitle }</td>
						<td>${boardlist.wbtitle}</td>
						
						<c:if test="${boardlist.wbtodo eq 'N' }">
						<td>${boardlist.wbtodo}</td>
						</c:if>
						
						<c:if test="${boardlist.wbtodo eq 'Y' }">
						<td>${boardlist.wbtitle}</td>
						</c:if>
						</tr>
						
						
					</c:forEach>
				</c:otherwise>				
			</c:choose>
			
<!-- var ="boardlist"새로운 변수 선언 //test안에 있는 것은 컨트롤러에서 받아온 것, 
 스콥프: 페이지 안에서만 효력이 발생한다 ,  -->
		</tr>
		
		
		
	</table>
	
</body>
</html>