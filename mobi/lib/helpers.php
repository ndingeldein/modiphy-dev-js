<?php

function url_get_param($url, $name, $default) {
    parse_str(parse_url($url, PHP_URL_QUERY), $vars);
    return isset($vars[$name]) ? $vars[$name] : $default;
}

function getMobilePageContent($page, $page_title){
	global $config;

	$page_escape = htmlspecialchars($page);

	if (file_exists("../../main/sources/".$page_escape."_mobile.html")) {
	    readfile("../../main/sources/".$page_escape."_mobile.html");
	}
	elseif (!file_exists("../../main/sources/".$page_escape.".html")) {
	    include("../../main/sources/not_found.php");
	}
	else {
		readfile("../../main/sources/".$page_escape.".html");
	}

	if (file_exists("../../main/sources/".$page_escape."_mobile.php")) {
	    include("../../main/sources/".$page_escape."_mobile.php");
	}
	elseif (!file_exists("../../main/sources/".$page_escape.".php")) {
	    include("../../main/sources/blank.php");
	}
	else {
		include("../../main/sources/".$page_escape.".php");
	}
	
};
	
?>