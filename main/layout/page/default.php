<?php

$bg_image = get_cat_image_by_title($config['site_id'], 'Interior Images', 'filename', $page . '.jpg');
if(!strlen($bg_image['id'])){
  $bg_image = get_cat_image_by_title($config['site_id'], 'Interior Images', 'filename', 'default.jpg');
}

?>

<div class="image-holder" style="background-image: url(<?php echo get_image_url($bg_image); ?>);">
	<div class="hidden">
		<img src="<?php echo get_image_url($bg_image); ?>">
	</div>
</div>

<div class="content-wrapper">

	<div class="content">

		<div class="ezedit_body">

			<?php //include(realpath(__DIR__ . '/../') . '/templates/social_tray.php');  ?>

			<h1><?php echo $page_title ?></h1>
			<?php getPageContent( $page, $page_title ); ?>
		</div>

	</div>

</div>

