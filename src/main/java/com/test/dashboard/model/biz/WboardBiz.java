package com.test.dashboard.model.biz;

import java.util.List;

import com.test.dashboard.model.dto.WboardDto;

public interface WboardBiz {
	
	//전체 목록 조회
	public List<WboardDto> boardList(String mid);
	
}
