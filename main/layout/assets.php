<link rel="icon" href="./images/favicon.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="./images/favicon.ico" type="image/x-icon" />
	<link rel="apple-touch-icon" href="./images/iui-logo-touch-icon.png">

	<link href="../lib/css/normalize.css" rel="stylesheet" type="text/css" />
	<link href="./css/html5bp.css" rel="stylesheet" type="text/css" />

	<link href="../lib/css/icons/mono.css" rel="stylesheet" type="text/css" />
	<!-- <link href="./css/icons/flaticon.css" rel="stylesheet" type="text/css" /> -->

	<link href="./css/main.css" rel="stylesheet" type="text/css" />
	<link href="./css/overlay.css" rel="stylesheet" type="text/css" />

	<link href="../lib/css/tooltipster.css" rel="stylesheet" type="text/css" />
	<link href="./css/ezedit.css" rel="stylesheet" type="text/css" />
	<link href="../lib/dt/site.css" rel="stylesheet" type="text/css" />

<?php

if(isMobile()){
	echo '<link href="./css/mobile.css" rel="stylesheet" type="text/css" />';
}

?>

<?php 

// for overlay page styles for browswers w/o Javascript enabled
if($_GET['overlay']){
	echo '<link href="./css/overlay-no-js.css" rel="stylesheet" type="text/css" />';
}

?>
<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,800,700' rel='stylesheet' type='text/css'> -->

<script src="../lib/js/vendor/modernizr.js"></script>


<script type="text/javascript" src="https://apis.google.com/js/plusone.js">
	{"parsetags": "explicit"}
</script>