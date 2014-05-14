<?php require_once("../main_mobile/dt/config.php"); ?>
<?php require_once("../" . $config['main_directory'] . "/php/db.php"); ?>
<?php require_once("./lib/helpers.php"); ?>

<?php include('./layout/head.php') ?>

<div class="wrapper">

	<?php include('./layout/nav.php') ?>

	<div class="page-wrapper">

		
		<?php include('./layout/header.php') ?>


		<div class="page-container">
			
		</div>

	</div>
	
</div>

<?php include('./layout/templates.php'); ?>

<?php include('./layout/scripts.php'); ?>

<script type="text/javascript"  src="../<?php echo $config['main_directory']; ?>/js/modiphy/dev/dev.js"></script>
<script type="text/javascript"  src="js/main.js"></script>



<script>

(function(){

	var options = {
		siteId: <?php echo $config['mobile_site_id']; ?>,
		pathToMain: '../<?php echo $config["main_directory"]; ?>/'
	};
	
	App.start( options );

})();

</script>

<?php include('./layout/foot.php') ?>