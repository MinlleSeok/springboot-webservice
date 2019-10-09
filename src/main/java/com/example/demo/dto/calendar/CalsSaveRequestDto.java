package com.example.demo.dto.calendar;


import com.example.demo.domain.calendar.Calendar;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CalsSaveRequestDto {

	private String title;
	private String detail;
	private String startDate;
	private String startTime;
	private String endDate;
	private String endTime;
	
	@Builder
	public CalsSaveRequestDto(String title, String detail, String startDate, String startTime, String endDate,
			String endTime) {
		this.title = title;
		this.detail = detail;
		this.startDate = startDate;
		this.startTime = startTime;
		this.endDate = endDate;
		this.endTime = endTime;
	}
	
	public Calendar toEntity() {
		return Calendar.builder()
				.title(title)
				.detail(detail)
				.startDate(startDate)
				.startTime(startTime)
				.endDate(endDate)
				.endTime(endTime)
				.build();
	}
}
