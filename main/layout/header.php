<?php require_once('./layout/templates/nav.php'); ?>

<div class="header-wrapper">

	<div class="header">
		
		<div class="nav-container">
			
			<?php createNav( get_cat_images_by_title( $config['site_id'], 'Nav'), 'main-nav' ); ?>

		</div>

	</div>

</div>