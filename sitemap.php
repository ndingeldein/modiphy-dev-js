<?php header('Content-type: application/xml'); ?>

<?php require_once(__DIR__ . '/lib/php/autoload.php'); ?>
<?php require_once(__DIR__ . '/lib/config.php'); ?>
<?php require_once(__DIR__ . '/lib/php/helpers.php'); ?>

<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

<?php 


$loader = new Modiphy\Gallery\Loader();
$site_gallery = $loader->load(SITE_GALLERY_ID);

$nav = $site_gallery->getCatByTitle('Nav')->items;
$pages = $site_gallery->getCatByTitle('Pages')->items;
$secondary_nav = $site_gallery->getCatByTitle('Secondary Nav')->items;

$images = array_merge( $nav, $pages);

if(count($secondary_nav)){
	$images = array_merge( $images, $secondary_nav);
}

foreach ($nav as $image) {
	
	$sub_images = $site_gallery->getCatByTitle($image->field01)->items;

	if(count($sub_images)){
		$images = array_merge( $images, $sub_images);
	}

}

foreach ($images as $image) {

	$link = $image->getLinkUrl(DIRECT_LINK . $image->field01);
	if(substr($link, 0, 1) == '?'){
		$link = DIRECT_LINK . 'home' . $link;
	}

	if(substr($link, 0, 4) != 'http'){
		$link = DIRECT_LINK . $link;
	}

	echo <<<EOT

	<url>
		<loc>$link</loc>
		<changefreq>daily</changefreq>
	</url>

EOT;


}

?>

</urlset>
