<?php
	
	$navitems = get_cat_images_by_title( $config['mobile_site_id'], 'Mobile Nav');
	if( !count($navitems) ){
		$navitems = get_cat_images_by_title( $config['mobile_site_id'], 'Nav');
	}
	$socialNavitems = get_cat_images_by_title( $config['mobile_site_id'], 'Social Nav');

	$obj = array( 
		'success' => true,
		'navitems' => $navitems,
		'socialNavitems' => $socialNavitems
	);

?>