package com.test.socket.common.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

@Configuration
@PropertySources({
	@PropertySource("classpath:./properties/oracle.properties")
})
@MapperScan("com.test.socket.dao")
public class ApplicationContext {
	
	@Autowired
	private Environment env;
	
	@Bean
	public BasicDataSource dataSource() {
		BasicDataSource bean = new BasicDataSource();
		bean.setDriverClassName(env.getProperty("jdbc.driver"));
		bean.setUrl(env.getProperty("jdbc.url"));
		bean.setUsername(env.getProperty("jdbc.username"));
		bean.setPassword(env.getProperty("jdbc.password"));
		return bean;
	}
	
	@Bean
	public SqlSessionFactoryBean sqlSession() {
		
		SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
		bean.setDataSource(dataSource());
		bean.setTypeAliasesPackage("com.test.socket.model.dto");
		
		return bean;
	}
	
	@Bean
	public SqlSessionTemplate sqlSessionTemplate() {
		SqlSessionTemplate  bean = null;
		try {
			bean = new SqlSessionTemplate(sqlSession().getObject());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return bean;
	}
	
	@Bean
	public DataSourceTransactionManager dataSourceTransactionManager() {
		return new DataSourceTransactionManager(dataSource());
	}
	
}
