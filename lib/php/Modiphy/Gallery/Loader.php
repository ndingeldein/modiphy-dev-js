<?php

namespace Modiphy\Gallery;

/**
* GalleryLoader
*/
class Loader
{

	protected $GALLERY_CACHE_DIR;

	function __construct()
	{
		
		$this->GALLERY_CACHE_DIR = realpath(__DIR__ . '/../../../../../') . '/gallery_cache';

	}

	public function load($id){

		if (file_exists("{$this->GALLERY_CACHE_DIR}/{$id}.json")) {	

			$data = json_decode(file_get_contents("{$this->GALLERY_CACHE_DIR}/{$id}.json"), true);

			return $this->createGallery($id, $data);

		}

	}

	public function createGallery($id, $data){

		if (isset($data['categories'])) {		

			$gallery = new Gallery($id, 'Site');

			$i = 0;

			foreach ($data['categories'] as $value) {

			 	$category = new Category($value);

			 	if(count($data['images'][$i])){

			 		foreach ($data['images'][$i] as $image) {
			 		
				 		$category->items[$image['id']] = new Item($image);

				 	}

				 	$gallery->categories[$value['id']] = $category;				 	

			 	}

			 	$i++;
			 	
			}

		}

		return $gallery;

	}

}

?>