<?php require_once("../lib/config.php"); ?>
<?php require_once("../lib/php/db.php"); ?>
<?php require_once("../lib/php/helpers.php"); ?>

<?php include('./layout/head.php') ?>

<?php include('./layout/header.php') ?>

<div class="page-wrapper">	

	<div class="page-container">
		
	</div>

</div>

<div class="overlay-page-wrapper">
	<div class="bg"></div>
	<a class="close-button">
		<img src="./images/close.png" alt="">
	</a>
	<div class="overlay-page-container"></div>
 </div>

<?php include('./layout/templates.php'); ?>

<?php include('./layout/scripts.php'); ?>

<script>

(function(){

	var options = {
		siteId: <?php echo $config['site_id']; ?>
	};
	
	App.start( options );

})();

</script>

<?php include('./layout/foot.php') ?>