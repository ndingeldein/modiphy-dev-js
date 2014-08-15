<?php

/*
* An array that has properties pertaining to gallery manager galleries 
* and per site information for use throughout site files and directories
* HAS NOTHING TO DO WITH DB CONNECTION CREDENTIALS
*/

$config = array(

	'site_id' => 636,
	'mobile_site_id' => 622,
	'photo_gallery_id' => 582,

	'analytics_tracking_id' => 'UA-3460942-3',

	'sources_path' => 'main/sources/',
	'direct_link' => 'http://dev.modiphy.com/main/'

);

/*
$config['root'] sets root path for Backbone history pushstate.
This is necessary because it needs to be different for the local development and live domain environments.
*/
include(__DIR__ . '/php/root.php');
	
?>