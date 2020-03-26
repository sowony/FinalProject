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

import com.test.dashboard.model.biz.WidgetBiz;
import com.test.dashboard.model.dto.MemberDto;
import com.test.dashboard.model.dto.WRuleDto;
import com.test.dashboard.model.dto.WidgetDto;

@RestController
@RequestMapping("/widget")
public class WidgetController {

	private Logger logger = LoggerFactory.getLogger(WidgetController.class);
	
	@Autowired
	private WidgetBiz widgetBiz;
	
	@GetMapping("/list")
	public List<WidgetDto> getListWidget(HttpSession session){
		
		int dno = (int) session.getAttribute("selectBoard");
		MemberDto owner = ((MemberDto)session.getAttribute("user"));
		
		return widgetBiz.selectList(dno, owner.getMid());
		
	}
	
	@PostMapping("/insert")
	public boolean postInsertWidget(@RequestBody WidgetDto widgetDto, HttpSession session) {
		
		logger.info("[ INFO ] : DashBoardController > postInsertWidget [path : /widget/insert]");
		
		int dno = (int) session.getAttribute("selectBoard");
		MemberDto owner = ((MemberDto)session.getAttribute("user"));
		
		widgetDto.setDno(dno);
		widgetDto.setMid(owner.getMid());
		
		WRuleDto ownerRule = new WRuleDto();
		
		ownerRule.setMid(owner.getMid());
		ownerRule.setMnick(owner.getMnick());
		ownerRule.setWrcategory("individual");
		ownerRule.setWrrwd(6);
		
		widgetDto.getRules().add(ownerRule);
		
		logger.info("[ INFO ] : DashBoardController > postInsertWidget [widgetDto : " + widgetDto +"]");
		
		int res = widgetBiz.insert(widgetDto);
		
		if(res > 0) {
			return true;
		} else {
			return false;
		}
		
	}
	
	
}
