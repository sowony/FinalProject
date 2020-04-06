package com.test.dashboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("msgDto")
@Data
public class MsgDto {
	
	// 쪽지 

	    // 쪽지 고유번호 
	    private int msgno;

	    // 쪽지 발송인 
	    private String msgfrom;

	    // 쪽지 수신인 
	    private String msgto;

	    // 쪽지 보낸 날짜 
	    private String msgdate;

	    // 쪽지 개봉 여부(y/n) 
	    private String msgopened;
	    
	    // 대쉬보드 번호
	    private int dno;

	    // 쪽지 내용 
	    private String msgcontent;

	    // 쪽지 제목 
	    private String msgtitle;

	    // join용
	    private String msgtonick;
	    
	    private String msgfromnick;
}
