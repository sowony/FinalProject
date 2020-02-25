package com.test.dashboard.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Alias("memberDto")
@Data
public class MemberDto {
	
	int mno;
	String mid;
	String mnick;
	String mpw;
	String memail;
	String maddr;
	int mphone;
	String mabout;
	String mimgpath;
	String mgrade;
	Date mcreatedate;
	String mdel;
	
}
