package com.test.dashboard.model.dto;

import java.util.Map;

import lombok.Data;

@Data
public class DashAddObjectDto {

	String dtitle, ddesc;
	Map<String, Object> downer;
	Map<String, Object>[] members;
	DashGradeDto[] rules;
	
	
	
}
