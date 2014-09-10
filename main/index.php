<?php require_once("../lib/php/detect_mobile.php"); ?>
<?php require_once("../lib/config.php"); ?>
<?php require_once("../lib/php/db.php"); ?>
<?php require_once("../lib/php/helpers.php"); ?>

<?php include('./layout/head.php') ?>

<?php include('./layout/header.php') ?>

<div class="page-wrapper">	

	<div class="page-container">
		
		<noscript>
			
			<?php include('./layout/noscript.php'); ?>

		</noscript>

	</div>

</div>

<div class="overlay-page-wrapper">
	<div class="bg"></div>
	<a href="<?php echo $config['direct_link'] . 'home' ?>" class="close-button">
		<img src="./images/close.png" alt="">
	</a>
	<div class="overlay-page-container">
		
		<noscript>
			
			<?php include('./layout/noscript_overlay.php'); ?>

		</noscript>

	</div>
 </div>

<?php include('./layout/js_templates.php'); ?>

<?php include('./layout/scripts.php'); ?>

<script>

(function(){

	var options = {

		siteId: <?php echo $config['site_id']; ?>,
		directLink: '<?php echo $config["direct_link"]; ?>',
		root: '<?php echo $config["root"]; ?>'

	};
	
	App.start( options );

})();

</script>

<?php include('./layout/foot.php') ?>