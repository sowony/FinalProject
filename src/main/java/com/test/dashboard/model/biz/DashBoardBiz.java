package com.test.dashboard.model.biz;

import java.util.List;


import com.test.dashboard.model.dto.DashBoardDto;

public interface DashBoardBiz {

	public List<DashBoardDto> selectByOwner(String downer);
	
	public List<DashBoardDto> selectByBelong(String dmmid);
	
	public DashBoardDto selectOne(int dno);
	
	public int insert(DashBoardDto dto);
	
	public int update(DashBoardDto dto);

	public int delete(int dno);
}
