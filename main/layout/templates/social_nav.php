<?php

function getSocialNav($images, $class='social-nav', $type=''){
	
	$str = '<ul class="' . $class . '">';

	foreach ($images as $image) {

		$image_url = $image->getImageUrl();

		$link = $image->getLinkUrl();
		if(substr($link, 0, 4) != 'http'){
			$link = DIRECT_LINK . $link;
		}

		$target = $image->getTarget('_blank');
		
		$str .= <<<EOT

		<li><a href="$link" target="$target"><img src="$image_url"></a></li>

EOT;


	}

	$str .= '</ul>';

	return $str;

}

?>