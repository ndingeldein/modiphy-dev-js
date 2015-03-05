<?php require_once("../../lib/php/gallery.php"); ?>

<?php

if(!$config['isMobile']){

	$images = $config['site_gallery']->getCatByTitle('Home Images')->items;
	
	$obj = array( 'success' => true, 'images' => $images);

}

?>