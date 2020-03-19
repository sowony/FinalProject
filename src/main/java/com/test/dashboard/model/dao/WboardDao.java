package com.test.dashboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.WboardDto;

@Repository
public interface WboardDao {

	//전체 목록 조회 , id는 떠다닌는 애를 잡아다가 넣자 
	@Select("select * from wboard where dgno = #{dgno}")
	public List<WboardDto> boardListAll(int dgno);
	
	//연습용 
	@Select("select * from wboard")
	public List<WboardDto> boardList();
	
}
