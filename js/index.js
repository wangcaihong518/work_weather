$(function(){
	// 获取当前城市的天气信息
	let wea ;
	$.ajax({
		type: "GET",
		url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
		dataType: "jsonp",
		success:function(obj){
			wea = obj.data;
			upDate(wea);
			console.log(wea);
		}
	});
	// 天气情况的获取
	
	function upDate(wea){
		// 头部的情况
		$(".city span:first").html(wea.city);
		$(".air p:last").html(wea.weather.quality_level);
		$(".deg span:first").html(wea.weather.current_temperature);
		$(".status").html(wea.weather.dat_condition);
		$(".des span:first").html(wea.weather.wind_direction);
		$(".des span:last").html(wea.weather.wind_level+"级");
		// 今天的天气状况
		$(".d_a_t .today p.top span:last-child i:first").html(wea.weather.dat_high_temperature);
		$(".d_a_t .today p.top span:last-child i:nth-child(2)").html(wea.weather.dat_low_temperature);
		$(".d_a_t .today p.bottom").html(wea.weather.dat_condition);
		$(".d_a_t img").attr("src","./img/"+wea.weather.dat_weather_icon_id+".png");
		// 明天
		$(".d_a_t .tomorrow p.top span:last-child i:first").html(wea.weather.tomorrow_high_temperature);
		$(".d_a_t .tomorrow p.top span:last-child i:nth-child(2)").html(wea.weather.tomorrow_low_temperature);
		$(".d_a_t .tomorrow p.bottom").html(wea.weather.tomorrow_condition);
		$(".d_a_t img").attr("src","./img/"+wea.weather.tomorrow_weather_icon_id+".png");

		// eve_hour
		let hours = wea.weather.hourly_forecast;
		hours.forEach(function(value,index){
				let str =`<li>
							<p class="hour">${value.hour}:00</p>
							<img src="./img/${value.weather_icon_id}.png">
							<p class="deg">${value.temperature}</p>
						</li>`;
				$(".eve_hour").append(str);

		});
		// eve_day
		let eve_day = wea.weather.forecast_list;
		eve_day.forEach(function(value,index){
			let dd =value.date.slice(5,10).replace("-","/");
			let str = `<li>
						<p class="style">昨天</p>
						<p class="date">${dd}</p>
						<p class="des">${value.condition}</p>
						<img src="">
						<p class="deg">${value.high_temperature}<sup>°</sup></p>
						<p class="deg">${value.low_temperature}<sup>°</sup></p>
						<img src="">
						<p class="des">多云</p>
						<p class="style">${value.wind_direction}</p>
						<p class="style"><span>${value.wind_level}</span>级</p>
					</li>`;
			$(".eve_day").append(str);
		});	
		
	}
	

	// 获取当前城市的信息
	let city;
	$.ajax({
		type:"GET",
		url:"https://www.toutiao.com/stream/widget/local_weather/city/",
		dataType:"jsonp",
		success:function(mes){
			city=mes.data;
			upDateCity(city);
			// console.log(city);
		}
	});

	// 页面显示与隐藏
	$(".city").click(function(){
		$(".wea").css({"display":"none"});
		$(".search").css({"display":"block"});
	});
	$(".search .top .h_bottom button").click(function(){
		console.log($(this).html());
		if($(this).html()=="取消"){
			$(".wea").css({"display":"block"});
			$(".search").css({"display":"none"});
		}
		
	});
	function upDateCity(city){
		let k=0;
		for(let i in city){
			let str = `<div class="hotsenic_text">${i}</div>
						<ul class="hotscenic1">
						</ul>`;
			$(".wrap").append(str);
			for(let j in city[i]){
				let str1 =`<li>${j}</li>`;
				$(".hotscenic1").eq(k).append(str1);
			}
			k++;
		}
	}
	function ajaxs(con){
		let url1 =`https://www.toutiao.com/stream/widget/local_weather/data/?city=${con}`;
		$.ajax({
			type: "GET",
			url: url1,
			dataType:"jsonp",
			success:function(obj){
				let tianqi2 = obj.data;
				upDate(tianqi2);
			}
		});
	}

	// 点击每一个城市
	$("body").delegate(".hotscenic1 li","click",function(){
		$(".search").css({"display":"none"});
		$(".wea").css({"display":"block"});
		let con = $(this).html();
		$(".city").html(con);
		ajaxs(con);

	});
	

	
	$("input").focus(function(){
		$(".search .top .h_bottom button").html("搜索");
		$(this).attr("placeholder","");
		$(".search .top .h_bottom button").click(function(){
			let ct = $("input").val();
			for(let i in city){
				for(let j in city[i]){
					if(ct==j){
						$(".search").css({"display":"none"});
						$(".wea").css({"display":"block"});
						ajaxs(ct);
						$("input").val("");
					}
				}

			}
			$(".search").css({"display":"block"});
			$(".wea").css({"display":"none"});
			alert("请输入正确的城市");
			$("input").val("");
			
		});

	});
	$("input").blur(function(){
		$(".search .top .h_bottom button").html("取消");
		$(this).attr("placeholder","搜索市、区、县等");
	});
	

});
