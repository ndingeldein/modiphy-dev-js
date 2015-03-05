<?php

function getNav($images, $class){
	global $config;

	$str = '<ul class="' . $class . '">';

	foreach ($images as $image) {

		$link = $image->getLinkUrl($config['direct_link'] . $image->field01);
		if(substr($link, 0, 1) == '?'){
			$link = $config['direct_link'] . 'home' . $link;
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