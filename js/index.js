// JavaScript Document


// jQuery pages
$(document).ready(function(){				
	$(".box").eq(0).addClass("ch_bg");
	$(".content").eq(0).show();
	
	$(".menu").click(function(){
		$(".sidenav").show();
		document.getElementById("SideNav").style.width = "250px";
	});
	
	$(".box").click(function(){
		var _index = $(this).index();
		$(this).addClass("ch_bg").siblings().removeClass("ch_bg");
		$(".content").eq(_index).fadeIn(1500).siblings().fadeOut(500);
		$(".sidenav").fadeOut(500); /*點選nav文字後消失nav bar*/
		document.getElementById("SideNav").style.width = "0";
	});	
	
	// fancy box
	$(".fancybox").fancybox({
		openEffect	: 'elastic',
		closeEffect	: 'elastic',
	});
});
