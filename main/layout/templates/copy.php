<?php

function getCopy($image){

	$str  = '<div class="copy">';				
	
	 	date_default_timezone_set('America/Chicago');

		$str = '&copy'.(date("Y")).'&nbsp;'.$image->field01;
		$image_url = $image->getImageUrl();

		$str .= ' | All rights reserved. | <a href="http://www.modiphy.com" target="_blank" class="modiphy"><img src="' . $image_url . '" width="19" height="19" border="0" style="margin-bottom:3px;"></a>';
	      	

	$str .= '</div>';

	return $str;

}
