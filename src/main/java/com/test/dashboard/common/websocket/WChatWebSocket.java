package com.test.dashboard.common.websocket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WChatWebSocket implements WebSocketMessageBrokerConfigurer{

	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		// TODO configureMessageBroker method active
		registry.enableSimpleBroker("/wchat_sub");
		registry.setApplicationDestinationPrefixes("/wchat_pub");
	}
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		// TODO endpoint method active
		registry.addEndpoint("/wchatbroker").setAllowedOrigins("*").withSockJS();
	}
	
	@Override
	public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
		// TODO configureWebSocketTransport init
		registry.setSendTimeLimit(15*1000);
	}
	
}
