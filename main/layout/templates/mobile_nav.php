<?php

require_once(__DIR__ . '/nav.php');

function getMobileNav($gallery, $images, $class='mobile-nav'){
	global $config;

	$str = '<ul class="' . $class . '">';

	foreach ($images as $image) {

		$link = $image->getLinkUrl($config['direct_link'] . $image->field01);
		if(substr($link, 0, 1) == '?'){
			$link = $config['direct_link'] . 'home' . $link;
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

	$str .= '<li><a href="' . $config['direct_link'] . 'home" target="_self">Home</a></li>';

	$str .= '</ul>';

	return $str;

}

?>