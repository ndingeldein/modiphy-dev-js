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

	<div class="btp-target"></div>
	
</div>

<?php include('./layout/templates.php'); ?>

<?php include('./layout/scripts.php'); ?>

<script>

(function(){

	var options = {
		siteId: <?php echo $config['mobile_site_id']; ?>,
		directLink: '<?php echo $config["direct_mobile_link"]; ?>',
		root: '<?php echo $config["mobile_root"]; ?>'
	};
	
	App.start( options );

})();

</script>

<?php include('./layout/foot.php') ?>