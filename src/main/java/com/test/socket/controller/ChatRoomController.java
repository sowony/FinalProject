package com.test.socket.controller;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.test.socket.biz.ChatRoomBiz;
import com.test.socket.dto.ChatRoomDto;

@RestController
@RequestMapping("/chat")
public class ChatRoomController {

	@Autowired
	private ChatRoomBiz chatRoomBiz;
	
	@GetMapping
	public List<ChatRoomDto> getChatRoomList() {
		return chatRoomBiz.selectList();
	}
	
	@GetMapping("/{roomid}")
	public ChatRoomDto getChatRoom(@PathVariable int roomid) {
		return chatRoomBiz.selectOne(roomid);
	}
	
	@PostMapping
	@ResponseStatus(value = HttpStatus.CREATED)
	public int setChatRoom(ChatRoomDto dto) {
		int res = chatRoomBiz.insert(dto);
		return res;
	}
	
	@PutMapping
	public int editChatRoom(ChatRoomDto dto) {
		int res = chatRoomBiz.update(dto);
		return res;
	}
	
	@DeleteMapping
	public int deleteChatRoom(int nameid) {
		int res = chatRoomBiz.delete(nameid);
		return res;
	}
	
	
}
