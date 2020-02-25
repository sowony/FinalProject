package com.test.dashboard.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.DashBoardDto;

@Repository
public interface DashBoardDao {

	//본인 소유 보드 조회
	@Select("select * from dashboard where downer = #{downer}")
	public List<DashBoardDto> selectByOwner(String downer);
	
	//본인 소속 보드 조회
	@Select("select * from dashboard where dno in (select dmdno from dashmember where dmmid = #{dmmid}) order by dno desc")
	public List<DashBoardDto> selectByBelong(String dmmid);

	//보드 입장
	@Select("select * from dashboard where dno = #{dno}")
	public DashBoardDto selectOne(int dno);
	
	@Insert("insert into dashboard values(dashboardseq.nextval, #{dtitle}, #{downer}, #{ddesc}, sysdate, null)")
	public int insert(DashBoardDto dto);
	
	@Update("update dashboard set dtitle = #{dtitle}, ddesc = #{ddesc}, dmodifydate = sysdate where dno = #{dno}")
	public int update(DashBoardDto dto);
	
	@Delete("delete from dashboard where dno = #{dno}")
	public int delete(int dno);
	
}

