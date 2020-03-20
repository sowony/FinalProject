package com.test.dashboard.controller;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.test.dashboard.model.biz.DashBoardBiz;
import com.test.dashboard.model.biz.DashGradeBiz;
import com.test.dashboard.model.biz.DashMemberBiz;
import com.test.dashboard.model.biz.MemberBiz;
import com.test.dashboard.model.dto.DashAddObjectDto;
import com.test.dashboard.model.dto.DashBoardDto;
import com.test.dashboard.model.dto.DashGradeDto;
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
	
	@PostMapping("/dashboard")
	public boolean postDashBoard(@RequestBody DashAddObjectDto dashAddObjectDto, HttpSession session) throws SQLException {
//		
//		logger.info("[ INFO ] : MyPageController > postDashBoard [path : /mypage/dashboard]");
//		
//		MemberDto user = (MemberDto) session.getAttribute("user");
//		
//		DashBoardDto dashBoardDto = new DashBoardDto();
//		
//		dashBoardDto.setDdesc(dashAddObjectDto.getDdesc());
//		dashBoardDto.setMid(user.getMid());
//		dashBoardDto.setDtitle(dashAddObjectDto.getDtitle());
//		
//		logger.info("[ INFO ] DashInfo :" + dashBoardDto);
//		
//		int res = dashBoardBiz.insert(dashBoardDto);
//		
//		int dno;
//		
//		if(res == 1) {
//			
//			logger.info("[ INFO ] DashBoardNum :" + dashBoardDto.getDno());
//			
//			dno = dashBoardDto.getDno();
//		
//		} else {
//			
//			return false;
//		
//		}
//		
//		for(DashGradeDto out : dashAddObjectDto.getRules()) {
//			
//			logger.info("[ INFO ] DashGradeList :" + out);
//			
//			out.setDno(dno);
//			
//			res = dashGradeBiz.insert(out);
//		
//		}
//		
//				
//		for(Map<String, Object> out : dashAddObjectDto.getMembers()) {
//			logger.info("[ INFO ] DashMemberList :" + out);
//		}
//		
//		res = dashMemberBiz.insert(dashAddObjectDto.getMembers(), dno);
//		
//		if(res == 1) {
//			logger.info("[ INFO ] DashBoard Create");
//			return true;
//		} else {
//			return false;
//		}

		logger.info("[ INFO ] : MyPageController > postDashBoard | " + dashAddObjectDto);
		
		return true;
	}
	
	
}
