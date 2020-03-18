package com.test.dashboard.controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.test.dashboard.model.biz.WboardBiz;

@Controller
public class WboardController {

		private Logger logger = LoggerFactory.getLogger(WboardController.class);
		
		@Autowired
		private WboardBiz biz;
		
		@RequestMapping("/wboard")
		//나중에 int dgno를 추가해서  해당대시 보드에 들어가는 list를 뽑아내자 
		public String postWboard(Model model) {
			logger.info("[ INFO ] : wboardController > wlist");
			
			model.addAttribute("list",biz.boardList());
			
			return "wboard";
		}
		
}
