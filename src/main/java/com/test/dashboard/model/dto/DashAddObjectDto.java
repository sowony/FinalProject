package com.test.dashboard.model.dto;

import java.util.Map;

import lombok.Data;

@Data
public class DashAddObjectDto {

	String dtitle, ddesc;
	Map<String, Object>[] member;
	DashGradeDto[] rule;
	
	
	
}
