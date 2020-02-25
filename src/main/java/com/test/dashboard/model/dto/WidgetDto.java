package com.test.dashboard.model.dto;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("widgetDto")
public class WidgetDto {
	
	int wno;
	int wdno;
	String wcategory;
	String wtitle;
	String wowner;
	String wmid;
	int wmingrade;
	int wmaxgrade;
	int wleft, wtop, wwidth, wheight, wzindex;
	String wcontentrgb;
	String wtitlergb;
	String wposition;
	Date wdate;
	
}
