package com.test.dashboard.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.MsgDto;

@Repository
public interface MsgDao {

	//쪽지함 대쉬리스트 출력 (안읽은 쪽지 갯수 세기)
	@Select ("SELECT dno, sum(msgopened) SUM from (select dno, msgopened from msgtable where msgto=#{mid} ) group by dno")
	public List<Map<Object, Object>> selectAll(String mid);
	
	// 대쉬보드별 쪽지 출력 
	@Select ("SELECT * from (select * from msgtable where msgto=#{mid}) where dno=#{dno}")
	public List<MsgDto> selectList(Map<Object, Object> params);
	
	// 개별 쪽지 출력 
	@Select ("SELECT * from msgtable where msgto=#{mid}")
	public List<MsgDto> selectListAll(String mid) ;
	
	// 쪽지 읽음 표시 (참고 : 0이 읽음 1이 안읽음 카톡 처럼)
	@Update("UPDATE msgtable set msgopened ='0' where msgno= #{msgno}")
	public void setOpened(String msgno);
	
	@Select("Select * from msgtable where msgno=#{msgno}")
	public MsgDto getMsg(String msgno);
	
	@Insert("INSERT INTO MSGTABLE VALUES(MSGNOSEQ.NEXTVAL, #{msgfrom}, #{msgto}, #{msgdate}, 1, #{dno}, #{msgcontent}, #{msgtitle})")
	public int sendMsg(Map<Object, Object> params);
	
	@Select("SELECT MID FROM DASHMEMBER WHERE DNO=${dno}")
	public List<String> getDashMember(String dno);
}
