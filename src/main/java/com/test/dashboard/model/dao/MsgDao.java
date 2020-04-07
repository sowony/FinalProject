package com.test.dashboard.model.dao;

import java.lang.annotation.Repeatable;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.MsgDto;

@Repository
public interface MsgDao {

	//쪽지함 대쉬리스트 출력 (안읽은 쪽지 갯수 세기)
	@Select ("SELECT m.dno, sum(msgopened) SUM, d.dtitle from (select dno, msgopened from msgtable where msgto=#{mid}) m inner join dashboard d on(m.dno = d.dno) group by m.dno, d.dtitle")
	public List<Map<Object, Object>> selectAll(String mid);
	
	// 대쉬보드별 쪽지 출력 
	@Select ("SELECT msg.*, (select mnick from member where mid = msgto) msgtonick, (select mnick from member where mid = msgfrom) msgfromnick from msgtable msg where msg.msgto=#{mid} and msg.dno=#{dno}")
	public List<MsgDto> selectList(Map<Object, Object> params);
	
	// 개별 쪽지 출력 
	@Select ("SELECT msg.*, (select mnick from member where mid = msgto) msgtonick, (select mnick from member where mid = msgfrom) msgfromnick from msgtable msg where msg.msgto=#{mid}")
	public List<MsgDto> selectListAll(String mid) ;
	
	// 쪽지 읽음 표시 (참고 : 0이 읽음 1이 안읽음 카톡 처럼)
	@Update("UPDATE msgtable set msgopened ='0' where msgno= #{msgno}")
	public void setOpened(String msgno);
	
	@Select("Select msg.*, (select mnick from member where mid = msgto) msgtonick, (select mnick from member where mid = msgfrom) msgfromnick from msgtable msg where msgno=#{msgno}")
	public MsgDto getMsg(String msgno);
	
	@SelectKey(statement = "select MSGNOSEQ.NEXTVAL from dual", keyProperty = "msgno", before = true, resultType = Integer.class)
	@Insert("INSERT INTO MSGTABLE VALUES(#{msgno}, #{msgfrom}, #{msgto}, #{msgdate}, 1, #{dno}, #{msgcontent}, #{msgtitle})")
	public int sendMsg(MsgDto msgDto);
	
}
