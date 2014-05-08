<?php require_once("../main/dt/config.php"); ?>
<?php require_once("../main/php/db.php"); ?>
<?php require_once("./lib/helpers.php"); ?>

<?php include('./layout/head.php') ?>

<?php include('./layout/nav.php') ?>

<div class="page-wrapper">

	
	<?php include('./layout/header.php') ?>


	<div class="page-container">
		
	</div>

</div>

<?php include('./layout/templates.php'); ?>

<?php include('./layout/scripts.php'); ?>

<script type="text/javascript"  src="../main/js/modiphy/dev/dev.js"></script>
<script type="text/javascript"  src="js/main.js"></script>

<script>

(function(){
	
	var options = {
		siteId: <?php echo $config['mobile_site_id']; ?>
	};
	
	App.start( options );

})();

</script>

<?php include('./layout/foot.php') ?>