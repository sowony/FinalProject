package com.test.dashboard.model.dao;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.WMapDto;

@Repository
public interface WMapDao {
	
	@Select("SELECT WMAPNO,WNO,WMAPKEYWORD,WMAPJIBUN,WMAPADDR,WMAPLONG,WMAPLAT FROM WMAP WHERE WMAPNO=#{wmapno}")
	public WMapDto select(int wmapno);
	
	@Insert("INSERT INTO WMAP VALUES(WMAP_SEQ.NEXTVAL,#{wno},#{wmapkeyword},#{wmapjibun},#{wmapaddr},#{wmaplong},#{wmaplat})")
	public int insert(WMapDto dto);
	
	@Update("UPDATE WMAP SET WMAPKEYWORD=#{wmapkeyword}, WMAPJIBUN=#{wmapjibun}, WMAPADDR=#{wmapaddr}, WMAPLONG=#{wmaplong}, WMAPLAT=#{wmaplat} WHERE WMAPNO=#{wmapno}")
	public int update(WMapDto dto);
	
	@Delete("DELETE FROM WMAP WHERE WMAPNO=#{wmapno}")
	public int delete(int wmapno);

}
