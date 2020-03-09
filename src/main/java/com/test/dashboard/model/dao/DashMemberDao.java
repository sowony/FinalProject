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
	@Select("select * from dashmember where dmdno = #{dmdno}")
	public List<DashMemberDto> selectList(int dmdno);
	
	// 맴버테이블 NO로 한명 조회
	@Select("select * from dashmember where dmno = #{dmno}")
	public DashMemberDto selectByNo(int dmno);

	// 맴버테이벌 대쉬보드 NO와 맴버 ID로 조회
	@Select("select * from dashmember where dmdno = #{dmdno} and dmmid = #{dmmid}")
	public DashMemberDto selectById(Map<String, Object> params);
	
	@SelectKey(statement = "select dgno from dashgrade where dgdno = #{dmdno} and dggrade = #{dggrade} and dgalias = #{dgalias}", before = true, keyProperty = "dmdgno", resultType = Integer.class)
	@Insert("insert into dashmember values(dashmemberseq.nextval, #{dmdno}, #{dmmid}, #{dmdgno})")
	public int insert(Map<String, Object> params);
	
	@Update("update dashmember set dmdgno = #{dmdgno} where dmno = #{dmno}")
	public int update(DashMemberDto dto);
	
	@Delete("delete from dashmember where dmno = #{dmno}")
	public int delete(int dmno);
	
}
