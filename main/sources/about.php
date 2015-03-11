<br>

<?php

echo PUBLIC_PATH . '<br>';
echo MAIN_PATH . '<br>';
echo SOURCES_PATH . '<br>';

require_once(MAIN_PATH . 'layout/templates/copy.php');

$loader = new Modiphy\Gallery\Loader();
$gallery = $loader->load(SITE_GALLERY_ID);

echo getCopy($gallery->getItem('filename', 'copy.png'));

?>