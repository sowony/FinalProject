<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<!-- 외부 자바스크립트 라이브러리 -->
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<!-- 커스텀 유틸  -->
<link rel="stylesheet" href="./resources/css/defaultstyle.css" type="text/css"/>
<script type="text/javascript" src="./resources/js/util.js"></script>
<script type="text/javascript" src="./resources/js/xhr.js"></script>

<!-- 페이지 js, css -->
<link rel="stylesheet" href="./resources/css/login.css" type="text/css"/>
<script type="text/javascript" src="./resources/js/loginform.js"></script>
</head>
<body class="fadeOut">
	<section>
		<article id="content">
			<div id="con">
				<div id="con_head">
					<p id="subTitle">효과적인 프로젝트 관리를 위한</p>
					<p id="siteName">SITENAME</p>
				</div>
				<div id="con_body">
					<fieldset>
						<legend>LOGIN</legend>
						<form id="loginForm">
						<!--remove autocomplete-->
							<input type="text" name="mid" autocomplete="false" placeholder="아이디" required/>
							<input type="password" name="mpw" autocomplete="new-password" placeholder="패스워드"/>
							<input type="submit" class="signInBtn" value="로그인"/>
							<input type="button" id="signUp" class="signUpBtn" value="회원가입"/>
						</form>
						<p><a href="javascript:idAndPwSearchOn();" id="idAndPwFind">아이디 / 비밀번호 를 잊어버리셨나요?</a></p>
					</fieldset>
				</div>
				<div id="con_foot">
				<fieldset>
					<legend>OR</legend>
					<p><span class="facebookIcon icon"></span><input type="button" id="facebook-login-btn" class="faceSignInBtn" value="페이스북 로그인"></p>
					<script type="text/javascript" src="./resources/js/facebooklogin.js"></script>
					<p><span class="kakaoIcon icon"></span><input type="button" id="kakao-login-btn" class="kakaoSignInBtn" value="카카오 로그인"></p>
					<script type="text/javascript" src="./resources/js/kakaologin.js"></script>
					<p><span class="googleIcon icon"></span><input type="button" id="google-login-btn" class="googleSignInBtn" value="구글 로그인"></p>
				</fieldset>
				</div>
				
			</div>
		</article>
	</section>
	<div>
		<div class="backgroundDiv"></div>
		<div class="backgroundImg"></div>
	</div>
	<footer>
		<pre>서울시 영등포구 은행로 11, 5층~6층(여의도동,일신빌딩)
대표 : XXX  개인정보보호책임자 : XXX xxxx@xxxxx.com
사업자등록번호 : 229-81-37000
통신판매업신고 : 제 2005-02682호
호스팅 서비스사업자 : 예스이십사(주)
Copyright ⓒ YES24 Corp. All Rights Reserved.</pre>
	</footer>
</body>
</html>