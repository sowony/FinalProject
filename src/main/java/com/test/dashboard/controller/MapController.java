package com.test.dashboard.controller;


import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import com.test.dashboard.common.util.Util;
import com.test.dashboard.model.biz.WMapBiz;
import com.test.dashboard.model.dto.MemberDto;
import com.test.dashboard.model.dto.WMapDto;

import edu.emory.mathcs.backport.java.util.Arrays;

@Controller
public class MapController {

	private Logger logger = LoggerFactory.getLogger(MapController.class);

	@Autowired
	private WMapBiz wMapBiz;

	@GetMapping("map")
	public String getMap() {
		logger.info("[ INFO ] : MapController");
		
		//session.setAttribute("user", new MemberDto());
		
		return "map";
	}
	

	@PostMapping("addLocation")
	@ResponseBody
	public WMapDto addLocation(@RequestBody WMapDto wMapDto, HttpSession session) {

		List<WMapDto> list = wMapBiz.selectList(wMapDto.getWno());
		
		//boolean boolRes = false;
		
		Boolean[] exist = new Boolean[list.size()];
		for(int i = 0; i < list.size(); i++) {
			
		
			if((wMapDto.getWno() == list.get(i).getWno() && wMapDto.getWmapkeyword().equals(list.get(i).getWmapkeyword()) && wMapDto.getWmaplat().equals(list.get(i).getWmaplat()) && wMapDto.getWmaplng().equals(list.get(i).getWmaplng()))) {
				exist[i] = true;
			} else {
				exist[i] = false;
			}
		}
		
		logger.info("배열 : " + Arrays.toString(exist));
		
		if(!(Arrays.asList(exist).contains(true))) {
			
			MemberDto user = (MemberDto) session.getAttribute("user");
			wMapDto.setMid(user.getMid());
			wMapDto.setWmapmemo(Util.brChange(wMapDto.getWmapmemo()));
			int res = wMapBiz.insert(wMapDto);
			WMapDto insertRes = wMapBiz.select(wMapDto.getWmapno());
			if(res > 0) {
				return insertRes;
			} 
		}
		return null;
		
	}
	
	@PostMapping("update")
	@ResponseBody
	public WMapDto updateMemo(WMapDto wMapDto, HttpSession session) {
		
		logger.info(wMapDto.getWmapmemo());
		
		MemberDto user = (MemberDto) session.getAttribute("user");
		
		wMapDto.setWmapmemo(Util.brChange(wMapDto.getWmapmemo()));
		wMapDto.setMid(user.getMid());
		
		int res = wMapBiz.update(wMapDto);
		WMapDto updateRes = wMapBiz.select(wMapDto.getWmapno());
		if(res > 0) {
			return updateRes;
		} else {
			return null;
		}
		
	}
	
	@PostMapping("delete")
	@ResponseBody
	public boolean deleteLocation(@RequestBody Map<Object, Integer> map) {
		
		int wmapno = map.get("temp");
		
		int res = wMapBiz.delete(wmapno);
		
		if(res > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	
	@GetMapping("marker/{wno}")
	@ResponseBody
	public List<WMapDto> postMarker(@PathVariable int wno) {

		List<WMapDto> list = wMapBiz.selectList(wno);
		
		return list;
	}
	

}
