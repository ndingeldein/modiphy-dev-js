<?php require_once("../../main/dt/config.php"); ?>
<?php require_once("../../main/php/db.php"); ?>
<?php require_once("../lib/helpers.php"); ?>

<?php

	$page = (string)url_get_param($_SERVER['REQUEST_URI'], 'page', 'not_found');
	$page_title = (string)url_get_param($_SERVER['REQUEST_URI'], 'title', 'not_found');
	$layout = (string)url_get_param($_SERVER['REQUEST_URI'], 'layout', 'default');

	$page_escape = htmlspecialchars($page);
	$layout_escape = htmlspecialchars($layout);
	
	if (!file_exists($layout_escape.".php")) {

	   include("default.php");

	}else {
		include($layout_escape . ".php");
	}

?>