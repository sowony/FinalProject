package com.test.dashboard.model.biz;

import java.util.List;

import com.test.dashboard.model.dto.WboardDto;

public interface WboardBiz {
	
	//전체 목록 조회
	public List<WboardDto> boardListAll(int dgno);
	
	//연습용 
	public List<WboardDto> boardList();
	
	//글 상세보기 
	public WboardDto wSelectOne(int wbtodono);
	
	//게시물 작성 
	public int wbinsert(WboardDto dto);
	
}
