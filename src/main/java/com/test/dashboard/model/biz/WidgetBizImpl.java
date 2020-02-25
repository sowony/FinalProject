package com.test.dashboard.model.biz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.dashboard.model.dao.WidgetDao;
import com.test.dashboard.model.dto.WidgetDto;

@Service
public class WidgetBizImpl implements WidgetBiz{

	@Autowired
	private WidgetDao widgetDao;
	
	@Override
	public int delete(int wno) {
		// TODO Auto-generated method stub
		return widgetDao.delete(wno);
	}
	@Override
	public int insert(WidgetDto widgetDto) {
		// TODO Auto-generated method stub
		return widgetDao.insert(widgetDto);
	}
	
	@Override
	public List<WidgetDto> selectList(int wno, int dmdno, String dmmid) {
		// TODO Auto-generated method stub
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("dmdno", dmdno);
		params.put("dmmid", dmmid);
		params.put("wno", wno);
		return widgetDao.selectList(params);
	}
	@Override
	public WidgetDto selectOne(int wno) {
		// TODO Auto-generated method stub
		return widgetDao.selectOne(wno);
	}
	@Override
	public int update(WidgetDto widgetDto) {
		// TODO Auto-generated method stub
		return widgetDao.update(widgetDto);
	}
	
	
}
