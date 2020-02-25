package com.test.dashboard.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("dashBoardDto")
public class DashBoardDto {
	
	int dno;
	String dtitle;
	String downer;
	String ddesc;
	Date dcreatedate;
	Date dmodifydate;
	
}
