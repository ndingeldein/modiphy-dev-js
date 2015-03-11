<?php

namespace Modiphy\Gallery;

/**
* GalleryItem
*/
class Item
{

	const IMAGE_PREFIX = 'http://webgallerydisplay.com/image.php?id=';
	
	public function __construct(array $input_array)
	{
		
		foreach ($input_array as $key => $value) {
			$this->$key = $value;
		}

	}

	public function getImageUrl($maxwidth = 0, $maxheight = 0){

		if(!$maxwidth && !$maxheight){
			return self::IMAGE_PREFIX . $this->id . '&maxwidth=' . $this->width . '&maxheight=' . $this->height;
		}

		return self::IMAGE_PREFIX . $this->id . '&maxwidth=' . $maxwidth . '&maxheight=' . $maxheight;

	}

	public function getLinkUrl($default = ''){
		return ( strlen($this->link01) ) ? $this->link01 : $default;
	}

	public function getTarget($default = '_self'){

		return ( strlen($this->target01) ) ? $this->target01 : $default;

	}

	public function getNavText(){

		$default = ucwords(str_replace('_', ' ', $this->field01) );

		return ( strlen($this->field02) ) ? $this->field02 : $default;

	}

	public function isPlaceholder(){

		return strpos($this->filename, 'placeholder-') !== FALSE;

	}

	public function __tostString(){
		return $this->id;
	}

}

?>