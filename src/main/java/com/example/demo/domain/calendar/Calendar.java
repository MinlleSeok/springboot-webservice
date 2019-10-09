package com.example.demo.domain.calendar;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.example.demo.domain.BaseTimeEntity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Calendar extends BaseTimeEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 100, nullable = false)
	private String title;
	
	@Column(columnDefinition = "TEXT", nullable = false)
	private String detail;
	
	@Column(length = 100, nullable = false)
	private String startDate;
	
	@Column(length = 100, nullable = false)
	private String startTime;
	
	@Column(length = 100, nullable = false)
	private String endDate;
	
	@Column(length = 100, nullable = false)
	private String endTime;
	
	@Builder
	public Calendar(Long id, String title, String detail, String startDate, String startTime, String endDate,
			String endTime) {
		this.id = id;
		this.title = title;
		this.detail = detail;
		this.startDate = startDate;
		this.startTime = startTime;
		this.endDate = endDate;
		this.endTime = endTime;
	}
}
