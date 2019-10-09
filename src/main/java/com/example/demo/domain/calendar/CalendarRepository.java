package com.example.demo.domain.calendar;

import java.util.stream.Stream;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CalendarRepository extends JpaRepository<Calendar, Long>{
	@Query("SELECT c " +
			"FROM Calendar c " +
			"ORDER BY c.id DESC")
	Stream<Calendar> findAllDesc();
	
}
