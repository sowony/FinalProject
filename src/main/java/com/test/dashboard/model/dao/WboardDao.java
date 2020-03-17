package com.test.dashboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.WboardDto;

@Repository
public interface WboardDao {

	//전체 목록 조회 
	@Select("select * from wboard where mid = #{mid}")
	public List<WboardDto> boardList(String mid);
	
	
}
