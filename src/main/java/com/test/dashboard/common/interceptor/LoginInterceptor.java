package com.test.dashboard.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.test.dashboard.model.dto.MemberDto;

public class LoginInterceptor implements HandlerInterceptor{

	private Logger logger = LoggerFactory.getLogger(LoginInterceptor.class);
	
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
	}
	
	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
	}
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		// TODO Auto-generated method stub
		logger.info("[requestPOST] : " + request.getMethod());
		logger.info("[requestURI] : "+ request.getRequestURI());
		
		if(request.getRequestURI().endsWith("login")) return true;
		else if(request.getRequestURI().endsWith(".js")) return true;
		else if(request.getRequestURI().endsWith(".css")) return true;
		else {
			HttpSession session = request.getSession();
			MemberDto user = (MemberDto) session.getAttribute("user");
			
			if(user == null) response.sendRedirect("login");
			else return true;
			
		}
		
		return false;
	}
	
	
}
