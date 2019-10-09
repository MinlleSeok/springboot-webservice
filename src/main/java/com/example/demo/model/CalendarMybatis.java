package com.example.demo.model;

import java.io.Serializable;

import javax.persistence.Entity;

import org.apache.ibatis.type.Alias;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Alias("calendar")
public class CalendarMybatis implements Serializable {
	private Long id;
	private String title;
	private String detail;
	private String START_DATE;
	private String START_TIME;
	private String END_DATE;
	private String END_TIME;
	
}
