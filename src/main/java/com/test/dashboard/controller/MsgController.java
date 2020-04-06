package com.test.dashboard.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.dashboard.model.biz.DashMemberBiz;
import com.test.dashboard.model.biz.MsgBiz;
import com.test.dashboard.model.dto.DashMemberDto;
import com.test.dashboard.model.dto.MemberDto;
import com.test.dashboard.model.dto.MsgDto;

@RestController
@RequestMapping("/msg")
public class MsgController {
	
	@Autowired
	private MsgBiz msgbiz;
	
	@Autowired
	private DashMemberBiz dashMemberBiz;
	
	private Logger logger = LoggerFactory.getLogger(MsgController.class);
	
	
	@GetMapping("/dashlist")
	public List<Map<Object, Object>> getDashList(String mid, HttpSession session) {
		logger.info("getDashList===>mid: "+mid);
		
		MemberDto user = (MemberDto)session.getAttribute("user");
		
		List<Map<Object, Object>> dto = msgbiz.selectAll(user.getMid());
		
		return dto; 
	}
	
	@GetMapping("/msgList")
	public List<MsgDto> getMsgList(String dno, HttpSession session){
		logger.info("getMsgList===>dno: "+dno);
		List<MsgDto> dto;
		
		MemberDto user = (MemberDto)session.getAttribute("user");
		
		if(dno.equals("all")) dto = msgbiz.selectListAll(user.getMid());
		else dto = msgbiz.selectList(user.getMid(), dno);
		
		return dto;
	}
	
	@GetMapping("/msgopened")
	public void setOpened(String msgno) {
		logger.info("getMsgList===>msgno: "+msgno);
		msgbiz.setOpened(msgno);
	}
	
	@GetMapping("/openMsg")
	public MsgDto getMsg(String msgno) {
		logger.info("getMsg===>msgno: "+msgno);
		MsgDto dto = msgbiz.getMsg(msgno);
		return dto;
	}
	
	@PostMapping("/write")
	public int sendMsg(@RequestBody MsgDto dto) {
		logger.info("sendMsgdd===>"+dto);
		int result = msgbiz.sendMsg(dto); 
		return result;
	}
	
	@GetMapping("/getDashMember")
	public List<DashMemberDto> getDashMember(int dno){
		logger.info("getDashMember===>"+dno);
		return dashMemberBiz.selectList(dno);
	}
}
