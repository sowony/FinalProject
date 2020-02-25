package com.test.dashboard.model.biz;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.test.dashboard.model.dao.WMemoDao;
import com.test.dashboard.model.dto.WMemoDto;

@Service
public class WMemoBizImpl implements WMemoBiz{

	@Autowired
	private WMemoDao wMemoDao;
	
	@Override
	public int delete(int wmwno) {
		// TODO Auto-generated method stub
		return wMemoDao.delete(wmwno);
	}
	
	@Override
	public int insert(WMemoDto wMemoDto) {
		// TODO Auto-generated method stub
		return wMemoDao.insert(wMemoDto);
	}
	@Override
	public List<WMemoDto> selectList() {
		// TODO Auto-generated method stub
		return wMemoDao.selectList();
	}
	
	@Override
	public WMemoDto selectOne(int wmwno) {
		// TODO Auto-generated method stub
		return wMemoDao.selectOne(wmwno);
	}
	
	@Override
	public int update(WMemoDto wMemoDto) {
		// TODO Auto-generated method stub
		return wMemoDao.update(wMemoDto);
	}
	
	
}

