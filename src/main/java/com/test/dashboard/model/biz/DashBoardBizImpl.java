package com.test.dashboard.model.biz;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.dashboard.model.dao.DashBoardDao;
import com.test.dashboard.model.dto.DashBoardDto;

@Service
public class DashBoardBizImpl implements DashBoardBiz{

	@Autowired
	private DashBoardDao dashBoardDao;
	
	@Override
	public int update(DashBoardDto dto) {
		// TODO Auto-generated method stub
		return dashBoardDao.update(dto);
	}
	
	@Override
	public int delete(int dno) {
		// TODO Auto-generated method stub
		return dashBoardDao.delete(dno);
	}
	@Override
	public int insert(DashBoardDto dto) {
		// TODO Auto-generated method stub
		return dashBoardDao.insert(dto);
	}
	
	@Override
	public List<DashBoardDto> selectByBelong(String dmmid) {
		// TODO Auto-generated method stub
		return dashBoardDao.selectByBelong(dmmid);
	}
	
	@Override
	public List<DashBoardDto> selectByOwner(String downer) {
		// TODO Auto-generated method stub
		return dashBoardDao.selectByOwner(downer);
	}
	
	@Override
	public DashBoardDto selectOne(int dno) {
		// TODO Auto-generated method stub
		return selectOne(dno);
	}
	
	
	
}
