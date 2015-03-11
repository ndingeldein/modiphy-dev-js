<?php

namespace Modiphy\Site;

/**
* OpenGraph
*/
class OpenGraph
{

	public $image_url;
	public $url;
	public $title;
	public $description;

	function __construct($image_url, $url, $title, $description)
	{
		
		$this->image_url = $image_url;
		$this->url = filter_var($url, FILTER_VALIDATE_URL);
		$this->title = $title;
		$this->description = strip_tags($description);

	}

	public function __toString(){

		return <<<EOT

			<meta property="og:image" content="{$this->image_url}"/>

			<meta property="og:url" content="{$this->url}" />

			<meta property="og:title" content="{$this->title}" />

			<meta property="og:description" content="{$this->description}" />

EOT;

	}


}

?>