package com.test.dashboard.model.dao;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public class WboardDao {

	//전체 목록 조회 
	@Select("select * from wboard where mid = #{mid}")
	public List<WboardDto> boardList(String mid);
	
	
}
