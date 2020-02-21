package com.test.socket.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("chatRoomDto")
@Data
public class ChatRoomDto {
	
	private int roomid;
	private String roomtitle;
	private Date roomdate;
}
