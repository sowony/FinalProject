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
	
	//글 상세보기 
	@Select("select wbtodono, wno, dno, dgno, mid, wbtodo, wbtitle,"
			+ "wbcontent, wfno_list, TO_CHAR(wbstartdate, 'YYYY-MM-DD') as wbstartdate , wbenddate, wbcolor from wboard where wbtodono = #{wbtodono}")
	public WboardDto wSelectOne(int wbtodono);
	
}
