<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<!--외부 라이브러리 -->
<script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="/dashboard/resources/js/sockjs.min.js"></script>
<script type="text/javascript" src="/dashboard/resources/js/stomp.min.js"></script>
<!-- 달력피커 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/flatpickr.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/flatpickr.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.2.3/themes/dark.css">

<!-- 제이쿼리 드래그앤 드롭 -->
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

<!-- 써머노트 lite ver -->
<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote-lite.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote-lite.min.js"></script>


<!-- 커스텀 유틸  -->
<link rel="stylesheet" href="/dashboard/resources/css/defaultstyle.css" type="text/css"/>
<script type="text/javascript" src="/dashboard/resources/js/xhr.js"></script>
<script type="text/javascript" src="/dashboard/resources/js/util.js"></script>

<!-- editor -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.3/ace.js"></script>

<!-- 페이지 js, css -->
<link rel="stylesheet" href="/dashboard/resources/css/header.css" type="text/css">
<link rel="stylesheet" href="/dashboard/resources/css/board.css" type="text/css">
<link rel="stylesheet" href="/dashboard/resources/css/crawling.css" type="text/css">
<link rel="stylesheet" href="/dashboard/resources/css/wmemoAndwchat.css" type="text/css">

<script type="text/javascript" src="/dashboard/resources/js/board.js"></script>

<script type="text/javascript" src="/dashboard/resources/js/crawling.js"></script>
<script type="text/javascript" src="/dashboard/resources/js/wmemo.js"></script>
<script type="text/javascript" src="/dashboard/resources/js/wchat.js"></script>


<!-- 디폴트가 씹혀버림 -->
<link rel="stylesheet" href="./resources/css/wbcal.css" type="text/css" />
<link rel="stylesheet" href="./resources/css/wboard.css" type="text/css" />
<link rel="stylesheet" href="./resources/css/weditor.css" type="text/css">

<script type="text/javascript" src="./resources/js/wboard.js"></script>
<script type="text/javascript" src="./resources/js/wbcal.js"></script>

<script type="text/javascript" src="/dashboard/resources/js/widgetaddandmodify.js"></script>
<script type="text/javascript" src="/dashboard/resources/js/widgetload.js"></script>
<script type="text/javascript" src="/dashboard/resources/js/weditor.js" charset="utf-8"></script>


</head>
<body>

	<jsp:include page="header.jsp"></jsp:include>
	<script type="text/javascript" src="/dashboard/resources/js/header.js"></script>
	
	<section>
		<article id="content">
		</article>
	</section>
			
</body>
</html>