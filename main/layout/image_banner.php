<?php

$category = $config['site_gallery']->getCatByTitle('Interior Images');
$image = $category->getItem('filename', $page . '.jpg');

if(!$image){	
	$image = $category->getItem('filename', 'default.jpg');
}

?>

<div class="image-wrapper">
	<div class="image-holder" style="background-image: url(<?php echo $image->getImageUrl(); ?>);">
	
	</div>
</div>