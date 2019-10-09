package com.example.demo.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.calendar.CalendarRepository;
import com.example.demo.dto.calendar.CalsMainResponseDto;
import com.example.demo.dto.calendar.CalsSaveRequestDto;
import com.example.demo.model.CalendarMybatis;
import com.example.demo.repository.CalendarMapper;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CalendarService {
	
	private CalendarRepository calendarRepository;
	
	@Autowired
	CalendarMapper calendarMapper;
	
	@Transactional
	public Long save(CalsSaveRequestDto dto) {
		return calendarRepository.save(dto.toEntity()).getId();
	}
	
	@Transactional
	public List<CalsMainResponseDto> findAllDesc() {
		return calendarRepository.findAllDesc()
				.map(CalsMainResponseDto::new)
				.collect(Collectors.toList());
	}
	
	@Transactional
	public List<CalendarMybatis> selectDailyCalendar(String date) {
		return calendarMapper.selectDailyCalendar(date);
	}
	
	@Transactional
	public List<CalendarMybatis> selectMonthlyCalendar(String date) {
		return calendarMapper.selectMonthlyCalendar(date);
	}
}
