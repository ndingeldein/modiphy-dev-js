<?php

$page_escape = htmlspecialchars($page);

$upThree = realpath(__DIR__ . '/../../..');

if (!file_exists($upThree . '/' . $config['sources_path'] . $page_escape . ".php")) {
    include($upThree . '/' . $config['sources_path'] . "blank.php");
}
else {
	include($upThree . '/' . $config['sources_path'] . $page_escape.".php");
}

?>