<?php

$loader = new Modiphy\Gallery\Loader();
$gallery = $loader->load($config['photo_gallery_id']);

$images = $gallery->getCatByIndex(0)->items;

?>

<div class="gallery-thumbs clearfix">

	<?php

		foreach ($images as $image) {

			$image_url = $image->getImageUrl(0, 120);
			$link = $config['direct_link'] . '?overlay=photo_gallery&id=' . $image->id;

			echo <<<EOT
				
				<a class="gallery-thumb" href="$link">

					<div class="img-holder">

						<img src="$image_url">

					</div>

				</a>

EOT;

		}

	?>
	
</div>