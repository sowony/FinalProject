package com.test.dashboard.model.biz;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.dashboard.model.dao.DashGradeDao;
import com.test.dashboard.model.dto.DashGradeDto;


@Service
public class DashGradeBizImpl implements DashGradeBiz{

	@Autowired
	private DashGradeDao dashGradeDao;
	
	@Override
	public int delete(int dgno) {
		// TODO Auto-generated method stub
		return dashGradeDao.delete(dgno);
	}
	@Override
	public int insert(DashGradeDto dto) {
		// TODO Auto-generated method stub
		return dashGradeDao.insert(dto);
	}
	
	@Override
	public List<DashGradeDto> selectList(int dgdno) {
		// TODO Auto-generated method stub
		return dashGradeDao.selectList(dgdno);
	}
	
	@Override
	public int update(DashGradeDto dto) {
		// TODO Auto-generated method stub
		return dashGradeDao.update(dto);
	}
	
	
}
