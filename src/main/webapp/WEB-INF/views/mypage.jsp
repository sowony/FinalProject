<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="./resources/css/defaultstyle.css" type="text/css">
<link rel="stylesheet" href="./resources/css/mypage.css" type="text/css">
<script type="text/javascript" src="./resources/js/mypage.js"></script>
</head>
<body>
	<header>
		<div id="headbar">
			<ul>
				<li id="mid" data-mid="${user.mid}">${user.mid}</li>
				<li><button id="dashAddBtn">대쉬보드 추가</button></li>
				<li>임시 정보 보기</li>
				<li>임시 정보 수정</li>
				<li>미정</li>
			</ul>
		</div>
	</header>
	<section>
		<article id="dashAddarticle">
			<div>
				<form id="dashAddForm">
					<input type="text" name="dtitle"/>
					<input type="text" name="ddesc"/>
					<input type="submit" value="CREATE"/>
				</form>
			</div>
		</article>
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