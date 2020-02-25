package com.test.dashboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("wFileDto")
public class WFileDto {

	int wfno;
	int wfwno;
	String wfpath;
	String wffakefname;
	String wfrealfname;
	String wfext;
	
}
