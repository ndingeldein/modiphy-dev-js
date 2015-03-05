<?php

namespace Modiphy\Gallery;

/**
* Gallery
*/
class Gallery
{

	public $categories = array();
	
	function __construct($id, $title, array $categories = array())
	{
		
		$this->id = $id;
		$this->title = $title;

		if (count($categories)) {
			foreach ($categories as $category) {
				$this->categories[$category->$id] = $category;
			}
		}

	}

	public function getCategory($field, $value){

		foreach ($this->categories as $category) {
			if($category->{$field} == $value){
				return $category;
			}
		}

	}

	public function getCatByTitle($title){

		foreach ($this->categories as $category) {
			if($category->title == $title){
				return $category;
			}
		}
		
	}

	public function getCatByIndex($i){
		return array_values($this->categories)[$i];
	}

	public function getItem($field, $value){

		foreach ($this->categories as $category) {
			
			$item = $category->getItem($field, $value);

			if($item){
				return $item;
			}

		}

	}

}

?>