package com.test.dashboard.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.dashboard.model.biz.WMapBiz;
import com.test.dashboard.model.dto.WMapDto;

@Controller
public class MapController {
	
	private Logger logger = LoggerFactory.getLogger(MapController.class);
	
	@Autowired
	private WMapBiz wMapBiz;
	
	@GetMapping("map")
	public String getMap() {
		logger.info("[ INFO ] : MapController");
		
		return "map";
	}
	
	
	
	@PostMapping("map")
	@ResponseBody
	public boolean postMap(@RequestBody WMapDto wMapDto) {
		
		System.out.print(wMapDto);
		
		int res = wMapBiz.insert(wMapDto);
		
		if(res > 0) return true;
		else return false;
		
	}
	
//	@PostMapping("marker")
//	@ResponseBody
//	public Map<K, V> postMarker(){
//		
//		
//		return null;
//	}

}
