<div class="footer-wrapper">
	
	<div class="footer clearfix">

		<ul class="social-nav">
			
		</ul>
		
		<div class="copy">
				
			 <?php

			 	date_default_timezone_set('America/Chicago');

		      	$image = get_cat_image_by_title($config['site_id'], 'Misc', 'filename', 'copy.png');
				$str = '&copy'.(date("Y")).'&nbsp;'.$image['field01'];
				$image_url = get_image_url($image);

				echo $str.' | All rights reserved. | <a href="http://www.modiphy.com" target="_blank" class="modiphy"><img src="'.$image_url.'" width="19" height="19" border="0" style="margin-bottom:3px;"></a>';
		      	
		      ?>

		</div>

	</div>

</div>