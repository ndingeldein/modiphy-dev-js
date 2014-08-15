<?php 

	$url = rtrim($_SERVER['REQUEST_URI'], '/');
	$url = preg_replace('/\?.*/', '', $url);
	$url = filter_var($url, FILTER_SANITIZE_URL);
	$url = explode('/', $url);

	if($url[1] == 'main'){
		$page = ( $url[2] ) ? $url[2] : 'home';
	}else{
		$page = ( $url[3] ) ? $url[3] : 'home';	
	}

	$image = get_gallery_image($config['site_id'], 'field01', $page);	
	$page_title = str_replace('_', ' ', ucwords($page));

	$layout = ( strlen($image['field04']) ) ? $image['field04'] : 'default';
	$layout_escape = htmlspecialchars($layout);

?>

<div class="page default <?php echo $page; ?>">
	
<?php

	if (!file_exists('./layout/page/' . $layout_escape . '.php')) {

	   include('./layout/page/default.php');

	}else {
		include('./layout/page/' . $layout_escape . '.php');
	}

?>

</div>
