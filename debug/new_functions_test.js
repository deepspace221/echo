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
		currentDay: d.getDate(),
		joinYear: [],
		leftYear: []
	};

	if (server_db["traffic"] == undefined){
	    var obj = {};
	    stats[type + "DayCounter"] = 1;
            stats[type + "MonthCounter"] = 1;
	    obj.stats = stats;
            obj.date = {day: d.getDate(), month: d.getMonth()}; 
	    server_db["traffic"] = JSON.stringify(obj);
	}
	else {
		var d2 = JSON.parse(server_db["traffic"]).date;
		stats = JSON.parse(server_db["traffic"]).stats;
		
		if (d.getDate() == d2.day){ 
			stats[type + "DayCounter"]++;
			stats[type + "MonthCounter"]++;
			stats.sameDay = true;
			stats.sameMonth = true;
			server_db["traffic"] = JSON.stringify({stats: stats, date: d2});
			return false;
		}
		else if (d.getMonth() == d2.month){
			stats[type + "DayCounter"] = 1;
			stats[type + "MonthCounter"]++;
			stats.sameDay = false;
			stats.sameMonth = true;
			d2.day = d.getDate();
			server_db["traffic"] = JSON.stringify({stats: stats, date: d2});
			return "new month";

		}
		else {
			stats[type + "Year"].push(stats[type + "MonthCounter"]);
			stats[type + "DayCounter"] = 1;
			stats[type + "MonthCounter"] = 1;
			stats.sameDay = false;
			stats.sameMonth = false;
			d2 = {day: d.getDate(), month: d.getMonth()};
			server_db["traffic"] = JSON.stringify({stats: stats, date: d2});
			return "new year";	
		}
	}
}


function minutesUntilMidnight() {
    var midnight = new Date();
    midnight.setHours( 24 );
    midnight.setMinutes( 0 );
    midnight.setSeconds( 0 );
    midnight.setMilliseconds( 0 );
    return Math.floor((midnight.getTime() - new Date().getTime())/1000/60);
}

function isSameDay(a, b) {
    return a.toDateString() == b.toDateString();
}
