<?php header('Content-type: application/json'); ?>
<?php require_once("./php/db.php"); ?>
<?php require_once("./php/helpers.php"); ?>

<?php

$gallery_id = url_get_param($_SERVER['REQUEST_URI'], 'gid', 0);
	
?>

<?php

	
	if( $gallery_id && is_numeric($gallery_id) ){

		$categories = get_gallery_categories( $gallery_id );

		if(count($categories)){

			$images = array();
			foreach ($categories as $category) {
				$images[] = get_category_images( $category['id'] );
			}	

			$obj = array( 'success' => true, 'categories' => $categories, 'images' => $images );

		}else{

			$obj = array( 'success' => false );

		}		
		
	}else{

		$obj = array( 'success' => false );

	}


	echo json_encode($obj);


?>

