package com.test.dashboard.model.biz;

import java.util.List;

public interface WboardBiz {
	
	//전체 목록 조회
	public List<WboardDto> boardList(String mid);
	
}
