<?php require_once("../lib/php/detect_mobile.php"); ?>
<?php require_once("../lib/config.php"); ?>
<?php require_once("../lib/php/db.php"); ?>
<?php require_once("../lib/php/helpers.php"); ?>

<script type="text/javascript"  src="../lib/js/vendor/lodash.js"></script>

<script type="text/javascript"  src="../lib/js/vendor/jquery.js"></script>

<!-- 
jquery 1.9 or later must be used for migrate plugin

 -->
<!-- <script src="http://code.jquery.com/jquery-1.9.0.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.js"></script> -->


<script type="text/javascript" src="../lib/js/vendor/backbone.js"></script>

<script type="text/javascript" src="../lib/js/vendor/tweenmax.js"></script>

<script type="text/javascript" src="../lib/js/vendor/handlebars.js"></script>

<!-- <script type="text/javascript"  src="../lib/js/vendor/handlebars.runtime.js"></script> -->

<script type="text/javascript" src="../lib/js/plugins.js"></script>

<script type="text/javascript" src="../lib/js/modiphy/core/gallery.js"></script>
<script type="text/javascript" src="../lib/js/modiphy/core/helpers.js"></script>
<script type="text/javascript" src="../lib/js/modiphy/core/mixins.js"></script>
<script type="text/javascript" src="../lib/js/modiphy/core/core.js"></script>

<script type="text/javascript" src="../lib/js/modiphy/site/page.js"></script>
<script type="text/javascript" src="../lib/js/modiphy/site/site.js"></script>

<!-- <script src="galleria/galleria-1.2.8.min.js"></script> -->
<script type="text/javascript"  src="../lib/js/modiphy/photogallery/photo-gallery.js"></script>


<?php $images = get_cat_images_by_title($config['site_id'], 'Nav');?>

<ul>
<?php foreach ($images as $image) {
	echo '<li><a href="?page=' . $image['field01'] . '" target="' . $image['target01'] . '">' . $image['field01'] . '</a></li>';
} ?>
</ul>

<script>
	
(function(){

var tester = {

	id: '<?php echo $config["site_id"] ?>',

	galleries: new M.Galleries(),

	load: function(){

		return $.get( "../lib/php/gallery.php", { 'gid': this.id }).promise();

	},

	createGallery: function( data ){

		console.log( this );

		if(data.success){
				
			this.galleries.add( M.createGallery( this.id, data, 'site' ) );
			this.gallery = this.galleries.get( this.id );
			this.init();
			

		}else{
			alert('Gallery not found :(\n' + 'Please try again!');
			window.location.hash = 'gallery';
		}

	},

	init: function(){

		console.log('Do something! (Overriding this would be a good first step...)');

	}

};

_.bindAll(tester);

var myView = M.ItemView.extend({
	initialize: function(){
		console.log('my view!');
	}
});

tester.load()

	.done( tester.createGallery )
	.fail(function(x, y, e){
		console.log(e);
	});

_.extend(tester, {

	init: function(){

		var items = M.getCatItemsByTitle( this.gallery, 'Nav' );

		var view = new M.DomCollectionView({
			el: 'ul',
			childSelector: 'li',
			collection: items,
			itemView: M.NavitemView
		});

		view.render();

		view.children.each(function(view, index) {
			console.log(view);
		});

	}

});	


})();


</script>

