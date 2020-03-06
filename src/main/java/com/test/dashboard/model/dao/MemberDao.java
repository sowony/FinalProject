package com.test.dashboard.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Repository;

import com.test.dashboard.model.dto.MemberDto;

@Repository
public interface MemberDao {

	// 맴버 리스트
	@Select("select * from member where mdel='N'")
	public List<MemberDto> selectList();
	
	// 번호 조회
	@Select("select * from member where mdel='N' and mno = #{mno}")
	public MemberDto selectByMNo(int mno);
	
	// id 조회
	@Select("select * from member where mid = #{mid}")
	public MemberDto selectById(String mid);
	
	// 비밀번호 아이디
	@Select("select * from member where mid = #{mid} and mpw = #{mpw}")
	public MemberDto selectByIdAndPw(Map<String, Object> params);
	
	@Insert("insert into member values(memberseq.nextval, #{mid}, #{mnick}, #{mpw}, #{memail}, #{maddr}, #{mphone}, #{mabout}, #{mimgpath}, #{mgrade}, sysdate, 'N')")
	public int insert(MemberDto memberDto);
	
	@Update("update member set mid=#{mid}, mnick = #{mnick}, mpw = #{mpw}, memail = #{memail}, maddr = #{maddr}, mphone = #{mphone}, mabout = #{mabout}, mimgpath = #{mimgpath}, mgrade = #{mgrade}, mdel=#{mdel} where mno = #{mno}")
	public int update(MemberDto memberDto);
	
	@Delete("delete from member where mno = #{mno}")
	public int delete(int mno);
	
}
