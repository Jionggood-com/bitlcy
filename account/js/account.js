grid_yaxis_tracker();
function grid_yaxis_tracker(){
	var clicks = [];
	var _clicks = [];
	$(".grid_yaxis_tracker b").each(function(){
		if($(this).parents(".clicks_box").length>0)
		{
			_clicks.push($(this).find("i").attr("clicks"));
		}
		else
		{
			clicks.push($(this).find("i").attr("clicks"));
		}
	});
	clicks.sort(function(clicks1, clicks2) {
	  return clicks2 - clicks1;
	});
	_clicks.sort(function(_clicks1, _clicks2) {
	  return _clicks2 - _clicks1;
	});
	var maxNum = clicks[0];
	var _maxNum = _clicks[0];
	var maxNumAuto = 5;
	var maxX = Math.ceil(maxNum/maxNumAuto);
	var _maxNumAuto = 5;
	var _maxX = Math.ceil(_maxNum/_maxNumAuto);
	
	if(maxNum<maxNumAuto*maxX+1)
	{
		maxNumAuto = 5;
	}
	if(maxNum<maxNumAuto*maxX+1){
		maxNumAuto = maxNumAuto*maxX;
	}
	if(_maxNum<_maxNumAuto*_maxX+1)
	{
		_maxNumAuto = 5;
	}
	if(_maxNum<_maxNumAuto*_maxX+1){
		_maxNumAuto = _maxNumAuto*_maxX;
	}
	var maxCountry = $(".highcharts_timezone .legend u").children().eq(1).children().length;
	for(var i=0;i<maxCountry;i++){
		$(".highcharts_grid .grid_svg").append('<g class="c'+i+'"></g>');
	}
	
	$(".highcharts_grid").each(function(){
		if($(this).parents(".clicks_box").length>0){
			$(this).find(".grid_yaxis_num").empty();
			if(_maxNum<_maxNumAuto+1)
			{
				var l = _maxNumAuto/5;
				for(var i=0;i<6;i++)
				{	
					$(this).find(".grid_yaxis_num").prepend('<i>'+l*i+'</i>');
				}
			}
		}
		else{
			$(this).find(".grid_yaxis_num").empty();
			if(maxNum<maxNumAuto+1)
			{
				var l = maxNumAuto/5;
				for(var i=0;i<6;i++)
				{	
					$(this).find(".grid_yaxis_num").prepend('<i>'+l*i+'</i>');
				}
			}
		}
		
	});
	
	$(".highcharts_grid .grid_line i").each(function(){
		var i_length = $(this).parent().find("i").length;	
		
		if($(this).parents(".clicks_box").length>0)
			{
				var gridLineHeight = $(this).parent().outerHeight();
				$(this).css({"padding-top":(gridLineHeight-i_length)/(i_length*2-1),"padding-bottom":(gridLineHeight-i_length)/(i_length*2-1)});
				$(this).parents(".highcharts_grid").find(".grid_yaxis_num i").css({"height":(gridLineHeight-i_length)/(i_length*2-1)*2+1,"line-height":1+(gridLineHeight-i_length)/(i_length*2-1)*2+'px'});
				$(this).parents(".highcharts_grid").find(".grid_yaxis_tracker").css({"top":$(".grid_yaxis_num i").height()/2,"height":$(".grid_yaxis_num i").height()*5});
			}
			else{
				var gridLineHeight = $(this).parent().outerHeight();
				$(this).css({"padding-top":(gridLineHeight-i_length)/(i_length*2-1),"padding-bottom":(gridLineHeight-i_length)/(i_length*2-1)});
				$(this).parents(".highcharts_grid").find(".grid_yaxis_num i").css({"height":(gridLineHeight-i_length)/(i_length*2-1)*2+1,"line-height":1+(gridLineHeight-i_length)/(i_length*2-1)*2+'px'});
				$(this).parents(".highcharts_grid").find(".grid_yaxis_tracker,.grid_svg").css({"top":$(".grid_yaxis_num i").height()/2,"height":$(".grid_yaxis_num i").height()*5});
			}
		
	});
	var grid_lineLength = $(".highcharts_grid .grid_line").find("i").length;
	
	$(".grid_yaxis_tracker b").each(function(){
		var trackerClicks = $(this).find("i").attr("clicks");
		if($(this).find("i").attr("fill")=="1")
		{
			if($(this).parents(".clicks_box").length>0)
			{
				$(this).find("i").animate({"height":trackerClicks*$(this).height()/_maxNumAuto});
			}
			else
			{
				$(this).find("i").animate({"height":trackerClicks*$(this).height()/maxNumAuto});
			}
		}
	});
	$(document).on("mouseenter",".grid_yaxis_tracker b",function(){
		var _top = $(this).parents(".highcharts_grid").outerHeight();
		var _left = $(this).offset().left;
		var clicks = $(this).find("i").attr("clicks");
		var date = $(this).parent().siblings(".grid_date_labels").children().eq($(this).index()).text();
		$(this).parents(".highcharts_grid").find(".grid_tooltip strong").remove();
		$(this).parents(".highcharts_grid").find(".grid_tooltip").show().stop().animate({"left":_left-$(this).parents(".highcharts_grid").find(".grid_tooltip").outerHeight(),"top":_top},500);
		if($(this).parents(".clicks_box").length>0)
		{
			$(this).parents(".highcharts_grid").find(".grid_tooltip").show().stop().animate({"left":_left-$(this).parents(".clicks_box").offset().left+($(this).outerWidth()-$(this).parents(".highcharts_grid").find(".grid_tooltip").outerWidth())/2,"top":_top-30},500);
			//console.log($(this).parents(".clicks_box").offset().left)
		}
		$(this).parents(".highcharts_grid").find(".grid_tooltip").find(".clicks i").text(clicks);
		if($(this).parents(".highcharts_grid").prev().find("span").hasClass("active") && clicks>0)
		{
			var index = $(this).parents(".highcharts_grid").prev().find(".active").index();
			var legend = $(".highcharts_timezone .legend u").children().eq(index);
			var num = $(this).find("i").attr("c0");
			var channels = $(this).find("i").attr("channels");
			var maxCountry = $(".highcharts_timezone .legend u").children().eq(1).children().length;
			if($(this).parents(".highcharts_grid").prev().find(".location").hasClass("active")){
				
				if(clicks-num>0)
				{
					for(var i=0;i<maxCountry;i++){
						if($(this).find("i").attr("c"+i)!=0){
						$(this).parents(".highcharts_grid").find(".grid_tooltip").append('<strong><span><u style="background:'+legend.find("span").eq(i).find("em").css("backgroundColor")+'"></u>'+legend.find("span").eq(i).text()+': <i>'+$(this).find("i").attr("c"+i)+'</i></span></strong>');}
					}
				}
				else if(num=clicks){
					$(this).parents(".highcharts_grid").find(".grid_tooltip").append('<strong><span><u style="background:'+legend.find("span").eq(0).find("em").css("backgroundColor")+'"></u>'+legend.find("span").eq(0).text()+' <i>: '+num+'</i></span></strong>');
				}
				else if(num=0){
					for(var i=0;i<maxCountry;i++){
						if($(this).find("i").attr("c"+i)!=0){
							$(this).parents(".highcharts_grid").find(".grid_tooltip").append('<strong><span><u style="background:'+legend.find("span").eq(i).find("em").css("backgroundColor")+'"></u>'+legend.find("span").eq(i).text()+': <i>'+num+'</i></span></strong>');
						}
					}
				}
			}
			else
			{
				if(clicks-channels>0 && channels!=0)
				{
					$(this).parents(".highcharts_grid").find(".grid_tooltip").append('<strong><span><u style="background:'+legend.find("span").eq(0).find("em").css("backgroundColor")+'"></u>'+legend.find("span").eq(0).text()+': <i>'+channels+'</i></span><span><u style="background:'+legend.find("span").eq(1).find("em").css("backgroundColor")+'"></u>'+legend.find("span").eq(1).text()+' <i>'+(clicks-channels)+'</i></span></strong>');
				}
				else if(channels=clicks){
					$(this).parents(".highcharts_grid").find(".grid_tooltip").append('<strong><span><u style="background:'+legend.find("span").eq(0).find("em").css("backgroundColor")+'"></u>'+legend.find("span").eq(0).text()+': <i>'+channels+'</i></span></strong>');
				}
				else if(channels==0){
					
					$(this).parents(".highcharts_grid").find(".grid_tooltip").append('<strong><span><u style="background:'+legend.find("span").eq(1).find("em").css("backgroundColor")+'"></u>'+legend.find("span").eq(1).text()+': <i>'+clicks+'</i></span></strong>');
				}
			}
		}
		$(this).parents(".highcharts_grid").find(".grid_tooltip").find(".date").text(date);
	});
	$(document).on("mouseleave",".grid_yaxis_tracker b",function(){
		$(".grid_tooltip").hide();
	});
	
	$(".highcharts_grid_scroll .dateline b").each(function(){
		var length = $(this).parent().find("b").length;
		if(length>15)
		{
			$(this).parents(".highcharts_grid_scroll").find("b").css("width",parseInt($(".highcharts_grid_scroll").width()/15));
			$(this).parents(".highcharts_grid_scroll").find("span").css("width",parseInt($(".highcharts_grid_scroll").width()/15*length));
		}
		else{
			$(this).parents(".highcharts_grid_scroll").find("b").css("width",parseInt($(".highcharts_grid_scroll").width()/length));
		}
	});
}






$(document).off("click", '.checkbox_on');
$(document).off("click", '.checkbox_on_active');

(function($){
	$.ShortenItem = {
		menu_bar: function(o){
			var o = $(o);
			$(".profile_item").addClass("open");
		},
		
		eidt_profile: function(o){
			o.parents(".profile_item").find(".change_profile").addClass("open");							
		},
		
		_filter: function(o){
			$(".profile_item").addClass("open");
			$(".profile_item .profile_box").css("transform","translateX(0)");
			$(".profile_item .filter_box").addClass("open");				
		},
		
		filter_tag_check: function(o){
			checkboxClick(o.find("span"));
			o.siblings(".submit").show();
		},
		
		filter_edittag_check: function(o){
			checkboxClick(o.find("span"));
			o.parents("dl").find("dd.submit").show();
			if(o.hasClass("create_now_tag"))
			{
				o.remove();
			}
			if(o.hasClass("create_new_tag"))
			{
				o.parent().prev().find("input").val('');
				o.siblings().show();
				o.removeClass("create_new_tag").addClass("create_now_tag");
			}
			
		},
		
		filter_tag_apply: function(o){
			var checkBoxCount = 0;
			$(".filter_list").find(".filter_list_pill").remove();
			$(".grid_yaxis_tracker b i").removeClass("active");
			o.parents("dl").find("dd:not('.submit')").each(function(){
				if($(this).find("span").hasClass('checkbox_on_active'))
				{
					val = $(this).attr("data-reactid");
					checkBoxCount++;
					$(".filter_list_clear").before('<div class="filter_list_pill" data-reactid="'+val+'"><a href="javascript:;" class="date">'+val+'</a><a href="javascript:;" class="close">×</a></div>');
				}
			});
			if(checkBoxCount)
			{
				o.parents(".profile_item").removeClass("open");
				o.parents(".filter_box").removeClass("open");
				o.parents(".create_bitlink_box").siblings(".profile_box").removeAttr("style");
				$(".filter_list").slideDown();
				removeLoading();
			}
			else
			{
				$(".filter_list").slideUp();
			}
			o.parent().hide();
		},
		
		filter_edittag_apply: function(o){
			var checkBoxCount = 0;
			$(".filter_list").find(".filter_list_pill").remove();
			$(".grid_yaxis_tracker b i").removeClass("active");
			$(".filter_box").find(".insert").remove();
			
			if(o.parents(".filter_tags_box").hasClass("edit_open"))
			{
				$(".link_detail .filter_tags_list").empty();
				o.parents("dl").find("dd b").each(function(){
					if($(this).find("span").hasClass('checkbox_on_active'))
					{
						val = $(this).attr("data-reactid");
						$(".link_detail .filter_tags_list").append('<a href="javascript:;"><em>'+val+'</em><i>×</i></a>');
					}
				});
				profile_bg_close();
			}
			else{
				o.parents("dl").find("dd b").each(function(){
					if($(this).find("span").hasClass('checkbox_on_active'))
					{
						val = $(this).attr("data-reactid");
						checkBoxCount++;
						$(".filter_box dd.submit").before('<dd class="insert" data-reactid="'+val+'" style="display:none;">'+val+'<span class="checkbox_on_active"><i></i></span></dd>');
					}
				});
				if(checkBoxCount)
				{
					o.parents(".filter_tags_box").removeClass("open");
					$(".filter_box dt u").html(checkBoxCount);
				}
				else
				{
					$(".filter_box dt u").html('');
					o.parents(".filter_tags_box").removeClass("open");
				}
			}
			
			o.parent().hide();
			
		},
		
		create_bitlink: function(o){
			$(".profile_item").addClass("open");
			$(".profile_item .profile_box").css("transform","translateX(0)");
			$(".profile_item .create_bitlink_box").addClass("open");
		},
		
		create_bitlink_submit: function(o){
			if(o.hasClass("loading")){return false;}
			if($("body").find(".error_urlitem").length>0){return false;}
			var status = false;
			var val = o.parent().find("#url").val();
			var msg = o.parent().find("#url").attr("msg");
		  
		   	if(!val)
			{
				var status = true;
				$("body").after('<div class="error_urlitem">'+msg+'</div>');
				$(".error_urlitem").animate({top:'100'});
				setTimeout(function(){
					$(".error_urlitem").animate({top:'0',opacity:"0"});
					setTimeout(function(){
						$(".error_urlitem").remove();
					},500);
				},1000);
			}
			else
			{
				if(!regUrl.test(val)){
					var status = true;
					$("body").after('<div class="error_urlitem">'+msg+'</div>');
					$(".error_urlitem").animate({top:'100'});
					setTimeout(function(){
						$(".error_urlitem").animate({top:'0',opacity:"0"});
						setTimeout(function(){
							$(".error_urlitem").remove();
						},500);
					},1000);
				}
			}
			
			if(status)
			{
				return false;
			}
			
			o.addClass("loading");
			var shortnum = randomWord(8);
			$(".create_bitlink_edit .copybox").find(".link").remove();
			$(".create_bitlink_edit .copybox").prepend('<a href="https://bitlcy.com/'+shortnum+'" class="link">http://bitlcy.com<b>/'+shortnum+'</b></a>');
			$(".create_bitlink_edit .linkeidt_list").find(".url").val('https://bitlcy.com/'+shortnum);
			$(".create_bitlink_edit").addClass("open");
			o.removeClass("loading");
			removeLoading();
			return false;
		},
		
		linkeidt: function(o){
			var title = o.parents(".linkeidt_list").find(".title").val();
			var note = o.parents(".linkeidt_list").find(".note").val();
			o.parents(".create_bitlink_edit").removeClass("open edit_open");
			o.parents(".profile_item").removeClass("open");
			o.parents(".create_bitlink_edit").siblings(".create_bitlink_box").removeClass("open");
			o.parents(".create_bitlink_edit").siblings(".profile_box").removeAttr("style");
		},
		
		_tracker: function(o){
			if($(".wrapright").find(".loading").length>0 || o.parents(".clicks_box").length>0)return;
			$(".header .keyword").val('');
			o.addClass("active").parent().siblings().find("i").removeClass("active");
			var date = o.parent().parent().siblings(".grid_date_labels").children().eq(o.parent().index()).text();
			$(".filter_list_pill").remove();
			$(".filter_box dd").find("span").removeClass("checkbox_on_active").addClass("checkbox_on");
			$(".filter_list_clear").before('<div class="filter_list_pill"><a href="javascript:;" class="date">'+date+'</a><a href="javascript:;" class="close">×</a></div>');
			$(".filter_list").slideDown();
			removeLoading();
		},
		
		filter_clear: function(o){
			if($(".wrapright").find(".loading").length>0)return;
			$(".filter_list").slideUp();
			$(".header .keyword").val('');
			$(".grid_yaxis_tracker b i").removeClass("active");
			o.siblings(".filter_list_pill").remove();
			removeLoading();
		},
		
		filter_close: function(o){
			if($(".wrapright").find(".loading").length>0)return;
			var length = o.parent().parent().find(".filter_list_pill").length;
			$(".header .keyword").val('');
			$(".grid_yaxis_tracker b i").removeClass("active");
			$(".filter_box dd").each(function(){
				if($(this).attr("data-reactid")==o.parent().attr("data-reactid"))
				{
					$(this).find("span").removeClass("checkbox_on_active").addClass("checkbox_on");
				}
			});
			o.parent().remove();
			if(length==1)
			{
				$(".filter_list").slideUp();
			}
			removeLoading();
		},
		
		bitlist_check: function(o){
			if($(".wrapright").find(".loading").length>0)return;
			o.addClass("active").siblings().removeClass("active");
			$(".wrapright").append('<div class="loading" />');
			setTimeout(function(){
				$(".wrapright").find(".loading").remove();
			},1500);
		},
		
		graph_toggle: function(o){
			if(o.hasClass("active"))
			{
				o.parent().siblings(".performance_graph").slideDown();
				o.removeClass("active").text(o.attr("data"));
			}
			else
			{
				o.parent().siblings(".performance_graph").slideUp();
				o.addClass("active").text(o.attr("msg"));
			}
			//grid_yaxis_tracker();
		},
		
		view_selector: function(o){
			var maxCountryNum = $(".highcharts_timezone .legend u").children().eq(1).children().length;
			var dataID = o.attr("data-id");
			$(".highcharts_timezone .legend strong").hide();
			
			if(o.hasClass("active"))
			{
				$(".highcharts_grid svg g").html('');
				o.removeClass("active");
				$(".highcharts_timezone .legend").find("#legend"+dataID).fadeOut();
				return false;
			}
			else{
				$(".highcharts_timezone .legend").find("#legend"+dataID).fadeIn();
			}
			o.addClass("active").siblings().removeClass("active");
			$(".highcharts_grid svg g.all").html('');
			$(".grid_yaxis_tracker b").each(function(){
				
				if($(this).parents(".clicks_box").length==0)
				{
					var fill = $(this).find("i").attr("fill");
					var x = $(this).find("i").offset().left;
					var y = $(this).find("i").offset().top-$(".grid_svg").offset().top;
					
					if(fill==1)
					{
						var height=$(".grid_yaxis_tracker").height()/$(".grid_yaxis_num i").eq(0).text();
						if(o.attr("data-id")==1)
						{
							if($(this).find("i").attr("channels")>0)
							{
								$(".highcharts_grid svg g.c0").append('<desc>L '+x + ' '+ (y+height*$(this).find("i").attr("location"))+' </desc>');
							}
							if($(this).find("i").attr("location")>0)
							{
								$(".highcharts_grid svg g.c1").append('<desc>L '+x + ' '+ (y+height*$(this).find("i").attr("channels"))+' </desc>');
							}
						}
						
						else
						{
							
							for(var i=0;i<maxCountryNum;i++){
								console.log(0);
							if($(this).find("i").attr("c"+i)>0){
								var color = $(".highcharts_timezone .legend strong:last-child").children().eq(i).find("em").css("backgroundColor");
								$('.highcharts_grid svg g.c'+i).append('<desc>L '+x + ' '+ (y+height*($(this).find("i").attr("clicks")-$(this).find("i").attr("c"+i)))+' </desc>');
								var Str = $(".highcharts_grid svg").find('.c'+i+' desc').eq(0).html();
								$(".highcharts_grid svg").find('.c'+i+' desc').eq(0).html(Str.replace(/L/,"M"));
							}
							
							$(".highcharts_grid svg g.all").append('<path fill="none" d="'+$('.highcharts_grid svg g.c'+i).text()+'" stroke="'+color+'" stroke-width="2" zIndex="1" stroke-linejoin="round" stroke-linecap="round"/>');
							}
						}
					}
				}
				
			});
			if(o.attr("data-id")==1){
				var channelStr = $(".highcharts_grid svg").find(".c0 desc").eq(0).html();
				var locationStr = $(".highcharts_grid svg").find(".c1 desc").eq(0).html();
				$(".highcharts_grid svg").find(".c0 desc").eq(0).html(channelStr.replace(/L/,"M"));
				$(".highcharts_grid svg").find(".c1 desc").eq(0).html(locationStr.replace(/L/,"M"));
				$(".highcharts_grid svg g.all").html('<path fill="none" d="'+$(".highcharts_grid svg g.c0").text()+'" stroke="'+$(".highcharts_timezone .legend u").children().eq(0).find("span").eq(0).find("em").css("backgroundColor")+'" stroke-width="2" zIndex="1" stroke-linejoin="round" stroke-linecap="round"/><path fill="none" d="'+$(".highcharts_grid svg g.c1").text()+'" stroke="'+$(".highcharts_timezone .legend u").children().eq(0).find("span").eq(1).find("em").css("backgroundColor")+'" stroke-width="2" zIndex="1" stroke-linejoin="round" stroke-linecap="round"/>');
				$(".highcharts_grid svg g.c1").html('');
				$(".highcharts_grid svg g.c0").html('');
			}
			
			else{
				var pathLength = $(".highcharts_grid svg g.all").find("path").length;
			//	var maxCountry = $(".highcharts_grid .grid_svg").attr("data-num");
			//	alert(maxCountry)
				$(".highcharts_grid svg g.all").find("path").eq(pathLength-maxCountryNum).prevAll().remove();
				//.prevAll().remove();
				$(".highcharts_grid svg g.all").html($(".highcharts_grid svg g.all").html());
				$(".highcharts_grid svg g.all").nextAll().html('');
			}
			
			//$(".highcharts_grid svg g.all").find("path").attr("display","block");
			
		//	return false;
			//var channelStr = $(".highcharts_grid svg").find(".channel desc").eq(0).html();
			//var locationStr = $(".highcharts_grid svg").find(".location desc").eq(0).html();
			//$(".highcharts_grid svg").find(".channel desc").eq(0).html(channelStr.replace(/L/,"M"));
			//$(".highcharts_grid svg").find(".location desc").eq(0).html(locationStr.replace(/L/,"M"));
			//return false;
			
		//	$(".highcharts_grid svg g.all").html('<path fill="none" d="'+$(".highcharts_grid svg g.c0").text()+'" stroke="#f8ce1c" stroke-width="2" zIndex="1" stroke-linejoin="round" stroke-linecap="round"/><path fill="none" d="'+$(".highcharts_grid svg g.c1").text()+'" stroke="#ff6600" stroke-width="2" zIndex="1" stroke-linejoin="round" stroke-linecap="round"/>');
			//$(".highcharts_grid svg g.c1").html('');
			//$(".highcharts_grid svg g.c0").html('');
		},
		
		filter_tags_check: function(o){
			var text = o.text();
			removeLoading();
			$(".filter_list").find(".filter_list_pill").remove();
			$(".filter_list_clear").before('<div class="filter_list_pill" data-reactid="'+text+'"><a href="javascript:;" class="date">'+text+'</a><a href="javascript:;" class="close">×</a></div>');
			$(".filter_list").slideDown();
		},
		
		filter_tags_colse: function(o)
		{
			o.parent().remove();
			//event.stopPropagation();
		},
		
		edit_link: function(o){
			
			$(".profile_item").addClass("open");
			$(".profile_item .profile_box").css("transform","translateX(0)");
			$(".create_bitlink_edit").addClass("open edit_open");
			var date = o.parents(".tool_item").siblings(".date").text(),
				title = o.parents(".tool_item").siblings(".title").text(),
				newlink = o.parents(".tool_item").siblings(".newlink").find(".link").html(),
				bitlink = o.parents(".tool_item").siblings(".newlink").find(".link").attr("href");
			
			$(".create_bitlink_edit .link_copy .date").text('Created '+date);
			$(".create_bitlink_edit .link_copy .link").html(newlink);
			$(".linkeidt_list .title").val(title);
			$(".linkeidt_list .url").val(bitlink);
			$(".newlink").find(".zclip").remove();
			autocopy();
		},
		
		hide_link: function(o){
			var id = o.attr("id");
			msgTipsbox(2,'It can be found with the hidden Bitlinks filter', function(re){
				if(re){
					removeLink(o,id);
				}
			},'','Confirm','Cancel','Hide Bitlink');
		},
		
		select_tag: function(o){
			var keyword = o.val();
			$(".filter_tags_box dd b").hide().each(function(){
				o.parents("dl").find(".create_new_tag").remove();
				var text = $(this).text();
				if(text.toLowerCase().indexOf(keyword.toLowerCase())==0)
				{
					$(this).show();
				}
				if(o.parents(".filter_tags_box").hasClass("edit_open") && keyword!='' && keyword!=text)
				{
					o.parent().next().prepend('<b class="create_new_tag" style="display:block" data-reactid="'+keyword+'">Create new tag: '+keyword+'<span class="checkbox_on"><i></i></span></b>')
				}
				else if(o.parents(".filter_tags_box").hasClass("edit_open") && keyword==text)
				{
					o.parents("dl").find(".create_new_tag").remove();
					return false;
				}
			});
			
			
			
		},
		
		edittag_link: function(o){
			$(".profile_item").addClass("open");
			$(".profile_item .profile_box").css("transform","translateX(0)");
			$(".filter_tags_box").addClass("open edit_open");
			$(".filter_tags_box dt .search_input_field").attr("placeholder","Search and Create");
			$(".profile_item.open .profile_header").html('Edit Tags<i>×</i>');
			var  profileheaderHeight = $(".profile_item.open .profile_header").outerHeight();
			var height = $(".filter_tags_box dt").outerHeight();
			var submitHeight = $(".filter_tags_item dd.submit").outerHeight();
			var windowHeight = $(window).height();
			$(".filter_tags_box dd.submit").prev().css("max-height",windowHeight-3*submitHeight-height-profileheaderHeight);
		}
		
	}
})(jQuery);

$(document)
.on("click",".header .settings",function(){
	$.ShortenItem.menu_bar($(this));						
})
.on("click",".settings_item .user",function(){
	$.ShortenItem.eidt_profile($(this));
})
.on("click",".header .filter",function(){
	$.ShortenItem._filter($(this));								
})
.on("click",".filter_box dd:not('.submit')",function(){
	$.ShortenItem.filter_tag_check($(this));	
})
.on("click",".filter_box .btn",function(){
	$.ShortenItem.filter_tag_apply($(this));
})
.on("click",".filter_tags_box dd b",function(){
	$.ShortenItem.filter_edittag_check($(this));	
})
.on("click",".filter_tags_box .btn",function(){
	$.ShortenItem.filter_edittag_apply($(this));
})
.on("click",".header .create_bitlink",function(){
	$.ShortenItem.create_bitlink($(this));
})
.on("click",".create_bitlink_box .submit",function(){
	$.ShortenItem.create_bitlink_submit($(this));
})
.on("click",".linkeidt_list .btn",function(){
	$.ShortenItem.linkeidt($(this));
})
.on("click",".grid_yaxis_tracker b i",function(){
	$.ShortenItem._tracker($(this));
})
.on("click",".filter_list .filter_list_clear",function(){
	$.ShortenItem.filter_clear($(this));
})
.on("click",".filter_list .filter_list_pill .close",function(){
	$.ShortenItem.filter_close($(this));
})
.on("click",".bit_list li",function(){
	$.ShortenItem.bitlist_check($(this));
})
.on("click",".graph_toggle span",function(){
	$.ShortenItem.graph_toggle($(this));
})
.on("click",".view_selector span",function(){
	$.ShortenItem.view_selector($(this));
})
.on("click",".link_detail .filter_tags_list em",function(){
	$.ShortenItem.filter_tags_check($(this));
})
.on("click",".link_detail .filter_tags_list i",function(event){
	$.ShortenItem.filter_tags_colse($(this));
})
.on("click",".link_detail .tool_item .edit_link",function(){
	$.ShortenItem.edit_link($(this));
})
.on("click",".link_detail .tool_item .hide_link",function(){
	$.ShortenItem.hide_link($(this));
})
.on("input propertychange",".filter_tags_box .search_input_field",function(){
	$.ShortenItem.select_tag($(this));
})
.on("click",".link_detail .tool_item .tag_link",function(){
	$.ShortenItem.edittag_link($(this));
});


function tagBoxCount(){
	var tagBoxCount = 0;
	$(".filter_tags_box b").each(function(){
		if($(this).find("span").hasClass('checkbox_on_active'))
		{
			val = $(this).attr("data-reactid");
			tagBoxCount++;
			$(".filter_box dd.submit").before('<dd class="insert" data-reactid="'+val+'" style="display:none;">'+val+'<span class="checkbox_on_active"><i></i></span></dd>');
		}
		
	});
	if(tagBoxCount)
	{
		$(".filter_box dt u").html(tagBoxCount);
	}	
}
tagBoxCount();


/*var colorArr = ["#ff9900","#336699","#ff4400","#fff000","#ff0000","#e2f41d","#999999","#915aeb","#f7114d","#41f30a","#d98e45","#45e4fc","#565e5f","#fcdb95","#fc95c8","#99f6e8","#02b372"];
function randomColor(arr)
{
	return arr[Math.floor(Math.random()*arr.length)];
}
$(".highcharts_timezone .legend_item em").each(function(){
	$(this).css("background",randomColor(colorArr));
});*/
function profile_bg_close(){
	$(".profile_item").removeClass("open");
	$(".profile_item").find(".change_profile,.filter_box,.filter_tags_box,.create_bitlink_box,.create_bitlink_edit").removeClass("open edit_open");
	$(".profile_item .profile_box").removeAttr("style");
	$(".modal_msgbox").remove();
}

$(document).on("click",".profile_box .profile_header i",function(){
	$(this).parents(".profile_item").removeClass("open");
});
$(document).on("click",".change_profile .profile_header i",function(){
	$(this).parents(".change_profile").removeClass("open");
});
$(document).on("click",".profile_item .profile_bg",function(){
	profile_bg_close();
});

$(document).on("click",".filter_box .profile_header i",function(){
	$(this).parents(".filter_box").find("dd.submit").hide();
	$(this).parents(".profile_item").removeClass("open");
	$(this).parents(".filter_box").removeClass("open");
	$(this).parents(".filter_box").siblings(".profile_box").removeAttr("style");
});
$(document).on("click",".filter_tags_box .profile_header i",function(){
	$(this).parents(".filter_tags_box").removeClass("open");
	if($(this).parents(".filter_tags_box").hasClass("edit_open"))
	{
		$(this).parents(".profile_item").removeClass("open");
		$(this).parents(".filter_tags_box").siblings(".profile_box").removeAttr("style");
		$(this).parents(".filter_tags_box").removeClass("edit_open");
	}
	$(this).parents(".filter_tags_box").find("dd.submit").hide();
});

$(document).on("click",".filter_box dt",function(){
	var  profileheaderHeight = $(this).parent().prev().outerHeight();
	var height = $(".filter_tags_box dt").outerHeight();
	var submitHeight = $(".filter_tags_item dd.submit").outerHeight();
	var windowHeight = $(window).height();
	$(this).parents(".profile_item").find(".filter_tags_box").addClass("open");	
	$(".filter_tags_box .search_input_field").val('');
	$(".filter_tags_box dd b").show();
	$(".filter_tags_box dd.submit").prev().css("max-height",windowHeight-3*submitHeight-height-profileheaderHeight);
	$(".filter_tags_box dt .search_input_field").attr("placeholder","Search");
});
$(document).on("click",".filter_tags_box .profile_header i",function(){
	//$(this).parents(".filter_tags_box").removeClass("open");
});

$(document).on("click",".create_bitlink_box .profile_header i",function(){
	$(this).parents(".profile_item").removeClass("open");
	$(this).parents(".create_bitlink_box").removeClass("open");
	$(this).parents(".create_bitlink_box").siblings(".profile_box").removeAttr("style");
});

function removeLoading(){
	$(".wrapright").append('<div class="loading" />');
	setTimeout(function(){
		$(".wrapright").find(".loading").remove();
	},1500);
}

$("form#form_search").submit(function(){
	if($(".wrapright").find(".loading").length>0)return;
	$(".grid_yaxis_tracker b i").removeClass("active");
	var o = $(this);
	var status = false;
	var keyword = o.find(".keyword").val();
	if(!keyword)
	{
		var status = true;
		$(".filter_list").slideUp();
		removeLoading();
	}
	else
	{
		var status = true;
		$(".filter_list_pill .date").text(keyword);
		$(".filter_list").slideDown();
		removeLoading();
		
	}
	
	if(status)
	{
		return false;
	}
	
	//
	
	return false;
});
$(document).on("click",".create_bitlink_edit .profile_header i",function(){
	if($(this).parents(".create_bitlink_edit").hasClass("edit_open"))
	{
		$(this).parents(".create_bitlink_edit").removeClass("open edit_open");
		$(".profile_item .profile_box").removeAttr("style");
		$(this).parents(".profile_item").removeClass("open");
	}
	else{
		$(this).parents(".create_bitlink_edit").removeClass("open");
	}
});
function modal_bg(){
	$(".profile_item").addClass("open");
	$(".profile_item .profile_box").css("transform","translateX(0)");
}
function modal_remove()
{
	profile_bg_close();
}
function msgTipsbox(i,j,k,l,m,n,t){
	modal_bg();
	if(t=='')
	{
		t = '';
	}
	else
	{
		t ="<h4 class='modal_msgbox_title'>"+t+"</h4>";
	}
	$('.profile_item').append("<div class='modal_msgbox'>"+t+"<div class='modal_msgbox_msg'>"+j+"</div><div class='modal_msgbox_button'></div></div>");
	if(i==0)$('.modal_container .modal_msgbox_button').append("<span class='button_ok' onclick='modal_remove();'><i>OK</i></span>");
	if(i==1)
	{
		$('.profile_item .modal_msgbox_button').append("<span class='button_no' onclick='modal_remove();'><i>Cancel</i></span><span class='button_yes'><i>Yes</i></span>");
		$(document).off("click",".button_yes").on("click",".button_yes",function(){k(l);});
	}
	if(i==2)
	{
		$('.profile_item .modal_msgbox_button').append("<span class='button_yes'><i>"+m+"</i></span><span class='button_no' onclick='modal_remove();'><i>"+n+"</i></span>");
		$(document).off("click",".button_yes").on("click",".button_yes",function(l){if( i ) k(l);});
	}
	modal_add();
	
};
function modal_add(){
	var modal_profileitem = $('.profile_item');
	var modal_content = modal_profileitem.find(".modal_msgbox");
	var modal_content_width = modal_content.outerWidth(true);
	var modal_content_height = modal_content.outerHeight(true);
	var window_width = $(window).outerWidth(true);
	var window_height = $(window).outerHeight(true);
	
	var sum = 50;
	if(modal_content_height >= window_height-sum)
	{
		modal_content.css({marginTop:sum+'px'});
	}
	else
	{
		if((window_height - modal_content_height)/2 <= sum)
		{
			modal_content.css({marginTop:sum+'px'});
		}
		else
		{
			modal_content.css({marginTop:(window_height - modal_content_height)/2+'px'});	
		}
	}
}
$(window).resize(function(){modal_add()});

function removeLink(obj,id)
{
	var obj = $(obj);
}