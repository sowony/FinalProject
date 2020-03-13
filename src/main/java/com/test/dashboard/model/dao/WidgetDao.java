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
	@Select("with grade as (select dggrade from dashgrade where dgno = (select dgno from dashmember where dno = #{dno} and mid = #{mid})) select distinct w.wno, dno, wcategory, wtitle, w.mid, wleft, wtop, wwidth, wheight, wzindex, wcontentcolor, wtitlecolor, wposition, wcreatedate from widget w inner join wrule wr on(w.wno = wr.wno) where w.dno = #{dno} and (w.mid = #{mid} or (select * from grade) between wr.wrmax and wr.wrmax)")
	public List<WidgetDto> selectList(Map<String, Object> params);
	
	@Select("select * from widget where wno = #{wno}")
	public WidgetDto selectOne(int wno);
	
	@Insert("insert into widget values(widget_seq.nextval, #{dno}, #{wcategory}, #{wtitle}, #{mid}, #{wleft}, #{wtop}, #{wwidth}, #{wheight}, #{wzindex}, #{wcontentcolor}, #{wtitlecolor}, #{wposition}, sysdate, 'N')")
	public int insert(WidgetDto widgetDto);
	
	@Update("update widget set wtitle=#{wtitle}, wleft=#{wleft}, wtop=#{wtop}, wwidth=#{wwdith}, wzindex=#{wzindex}, wcontentcolor=#{wcontentcolor}, wtitlecolor=#{wtitlecolor}, wposition=#{wposition} where wno=#{wno}")
	public int update(WidgetDto widgetDto);
	
	@Delete("delete from widget where wno=#{wno}")
	public int delete(int wno);
	
}
