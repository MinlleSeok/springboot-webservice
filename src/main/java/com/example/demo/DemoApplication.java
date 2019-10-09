package com.example.demo;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing	// JPA Auditing 활성화
@SpringBootApplication
public class DemoApplication {
	/*
	@RequestMapping("/")
	
	@ResponseBody
	String home() {
		return "Happy Coding!";
	}
	 */
	
	public static final String APPLICATION_LOCATIONS = "spring.config.location="
			+ "classpath:application.yml,"
			+ "/app/config/springboot-calendar/real-application.yml";
	
	public static void main(String[] args) {
		new SpringApplicationBuilder(DemoApplication.class)
			.properties(APPLICATION_LOCATIONS)
			.run(args);
	}
}
