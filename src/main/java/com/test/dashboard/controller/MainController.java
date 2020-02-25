package com.test.dashboard.controller;


import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.dashboard.model.biz.MemberBiz;
import com.test.dashboard.model.dto.MemberDto;

@Controller
public class MainController {
	
	private Logger logger = LoggerFactory.getLogger(MainController.class);
	
	@Autowired
	private MemberBiz memberBiz;
	
	@GetMapping("mypage")
	public String getMyPage(Model model, HttpSession session) {
		logger.info("[ INFO ] : MainController > getMyPage [path : /]");
		return "mypage";
	}
	
	@GetMapping("login")
	public String getLogin() {
		logger.info("[ INFO ] : MainController > getLogin [path : /login]");
		return "login";
	}
	
	@ResponseBody
	@PostMapping("login")
	public boolean postLogin(@RequestBody MemberDto memberDto,  HttpSession session) {
		logger.info("[ INFO ] : MainController > postLogin [path : /login]");
		MemberDto user = memberBiz.selectByIdAndPw(memberDto.getMid(), memberDto.getMpw());
		
		if(user != null) {
			logger.info("[ INFO ] : Login success" );
			session.setAttribute("user", user);
			return true;
		} else {
			logger.info("[ INFO ] : Login false" );
			return false;
		}
		
	}
	
}
