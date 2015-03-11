<?php

require_once(__DIR__ . '/nav.php');

function getMobileNav($gallery, $images, $class='mobile-nav'){
	
	$str = '<ul class="' . $class . '">';

	foreach ($images as $image) {

		$link = $image->getLinkUrl(DIRECT_LINK . $image->field01);
		if(substr($link, 0, 1) == '?'){
			$link = DIRECT_LINK . 'home' . $link;
		}

		$target = $image->getTarget('_self' );
		$txt = $image->getNavText();

		$sub_images = $gallery->getCatByTitle($image->field01)->items;

		if(count( $sub_images )){

			$subnav = getNav($sub_images, 'subnav');

		}else{
			$subnav = '';
		}
		
		$str .= <<<EOT

		<li><a href="$link" target="$target">$txt</a>$subnav</li>

EOT;

	}

	$str .= '<li><a href="' . DIRECT_LINK . 'home" target="_self">Home</a></li>';

	$str .= '</ul>';

	return $str;

}

?>