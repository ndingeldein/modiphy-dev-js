<?php

$page_escape = htmlspecialchars($page);

$upThree = realpath(__DIR__ . '/../../..');

if (!file_exists(SOURCES_PATH . $page_escape . ".php")) {
    include(SOURCES_PATH . "blank.php");
}
else {
	include(SOURCES_PATH . $page_escape.".php");
}

?>