<?php

	$photo_gallery = $loader->load(PHOTO_GALLERY_ID);

	$image = $photo_gallery->getItem('id', $_GET['id']);
	$images = $photo_gallery->categories[$image->category]->items;

	$i = array_search($image, $images);
	$next_image = ( $i >= count($images) - 1 ) ? $images[0] : $images[$i + 1];
	$prev_image = ( $i ) ? $images[$i - 1] : $images[count($images) - 1];

	$w2 = -round($image->width/2);
	$h2 = -round($image->height/2);

?>

<div class="image-viewer" style="margin-left:<?php echo $w2; ?>px;margin-top:<?php echo $h2; ?>px;">
	<div class="img-holder"><img src="http://webgallerydisplay.com/image.php?id=<?php echo $_GET['id']; ?>"></div>
</div>

<a class="prev" href="<?php echo DIRECT_LINK . 'home?overlay=photo_gallery&id=' . $prev_image->id; ?>">
	<div class="icon-holder"><img src="./images/gallery_prev.png"></div>
</a>
<a class="next" href="<?php echo DIRECT_LINK . 'home?overlay=photo_gallery&id=' . $next_image->id; ?>">
	<div class="icon-holder"><img src="./images/gallery_next.png"></div>
</a>

<div class="caption-wrapper">
	<div class="caption"></div>
</div>