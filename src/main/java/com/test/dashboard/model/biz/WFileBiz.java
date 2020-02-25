package com.test.dashboard.model.biz;

import java.util.List;


import com.test.dashboard.model.dto.WFileDto;

public interface WFileBiz {
	public List<WFileDto> selectByWNo(int wfwno);
	
	// 파일번호로 하나 찾기
	public WFileDto selectOne(int wfno);
	
	public int insert(WFileDto wFileDto);
	
	public int update(WFileDto wFileDto);
	
	public int delete(int wfno);
	
}
