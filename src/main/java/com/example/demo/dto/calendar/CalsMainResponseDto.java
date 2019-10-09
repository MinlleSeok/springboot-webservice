package com.example.demo.dto.calendar;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

import com.example.demo.domain.calendar.Calendar;

import lombok.Getter;

@Getter
public class CalsMainResponseDto {
	
	private Long id;
	private String title;
	private String detail;
	private String startDate;
	private String startTime;
	private String endDate;
	private String endTime;
	
	public CalsMainResponseDto(Calendar entity) {
		id = entity.getId();
		title = entity.getTitle();
		detail = entity.getDetail();
		startDate = entity.getStartDate();
		startTime = entity.getStartTime();
		endDate = entity.getEndDate();
		endTime = entity.getEndTime();
	}
	
	private String toStringDateTime(LocalDateTime localDateTime) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		return Optional.ofNullable(localDateTime)
				.map(formatter::format)
				.orElse("");
	}
}
