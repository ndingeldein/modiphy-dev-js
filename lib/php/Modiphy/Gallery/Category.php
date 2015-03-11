<?php

namespace Modiphy\Gallery;

/**
* GalleryCategory
*/
class Category
{

	public $items = array();
	
	public function __construct(array $input_array, array $items = array())
	{
		
		foreach ($input_array as $key => $value) {
			$this->$key = $value;
		}

		if (count($items)) {
			foreach ($items as $item) {
				$this->items[$item->$id] = $item;
			}
		}

	}

	public function getItem($field, $value){

		foreach ($this->items as $item) {
			if($item->{$field} == $value){
				return $item;
			}
		}

	}

	public function getItemByIndex($i){
		$values = array_values($this->items);
		return $values[$i];
	}

}

?>