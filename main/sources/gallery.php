<?php

$images = get_category_images(6621);

?>

<div class="gallery-thumbs clearfix">

	<?php

		foreach ($images as $image) {

			$image_url = get_image_url($image, 0, 120);
			$link = $config['direct_link'] . '?overlay=photo_gallery&id=' . $image['id'];

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