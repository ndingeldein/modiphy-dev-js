<?php header('Content-type: application/json'); ?>
<?php require_once("../../lib/php/detect_mobile.php"); ?>
<?php require_once("../../lib/php/autoload.php"); ?>
<?php require_once("../../lib/config.php"); ?>
<?php require_once("../../lib/php/helpers.php"); ?>

<?php

	$page = (string)url_get_param($_SERVER['REQUEST_URI'], 'page', 'not_found');
	$type = (string)url_get_param($_SERVER['REQUEST_URI'], 'type', 'default');

	$page_escape = htmlspecialchars($page);
	$type_escape = htmlspecialchars($type);
	
	if (!file_exists($page_escape.".php")) {

	    if (!file_exists($type_escape.".php")) {

	    	$obj = array( 'success' => true );

		}else {
			include($type_escape.".php");
		}

	}else {
		include($page_escape.".php");
	}

	echo json_encode($obj);
	
?>