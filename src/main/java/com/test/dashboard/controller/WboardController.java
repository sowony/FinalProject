package com.test.dashboard.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WboardController {

		private Logger logger = LoggerFactory.getLogger(WboardController.class);
		
		@GetMapping("wboard")
		public String getWboard(Model model, HttpSession session) {
			logger.info("[ INFO ] : wboardController > getwlist");
			return "wboard";
		}
		
}
