$(document).on("click",".inputbox",function(){$(this).find(".tips").hide(200,function(){$(this).find(".tips").remove();});});
function checkboxClick(obj){
	if($(obj).hasClass('checkbox_off_active')){
		return false;
	}
	if($(obj).hasClass('checkbox_on')){
		$(obj).removeClass('checkbox_on');
		$(obj).addClass('checkbox_on_active');
	}else{
		$(obj).removeClass('checkbox_on_active');
		$(obj).addClass('checkbox_on');	
	}
}
$(document).on("click",".checkbox_on",function(){
	checkboxClick(this);
});

$(document).on("click",".checkbox_on_active",function(){
	checkboxClick(this);
});
function inputNotice(obj, msg){
	obj.after('<span class="tips"><i></i>'+ msg +'</span>');	
}
function delInputNotice(input){
	input.nextAll('.tips').remove();	
}
var zValidate = {};
zValidate.email = function(email){
	var myreg = /^[\w-']+([\.\+][\w-']+)*@([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*?\.[a-zA-Z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
	return myreg.test(email.replace(/(^\s*)|(\s*$)/g, ""));
};

zValidate.int = function(int){
	var myreg = /^[0-9]*[1-9][0-9]*$/;
	return myreg.test(int);
};
zValidate.float = function(float){
	var myreg = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
	return myreg.test(float);
};
zValidate.url = function(url){
	var myreg = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	return myreg.test(url);
};

zValidate.password = function(password){
	var myreg = /^(.*){6,}$/;
	return myreg.test(password);
};

//var regUrl = ;
/*var strRegex = "^((https|http|ftp|rtsp|mms)?://)"         
				+ "?(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@        
				+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184        
				+ "|" // 允许IP和DOMAIN（域名）        
				+ "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.        
				+ "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名        
				+ "[a-zA-Z]{2,6})" // first level domain- .com or .museum        
				+ "(:[0-9]{1,4})?" // 端口- :80        
				+ "((/?)|"         
				+ "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";        
var regUrl=new RegExp(strRegex); */  

var regUrl = /.+\.+/;

/*function mousePaste(obj,event){
	if(event.ctrlKey&&event.keyCode==86){ 
		setTimeout(function(){
			CheckShortenForm($(obj).parent());
		},500);
	}
	else
	{
		
			CheckShortenForm($(obj).parent());
		
	}
}*/

/*$(document).on("paste","form#ShortenForm .inputchang",function(e){
		var val = undefined;
        if (window.clipboardData && window.clipboardData.getData) { // IE
            val = window.clipboardData.getData('Text');
          } else {
            val = e.originalEvent.clipboardData.getData('Text');//e.clipboardData.getData('text/plain');
          }
        CheckShortenForm($(this).parent(),val);
});*/


$(document).on("paste","form#ShortenForm .inputchang",function(e){
	var o = $(this);
	setTimeout(function() {
		CheckShortenForm(o.parent(),o.val());
	},500);
});


function CheckShortenForm(obj,val)
{
	
	$(obj).css("background","red");
	if($(obj).find(".btn").hasClass("loading")){return false;}
	if($(obj).parent().find(".error_url").length>0){return false;}
	$(".shorten_actions").remove();
	var status = false;
	var val = val;
	var msg = $(obj).find(".inputchang").attr("msg");
	
	
//	console.log(val)
	/*if(!val.indexOf("http://")==0 || !val.indexOf("https://")==0 || !val.indexOf("ftp://")==0)
	{
		val = "http://"+val;
		
	}*/
	 
	if(!val)
	{
		var status = true;
		$(obj).after('<div class="error_url">'+msg+'</div>');
		$(".error_url").animate({top:'0',bottom:'0'});
		setTimeout(function(){
			$(".error_url").animate({top:'-60px',bottom:'60px',opacity:"0"});
			setTimeout(function(){
				$(".error_url").remove();
			},500);
		},1000);
	}
	else
	{
		if(!regUrl.test(val)){
			
			var status = true;
			$(obj).after('<div class="error_url">'+msg+'</div>');
			$(".error_url").animate({top:'0',bottom:'0'});
			setTimeout(function(){
				$(".error_url").animate({top:'-60px',bottom:'60px',opacity:"0"});
				setTimeout(function(){
					$(".error_url").remove();
				},500);
			},1000);
		}
	}
	
	if(status)
	{
		return false;
	}
	
	$(obj).find(".btn").addClass("loading");
	var shortnum = randomWord(8);
	var html = ''+
		'<div id="shortened_info" class="shorten_list">'+
			'<h4 class="separator"><span>Done! You have created your Bitlink</span></h4>'+
			'<ul class="link_list">'+
				'<li>'+
					'<span class="favicon"><img src="images/1QnVFTo.png"></span>'+
					'<span class="newlink"><a href="https://bitlcy.com/'+shortnum+'">https://bitly.com/'+shortnum+'</a><a href="javascript:;" class="copy">Copy</a></span>'+
					'<span class="origin"><a href="'+val+'">'+val+'</a></span>'+
				'</li>'+
			'</ul>'+
		'</div>';
	
	$(obj).after('<div class="shorten_actions"><i>×</i><a href="https://bitlcy.com/'+shortnum+'" id="shortened_url"><a class="copy" href="javascript:;">Copy</a></div>');
	$(".shorten_actions").show();
	$("#ShortenForm .inputchang").val('https://bitlcy.com/'+shortnum);
	if($("#shortened_info").length>0)
	{
		$("#shortened_info").find("li").clone().appendTo($("#shortened_info").next().find(".link_list"));
		$("#shortened_info").remove();
	}
	$(".shorten_list").before(html);
	$("#shortened_info").slideDown(500);
	$(obj).find(".btn").removeClass("loading");
	autocopy();
	return false;
}

$("form#ShortenForm").submit(function(){		  
	CheckShortenForm($(this),$(this).find(".inputchang").val());
	return false;
});

$(document).on("click",".shorten_actions i",function(){
	$("#ShortenForm .inputchang").val('');
	$(this).parent().remove();
});

$("#ShortenForm .inputchang").keyup(function(){
	var val = $(this).val();
	if($(".shorten_actions").length>0)
	{
		var old_url = $(".shorten_actions a").eq(0).attr("href");
		(val==old_url)?$(".shorten_actions").show():$(".shorten_actions").hide();
	}
});

function randomWord(num) {
　　var num;
　　var char = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijklmnopqrstuvwxyz0123456789';
　　var maxChar = char.length;
　　var str = '';
　　for (i = 0; i < num; i++) {
　　　　str += char.charAt(Math.floor(Math.random() * maxChar));
　　}
　　return str;
}

function validateInput(input){
	var validate = true;
	var o = $(input);
	var val = o.val();
	var type = o.attr('type');
	var rule = o.attr('rule');
	var task = o.parents("form").attr('task');
	delInputNotice(o);
	if(!val)
	{
		var validate = false;
		var empty_msg = o.attr('empty_msg');
		if(typeof(empty_msg) == 'undefined'){
			empty_msg = o.attr('msg');
		}
		inputNotice(o, empty_msg);
	}
	else{
		if(rule == 'email'){
			if(!zValidate.email(val)){
				validate = false;
				inputNotice(o, o.attr('msg'));
			}
		}else if(rule == 'password'){
			if(!zValidate.password(val) || val.length<6){
				validate = false;
				inputNotice(o, o.attr('msg'));
			}
		}else if(rule == 'username'){
			if(!zValidate.password(val) || val.length<3){
				validate = false;
				inputNotice(o, o.attr('msg'));
			}
		}
	}
	
	var equal = o.attr('equal');
	if(typeof(equal) != 'undefined' && equal.length > 0){
		if($('#'+equal).val() != val){
			validate = false;
			inputNotice(o, o.attr('equal_msg'));
		}	
	}			
	return validate;
}
	
function submitLoginPannel(form){
	var o = $(form);
	var task = o.attr('task');
	var validate = true;
	o.find(".timeout").remove();
	o.find(".tips").remove();
	
	if(o.find('.submit .btn').hasClass('loading')){
		return false;	
	}
	
	if(task=='saveProfile')
	{
		var oEmail = o.find($('input[name="email"]'));
		var emailVal = oEmail.val();
		if(!emailVal)
		{
			var validate = false;
			inputNotice(oEmail, oEmail.attr("msg"));
		}
		else{
			if(!zValidate.email(emailVal)){
				validate = false;
				inputNotice(oEmail, oEmail.attr("msg"));
			}
		}
		
		
		var ExistingPassword = o.find('input[name="ExistingPassword"]');
		var ExistingPasswordVal = ExistingPassword.val();
		var NewPassword = o.find('input[name="NewPassword"]');
		var NewPasswordVal = NewPassword.val();
		var ConfirmPassword = o.find('#confirm_password');
		var ConfirmPasswordVal = ConfirmPassword.val();
		var equal = NewPassword.attr('equal');
		
		if(NewPasswordVal.length>0 || ConfirmPasswordVal.length>0)
		{
			
			if(!ExistingPasswordVal)
			{
				validate = false;
				inputNotice(ExistingPassword, ExistingPassword.attr('msg'));
			}
			if(ConfirmPasswordVal.length > 0 && NewPasswordVal.length>0)
			{
				if(ExistingPasswordVal.length<6)
				{
					validate = false;
					inputNotice(ExistingPassword, ExistingPassword.attr('msg'));
				}
				if(ConfirmPasswordVal != NewPasswordVal)
				{
					validate = false;
					inputNotice(NewPassword, NewPassword.attr('equal_msg'));
				}
				else{
					if(ConfirmPasswordVal.length<6){
						validate = false;
						inputNotice(NewPassword, NewPassword.attr('msg'));
					}
				}
			}
			else{
				validate = false;
				inputNotice(NewPassword, NewPassword.attr('equal_msg'));
			}
		}
		
	}
	else{
		o.find('.validate').each(function(){
			if(!validateInput(this)){
				validate = false;
			}
		});
	}
	
	if(!validate){
		return false;
	}
	
	if(!$('input[name="NewPassword"]').val() && !$('#confirm_password').val())
	{
		o.parents(".change_profile").removeClass("open");
		return false;
	}
	
	
	o.find('.submit .btn').addClass("loading");
	
	setTimeout(function(){
		o.find('.submit .btn').removeClass("loading");
	},5000);
	
	return false;
}

$(document).on("click",".loginPannel .validate",function(){
	if($(this).parents(".change_profile").hasClass("open"))
	{
		$(this).parent().siblings(".submit").show();
	}
});