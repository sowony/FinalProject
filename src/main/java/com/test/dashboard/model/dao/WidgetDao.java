package com.test.dashboard.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.WidgetDto;

@Repository
public interface WidgetDao {
	
	/*
	@Select("with mygrade as (select dggrade from dashgrade where dgno = (select dmdgno from dashmember where dmdno = #{dmdno} and dmmid = #{dmmid})) select * from widget where wdno = #{wdno} and wmingrade <= mygrade.dggrade and wmaxgrade >= mygrade.dggrade")
	public List<WidgetDto> selectList(Map<String, Object> params);
	*/
	@Select("with grade as (select dggrade from dashgrade where dgno = (select dmdgno from dashmember where dmdno = #{wdno} and dmid = #{mid})) select distinct wno, wdno, wcategory, wtitle, wowner, wleft, wtop, wwidth, wheight, wzindex, wcontentrgb, wtitlergb, wposition, wdate from widget inner join wrule on(wno = wrwno) where wdno = #{wdno} and (wrmid = #{mid} or (select * from grade) between wminno and wmaxno)")
	public List<WidgetDto> selectList(Map<String, Object> params);
	
	@Select("select * from widget where wno = #{wno}")
	public WidgetDto selectOne(int wno);
	
	@Insert("insert into widget values(widgetseq.nextval, #{wdno}, #{wcategory}, #{wtitle}, #{wowner}, #{wmid}, #{wmingrade}, #{wmaxgrade}, #{wleft}, #{wtop}, #{wwidth}, #{wheight}, #{wzindex}, #{wcontentrgb}, #{wtitlergb}, #{wposition}, sysdate)")
	public int insert(WidgetDto widgetDto);
	
	@Update("update widget set wtitle=#{wtitle}, wmingrade=#{wmingrade}, wmaxgrade=#{wmaxgrade}, wleft=#{wleft}, wtop=#{wtop}, wwidth=#{wwdith}, wzindex=#{wzindex}, wcontentrgb=#{wcontentrgb}, wtitlergb=#{wtitlergb}, wpostion=#{wpostion} where wno=#{wno}")
	public int update(WidgetDto widgetDto);
	
	@Delete("delete from widget where wno=#{wno}")
	public int delete(int wno);
	
}
