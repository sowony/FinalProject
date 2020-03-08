package com.test.dashboard.model.biz;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.test.dashboard.model.dto.DashMemberDto;

public interface DashMemberBiz {

	public List<DashMemberDto> selectList(int dmdno);
	
	public DashMemberDto selectByNo(int dmno);

	public DashMemberDto selectById(int dmdno, String dmid);

	public int insert(Map<String, Object>[] params, int dno) throws SQLException;
	
	public int update(DashMemberDto dto);
	
	public int delete(int dmno);
	
}
