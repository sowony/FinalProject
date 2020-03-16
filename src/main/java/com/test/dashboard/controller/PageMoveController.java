package com.test.dashboard.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageMoveController {

	private Logger logger = LoggerFactory.getLogger(PageMoveController.class);
	
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
	
}
