package com.example.demo.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.example.demo.model.CalendarMybatis;

@Mapper
public interface CalendarMapper {
	
	@Select("SELECT * FROM CALENDAR WHERE START_DATE = #{date}")
	List<CalendarMybatis> selectDailyCalendar(String date);
	
	@Select("SELECT * FROM CALENDAR WHERE START_DATE like #{date} or END_DATE like #{date}")
	List<CalendarMybatis> selectMonthlyCalendar(String date);
}
