<?php require_once('./layout/templates/mobile_nav.php'); ?>
<?php require_once('./layout/templates/main_nav.php'); ?>

<?php

$images = $config['site_gallery']->getCatByTitle('Nav')->items;

?>

<div class="header-wrapper">

	<div class="header">

		<a id="logo" href="intro">
			<img src="./images/logo.png" alt="">
		</a>
		
		<a class="menu-button">
			<div class="bar"></div>	
			<div class="bar"></div>
			<div class="bar"></div>
		</a>

		<?php if (!$config['isMobile']): ?>

		<div class="nav-container">			
		
		<?php echo getMainNav($config['site_gallery'], $images, 'main-nav clearfix' ); ?>
		</div>
			
		<?php endif ?>

	</div>

	<div class="mobile-nav-container">
		<?php echo getMobileNav($config['site_gallery'], $images, 'mobile-nav' ); ?>
	</div>

</div>