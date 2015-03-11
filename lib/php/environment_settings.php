<?php
require_once(__DIR__ . '/environment.php');

/*
 Root path for Backbone history pushstate.
*/
if(__DEV__){
	define('PUSHSTATE_ROOT', '/' . ACCOUNT_USERNAME . '/main/');
}else{
	define('PUSHSTATE_ROOT', '/main/');
}

/*
$BASE_HREF sets base url for htaccess and pushstate
Only needed for development environment.
*/
if(__DEV__){
	define("BASE_HREF", '<base href="http://sites.dev/modiphy-dev-js/main/" />');
}else{
	define("BASE_HREF", '');
}
