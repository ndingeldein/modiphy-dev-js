<?php

$page = currentPage();

if($config['og']['image']){

	$image = $config['og']['image'];
	$config['og']['image_url'] = get_image_url($image);
	$config['og']['url'] = currentURL();
	$config['og']['description'] = strip_tags($image['field06']);

	$max_length = 500;

	if (strlen($config['og']['description']) > $max_length)
	{
	    $offset = ($max_length - 3) - strlen($config['og']['description']);
	    $config['og']['description'] = substr($config['og']['description'], 0, strrpos($config['og']['description'], ' ', $offset)) . '...';
	}

	echo <<<EOT

<meta property="og:image" content="{$config['og']['image_url']}"/>

<meta property="og:url" content="{$config['og']['url']}" />

<meta property="og:title" content="{$image['field01']} | {$config['og']['title']}" />

<meta property="og:description" content="{$config['og']['description']}" />

EOT;

}

?>


<?php if (!$config['og']['image']): ?>

	<meta property="og:image" content="<?php echo $config['og']['image_url']; ?>"/>

	<meta property="og:url" content="<?php echo currentUrl() ;?>"/>

	<meta property="og:title" content="<?php readfile('../' . $config['sources_path'] . 'metadata_website_title.html'); ?>" />

	<meta property="og:description" content="<?php readfile('../' . $config['sources_path'] . 'metadata_description.html'); ?>" />


<?php endif ?>