<?php

//define('GALLERY_CACHE_DIR', '/home/webgalle/gallery_cache');
define('GALLERY_CACHE_DIR', realpath(__DIR__ . '/../../../') . '/gallery_cache');

$db_galleries = array();


function loadGallery($id){
	global $db_galleries;

	if (file_exists(GALLERY_CACHE_DIR . "/{$id}.json")) {	

		$data = json_decode(file_get_contents(GALLERY_CACHE_DIR . "/{$id}.json"), true);
		$db_galleries[$id] = $data;

	}

}

function get_gallery_category_by_title($gallery_id, $title){
	global $db_galleries;

	$gallery = $db_galleries[$gallery_id];
	
	foreach ($gallery['categories'] as $category) {
		if($category['title'] == $title){
			return $category;
		}
	}

}

function get_cat_images_by_title($gallery_id, $title){
	global $db_galleries;

	$gallery = $db_galleries[$gallery_id];
	$category = get_gallery_category_by_title($gallery_id, $title);
	$i = array_search($category, $gallery['categories']);

	return $gallery['images'][$i];

}

// returns default parameter if link field is left blank in manager
function get_link_url($image, $default = './'){

	return ( strlen($image['link01']) ) ? $image['link01'] : $default;

}

// returns default parameter if target field is left blank in manager
function get_target($image, $default = '_self'){

	return ( strlen($image['target01']) ) ? $image['target01'] : $default;

}

// returns field02 if not empty otherwise creates word from field01(page name)
// uncomment if function not found
// function getNavText($image){

// 	$default = ucwords(str_replace('_', ' ', $image['field01']) );

// 	return ( strlen($image['field02']) ) ? $image['field02'] : $default ;

// }

?>