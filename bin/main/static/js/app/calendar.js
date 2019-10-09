/**
 * 
 */
var today = new Date();

var main2 = {
	init : function() {
		$(function() {
			$('[data-toggle="tooltip"]').tooltip()
		});

		$(function() {
			$('#view li:first-child a').tab('show')
		});

		$(function() {
			$('[data-toggle="popover"]').popover().on('inserted.bs.popover')
		});

		$('.day').click(
				function() {
					var year = today.getFullYear();
					var month = (today.getMonth() + 1);
					var day = $(this).children().first().html();
					$('#datetimepicker1 input')
							.val(
									(month < 10 ? '0' + month : month) + '/'
											+ (day < 10 ? '0' + day : day)
											+ '/' + year);
					$('#registerSchedule').modal('show');
				});

		$(".event-consecutive, .event, .event-repeated").click(function(event) {
			event.stopPropagation();
		});

		$(function() {
			$('#datetimepicker1').datetimepicker({
				format : 'L'
			});
			$('#datetimepicker3').datetimepicker({
				format : 'L'
			});
		});

		$(function() {
			$('#datetimepicker2').datetimepicker({
				format : 'LT'
			});
			$('#datetimepicker4').datetimepicker({
				format : 'LT'
			});
		});
	},

	reload : function() {
		$(function() {
			$('[data-toggle="popover"]').popover().on('inserted.bs.popover');

			$(".event-consecutive, .event, .event-repeated").click(
					function(event) {
						event.stopPropagation();
					});
		});
	}
};

var clickAjax = {
	init : function() {
		var _this = this;
		$('.btn-primary').on('click', function() {
			_this.save();
		});
	},
	save : function() {
		
		if (parseInt($('#datetimepicker1 input').val().substring(3,5)) > parseInt($('#datetimepicker3 input').val().substring(3,5)))
			return;
		
		var data = {
			title : $('#recipient-name').val(),
			detail : $('#message-text').val(),
			startDate : $('#datetimepicker1 input').val(),
			startTime : $('#datetimepicker2 input').val(),
			endDate : $('#datetimepicker3 input').val(),
			endTime : $('#datetimepicker4 input').val()
		};

		$.ajax({
			type : 'POST',
			url : '/addCal',
			dataType : 'json',
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(data)
		}).done(function() {
			calendar.printMonthly(today);
			alert('일정이 등록되었습니다.');
			$('#registerSchedule').modal('hide');
		}).fail(function(error) {
			alert(error);
		});
	}
};

var calendar = {

	init : function() {

		var _this = this;
		_this.build(today);
		$('.btn-light').on('click', function() {
			today = new Date();
			_this.build(today);
		});

		$('.ico-arrow a:eq(0)').on('click', function() {
			_this.prev();
		});

		$('.ico-arrow a:eq(1)').on('click', function() {
			_this.next();
		});

		$('#view li:eq(1) a').on('click', function() {
			_this.dailyBuild(today);
		});

	},

	prev : function() {
		var _this = this;
		today = new Date(today.getFullYear(), today.getMonth() - 1, today
				.getDate());
		_this.build(today);
	},

	next : function() {
		var _this = this;
		today = new Date(today.getFullYear(), today.getMonth() + 1, today
				.getDate());
		_this.build(today);
	},

	build : function(today) {
		var _this = this;
		var firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
		var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
		var data = today.getFullYear() + "년 " + (today.getMonth() + 1) + "월";
		$('.calendar-header > h4').html(data);

		var calendar = $('div.monthly-calendar > div.week');
		calendar.remove();

		var count = 0;
		var week = document.createElement("div");
		week.className = 'week';
		document.querySelector('.monthly-calendar').appendChild(week);
		for (i = 0; i < firstDay.getDay(); i++) {
			var day = document.createElement("div");
			day.className = 'day';
			document.querySelector('.monthly-calendar').lastChild
					.appendChild(day);
			var h3 = document.createElement("h3");
			h3.className = 'day-label';
			document.querySelector('.monthly-calendar').lastChild.lastChild
					.appendChild(h3);
			count = count + 1;
		}

		for (i = 1; i <= lastDay.getDate(); i++) {
			var day = document.createElement("div");
			day.className = 'day day'+count%7;
			document.querySelector('.monthly-calendar').lastChild
					.appendChild(day);
			var h3 = document.createElement("h3");
			h3.className = 'day-label';
			h3.innerHTML = i;
			h3.id = "day" + i;
			document.querySelector('.monthly-calendar').lastChild.lastChild
					.appendChild(h3);
			count = count + 1;
			if (count % 7 == 0 && i != lastDay.getDate()) {
				var week = document.createElement("div");
				week.className = 'week';
				document.querySelector('.monthly-calendar').appendChild(week);
			}
		}

		main2.init();
		
		_this.printMonthly(today);
	},

	dailyBuild : function(today) {
		var _this = this;
		var day = "";
		switch (today.getDay()) {
		case 0:
			day = "일요일";
			break;
		case 1:
			day = "월요일";
			break;
		case 2:
			day = "화요일";
			break;
		case 3:
			day = "수요일";
			break;
		case 4:
			day = "목요일";
			break;
		case 5:
			day = "금요일";
			break;
		case 6:
			day = "토요일";
		}

		var data = today.getDate() + "일 " + day;
		$('.daily-calendar > span.day-name').html(data);
		
		_this.printDaily(today);

	},
	
	printMonthly : function (today) {
		var _this = this;
		var monthlyCalendar = $('div.day > div.event-start');
		monthlyCalendar.remove();
		
		var sendData = {
			year : today.getFullYear(),
			month : (today.getMonth() + 1),
			day : today.getDate()
		};

		$.ajax({
			type : 'POST',
			url : '/monthly',
			dataType : 'json',
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(sendData),
			cache : false
			}).done(
				function(resData) {
	
					for (x in resData) {
						
						var dataSpan = parseInt(resData[x].end_DATE.substring(3, 5)) - parseInt(resData[x].start_DATE.substring(3, 5)) + 1;
						var row = document.querySelector('#day' + parseInt(resData[x].start_DATE.substring(3, 5))).parentNode.className.substring(7) + 1;
						
						var compareYear = today.getFullYear();
						var compareMonth = (today.getMonth() + 1);
						var startYear = parseInt(resData[x].start_DATE.substring(6, 10));
						var startMonth = parseInt(resData[x].start_DATE.substring(0, 2));
						var endMonth = parseInt(resData[x].end_DATE.substring(0, 2));
						var eventContent = '<div class="content-line"><div class="event-consecutive-marking"></div><div class="title"><h5>'
							+ resData[x].title
							+ '</h5>'
							+ resData[x].start_DATE
							+ ' – '
							+ resData[x].end_DATE
							+ '</div></div><div class="content-line"><i class="material-icons">notes</i><div class="title">'
							+ resData[x].detail + '</div></div>';
						
						console.log(endMonth + " / " + compareMonth + " / " + startMonth + " / " + compareMonth);
						// 시작 달은 이번 달보다 이전이고, 끝나는 달이 이번 달인 경우
						if ((startMonth < compareMonth && endMonth == compareMonth) || startYear < compareYear) {
							var endDay = parseInt(resData[x].end_DATE.substring(3, 5));
							var selectDay = 1;
							var selectRow = parseInt(document.querySelector('#day'+selectDay).parentNode.className.substring(7)) + 1;
							if (7 - selectRow + 1 < endDay) {
								_this.makeCal(7 - selectRow + 1, selectDay, eventContent, resData[x]);
								selectDay = selectDay + (7 - selectRow + 1);
								endDay = endDay - (7 - selectRow + 1);
								var max = endDay / 7;
								for (i = 0; i <= max; i++) {
									if(endDay > 7) {
										_this.makeCal(7, selectDay, eventContent, resData[x]);
										selectDay = selectDay + 7;
										endDay = endDay - 7;
									} else {
										_this.makeCal(endDay, selectDay, eventContent, resData[x]);
									}
								}
							} else {
								_this.makeCal(7 - selectRow + 1, selectDay, eventContent, resData[x]);
							}
						}
						
						// 시작 달은 이번 달이지만, 끝나는 달은 이후인 경우
						else if ((endMonth > compareMonth && startMonth == compareMonth) || startYear < compareYear) {
							var selectDay = parseInt(resData[x].start_DATE.substring(3, 5));
							var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
							var subDay = lastDay - selectDay;
							var selectRow = parseInt(document.querySelector('#day'+selectDay).parentNode.className.substring(7)) + 1;
							var startValue = 7-selectRow+1;
							if (7 - selectRow + 1 < subDay) {
								_this.makeCal(startValue, selectDay, eventContent, resData[x]);
								selectDay = selectDay + startValue;
								subDay = subDay - startValue;
								var max = subDay / 7;
								
								for (i = 0; i <= max; i++) {
									if(selectDay < lastDay){
										if(subDay > 7) {
											_this.makeCal(7, selectDay, eventContent, resData[x]);
											selectDay = selectDay + 7;
											subDay = subDay - 7;
										} else {
											console.log(selectDay);
											var lastRow = parseInt(document.querySelector('#day'+lastDay).parentNode.className.substring(7)) + 1;
											_this.makeCal(lastRow, selectDay, eventContent, resData[x]);
										}
									}
								}
							} else {
								_this.makeCal(7 - selectRow + 1, selectDay, eventContent, resData[x]);
							}

						}
						
						// 당일 일정
						else if (dataSpan == 1) {
							var selectDay = parseInt(resData[x].start_DATE.substring(3, 5));
							_this.makeCal(1, selectDay, eventContent, resData[x]);
						}
						
						// 시작 달과 끝나는 달이 같은 경우
						else {
							var selectDay = parseInt(resData[x].start_DATE.substring(3, 5));
							var endDay = parseInt(resData[x].end_DATE.substring(3, 5));
							var subDay = endDay - selectDay;
							var selectRow = parseInt(document.querySelector('#day'+selectDay).parentNode.className.substring(7)) + 1;
							var startValue = 7-selectRow+1;
							if (startValue + 1 < subDay) {
								_this.makeCal(startValue, selectDay, eventContent, resData[x]);
								selectDay = selectDay + startValue;
								subDay = subDay - startValue;
								var max = subDay / 7;
								for (i = 0; i <= max; i++) {
									if(subDay > 7) {
										_this.makeCal(7, selectDay, eventContent, resData[x]);
										selectDay = selectDay + 7;
										subDay = subDay - 7;
									} else {
										console.log(selectDay);
										_this.makeCal(subDay+1, selectDay, eventContent, resData[x]);
									}
								}
							} else {
								_this.makeCal(subDay+1, selectDay, eventContent, resData[x]);
							}
						}
					}
	
				}).fail(function(error) {
			alert(error);
		});
	},
	
	makeCal : function (spanData, selectDay, eventContent, resData) {
		var event = document.createElement("div");
		event.className = "event event-consecutive event-start event-end";
		event.setAttribute("data-span", spanData);
		event.innerHTML = resData.title;
		
		document.querySelector('#day'+selectDay).parentNode.appendChild(event);
		
		$('div.day > div.event-start').popover({
			html : true,
			content : eventContent
		}).on('inserted.bs.popover');

		$(".event-consecutive, .event, .event-repeated").click(function(event2) {
			event2.stopPropagation();
		});
	},
	
	printDaily : function (today) {
		
		var dailyCalendar = $('div.daily-calendar > div.event-start');
		dailyCalendar.remove();

		var sendData = {
			year : today.getFullYear(),
			month : (today.getMonth() + 1),
			day : today.getDate()
		};

		$.ajax({
			type : 'POST',
			url : '/daily',
			dataType : 'json',
			contentType : 'application/json; charset=utf-8',
			data : JSON.stringify(sendData),
			cache : false
		})
		.done(
				function(resData) {
	
					for (x in resData) {
						var event = document.createElement("div");
						event.className = "event-consecutive event-start event-end";
						var eventContent = '<div class="content-line"><div class="event-consecutive-marking"></div><div class="title"><h5>'
								+ resData[x].title
								+ '</h5>'
								+ resData[x].start_DATE
								+ ' – '
								+ resData[x].end_DATE
								+ '</div></div><div class="content-line"><i class="material-icons">notes</i><div class="title">'
								+ resData[x].detail + '</div></div>';
						event.innerHTML = resData[x].title;
						document.querySelector('div.daily-calendar')
								.appendChild(event);
						$('div.daily-calendar > .event-start').popover(
								{
									placement : 'left',// left
									html : true,
									content : eventContent
								}).on('inserted.bs.popover');
	
						$(".event-consecutive, .event, .event-repeated")
								.click(function(event2) {
									event2.stopPropagation();
								});
	
					}
	
				}).fail(function(error) {
			alert(error);
		});
	}
};

clickAjax.init();
calendar.init();
