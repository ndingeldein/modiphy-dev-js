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
	elseif (!file_exists("../../" . $config['sources_path'] . $page_escape . ".html")) {
	    include("../../" . $config['sources_path'] . "/not_found.php");
	}
	else {
		readfile("../../" . $config['sources_path'] . $page_escape . ".html");
	}

	if (!file_exists("../../" . $config['sources_path'] . $page_escape . ".php")) {
	    include("../../" . $config['sources_path'] . "blank.php");
	}
	else {
		include("../../" . $config['sources_path'] . $page_escape.".php");
	}
	
};

function getMobilePageContent($page, $page_title){
	global $config;

	$page_escape = htmlspecialchars($page);

	if (file_exists("../../" . $config['sources_path'] . "mobile_" . $page_escape.".html")) {
	    readfile("../../" . $config['sources_path'] . "mobile_" . $page_escape.".html");
	}
	elseif (!file_exists("../../" . $config['sources_path'] . $page_escape.".html")) {
	    include("../../" . $config['sources_path'] . "not_found.php");
	}
	else {
		readfile("../../" . $config['sources_path'] . $page_escape.".html");
	}

	if (file_exists("../../" . $config['sources_path'] . "mobile_" . $page_escape.".php")) {
	    include("../../" . $config['sources_path'] . "mobile_" . $page_escape.".php");
	}
	elseif (!file_exists("../../" . $config['sources_path'] . $page_escape.".php")) {
	    include("../../" . $config['sources_path'] . "blank.php");
	}
	else {
		include("../../" . $config['sources_path'] . $page_escape.".php");
	}
	
};
	
?>