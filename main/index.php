<?php require_once("../lib/php/autoload.php"); ?>
<?php require_once("../lib/config.php"); ?>
<?php require_once("../lib/php/helpers.php"); ?>

<?php

$loader = new Modiphy\Gallery\Loader();
$site_gallery = $loader->load(SITE_GALLERY_ID);

?>

<?php include('./layout/head.php'); ?>

<?php include('./layout/js_templates.php'); ?>

<?php include('./layout/header.php'); ?>

<div class="overlay-page-wrapper">
	<div class="bg"></div>
	<a class="close-button">
		<img src="./images/close.png" alt="">
	</a>
	<div class="overlay-page-container"></div>
</div>

<div class="page-wrapper">

	<div class="page-container">
		
		<?php include('./layout/noscript.php'); ?>

	</div>

</div>

<?php include('./layout/scripts.php'); ?>

<script>

(function(){

	var options = {
		siteId: <?php echo SITE_GALLERY_ID; ?>,
		directLink: '<?php echo DIRECT_LINK; ?>',
		root: '<?php echo PUSHSTATE_ROOT; ?>',
		isMobile: <?php echo (__MOBILE__) ? 1 : 0; ?>
	};
	
	App.start( options );

})();

</script>

<div class="preload hidden"></div>

<?php include('./layout/foot.php'); ?>
