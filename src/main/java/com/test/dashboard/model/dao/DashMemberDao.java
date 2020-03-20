package com.test.dashboard.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.DashMemberDto;

@Repository
public interface DashMemberDao {
	
	// 대쉬보드 맴버 조회
	@Select("select d.*, m.mnick, m.mimgpath from dashmember d inner join member m on(d.mid = m.mid) where dno = #{dno}")
	public List<DashMemberDto> selectList(int dno);
	
	// 맴버테이블 NO로 한명 조회
	@Select("select * from dashmember where dmno = #{dmno}")
	public DashMemberDto selectByNo(int dmno);

	// 맴버테이벌 대쉬보드 NO와 맴버 ID로 조회
	@Select("select * from dashmember where dmdno = #{dno} and dmmid = #{mid}")
	public DashMemberDto selectById(Map<String, Object> params);
	
	@SelectKey(statement = "select dgno from dashgrade dg where dg.dno = #{dno} and dggrade = #{dggrade} and dgalias = #{dgalias}", before = true, keyProperty = "dgno", resultType = Integer.class)
	@Insert("insert into dashmember values(dashmember_seq.nextval, #{dno}, #{mid}, #{dgno}, #{dmcolor})")
	public int insert(Map<String, Object> params);
	
	@Update("update dashmember set dgno = #{dgno}, dmcolor = #{dmcolor} where dmno = #{dmno}")
	public int update(DashMemberDto dto);
	
	@Delete("delete from dashmember where dmno = #{dmno}")
	public int delete(int dmno);
	
}
