package com.test.dashboard.model.dto;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("dashGradeDto")
public class DashGradeDto {

	int dgno;
	int dgdno;
	int dggrade;
	String dgalias;
	
}
