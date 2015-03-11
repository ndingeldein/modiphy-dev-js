<?php 

	
	if($_GET['overlay']){

		$page = $_GET['overlay'];
		$page_title = str_replace('_', ' ', ucwords($page));
		$image = $site_gallery->getItem('field01', $page);

		$layout = ( strlen($image->field04) ) ? $image->field04 : 'default';
		$layout_escape = htmlspecialchars($layout);

		echo '<div class="page default ' . $page . '">';
	
		if (!file_exists('./layout/page/' . $layout_escape . '.php')) {

		   include('./layout/page/default.php');

		}else {
			include('./layout/page/' . $layout_escape . '.php');
		}

		echo '</div>';

	}

?>


