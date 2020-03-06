<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="./resources/css/defaultstyle.css" type="text/css">
<script type="text/javascript" src="./resources/js/xhr.js"></script>
<script type="text/javascript" src="./resources/js/loginform.js"></script>
</head>
<body>
	<section>
		<article id="content">
			<div id="con">
				<div id="con_head">환영합니다.</div>
				<form id="loginForm">
				<div id="con_body">
					<input name="mid" type="text" />
					<input name="mpw" type="password" />
				</div>
				<div id="con_foot">
					<input type="submit" value="로그인" />
					<input type="button" value="카카오 로그인">
					<input type="button" value="구글 로그인">
					<input type="button" value="회원가입" />
				</div>
				</form>
			</div>
		</article>
	</section>
</body>
</html>