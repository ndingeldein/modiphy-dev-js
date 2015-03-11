<?php

require_once(dirname(__FILE__) . '/lib/config.php');

$ua = ANALYTICS_TRACKING_ID;

?>

<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', '<?php echo $ua ?>']);
	_gaq.push(['_trackPageview']);

	(function() {
		var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

	(function() {

		$(window).on( 'hashchange', function(){

			_gaq.push(['_trackPageview',location.pathname + location.search  + location.hash]);

		});

	})();

</script>