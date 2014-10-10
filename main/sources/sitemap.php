<?php 

$upTwo = realpath(__DIR__ . '/../..');

?>

<?php require_once($upTwo . '/lib/php/detect_mobile.php'); ?>
<?php require_once($upTwo . '/lib/config.php'); ?>
<?php require_once($upTwo . '/lib/php/db.php'); ?>
<?php require_once($upTwo . '/lib/php/helpers.php'); ?>

<?php



	$nav = get_cat_images_by_title($config['site_id'], 'Nav');
	$pages = get_cat_images_by_title($config['site_id'], 'Pages');
	$secondary_nav = get_cat_images_by_title($config['site_id'], 'Secondary Nav');

	$images = array_merge( $nav, $pages, $secondary_nav);

	foreach ($nav as $image) {
		
		$sub_images = get_cat_images_by_title($config['site_id'], $image['field01']);

		if(count($sub_images)){
			$images = array_merge( $images, $sub_images);
		}

	}

	foreach ($images as $image) {

		$link = get_link_url( $image, $config['direct_link'] . $image['field01']);
		if(substr($link, 0, 1) == '?'){
			$link = $config['direct_link'] . 'home' . $link;
		}

		if(substr($link, 0, 4) != 'http'){
			$link = $config['direct_link'] . $link;
		}

		$target = get_target( $image, '_self' );
		$txt = getNavText($image);

		echo <<<EOT

		<a href="$link" target="$target">$txt</a>

EOT;


	}

	//readfile(__DIR__ . '/sitemap.html');

?>