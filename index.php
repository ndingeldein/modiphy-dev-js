<?php

require_once("./lib/php/detect_mobile.php");

// Coming Soon
header("location:cs/");

//Go Live
	

// if(isMobile()){

// 	header("Location:mobile/");

// }else{

// 	header("Location:main/");

// }


?>

<?php require_once('./lib/config.php'); ?>

<!DOCTYPE html>
<html class="no-js">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php readfile($config['sources_path'] . 'metadata_website_title.html'); ?></title>
	<meta name="robots" content="all" />
	<meta name="description" content="<?php readfile($config['sources_path'] . 'metadata_description.html'); ?>" />
	<meta name="keywords" content="<?php readfile($config['sources_path'] . 'metadata_keywords.html'); ?>" />

	<meta property="og:image" content="./lib/images/og_image.png"/>

<style>
.visuallyhidden{

	border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;

}
</style>

</head>

<body>

<div class="visuallyhidden">

<?php include($config['sources_path'] . 'sitemap.php'); ?><br>

</div>

</body>

</html>

