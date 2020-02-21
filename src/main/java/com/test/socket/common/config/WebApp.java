package com.test.socket.common.config;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.apache.ibatis.ognl.enhance.ContextClassLoader;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

public class WebApp implements WebApplicationInitializer{

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		// TODO Auto-generated method stub
		
		AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext();
		
		applicationContext.register(ApplicationContext.class);
		
		servletContext.addListener(new ContextLoaderListener(applicationContext));
		
		AnnotationConfigWebApplicationContext dipatcherContext = new AnnotationConfigWebApplicationContext();
		
		dipatcherContext.setConfigLocation("com.test.socket.common.config.servletconfig");
		

		ServletRegistration.Dynamic dispatcher = servletContext.addServlet("appServlet", new DispatcherServlet(dipatcherContext));
		
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping("/");
		
		FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encodingFilter", new CharacterEncodingFilter("UTF-8", true));
		encodingFilter.addMappingForUrlPatterns(null, true, "/*");
	}
	
}
