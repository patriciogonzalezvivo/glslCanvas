// JavaScript Document
$(document).ready(function(){    
    
    $(".menu").click(function(){ 
    
        $("nav").slideToggle();
        
    });
	
	$(window).on('load resize',function(){
		
        var a_w = document.body.clientWidth;
		
        if(a_w >= 768) $("nav").show(); else $("nav").hide();
    });
	
	//group
    $(".fancybox").fancybox({
        openEffect    : 'none', //'elastic', 'fade' or 'none'
        closeEffect   : 'none'
    });
	
	//single
    $(".s2").fancybox({
        openEffect    : 'elastic',//彈出
        closeEffect   : 'elastic',
		
        helpers : {
            title : {
                type : 'float' // 'float', 'inside', 'outside' or 'over'
            }
        }
    });

});


// fade to another page
window.transitionToPage = function(href) {
    document.querySelector('section').style.opacity = 0
    setTimeout(function() { 
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('section').style.opacity = 1
})