<?php 

$upTwo = realpath(__DIR__ . '/../..');

?>

<?php require_once($upTwo . '/lib/php/detect_mobile.php'); ?>
<?php require_once($upTwo . '/lib/php/autoload.php'); ?>
<?php require_once($upTwo . '/lib/config.php'); ?>
<?php require_once($upTwo . '/lib/php/gallery.php'); ?>
<?php require_once($upTwo . '/lib/php/helpers.php'); ?>

<?php

	$nav = $config['site_gallery']->getCatByTitle('Nav')->items;
	$pages = $config['site_gallery']->getCatByTitle('Pages')->items;
	$secondary_nav = $config['site_gallery']->getCatByTitle('Secondary Nav')->items;

	$images = array_merge( $nav, $pages);

	if(count($secondary_nav)){
		$images = array_merge( $images, $secondary_nav);
	}

	foreach ($nav as $image) {
		
		$sub_images = $config['site_gallery']->getCatByTitle($image->field01)->items;

		if(count($sub_images)){
			$images = array_merge( $images, $sub_images);
		}

	}

	foreach ($images as $image) {

		$link = $image->getLinkUrl($config['direct_link'] . $image->field01);
		if(substr($link, 0, 1) == '?'){
			$link = $config['direct_link'] . 'home' . $link;
		}

		if(substr($link, 0, 4) != 'http'){
			$link = $config['direct_link'] . $link;
		}

		$target = $image->getTarget();
		$txt = $image->getNavText();

		echo <<<EOT

		<a href="$link" target="$target">$txt</a>

EOT;


	}

	//readfile(__DIR__ . '/sitemap.html');

?>