<?php

$category = $site_gallery->getCatByTitle('Interior Images');
$image = $category->getItem('filename', $page . '.jpg');

if(!$image){	
	$image = $category->getItemByIndex(0);
}

?>

<div class="image-wrapper">
	<div class="image-holder" style="background-image: url(<?php echo $image->getImageUrl(); ?>);">
	
	</div>
</div>