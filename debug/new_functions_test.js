function updateMonthStats(type){
	use server_db;
	var d = new Date();
	
	var stats = {
		joinMonthCounter: 0,
                leftMonthCounter: 0,
		joinDayCounter: 0,
                leftDayCounter: 0,
		sameDay: true,
		sameMonth: true,
		monthDay: d.getDate()
	};

	if (server_db["traffic"].date == undefined){
	    server_db["traffic"].date = JSON.stringify(d);
	    stats[type + "DayCounter"] = 1;
            stats[type + "MonthCounter"] = 1;
	    server_db["traffic"].stats = JSON.stringify(stats);
	}
	else {
		var d2 = JSON.parse(server_db["traffic"].date)
		stats = JSON.parse(server_db["traffic"].stats)
		
		if (d.getDate() == d2.getDate()){ 
			stats[type + "DayCounter"]++;
			stats[type + "MonthCounter"]++;
			stats.sameDay = true;
			stats.sameMonth = true;
			server_db["traffic"].stats = JSON.stringify(stats);
			return server_db["traffic"].dayCounter;
		}
		else if (date.getMonth() == dataDB.getMonth()){
			stats[type + "DayCounter"] = 1;
			stats[type + "MonthCounter"]++;
			stats.sameDay = false;
			stats.sameMonth = true;
			server_db["traffic"].stats = JSON.stringify(stats);
		}
		else {
			stats[type + "DayCounter"] = 1;
			stats[type + "MonthCounter"] = 1;
			stats.sameDay = false;
			stats.sameMonth = false;
			server_db["traffic"].stats = JSON.stringify(stats);			
		}
	}
}

function minutesUntilMidnight() {
    var midnight = new Date();
    midnight.setHours( 24 );
    midnight.setMinutes( 0 );
    midnight.setSeconds( 0 );
    midnight.setMilliseconds( 0 );
    return ( midnight.getTime() - new Date().getTime() ) / 1000 / 60;
}

function isSameDay(a, b) {
    return a.toDateString() == b.toDateString();
}
