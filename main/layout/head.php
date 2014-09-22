<!DOCTYPE html>
<html class="no-js">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title><?php readfile('../' . $config['sources_path'] . 'metadata_website_title.html') ?></title>
	<meta name="robots" content="all" />
	<meta name="description" content="<?php readfile('../' . $config['sources_path'] . 'metadata_description.html'); ?>" />
	<meta name="keywords" content="<?php readfile('../' . $config['sources_path'] . 'metadata_keywords.html'); ?>" />

	<meta property="og:image" content="<?php echo $config['direct_link'] ?>/images/og_image.png"/>

	<?php include('./layout/base_href.php') ?>
	
	<?php include('./layout/assets.php'); ?>

</head>

<body>