window.onload = function() {
	crawling();
}
function crawling() {
	var container = document.querySelector(".container");

	// ajax시 기존 존재하던 row 삭제
	var itemexisted = container.children;

	if (itemexisted.length > 9) {
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
	}

	// dataset에 기존 검색하던 키워드가 있는지 확인
	var searchkw = document.getElementById("keyword").value;
	var containerkw = container.dataset.keyword;

	containerkw = searchkw;

	if (!containerkw) {
		alert("검색어를 입력해주세요");
	} else {
		// 비동기 통신
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {

					console.log("status===============>통신 성공");

					var json = JSON.parse(xhr.responseText);

					for (var i = 0; i < json.length; i++) {
						
						const con = document.querySelector('.container');
						const div = addObject(con, 'div', 'crawlingItem', true, (o)=>{
														
								let logoSrc = '';
																	
									if (json[i]['wcrwlfrom'] === "twitter") {
										logoSrc = 'https://ssl.pstatic.net/sstatic/search/img3/ico_twitter2.gif';
										
									} else if (json[i]['wcrwlfrom'] === "naver"){
										logoSrc = 'https://developers.naver.com/inc/devcenter/images/naver_square_20x20.png';
										
									} else if (json[i]['wcrwlfrom']==="vlive"){
										logoSrc = 'https://help.naver.com/hotTopicfiles/201902/1550817943440059.png';
									}
								
								o.innerHTML =`
										<div class="crawlingHeader"><img class="crawlingLogo" src="${logoSrc}"/>
										<span class ="wcrwlwriter">${json[i]['wcrwlwriter']}</span></div>
										<div class="crawlingItemCon">		
											<p class ="wcrwlcontent">${json[i]['wcrwlcontent']}</p>
											<p class="wcrwldate">${json[i]['wcrwldate']}		<a href = "${json[i]['wcrwllink']}"><img src = 'https://ssl.pstatic.net/sstatic/search/pc/img/sp_sns.png' /></a></p>
									
										</div>
								`;
									

	
							
						});
						
						
					}

				}
			}
		};

		xhr.open("POST", "./crwl?keyword=" + containerkw, true);
		xhr.send(null);
	}

}
