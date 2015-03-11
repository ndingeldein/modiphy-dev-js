<?php

function url_get_param($url, $name, $default) {
    parse_str(parse_url($url, PHP_URL_QUERY), $vars);
    return isset($vars[$name]) ? $vars[$name] : $default;
}

function getPageContent($page){
	
	$page_escape = htmlspecialchars($page);

	$upTwo = realpath(__DIR__ . '/../..');

	if ($page_escape == "search") {
	    include("../../../lib/reutn.php");
	}
	elseif (!file_exists(SOURCES_PATH . $page_escape . ".html")) {
	    include(SOURCES_PATH . "/not_found.php");
	}
	else {
		readfile(SOURCES_PATH . $page_escape . ".html");
	}

	if (!file_exists(SOURCES_PATH . $page_escape . ".php")) {
	    include(SOURCES_PATH . "blank.php");
	}
	else {
		include(SOURCES_PATH . $page_escape.".php");
	}
	
};

function getMobilePageContent($page){
	
	$page_escape = htmlspecialchars($page);

	$upTwo = realpath(__DIR__ . '/../..');

	if (file_exists(SOURCES_PATH . "mobile_" . $page_escape.".html")) {
	    readfile(SOURCES_PATH . "mobile_" . $page_escape.".html");
	}
	elseif (!file_exists(SOURCES_PATH . $page_escape.".html")) {
	    include(SOURCES_PATH . "not_found.php");
	}
	else {
		readfile(SOURCES_PATH . $page_escape.".html");
	}

	if (file_exists(SOURCES_PATH . "mobile_" . $page_escape.".php")) {
	    include(SOURCES_PATH . "mobile_" . $page_escape.".php");
	}
	elseif (file_exists(SOURCES_PATH . $page_escape.".php") && !file_exists(SOURCES_PATH . "mobile_" . $page_escape.".html")) {

		include(SOURCES_PATH . $page_escape . ".php");
	    
	}
	else {
		include(SOURCES_PATH . "blank.php");
	}
	
};

function currentURL() {

	$pageURL = 'http';

	if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}

		$pageURL .= "://";

	if ($_SERVER["SERVER_PORT"] != "80") {

		$pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];

	} else {

		$pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];

	}

	return $pageURL;
}

function currentPage(){

	$url = rtrim($_SERVER['REQUEST_URI'], '/');
	$url = preg_replace('/\?.*/', '', $url);
	$url = filter_var($url, FILTER_SANITIZE_URL);
	$url = explode('/', $url);

	if($url[1] == 'main'){
		return ( $url[2] ) ? $url[2] : 'home';
	}else{
		return ( $url[3] ) ? $url[3] : 'home';
	}

}

function getPageTitle($page){
	return ucwords( str_replace('_', ' ', $page) );
}
	
?>