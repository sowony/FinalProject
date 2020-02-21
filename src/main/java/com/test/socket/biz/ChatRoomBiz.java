package com.test.socket.biz;

import java.util.List;

import com.test.socket.dto.ChatRoomDto;

public interface ChatRoomBiz {

	List<ChatRoomDto> selectList();
	
	ChatRoomDto selectOne(int roomid);
	
	int insert(ChatRoomDto dto);

	int update(ChatRoomDto dto);
	
	int delete(int dto);
	
}
