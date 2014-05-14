<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php readfile("../" . $config['sources_path'] . "website_title.html") ?></title>
	<meta name="robots" content="all" />
	<meta name="description" content="<?php readfile("../" . $config['sources_path'] . "description.html") ?>" />
	<meta name="keywords" content="<?php readfile("../" . $config['sources_path'] . "keywords.html") ?>" />

	<meta name="HandheldFriendly" content="True">
    <meta name="MobileOptimized" content="320">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <meta http-equiv="cleartype" content="on">

	<?php include('./layout/assets.php'); ?>

</head>

<body>