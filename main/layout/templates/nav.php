<?php

function createNav($images, $class){
	global $config;

	echo '<ul class="' . $class . '">';

	foreach ($images as $image) {

		$link = get_link_url( $image, $config['direct_link'] . $image['field01']);
		if(substr($link, 0, 1) == '?'){
			$link = $config['direct_link'] . 'home' . $link;
		}


		$target = get_target( $image, '_self' );
		$txt = getNavText($image);
		
		echo <<<EOT

		<li><a href="$link" target="$target">$txt</a></li>

EOT;

	}

	echo '</ul>';

}

?>