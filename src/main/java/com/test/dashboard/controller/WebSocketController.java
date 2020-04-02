package com.test.dashboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.test.dashboard.model.dto.WChatDto;

@Controller
public class WebSocketController {

	private Logger logger = LoggerFactory.getLogger(WebSocketController.class);
	
	@Autowired
	private SimpMessagingTemplate template;

	@MessageMapping("/chat/send")
	public void wChatMessage(WChatDto wChatDto) {

		logger.info("[ INFO ] : WebSocketController > wChatMessage [wChatDto : " + wChatDto + "]");

		template.convertAndSend("/wchat_sub/room/" + wChatDto.getWno(), wChatDto);
	
	}

	
	
}
