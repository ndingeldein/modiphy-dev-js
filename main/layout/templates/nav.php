<?php

function getNav($images, $class){
	
	$str = '<ul class="' . $class . '">';

	foreach ($images as $image) {

		$link = $image->getLinkUrl(DIRECT_LINK . $image->field01);
		if(substr($link, 0, 1) == '?'){
			$link = DIRECT_LINK . 'home' . $link;
		}

		$target = $image->getTarget('_self' );
		$txt = $image->getNavText();
		
		$str .= <<<EOT

		<li><a href="$link" target="$target">$txt</a></li>

EOT;

	}

	$str .= '</ul>';

	return $str;

}

?>