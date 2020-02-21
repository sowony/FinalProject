package com.test.socket.dto;

import java.awt.TrayIcon.MessageType;

import lombok.Data;

@Data
public class MessageDto {

	private String chatRoomId;
    private String writer;
    private String message;
}

