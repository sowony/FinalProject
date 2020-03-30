package com.test.dashboard.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@GetMapping("/{wno}")
	public WidgetDto getWidget(@PathVariable int wno) {
		
		logger.info("[ INFO ] : WidgetController > getWidget [path : /widget/"+ wno +"]");
		
		return widgetBiz.selectOne(wno);
	}
	
	
	@PostMapping("/insert")
	public int postInsertWidget(@RequestBody WidgetDto widgetDto, HttpSession session) {
		
		logger.info("[ INFO ] : WidgetController > postInsertWidget [path : /widget/insert]");
		
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
		
		logger.info("[ INFO ] : WidgetController > postInsertWidget [widgetDto : " + widgetDto +"]");
		
		int res = widgetBiz.insert(widgetDto);
		
		if(res > 0) {
			return widgetDto.getWno();
		} else {
			return 0;
		}
		
	}
	
	@PostMapping("/topleftupdate")
	public int postTopLeftUpdate(@RequestBody WidgetDto widgetDto) {
		logger.info("[ INFO ] : WidgetController > postTopLeftUpdate [widgetDto : " + widgetDto +"]");
		return widgetBiz.topLeftUpdate(widgetDto);
		
	}
	
	@PostMapping("/widthHeightUpdate")
	public int postWidthHeightUpdate(@RequestBody WidgetDto widgetDto) {
		logger.info("[ INFO ] : WidgetController > postWidthHeightUpdate [widgetDto : " + widgetDto +"]");
		return widgetBiz.widthHeightUpdate(widgetDto);
	}
	
	
}
