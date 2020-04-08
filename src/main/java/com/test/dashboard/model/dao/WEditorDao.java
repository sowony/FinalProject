package com.test.dashboard.model.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.WEditorDto;

@Repository
public interface WEditorDao {
	
	@Select("SELECT WENO, WNO, WECONTENT FROM WEDITOR WHERE wno=#{wno}")
	public WEditorDto select(int wno);
	
	@Update("UPDATE WEDITOR SET WECONTENT=#{wecontent} WHERE wno=#{wno}")
	public int update(WEditorDto dto);
	
	@SelectKey(statement = "select WEDITOR_SEQ.nextval from dual", keyProperty = "weno", resultType = Integer.class,before = true)
	@Insert("INSERT INTO WEDITOR VALUES(#{weno}, #{wno}, #{wecontent})")
	public int insert(WEditorDto dto);
	
	@Delete("DELETE FROM WEDITOR WHERE wno=#{wno}")
	public int delete (int wno);

}
