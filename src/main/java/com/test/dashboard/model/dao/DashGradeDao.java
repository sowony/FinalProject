package com.test.dashboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.DashGradeDto;

@Repository
public interface DashGradeDao {

	// 특정 대쉬보드의 등급 목록
	@Select("select * from dashgrade where dgdno = #{dgdno}")
	public List<DashGradeDto> selectList(int dgdno);
	
	@Insert("insert into dashgrade values(dashgradeseq.nextval, #{dgdno}, #{dggrade}, #{dgalias})")
	public int insert(DashGradeDto dto);
	
	@Update("update dashgrade set dggrade = #{dggrade}, dgalias = #{dgalias} where dgno = #{dgno}")
	public int update(DashGradeDto dto);
	
	@Delete("delete from dashgrade where dgno = #{dgno}")
	public int delete(int dgno);
	
}
