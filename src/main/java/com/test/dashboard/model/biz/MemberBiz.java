package com.test.dashboard.model.biz;

import java.util.List;

import com.test.dashboard.model.dto.MemberDto;

public interface MemberBiz {

	// 맴버 리스트
	public List<MemberDto> selectList();
	
	// 번호 조회
	public MemberDto selectByMNo(int mno);
	
	// 비밀번호 아이디
	public MemberDto selectByIdAndPw(String mid, String mpw);
	
	public int insert(MemberDto memberDto);
	
	public int update(MemberDto memberDto);
	
	public int delete(int mno);
	
}
