<?php

require_once("./lib/php/detect_mobile.php");

if(isMobile()){

	header("Location:mobile/");

}else{

	header("Location:main/");

	//header("location:cs/");

}


?>

<div id="Layer1" style="position:absolute; width:700px; height:387px; z-index:1; top: -1700px;">

<?php //readfile("./main/sources/description.html") ?><br>

<?php //readfile("./main/sources/sitemap.html") ?><br>

<?php //require_once("/usr/local/lib/php/links.php"); ?><br>

<?php //readfile("./main/sources/keywords.html") ?><br>

<?php //readfile("./main/sources/about.html") ?><br>

</div>

