<?php

	// $back_to_top_image = get_cat_image_by_title($site_gallery_id, 'Misc', 'filename', 'up.png');    
	// $back_to_top_url = get_image_url($back_to_top_image);
	$back_to_top_url = './images/up.png';
	
?>


<script>
(function(){

	var target = '<div class="btp-target"></div>';
	var wrapperOpen = '<div class="btp-wrapper"><div class="btp-container"><div class="back-to-top">';
	var img = '<img src="<?php echo $back_to_top_url; ?>">';
	var wrapperClose = '</div></div></div>';

	$('body').append( wrapperOpen + img + wrapperClose );
	$('body').append(target);

	var $backToTop = $('div.back-to-top, #text-back-to-top');
	var $headerBG = $('.header-bg');

	$backToTop.click(function (e) {
		e.preventDefault();
		$('html, body').animate({'scrollTop': 0}, {'duration':600, 'easing':'swing'});
	});

	$('.btp-target').waypoint(function(direction){		

		if(direction == 'up') {

			$backToTop.fadeOut({'easing':'swing', 'duration':200});
			$('body').removeClass('scrolling');

		}else{

			$backToTop.fadeIn({'easing':'swing', 'duration':300});
			$('body').addClass('scrolling');

		}

	}, {offset: 0});

})();

</script>

</body>
</html>