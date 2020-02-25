package com.test.dashboard.model.biz;

import java.util.List;

import com.test.dashboard.model.dao.DashMemberDao;
import com.test.dashboard.model.dto.DashMemberDto;

public interface DashMemberBiz {

	public List<DashMemberDto> selectList(int dmdno);
	
	public DashMemberDto selectByNo(int dmno);

	public DashMemberDto selectById(int dmdno, String dmid);

	public int insert(DashMemberDto dto);
	
	public int update(DashMemberDto dto);
	
	public int delete(int dmno);
	
}
