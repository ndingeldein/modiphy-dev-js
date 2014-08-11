<?php

$images = get_cat_images_by_title($config['site_id'], 'Home Images');
	
?>

<div class="content-wrapper">

	<div class="top"></div>
	
	<div class="content">

		<div class="tag-wrapper">
			<div class="tag-container">

				<span class="field01"></span><br>
				<span class="field02"></span><br>
				<a href="#" class="series-button">					

				</a>

			</div>

			<ul class="series-nav">
			
			</ul>

		</div>

		<div class="series-container">

			<div class="preload hidden">
				<img src="<?php echo get_image_url($images[0]) ?>">
			</div>
			
			<?php
			
				foreach ($images as $image) {
					
					echo '<div class="series-item"></div>';

				}
				
			?>

		</div>		

	</div>

</div>
