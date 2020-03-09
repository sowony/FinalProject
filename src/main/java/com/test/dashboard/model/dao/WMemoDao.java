package com.test.dashboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.WMemoDto;

@Repository
public interface WMemoDao {

	@Select("select * from wmemo")
	public List<WMemoDto> selectList();
	
	@Select("select * from wmemo where wmwno = #{wmwno}")
	public WMemoDto selectOne(int wmwno);
	
	@Insert("insert into wmemo values(wmemoseq.nextval, #{wmwno}, #{wmtitle}, #{wmcontent}, sysdate, null)")
	public int insert(WMemoDto wMemoDto);
	
	@Update("update wmemo set wmtitle = #{wmtitle}, wmcontent = #{wmcontent}, wmmodifydate = sysdate where wmwno = #{wmwno}")
	public int update(WMemoDto wMemoDto);
	
	@Delete("delete from wmemo where wmwno = #{wmwno}")
	public int delete(int wmwno);
	
}
