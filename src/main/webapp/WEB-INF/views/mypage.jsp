<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="./resources/css/defaultstyle.css" type="text/css">
<link rel="stylesheet" href="./resources/css/mypage.css" type="text/css">
<link rel="stylesheet" href="./resources/css/Header.css" type="text/css">
<script type="text/javascript" src="./resources/js/xhr.js"></script>
<script type="text/javascript" src="./resources/js/util.js"></script>
<script type="text/javascript" src="./resources/js/mypage.js"></script>
</head>
<body>
	<header>
		<div id="headbar">
			<ul>
				<li id="mid" data-mid="${user.mid}">${user.mid}</li>
				<li>MY INFO</li>
				<li>MY INFO MODIFY</li>
				<li>로그아웃</li>
			</ul>
		</div>
	</header>
	<section>
		<article id="content">
			<div id="dashboard">
				<div id="owner_dash">
				</div>
				<div id="belong_dash">
				
				</div>
			</div>
		</article>
	</section>
</body>
</html>