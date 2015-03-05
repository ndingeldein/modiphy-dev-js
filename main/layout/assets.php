	<link rel="icon" href="./images/favicon.ico" type="image/x-icon" />
	<link rel="shortcut icon" href="./images/favicon.ico" type="image/x-icon" />
	<link rel="apple-touch-icon" href="./images/apple-touch-icon.png">

	<link href="../lib/css/normalize.css" rel="stylesheet" type="text/css" />
	<link href="./css/html5bp.css" rel="stylesheet" type="text/css" />

	<link href="../lib/css/icons/mono.css" rel="stylesheet" type="text/css" />

	<link href="./css/main.css" rel="stylesheet" type="text/css" />
	<link href="./css/overlay.css" rel="stylesheet" type="text/css" />
	
	<!-- <link href="../lib/css/tooltipster.css" rel="stylesheet" type="text/css" /> -->
	<link href="./css/ezedit.css" rel="stylesheet" type="text/css" />
	<link href="./css/dt.css" rel="stylesheet" type="text/css" />

<?php

if($config['isMobile']){
	echo '<link href="./css/mobile.css" rel="stylesheet" type="text/css" />';
}else{
	echo '<link href="./css/non-mobile.css" rel="stylesheet" type="text/css" />';
}

?>

<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,700,600,400' rel='stylesheet' type='text/css'>

<script src="../lib/js/vendor/modernizr.js"></script>


<script type="text/javascript" src="https://apis.google.com/js/plusone.js">
	{"parsetags": "explicit"}
</script>