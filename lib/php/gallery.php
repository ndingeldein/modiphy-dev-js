<?php

$config['galleries'] = array();

$loader = new Modiphy\Gallery\Loader();
$config['galleries'][$config['site_id']] = $loader->load($config['site_id']);
$config['site_gallery'] = $config['galleries'][$config['site_id']];

?>