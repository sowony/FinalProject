package com.test.dashboard.model.biz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.transaction.TransactionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.dashboard.model.dao.WidgetDao;
import com.test.dashboard.model.dto.WRuleDto;
import com.test.dashboard.model.dto.WidgetDto;

@Service
@Transactional
public class WidgetBizImpl implements WidgetBiz{


	@Autowired
	private WidgetDao widgetDao;
	
	@Autowired
	private WRuleBiz wRuleBiz;
	
	@Override
	public int delete(int wno) {
		// TODO Auto-generated method stub
		return widgetDao.delete(wno);
	}
	@Override
	public int insert(WidgetDto widgetDto) {
		// TODO Auto-generated method stub
		
		int res = widgetDao.insert(widgetDto);
		
		if(res > 0) {
			
			List<WRuleDto> wRuleDtos = widgetDto.getRules();
			
			for(WRuleDto out : wRuleDtos) {
				
				out.setWno(widgetDto.getWno());
				
				System.out.println(out);
				
				int ruleRes = wRuleBiz.insert(out);
				
				if(ruleRes <= 0) {
					throw new TransactionException();
				}
				
			}
			
		}
		
		return res;
	}
	
	@Override
	public List<WidgetDto> selectList(int dno, String mid) {
		// TODO Auto-generated method stub
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("dno", dno);
		params.put("mid", mid);
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
