package com.test.dashboard.model.biz;

import java.util.List;

import com.test.dashboard.model.dto.WidgetDto;

public interface WidgetBiz {

	public List<WidgetDto> selectList(int wdno, String mid);
	
	public WidgetDto selectOne(int wno);
	
	public int insert(WidgetDto widgetDto);
	
	public int update(WidgetDto widgetDto);
	
	public int delete(int wno);
}