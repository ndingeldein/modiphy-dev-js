<?php

function url_get_param($url, $name, $default) {
    parse_str(parse_url($url, PHP_URL_QUERY), $vars);
    return isset($vars[$name]) ? $vars[$name] : $default;
}

function getPageContent($page, $page_title){
	global $config;

	$page_escape = htmlspecialchars($page);

	if ($page_escape == "search") {
	    include("../lib/reutn.php");
	}
	elseif (!file_exists("../sources/".$page_escape.".html")) {
	    include("../sources/not_found.php");
	}
	else {
		readfile("../sources/".$page_escape.".html");
	}

	if (!file_exists("../sources/".$page_escape.".php")) {
	    include("../sources/blank.php");
	}
	else {
		include("../sources/".$page_escape.".php");
	}
	
};
	
?>