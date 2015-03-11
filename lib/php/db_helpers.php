<?php
require_once(__DIR__ . '/environment_settings.php');

if(__DEV__){	
	define('GALLERY_CACHE_DIR', realpath(__DIR__ . '/../../../') . '/gallery_cache');
}else{
	define('GALLERY_CACHE_DIR', '/home/webgalle/gallery_cache');
}

define('IMG_PREFIX', 'http://webgallerydisplay.com/image.php?id=');

$db_galleries = array();

/*============================================================
=            GALLERY CACHE DB Interface Functions            =
============================================================*/
/*

Rewritten gallery functions to work with gallery cache

*/
/*----------------------------------------------------------*/




/*
Looks in field02 otherwise creates Nav Text from field 1
*/
function getNavText($image){

	$default = ucwords(str_replace('_', ' ', $image['field01']) );

	return ( strlen($image['field02']) ) ? $image['field02'] : $default ;

}

function loadGallery($id){
	global $db_galleries;

	if (file_exists(GALLERY_CACHE_DIR . "/{$id}.json")) {	

		$data = json_decode(file_get_contents(GALLERY_CACHE_DIR . "/{$id}.json"), true);
		$db_galleries[$id] = $data;

		return $db_galleries[$id];

	}


}

function get_gallery_category($gallery_id, $id){
	global $db_galleries;

	$gallery = $db_galleries[$gallery_id];

	foreach ($gallery['categories'] as $category) {
		
		if($category['id'] == $id){
			return $category;
		}

	}

}

function get_gallery_image($gallery_id, $field, $value){
	global $db_galleries;

	$gallery = $db_galleries[$gallery_id];

	foreach ($gallery['images'] as $images) {
		
		foreach ($images as $image) {
			if($image[$field] == $value){
				return $image;
			}
		}

	}

}

function get_gallery_categories($gallery_id){
	global $db_galleries;

	return $db_galleries[$gallery_id]['categories'];

}

// function get_gallery_images($gallery_id, $field, $value){
// 	global $db_galleries;

// 	$gallery = $db_galleries[$gallery_id];
// 	$matched = array();

// 	foreach ($gallery['images'] as $images) {
		
// 		foreach ($images as $image) {
// 			if($image[$field] == $value){
// 				$matched[] = $image;
// 			}
// 		}

// 	}

// }

function get_category_images($gallery_id, $category_id){
	global $db_galleries;

	$gallery = $db_galleries[$gallery_id];
	$category = get_gallery_category($gallery_id, $category_id);
	$i = array_search($category, $gallery['categories']);

	if($i !== FALSE){
		return $gallery['images'][$i];
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

	if($i !== FALSE){
		return $gallery['images'][$i];
	}

}

function get_cat_image_by_title($gallery_id, $title, $field, $value){

	$images = get_cat_images_by_title($gallery_id, $title);
	foreach ($images as $image) {
		if($image[$field] == $value){
			return $image;
		}	
	}

}

function get_cat_image($category_images, $field, $value){

	$matched = array_filter($category_images, function($image) use($field, $value) {

		return ($image[$field] == $value);

	});

	$matched = array_values($matched);

	return (count($matched)) ? $matched[0] : null;
	
}

// creates image.php url from image id
function get_image_url($image, $maxwidth='', $maxheight=''){

	
	if(! $maxwidth && !$maxheight){
		return IMG_PREFIX . $image['id'] . '&maxwidth=' . $image['width'] . '&maxheight=' . $image['height'];
	}else{
		return IMG_PREFIX . $image['id'] . '&maxwidth=' . $maxwidth . '&maxheight=' . $maxheight;
	}
	
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