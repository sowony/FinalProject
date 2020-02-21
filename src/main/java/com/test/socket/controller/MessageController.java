package com.test.socket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.test.socket.dto.LocationDto;
import com.test.socket.dto.MessageDto;

@Controller
public class MessageController {

	private final SimpMessagingTemplate template;
	
	@Autowired
	public MessageController(SimpMessagingTemplate template) {
		// TODO Auto-generated constructor stub
		this.template = template;
	}
	
	@MessageMapping("/chat/join")
    public void join(MessageDto message) {
		System.out.println(message);
        message.setMessage(message.getWriter() + "님이 입장하셨습니다.");
        template.convertAndSend("/sub/chat/room/"+message.getChatRoomId(), message);
    }

    @MessageMapping("/chat/message/{id}")
    public void message(MessageDto message) {
    	System.out.println(message);
        template.convertAndSend("/sub/chat/room/"+message.getChatRoomId(), message);
    }
    
    @MessageMapping("/box/location")
    public void location(LocationDto location) {
    	System.out.println(location);
    	template.convertAndSend("/sub/location", location);
    }
    
}
