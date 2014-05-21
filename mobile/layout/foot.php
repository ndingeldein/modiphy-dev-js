


<div class="btp">
<a>	<span class="btp-icon flaticon-up67"></span></a>
</div>


<script>
(function(){
	
	var $backToTop = $('.btp');

	var  scrollToTop = function(e){

		e.preventDefault();
		$('.wrapper').animate({'scrollTop': 0}, {'duration':600, 'easing':'swing'});

	};

	if (Modernizr.touch) {
        
        $backToTop.on('touchend', scrollToTop);
        
    } else {
        
       $backToTop.click(scrollToTop);

    }

	$('.btp-target').waypoint(function(direction){

		if(direction == 'up') {

			$backToTop.fadeOut({'easing':'swing', 'duration':200});
			$('body').removeClass('scrolling');

		}else{

			$backToTop.fadeIn({'easing':'swing', 'duration':300});
			$('body').addClass('scrolling');

		}
		
	}, {offset: 0, context: '.wrapper' });

})();

</script>

<?php include('../analyticstracking.php') ?>

</body>
</html>