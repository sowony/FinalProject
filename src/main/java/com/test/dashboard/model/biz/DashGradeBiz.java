package com.test.dashboard.model.biz;

import java.util.List;

import com.test.dashboard.model.dto.DashGradeDto;

public interface DashGradeBiz {

	public List<DashGradeDto> selectList(int dgdno);
	
	public int insert(DashGradeDto dto);
	
	public int update(DashGradeDto dto);
	
	public int delete(int dgno);
}
