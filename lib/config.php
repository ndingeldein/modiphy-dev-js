<?php

/*
* An array that has properties pertaining to gallery manager galleries 
* and per site information for use throughout site files and directories
* HAS NOTHING TO DO WITH DB CONNECTION CREDENTIALS
*/

$config = array(

	'site_id' => 692,
	'client_gallery_id' => 683,
	'photo_gallery_id' => 683,

	'analytics_tracking_id' => 'UA-XXXXXXX-X',

	'sources_path' => 'main/sources/',
	'direct_link' => 'http://dev.modiphy.com/main/'
);

$config['og'] = array(
	
	'image_url' => $config['direct_link'] . 'images/og_image.jpg',
	'title' => 'Website Title'

);

$config['isMobile'] = (isMobile()) ? 1 : 0;

/*
$config['root'] sets root path for Backbone history pushstate.
This is necessary because it needs to be different for the local development and live domain environments.
*/
include(__DIR__ . '/php/root.php');
	
?>