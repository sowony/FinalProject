package com.test.dashboard.common.config;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.filter.HiddenHttpMethodFilter;
import org.springframework.web.servlet.DispatcherServlet;

import com.test.dashboard.common.filter.LogFilter;

public class WebAppConfig  implements WebApplicationInitializer{

	@Override
	public void onStartup(ServletContext servletContext) throws ServletException {
		// TODO WebAppConfig init
		
		AnnotationConfigWebApplicationContext applicationContext = new AnnotationConfigWebApplicationContext();
		
		applicationContext.register(ApplicationContent.class);
				
		servletContext.addListener(new ContextLoaderListener(applicationContext));

		AnnotationConfigWebApplicationContext dispatcherServlet = new AnnotationConfigWebApplicationContext();

		dispatcherServlet.setConfigLocations("com.test.dashboard.common.config.dispatcherservlet");
		
		ServletRegistration.Dynamic dispatcher = servletContext.addServlet("appServlet", new DispatcherServlet(dispatcherServlet));
		
		dispatcher.setLoadOnStartup(1);
		dispatcher.addMapping("/");
		
		FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encodingFilter", new CharacterEncodingFilter("UTF-8",true));
		encodingFilter.addMappingForServletNames(null, true, "/*");
		
		FilterRegistration.Dynamic hiddenHttpMethodFilter = servletContext.addFilter("hiddenHttpMethodFilter",new HiddenHttpMethodFilter());
		hiddenHttpMethodFilter.addMappingForServletNames(null, true, "/*");
		
		FilterRegistration.Dynamic logFilter = servletContext.addFilter("logFilter", new LogFilter());
		logFilter.addMappingForServletNames(null, true, "/*");
		
	}
	
}
