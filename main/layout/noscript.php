<?php 

	$page = currentPage();

	$image = get_gallery_image($config['site_id'], 'field01', $page);	
	$page_title = str_replace('_', ' ', ucwords($page));

	$layout = ( strlen($image['field04']) ) ? $image['field04'] : 'default';
	$layout_escape = htmlspecialchars($layout);

?>

<div class="page default <?php echo $page; ?>">
	
<?php

	if (!file_exists('./layout/page/' . $layout_escape . '.php')) {

	   include('./layout/page/default.php');

	}else {
		include('./layout/page/' . $layout_escape . '.php');
	}

?>

</div>
