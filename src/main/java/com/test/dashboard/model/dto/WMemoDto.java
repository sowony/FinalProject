package com.test.dashboard.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("wMemoDto")
public class WMemoDto {

	int wmno;
	int wmwno;
	int wmdno;
	String wmtitle;
	String wmcontent;
	Date wmcreatedate;
	Date wmmodifydate;
	
}
