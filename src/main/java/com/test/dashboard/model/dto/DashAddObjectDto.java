package com.test.dashboard.model.dto;

import java.util.List;

import lombok.Data;

@Data
public class DashAddObjectDto {

	String dtitle, ddesc;
	DashMemberDto downer;
	List<DashMemberDto> members;
	DashGradeDto[] rules;
	
	
	
}
