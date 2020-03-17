package com.test.dashboard.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MapController {
	
	private Logger logger = LoggerFactory.getLogger(MapController.class);
	
	@GetMapping("map")
	public String getMap() {
		logger.info("[ INFO ] : MapController");
		return "map";
	}
	
	

}
