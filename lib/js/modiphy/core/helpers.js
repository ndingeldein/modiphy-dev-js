var modiphy = ( function( modiphy, Backbone, _ ) {

	M = modiphy;

	modiphy.imagePrefix = 'http://webgallerydisplay.com/image.php?id=';

	/**
	*
	* checks to see if _.isUndefined function is available on Lodash object because of certain Lodash builds and compatability with Backbone plugins
	*
	**/
	
	(function(){

		if( _.isUndefined ){ return; }
  
		function isUndefined(value) {
			return typeof value == 'undefined';
		}

		_.mixin({ 'isUndefined': isUndefined });

	})();

	/*==================================
	=            JS Helpers            =
	==================================*/
	
	function functionName(fun) {
		var ret = fun.toString();
		ret = ret.substr('function '.length);
		ret = ret.substr(0, ret.indexOf('('));
		return ret;
	}

	_.mixin({ 'functionName': functionName });

	/*=================================================
	=            String Formatting Helpers            =
	=================================================*/

	function pageToTitle( str ){

		return str.split('_').join(' ').replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

	}

	_.mixin({ 'pageToTitle': pageToTitle });

	function titleToPage( str ){

		return str.toLowerCase().split(' ').join('_');

	}

	_.mixin({ 'titleToPage': titleToPage });
	

	/*========================================
	=            Backbone Helpers            =
	========================================*/
	

	function backboneDefault( model, property, defaultValue ){

		model.set(property, model.get(property) || defaultValue );

	}

	_.mixin({ 'backboneDefault': backboneDefault });

	/*==========================================
	=            Gallery Helpers               =
	==========================================*/

	M.createGallery = function(gid, data, title ){

		title = title || 'Gallery';

		var categories = new M.GalleryCategories();

		_.each(data.images, function(value, index) {

			data.categories[index]['items'] = new M.GalleryItems( value );

			categories.add( new M.GalleryCategory( data.categories[index] ) );

		});

		return new M.Gallery({ id: gid, title: title, categories: categories});

	};

	M.getCatItemsByTitle = function(gallery, categoryTitle){

		var cat = gallery.get('categories').findWhere({ title: categoryTitle });
		if( cat ){
			return cat.get('items');
		}else{
			return;
		}
		

	};

	M.getCatItemByTitle = function(gallery, title, field, value){

		var filterObj = {};
		filterObj[field] = value;
		return M.getCatItemsByTitle( gallery, title).findWhere( filterObj );

	};

	function mapPage( model ){

		var map = {

			field01: 'name',

			field02: 'navText',

			field03: 'title',

			field04: 'layout',

			field05: 'type'


		};

		var pageModel = {};

		// checks to see if it is a Backbone Model or has already been Hashed/toJSONed/PlainObject
		model = ( model.attributes ) ? model.attributes : model;

		_.each(model, function(value, key) {
			key = map[key] || key;
			pageModel[key] = value;
		});

		return new M.Page( pageModel );

	}

	_.mixin({ 'mapPage': mapPage });

	function isOverlayPage( model ){
		
		return model.get('link01').substr(0, 9) === '?overlay=';

	}

	_.mixin({ 'isOverlayPage': isOverlayPage });

	/*==========================================
	=            Social Plugins                =
	==========================================*/

	var loadWidget = function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0],
		    p = /^http:/.test(d.location) ? 'http' : 'https';

		if (!d.getElementById(id)) {
		    js = d.createElement(s);
		    js.id = id;
		    js.src = p + "://platform.twitter.com/widgets.js";
		    fjs.parentNode.insertBefore(js, fjs);
		}
	};

	M.loadTweetButton = function(){

		if(!modiphy.twitterStarted){			
			loadWidget(document, "script", "twitter-wjs");
			modiphy.twitterStarted = true;
		}else{
			twttr.widgets.load();
		}

	};

	/*==========================================
	=            Handlebars Helpers            =
	==========================================*/
	
	M.template = function(source_id, context){

		Handlebars.templates = Handlebars.templates ? Handlebars.templates : {};

		Handlebars.templates[source_id] = Handlebars.templates[source_id] ? Handlebars.templates[source_id] : Handlebars.compile($('#' + source_id).html());
		return Handlebars.templates[source_id](context);

	};

	Handlebars.registerHelper( 'imageUrl', function( item, options){

		defaults = {
			maxwidth: item.width,
			maxheight: item.height
		};

		options.hash = _.defaults( options.hash, defaults);

		return M.imagePrefix + item.id + '&maxwidth=' + options.hash.maxwidth + '&maxheight=' + options.hash.maxheight;


	});

	Handlebars.registerHelper( 'itemLink', function( item, options ){

		defaults = {

			link: App.site.options.directLink + _.titleToPage( item.field01 )

		};

		options.hash = _.defaults( options.hash, defaults );

		result = item.link01.length ? item.link01 : options.hash.link;

		return new Handlebars.SafeString(result);


	});

	Handlebars.registerHelper( 'itemTarget', function( item, defaultTarget ){

		var result = item.target01.length ? item.target01 : defaultTarget;

		return new Handlebars.SafeString(result);


	});

	Handlebars.registerHelper( 'navText', function( item ){

		var result = item.field02.length ? item.field02 : _.pageToTitle( item.field01 );

		return new Handlebars.SafeString(result);


	});

	Handlebars.registerHelper('halfWidth', function(item) {

		var ret = item.width/2;

		return ret;

	});

	Handlebars.registerHelper('docWidth', function(item) {

		var ret = item.width/2 - 29;

		return ret;

	});

	Handlebars.registerHelper( 'socialIcon', function( item ){

		var result = item.field02.replace('&amp;', '&');

		return new Handlebars.SafeString(result);

	});

	return modiphy;

})( modiphy || {}, Backbone, _ );