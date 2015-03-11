<div class="content-wrapper">
	
	<div class="content">

		<h2>home content</h2>

	</div>

</div>

<div class="series-wrapper">

	<div class="series-container">

		<?php 

			$category = $site_gallery->getCatByTitle('Home Images');
			$image_url = $category->getItemByIndex(0)->getImageUrl();
			
		?>

		<div class="preload hidden">
			<img src="<?php echo $image_url; ?>">
		</div>

		<?php
			foreach ($category->items as $item) {

				echo '<div class="series-item"></div>';

			}
			
		?>

	</div>

</div>

