package com.test.dashboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.WMapDto;

@Repository
public interface WMapDao {
	
	@Select("SELECT WMAPNO, WNO, WMAPKEYWORD, WMAPADDR, WMAPJIBUN, WMAPLAT, WMAPLNG, WMAPMEMO,MID FROM WMAP WHERE WNO=#{wno}")
	public List<WMapDto> selectList(int wno);
	
	@Select("SELECT WMAPNO,WNO,WMAPKEYWORD,WMAPADDR,WMAPJIBUN, WMAPLAT, WMAPLNG, WMAPMEMO,MID FROM WMAP WHERE WMAPNO=#{wmapno}")
	public WMapDto select(int wmapno);
	
	@SelectKey(statement = "SELECT WMAP_SEQ.NEXTVAL FROM DUAL", keyProperty = "wmapno", resultType = Integer.class, before = true)
	@Insert("INSERT INTO WMAP VALUES(#{wmapno},#{wno},#{wmapkeyword},#{wmapaddr},#{wmapjibun},#{wmaplat},#{wmaplng},#{wmapmemo},#{mid})")
	public int insert(WMapDto dto);
	
	@Update("UPDATE WMAP SET WMAPMEMO=#{wmapmemo} WHERE WMAPNO=#{wmapno}")
	public int update(WMapDto dto);
	
	@Delete("DELETE FROM WMAP WHERE WMAPNO=#{wmapno}")
	public int delete(int wmapno);

}
