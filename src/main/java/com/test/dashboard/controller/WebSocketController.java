package com.test.dashboard.controller;

import java.util.List;
import java.util.Map;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.test.dashboard.model.biz.MemberBiz;
import com.test.dashboard.model.dto.DashMemberDto;
import com.test.dashboard.model.dto.MsgDto;
import com.test.dashboard.model.dto.WChatDto;
import com.test.dashboard.model.dto.WEditorDto;
import com.test.dashboard.model.dto.WMapDto;
import com.test.dashboard.model.dto.WboardDto;
import com.test.dashboard.model.dto.WidgetDto;

@Controller
public class WebSocketController {

	private Logger logger = LoggerFactory.getLogger(WebSocketController.class);
	
	@Autowired
	private MemberBiz memberBiz;
	
	@Autowired
	private SimpMessagingTemplate template;

	@MessageMapping("/wchat")
	public void wChatMessage(WChatDto wChatDto) {

		logger.info("[ INFO ] : WebSocketController > wChatMessage [wChatDto : " + wChatDto + "]");

		template.convertAndSend("/sub/wchat/" + wChatDto.getWno(), wChatDto);
	
	}
	
	@MessageMapping("/wmemo")
	public void wMemoMessage(Map<String, Object> params) {

		logger.info("[ INFO ] : WebSocketController > wMemoMessage [params : " + params + "]");

		template.convertAndSend("/sub/wmemo/" + params.get("wno"), params);
	
	}

	@MessageMapping("/wscale")
	public void wScaleMessage(WidgetDto widgetDto) {

		logger.info("[ INFO ] : WebSocketController > wScaleMessage [widgetDto : " + widgetDto + "]");

		template.convertAndSend("/sub/wscale/" + widgetDto.getWno(), widgetDto);
	
	}
	
	@MessageMapping("/wloc")
	public void wLocMessage(WidgetDto widgetDto) {

		logger.info("[ INFO ] : WebSocketController > wLocMessage [widgetDto : " + widgetDto + "]");

		template.convertAndSend("/sub/wloc/" + widgetDto.getWno(), widgetDto);
	
	}
	
	@MessageMapping("/wdel")
	public void wDelMessage(WidgetDto widgetDto) {

		logger.info("[ INFO ] : WebSocketController > wDelMessage [wno : " + widgetDto.getWno() + "]");

		template.convertAndSend("/sub/wdel/" + widgetDto.getWno(), widgetDto);
	
	}
	
	@MessageMapping("/wup")
	public void wUpMessage(WidgetDto widgetDto) {

		logger.info("[ INFO ] : WebSocketController > wUpMessage [WidgetDto : " + widgetDto + "]");

		template.convertAndSend("/sub/wup/" + widgetDto.getWno(), widgetDto);
	
	}
	
	@MessageMapping("/wadd")
	public void wAddMessage(WidgetDto widgetDto) {

		logger.info("[ INFO ] : WebSocketController > wAddMessage [WidgetDto : " + widgetDto + "]");
		
		template.convertAndSend("/sub/wadd/" + widgetDto.getDno(), widgetDto);
		
	}
	
	@MessageMapping("/wcrkeyword")
	public void wCrKeywordMessage(Map<String, Object> params) {
			
		logger.info("[ INFO ] : WebSocketController > wCrKeywordMessage [keyword : " + params.get("keyword") + "]");
			
		template.convertAndSend("/sub/wcrkeyword/" + params.get("wno"), params);
		
	}
	
	@MessageMapping("/wplan")
	public void wPlanMessage(WboardDto wboardDto) {
			
		logger.info("[ INFO ] : WebSocketController > wPlanMessage [wboardDto : " + wboardDto + "]");
			
		template.convertAndSend("/sub/wplan/" + wboardDto.getWno(), wboardDto);
		
	}
	
	@MessageMapping("/wbtitleup")
	public void wbTitleUpMessage(WboardDto wboardDto) {
			
		logger.info("[ INFO ] : WebSocketController > wbTitleUpMessage [wboardDto : " + wboardDto + "]");
			
		template.convertAndSend("/sub/wbtitleup/" + wboardDto.getWno(), wboardDto);
		
	}
	
	@MessageMapping("/wbdateup")
	public void wbDateUpMessage(WboardDto wboardDto) {
			
		logger.info("[ INFO ] : WebSocketController > wbDateUpMessage [wboardDto : " + wboardDto + "]");
			
		template.convertAndSend("/sub/wbdateup/" + wboardDto.getWno(), wboardDto);
		
	}
	
	@MessageMapping("/wbcontentup")
	public void wbContentUpMessage(WboardDto wboardDto) {
			
		logger.info("[ INFO ] : WebSocketController > wbContentUpMessage [wboardDto : " + wboardDto + "]");
			
		template.convertAndSend("/sub/wbcontentup/" + wboardDto.getWno(), wboardDto);
		
	}
	
	@MessageMapping("/wbdelete")
	public void wbDeleteMessage(WboardDto wboardDto) {
			
		logger.info("[ INFO ] : WebSocketController > wbDeleteMessage [wboardDto : " + wboardDto + "]");
			
		template.convertAndSend("/sub/wbdelete/" + wboardDto.getWno(), wboardDto);
		
	}
	
	@MessageMapping("/wcode")
	public void wCodeMessage(WEditorDto wEditorDto) {
			
		logger.info("[ INFO ] : WebSocketController > wCodeMessage [wEditorDto : " + wEditorDto + "]");
			
		template.convertAndSend("/sub/wcode/" + wEditorDto.getWno(), wEditorDto);
		
	}
	
	@MessageMapping("/wmarker")
	public void wMarkerMessage(WMapDto wMapDto) {
			
		logger.info("[ INFO ] : WebSocketController > wMarkerMessage [wMapDto : " + wMapDto + "]");
			
		template.convertAndSend("/sub/wmarker/" + wMapDto.getWno(), wMapDto);
		
	}
	
	@MessageMapping("/wmarkerdel")
	public void wMarkerDelMessage(WMapDto wMapDto) {
			
		logger.info("[ INFO ] : WebSocketController > wMarkerDelMessage [wMapDto : " + wMapDto + "]");
			
		template.convertAndSend("/sub/wmarkerdel/" + wMapDto.getWno(), wMapDto);
		
	}
	
	
	@MessageMapping("/addDash")
	public void dAddMessage(DashMemberDto dashMemberDto) {
			
		int mno = memberBiz.selectById(dashMemberDto.getMid()).getMno();
			
		logger.info("[ INFO ] : WebSocketController > dAddMessage [mno : " + mno + "]");
			
		template.convertAndSend("/sub/addDash/" + mno, dashMemberDto);
			
		
	}
	
	@MessageMapping("/delDash")
	public void dDelMessage(DashMemberDto dashMemberDto) {
			
		int mno = memberBiz.selectById(dashMemberDto.getMid()).getMno();
			
		logger.info("[ INFO ] : WebSocketController > dDelMessage [mno : " + mno + "]");
			
		template.convertAndSend("/sub/delDash/" + mno, dashMemberDto);
			
		
	}
	
	@MessageMapping("/upDash")
	public void dUpMessage(DashMemberDto dashMemberDto) {
			
		int mno = memberBiz.selectById(dashMemberDto.getMid()).getMno();
			
		logger.info("[ INFO ] : WebSocketController > dUpMessage [mno : " + mno + "]");
			
		template.convertAndSend("/sub/delDash/" + mno, dashMemberDto);
			
		
	}
	
	
	
	@MessageMapping("/messagealarm")
	public void messageAlarmMessage(MsgDto msgDto) {
		
		int mno = memberBiz.selectById(msgDto.getMsgto()).getMno();
		
		logger.info("[ INFO ] : WebSocketController > messageAlarmMessage [msgDto : " + msgDto + "]");
			
		template.convertAndSend("/sub/messagealarm/" + mno, msgDto);
		
	}
	
}
