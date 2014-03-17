<?php require_once("./php/config.php"); ?>
<?php require_once("./php/db.php"); ?>
<?php require_once("./php/helpers.php"); ?>

<?php include('./php/head.php'); ?>

<?php include('./php/templates.php'); ?>

<?php include('./php/header.php'); ?>

<div class="page-wrapper">

	<div class="page-container">
		
	</div>

</div>

<div class="overlay-page-container"></div>

<?php include('./php/scripts.php'); ?>

<script type="text/javascript"  src="./js/modiphy/dev.js"></script>
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
