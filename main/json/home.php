<?php

if(!__MOBILE__){

	$site_gallery = $loader->load(SITE_GALLERY_ID);

	$images = $site_gallery->getCatByTitle('Home Images')->items;
	
	$obj = array( 'success' => true, 'images' => $images);

}

?>