package com.test.dashboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.dashboard.model.biz.WEditorBiz;
import com.test.dashboard.model.dto.WEditorDto;

@Controller
public class EditorController {
	private Logger logger = LoggerFactory.getLogger(EditorController.class);
	
	@Autowired
	private WEditorBiz wEditorBiz;
	
	@GetMapping("weditor")
	public String getEditor() {
		logger.info("editor 오픈");
		
		return "weditor";
		
	}
	
//	@PostMapping("selectEditor")
//	@ResponseBody
//	public WEditorDto select() {
//		WEditorDto dto = wEditorBiz.select(1);
//		return dto;
//		
//	}
//	
//	
//	@PostMapping("insertEditor")
//	@ResponseBody
//	public boolean insertEditor(@RequestBody WEditorDto wEditorDto) {
//		
//		//logger.info(wEditorDto.getWecontent());
//		System.out.println(wEditorDto.getWecontent());
//		int res = wEditorBiz.insert(wEditorDto);
//		
//		if(res>0) {
//			return true;
//		} else {
//			return false;
//		}
//		
//	}

}
