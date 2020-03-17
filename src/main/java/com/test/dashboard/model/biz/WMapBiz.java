package com.test.dashboard.model.biz;

import com.test.dashboard.model.dto.WMapDto;

public interface WMapBiz {
	
	public WMapDto select(int wmapno); 
	public int insert(WMapDto dto);
	public int update(WMapDto dto);
	public int delete(int wmapno);

}
