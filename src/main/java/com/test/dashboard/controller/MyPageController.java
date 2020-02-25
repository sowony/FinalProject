package com.test.dashboard.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.dashboard.model.biz.DashBoardBiz;
import com.test.dashboard.model.biz.DashGradeBiz;
import com.test.dashboard.model.biz.DashMemberBiz;
import com.test.dashboard.model.dto.DashBoardDto;
import com.test.dashboard.model.dto.MemberDto;

@RestController
public class MyPageController {
	
	@Autowired
	private DashBoardBiz dashBoardBiz;
	
	@Autowired
	private DashMemberBiz dashMemberBiz;
	
	@Autowired
	private DashGradeBiz dashGradeBiz;
	
	private Logger logger = LoggerFactory.getLogger(MyPageController.class);

	@GetMapping("mypage/dashload")
	public List<DashBoardDto> getDashBoard(HttpSession session) {
		
		logger.info("[ INFO ] : MyPageController > postDashBoard [path : /mypage/dashload]");
		
		MemberDto user = (MemberDto) session.getAttribute("user");
		
		return dashBoardBiz.selectByBelong(user.getMid());
		
	}
	
}
