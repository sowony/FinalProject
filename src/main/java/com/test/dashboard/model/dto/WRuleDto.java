package com.test.dashboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("wRuleDto")
public class WRuleDto {

	int wrno;
	int wrwno;
	String wrcate;
	int wrrwd;
	String wrmid;
	int wrminno;
	int wrmaxno;
	
}
