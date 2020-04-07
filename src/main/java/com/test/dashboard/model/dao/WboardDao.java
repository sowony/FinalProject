package com.test.dashboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.WboardDto;

@Repository
public interface WboardDao {

	//전체 목록 조회 , id는 떠다닌는 애를 잡아다가 넣자  dgno???넣었었음
	@Select("select * from wboard inner join member on ( wboard.mid = member.mid )where wno = #{wno} order by wbtodono desc")
	public List<WboardDto> boardListAll(int wno);
	
	//내글 목록 조회 
	@Select("select * from wboard w inner join member m on (w.mid = m.mid) where w.mid = #{mid} and w.wno = #{wno} order by wbtodono desc")
	public List<WboardDto> boardMyList(WboardDto dto);
	
	//연습용 
	@Select("select * from wboard")
	public List<WboardDto> boardList();
	
	//글 상세보기 
	@Select("select wbtodono, wno, dno, dgno, mid, wbtodo, wbtitle,"
			+ "wbcontent, wfno_list, TO_CHAR(wbstartdate, 'YYYY-MM-DD') as wbstartdate , TO_CHAR(wbenddate, 'YYYY-MM-DD') as wbenddate, wbcolor from wboard where wbtodono = #{wbtodono}")
	public WboardDto wSelectOne(int wbtodono);
	
	//써머노트  -게시글 작성 
	@SelectKey(statement = "SELECT wboard_seq.nextval FROM DUAL", keyProperty = "wbtodono",resultType = Integer.class, before = true)
	@Insert("INSERT INTO wboard (wbtodono, mid, wbtodo, wbtitle, wbcontent,wno,dno, dgno, wbstartdate, wbenddate)"+
			"VALUES (#{wbtodono}, #{mid},#{wbtodo}, #{wbtitle}, #{wbcontent},#{wno},#{dno},0,TO_DATE(#{wbstartdate},'YYYY-MM-DD')  ,TO_DATE(#{wbenddate},'YYYY-MM-DD'))")
	public int wbinsert(WboardDto dto);
	
	
	//게시물 삭제 
	@Delete("delete from wboard where wbtodono = #{wbtodono}")
	public int wDelete(int wbtodono);
	
	//게시물 수정
	@Update("update wboard set mid =#{mid}, wbtitle=#{wbtitle}, wbcontent=#{wbcontent}, wbstartdate=#{wbstartdate}, wbenddate=#{wbenddate} where wbtodono = #{wbtodono} ")
	public int summerUpdate(WboardDto dto);
	
	@Update("update wboard set wbstartdate = TO_DATE(#{wbstartdate}, 'YYYY-MM-DD'), wbenddate = TO_DATE(#{wbenddate}, 'YYYY-MM-DD') where wbtodono = #{wbtodono}")
	public int dateUpdate(WboardDto wboardDto);
	
	@Update("update wboard set wbtitle = #{wbtitle} where wbtodono = #{wbtodono}")
	public int titleUpdate(WboardDto wboardDto);
	
	@Update("update wboard set wbcontent = #{wbcontent} where wbtodono = #{wbtodono}")
	public int conUpdate(WboardDto wboardDto);
	
	@Update("update wboard set wbtodo = #{wbtodo} where wbtodono = #{wbtodono}")
	public int stateUpdate(WboardDto wboardDto);
	
	//달력 해당 아이디 날짜로 뽑아 오기  wno추가해야함 조건에 
	@Select("select wbtitle,TO_CHAR(wbstartdate,'yyyymmdd') as wbstartdate,TO_CHAR(wbenddate,'yyyymmdd') as wbenddate from wboard where mid=#{mid} and wno=#{wno} and TO_CHAR(wbstartdate,'yyyymm')=#{wbstartdate} order by wbstartdate asc ")
	public List<WboardDto> wbdatesend(WboardDto dto);
	
}
