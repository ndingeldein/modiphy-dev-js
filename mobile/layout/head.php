<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php readfile('../' . $config['sources_path'] . 'metadata_website_title.html') ?></title>
	<meta name="robots" content="all" />
	<meta name="description" content="<?php readfile('../' . $config['sources_path'] . 'metadata_description.html'); ?>" />
	<meta name="keywords" content="<?php readfile('../' . $config['sources_path'] . 'metadata_keywords.html'); ?>" />

	<meta property="og:image" content="http://theplumbingwarehouse.net/og_image.jpg"/>

	<meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <meta http-equiv="cleartype" content="on">

    <?php include('./layout/base_href.php') ?>

	<?php include('./layout/assets.php'); ?>

</head>

<body>