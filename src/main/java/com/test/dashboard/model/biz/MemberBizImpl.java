package com.test.dashboard.model.biz;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.test.dashboard.model.dao.MemberDao;
import com.test.dashboard.model.dto.MemberDto;

@Service
@Transactional
public class MemberBizImpl implements MemberBiz{

	@Autowired
	private MemberDao memberDao;
	
	@Override
	public int delete(int mno) {
		// TODO Auto-generated method stub
		return memberDao.delete(mno);
	}
	
	@Override
	public int insert(MemberDto memberDto) {
		// TODO Auto-generated method stub
		return memberDao.insert(memberDto);
	}
	
	@Override
	public MemberDto selectByIdAndPw(String mid, String mpw) {
		// TODO Auto-generated method stub
		Map<String, Object> params = new HashMap<String, Object>();
		
		params.put("mid", mid);
		params.put("mpw", mpw);
		
		return memberDao.selectByIdAndPw(params);
	}
	
	@Override
	public MemberDto selectByMNo(int mno) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public List<MemberDto> selectList() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public int update(MemberDto memberDto) {
		// TODO Auto-generated method stub
		return 0;
	}
	
}
