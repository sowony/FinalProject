package com.test.dashboard.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.dashboard.model.biz.DashBoardBiz;
import com.test.dashboard.model.biz.DashGradeBiz;
import com.test.dashboard.model.biz.DashMemberBiz;
import com.test.dashboard.model.dto.DashAddObjectDto;
import com.test.dashboard.model.dto.DashBoardDto;
import com.test.dashboard.model.dto.DashGradeDto;
import com.test.dashboard.model.dto.DashMemberDto;
import com.test.dashboard.model.dto.MemberDto;

@RestController
@RequestMapping("/mypage")
public class MyPageController {
	
	@Autowired
	private DashBoardBiz dashBoardBiz;
	
	@Autowired
	private DashMemberBiz dashMemberBiz;
	
	@Autowired
	private DashGradeBiz dashGradeBiz;
	
	private Logger logger = LoggerFactory.getLogger(MyPageController.class);

	
	@GetMapping("/dashboard")
	public List<DashBoardDto> getDashBoard(HttpSession session) {
		
		logger.info("[ INFO ] : MyPageController > getDashBoard [path : /mypage/dashboard]");
		
		MemberDto user = (MemberDto) session.getAttribute("user");
		
		return dashBoardBiz.selectByBelong(user.getMid());
		
	}
	
	@GetMapping("/dashboard/{dno}")
	public DashBoardDto getDashBoardOne(@PathVariable int dno) {
		logger.info("[ INFO ] : MyPageController > getDashBoardOne [path : /mypage/dashboard/"+ dno +"]");
		
		return dashBoardBiz.selectOne(dno);
	}
	
	@GetMapping("/dashboard/modify/{dno}")
	public Map<String, Object> getDashBoardModify(@PathVariable int dno) {
		logger.info("[ INFO ] : MyPageController > getDashBoardOne [path : /mypage/dashboard/"+ dno +"]");
		
		Map<String, Object> output = new HashMap<String, Object>();
		
		DashBoardDto dashBoardDto = dashBoardBiz.selectOne(dno);
		
		List<DashMemberDto> dashMemberDtos = dashMemberBiz.selectList(dno);
		
		List<DashGradeDto> dashGradeDtos = dashGradeBiz.selectList(dno);
		
		output.put("dashBoardDto",dashBoardDto);
		output.put("members",dashMemberDtos);
		output.put("rules",dashGradeDtos);
		
		return output;
	}
	
	@PostMapping("/dashboard/modify")
	public DashAddObjectDto postDashBoardModify(@RequestBody DashAddObjectDto dashAddObjectDto, HttpSession session) throws SQLException {
		
		logger.info("[ INFO ] : MyPageController > postDashBoardModify [dashAddObjectDto : "+ dashAddObjectDto +"]");
		
		MemberDto user = (MemberDto) session.getAttribute("user");
		
		DashBoardDto dashBoardDto = dashAddObjectDto.getDashBoardDto();
		
		dashBoardDto.setDdesc(dashAddObjectDto.getDdesc());
		dashBoardDto.setDtitle(dashAddObjectDto.getDtitle());
		
		logger.info("[ INFO ] DashInfo :" + dashBoardDto);
		
		int res = dashBoardBiz.update(dashBoardDto);
		
		logger.info("[ INFO ] dashboardModifyRes :" + res);
		
		int dno;
		
		if(res == 1) {
			
			logger.info("[ INFO ] DashBoardNum :" + dashBoardDto.getDno());
			
			dno = dashBoardDto.getDno();
		
		} else {
			
			return null;
		
		}
		
		DashMemberDto downer = dashAddObjectDto.getDowner();
		
		DashMemberDto oldOwner = dashMemberBiz.selectById(dno, user.getMid());
		
		downer.setDmno(oldOwner.getDmno());
		downer.setMid(user.getMid());
		downer.setMnick(user.getMnick());

		dashAddObjectDto.getMembers().add(downer);
		
		dashMemberBiz.dnoMemberDel(dno);
		dashGradeBiz.dnoGradeAllDel(dno);
		
		logger.info("[ INFO ] DashBoard 초기화");
		
		for(DashGradeDto out : dashAddObjectDto.getRules()) {
			
			out.setDno(dno);
			
			logger.info("[ INFO ] DashGradeList :" + out);
			
			
			res = dashGradeBiz.insert(out);
		
		}
		
		for(DashMemberDto out : dashAddObjectDto.getMembers()) {
			logger.info("[ INFO ] DashMemberList :" + out);
		}
		
		res = dashMemberBiz.insert(dashAddObjectDto.getMembers(), dno);
		
		if(res == 1) {
			
			logger.info("[ INFO ] DashBoard Modify");
			return dashAddObjectDto;
		
		} else {
			
			return null;
			
		}
		
	}
	
	@GetMapping("/dashboard/delete/{dno}")
	public List<DashMemberDto> getDashBoardDel(@PathVariable int dno) {
		logger.info("[ INFO ] : MyPageController > getDashBoardDel [path : /mypage/dashboard/delete/"+ dno +"]");
		
		int res = dashBoardBiz.updateDel(dno);
		
		if( res > 0) {
			return dashMemberBiz.selectList(dno);
		} else {
			return null;
		}
	}
	
	@PostMapping("/dashboard")
	public DashAddObjectDto postDashBoard(@RequestBody DashAddObjectDto dashAddObjectDto, HttpSession session) throws SQLException {
		
		logger.info("[ INFO ] : MyPageController > postDashBoard [path : /mypage/dashboard]");
		
		MemberDto user = (MemberDto) session.getAttribute("user");
		
		logger.info("" + dashAddObjectDto);
		
		DashBoardDto dashBoardDto = new DashBoardDto();
		
		dashBoardDto.setDdesc(dashAddObjectDto.getDdesc());
		dashBoardDto.setMid(user.getMid());
		dashBoardDto.setDtitle(dashAddObjectDto.getDtitle());
		
		logger.info("[ INFO ] DashInfo :" + dashBoardDto);
		
		int res = dashBoardBiz.insert(dashBoardDto);
		
		logger.info("[ INFO ] dashboardcreateres :" + res);
		
		dashAddObjectDto.setDashBoardDto(dashBoardDto);
		
		int dno;
		
		if(res == 1) {
			
			logger.info("[ INFO ] DashBoardNum :" + dashBoardDto.getDno());
			
			dno = dashBoardDto.getDno();
		
		} else {
			
			return null;
		
		}
		
		for(DashGradeDto out : dashAddObjectDto.getRules()) {
			
			logger.info("[ INFO ] DashGradeList :" + out);
			
			out.setDno(dno);
			
			res = dashGradeBiz.insert(out);
		
		}
		
		DashMemberDto downer = dashAddObjectDto.getDowner();
		
		downer.setMid(user.getMid());
		downer.setMnick(user.getMnick());
		
		dashAddObjectDto.getMembers().add(downer);
		
		for(DashMemberDto out : dashAddObjectDto.getMembers()) {
			logger.info("[ INFO ] DashMemberList :" + out);
		}
		
		res = dashMemberBiz.insert(dashAddObjectDto.getMembers(), dno);
		
		if(res == 1) {
			
			logger.info("[ INFO ] DashBoard Create");
			return dashAddObjectDto;
		
		} else {
			
			return null;
			
		}

	}
	
	
}
