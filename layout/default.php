<?php

$bg_image = get_cat_image_by_title($config['site_id'], 'Interior Images', 'filename', $page . '.jpg');
if(!strlen($bg_image['id'])){
  $bg_image = get_cat_image_by_title($config['site_id'], 'Interior Images', 'filename', 'default.jpg');
}

?>
<div class="content-wrapper">

	<div class="content">

		<div class="ezedit_body">
			<?php getPageContent( $page, $page_title ); ?>
		</div>

	</div>

</div>

<div class="image-holder" style="background-image: url(<?php echo get_image_url($bg_image); ?>);">
	<div class="hidden">
		<img src="<?php echo get_image_url($bg_image); ?>">
	</div>
</div>