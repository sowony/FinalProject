package com.test.dashboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("dashMemberDto")
public class DashMemberDto {

	int dmno;
	int dmdno;
	String dmmid;
	int dmgrade;
	
}
