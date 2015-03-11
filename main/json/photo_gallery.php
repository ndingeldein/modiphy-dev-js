<?php

	$image_id = url_get_param($_SERVER['REQUEST_URI'], 'id', 41032);
	
	$photo_gallery = $loader->load(PHOTO_GALLERY_ID);

	$image = $photo_gallery->getItem('id', $image_id);
	if($image){
		$images = $photo_gallery->categories[$image->category]->items;
	}else{
		$images = $photo_gallery->getCatByIndex(0)->items;
	}	

	$obj = array( 'success' => true, 'images' => $images );

?>