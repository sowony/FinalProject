<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<!-- 외부 자바스크립트 라이브러리 -->
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<!-- 커스텀 유틸  -->
<link rel="stylesheet" href="./resources/css/defaultstyle.css" type="text/css"/>
<script type="text/javascript" src="./resources/js/util.js"></script>
<script type="text/javascript" src="./resources/js/xhr.js"></script>

<!-- 페이지 js, css -->
<link rel="stylesheet" href="./resources/css/header.css" type="text/css">
<link rel="stylesheet" href="./resources/css/mypage.css" type="text/css">
<script type="text/javascript" src="./resources/js/mypage.js"></script>

</head>
<body>

	<jsp:include page="header.jsp"></jsp:include>
	<script type="text/javascript" src="./resources/js/header.js"></script>
	
	
	<section>
		<article id="content">
		</article>
	</section>
	
	<jsp:include page="footer.jsp"></jsp:include>
</body>
</html>