<?php require_once(__DIR__ . '/php/detect_mobile.php'); ?>

<?php

/* Flux account username */
define("ACCOUNT_USERNAME", 'modiphy-dev-js');

/* Flux Gallery IDs */
define('SITE_GALLERY_ID', 681);
define('CLIENT_GALLERY_ID', 682);
define('PHOTO_GALLERY_ID', 683);

/* Google Analytics ID */
define('ANALYTICS_TRACKING_ID', 'UA-XXXXXXX-X');

/* Path to public_html */
define('PUBLIC_PATH', realpath(__DIR__ . '/../') . '/');

/* Path to main */
define('MAIN_PATH', realpath(__DIR__ . '/../') . '/main/');

/* Path to text editor sources path relative to public_html */
define('SOURCES_PATH', realpath(__DIR__ . '/../') . '/main/sources/');

/**

** DIRECT_LINK

* Sets a prefix for all html links

* Prefix is prepended to internal site links for better SEO. Javascript delegates all links with this prefix to use pushstate.
**/
define('DIRECT_LINK', 'http://dev.modiphy.com/main/');

/* Mobile Detection */
define('__MOBILE__', isMobile());

/* Development/Production related constants and variables*/
require_once(__DIR__ . '/php/environment_settings.php');
	
?>