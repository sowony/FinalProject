package com.test.dashboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("wEditorDto")
public class WEditorDto {
	
	private int weno;
	private int wno;
	private String wecontent;
	
	
	// 참고용
	
	private String mid;
	private String status;

}
