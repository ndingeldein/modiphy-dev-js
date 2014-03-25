<?php
	
	$images = get_cat_images_by_title( $config['site_id'], 'Home Images');	

	$obj = array( 'success' => true, 'images' => $images );

?>