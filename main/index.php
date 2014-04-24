<?php require_once("./dt/config.php"); ?>
<?php require_once("./php/db.php"); ?>
<?php require_once("./php/helpers.php"); ?>

<?php include('./php/head.php'); ?>

<?php include('./php/templates.php'); ?>

<?php include('./php/header.php'); ?>

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

<?php include('./php/scripts.php'); ?>

<script type="text/javascript"  src="./js/modiphy/dev/dev.js"></script>
<script type="text/javascript"  src="js/custom.js"></script>

<script type="text/javascript"  src="js/modiphy/dev/photo-gallery.js"></script>

<script type="text/javascript"  src="js/main.js"></script>

<script>

(function(){
	
	var options = {
		siteId: <?php echo $config['site_id']; ?>
	};
	
	App.start( options );

})();

</script>

<div class="preload hidden"></div>

<?php include('./php/foot.php'); ?>
