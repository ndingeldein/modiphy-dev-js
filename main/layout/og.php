<?php

$page = currentPage();

if(isset($og_image)){
	$og = new Modiphy\Site\OpenGraph(

			$og_image->getImageUrl(),

			currentURL(),

			$og_image->description,

			$og_image->field06


		);
}else{
	$og = new Modiphy\Site\OpenGraph(

			DIRECT_LINK . 'images/og_image.jpg',

			currentURL(),

			file_get_contents(SOURCES_PATH . 'metadata_website_title.html'),

			file_get_contents(SOURCES_PATH . 'metadata_description.html')


		);
}

echo $og;
