package com.test.dashboard.model.biz;

import java.util.List;
import java.util.Map;

import com.test.dashboard.model.dto.MsgDto;

public interface MsgBiz {
 
	// 모든 쪽지 목록 불러오기 
	public List<Map<Object, Object>> selectAll(String mid);
	
	// 선택한 대쉬보드 쪽지들 불러오기 
	public List<MsgDto> selectList(String mid, String dno);
	
	// 모든 대쉬보드 쪽지들 불러오기 
	public List<MsgDto> selectListAll(String mid);
	
	// 읽음 표시하기
	public void setOpened(String msgno);
	
	// 메세지 출력
	public MsgDto getMsg(String msgno);
	
	// 메세지 보내기 
	public int sendMsg(MsgDto dto);
	
	public List<String> getDashMember(String dno);
}
