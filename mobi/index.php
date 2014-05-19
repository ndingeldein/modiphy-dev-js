<?php require_once("../lib/config.php"); ?>
<?php require_once("../lib/php/db.php"); ?>
<?php require_once("../lib/php/helpers.php"); ?>

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

<script type="text/javascript"  src="../lib/js/modiphy/dev/dev.js"></script>
<script type="text/javascript"  src="./js/main.js"></script>



<script>

(function(){

	var options = {
		siteId: <?php echo $config['mobile_site_id']; ?>
	};
	
	App.start( options );

})();

</script>

<?php include('./layout/foot.php') ?>