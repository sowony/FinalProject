package com.test.dashboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.WRuleDto;

@Repository
public interface WRuleDao {

	@Select("select * from wrule where wrwno = #{wrwno}")
	List<WRuleDto> selectList(int wrwno);
	
	@Select("select * from wrule where wrno = #{wrno}")
	WRuleDto selectOne(int wrno);
	
	@Insert("insert into wrule values(wruleseq.nextval,#{wrwno},#{wrcate},#{wrrwd},#{wrmid},#{wrminno},#{wrmaxno})")
	int insert(WRuleDto wRuleDto);
	
	@Update("update wrule set wrcate=#{wrcate}, wrrwd=#{wrrwd}, wrmid=#{wrmid}, wrminno=#{wrminno}, wrmaxno=#{wrmaxno} where wrno = #{wrno}")
	int update(WRuleDto wRuleDto);
	
	@Delete("delete from wrule where wrno = #{wrno}")
	int delete(int wrno);
}
