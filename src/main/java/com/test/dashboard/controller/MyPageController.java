package com.test.dashboard.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.dashboard.model.biz.DashBoardBiz;
import com.test.dashboard.model.biz.DashGradeBiz;
import com.test.dashboard.model.biz.DashMemberBiz;
import com.test.dashboard.model.biz.MemberBiz;
import com.test.dashboard.model.dto.DashBoardDto;
import com.test.dashboard.model.dto.MemberDto;

@RestController
@RequestMapping("/mypage")
public class MyPageController {
	
	@Autowired
	private MemberBiz memberBiz;
	
	@Autowired
	private DashBoardBiz dashBoardBiz;
	
	@Autowired
	private DashMemberBiz dashMemberBiz;
	
	@Autowired
	private DashGradeBiz dashGradeBiz;
	
	private Logger logger = LoggerFactory.getLogger(MyPageController.class);

	
	@GetMapping("/dashload")
	public List<DashBoardDto> getDashBoard(HttpSession session) {
		
		logger.info("[ INFO ] : MyPageController > postDashBoard [path : /mypage/dashload]");
		
		MemberDto user = (MemberDto) session.getAttribute("user");
		
		return dashBoardBiz.selectByBelong(user.getMid());
		
	}
	
	@PostMapping("/idsearch")
	public boolean postIdSearch(@RequestBody MemberDto memberDto) {
		
		logger.info("[ INFO ] : MyPageController > postIdSearch [path : /mypage/idsearch]");
		logger.info("[ INFO ] : SearchID > " + memberDto.getMid());
		MemberDto user = memberBiz.selectById(memberDto.getMid());
		
		if(user != null) {
			return true;
		} else {
			return false;
		}
		
	}
	
}
