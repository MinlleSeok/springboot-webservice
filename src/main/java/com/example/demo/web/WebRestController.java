package com.example.demo.web;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.core.env.Environment;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.calendar.CalsMainResponseDto;
import com.example.demo.dto.calendar.CalsSaveRequestDto;
import com.example.demo.dto.posts.PostsSaveRequestDto;
import com.example.demo.model.CalendarMybatis;
import com.example.demo.service.CalendarService;
import com.example.demo.service.PostsService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class WebRestController {
	
	private PostsService postsService;
	private CalendarService calendarService;
	private Environment env;
	
	/*
	@GetMapping("/greeting")
	public String greeting(@RequestParam(name="name", required=false, defaultValue="World") String name, Model model) {
		model.addAttribute("name", name);
		return "greeting";
	}*/
	
	@GetMapping("/profile")
	public String getProfile () {
		return Arrays.stream(env.getActiveProfiles())
				.findFirst()
				.orElse("");
	}
	
	@PostMapping("/posts")
	public Long savePosts(@RequestBody PostsSaveRequestDto dto) {
		return postsService.save(dto);
	}

	@PostMapping("/addCal")
	public Long saveCals(@RequestBody CalsSaveRequestDto dto) {
		return calendarService.save(dto);
	}
	
	@PostMapping("/daily")
	public @ResponseBody List<CalendarMybatis> daily(@RequestBody Map<String, Integer> map) {
		String date = map.get("month")+"/"+(map.get("day") < 10 ? "0"+map.get("day"):map.get("day"))+"/"+map.get("year");
		System.out.println(date);
		List<CalendarMybatis> cal = calendarService.selectDailyCalendar(date);
		return cal;
	}
	
	@PostMapping("/monthly")
	public @ResponseBody List<CalendarMybatis> monthly(@RequestBody Map<String, Integer> map) {
		String date = map.get("month")+"/%/"+map.get("year");
		System.out.println(date);
		List<CalendarMybatis> cal = calendarService.selectMonthlyCalendar(date);
		return cal;
	}
}