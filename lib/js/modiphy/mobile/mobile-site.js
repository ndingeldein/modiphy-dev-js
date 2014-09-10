var modiphy = ( function( modiphy, Backbone, _ ) {

	var M = modiphy;

	/*============================
	=            Site            =
	============================*/
	
	M.SitePages = function(){

		items = _.flatten( arguments );
		
		this.allPages = _.map( items, _.mapPage );
		this.allPages = _.uniq( this.allPages, function( page ){

			return page.get('name');

		});

		console.log( this.allPages );

		this.normal = new M.Pages();

		this.normal.set( _.reject( this.allPages, _.isOverlayPage ) );
	};

	M.SiteRouter = Backbone.Router.extend({

		routes: {

			'': 'index',

			':hash': 'selectPage'

		},

		initialize: function( options ){

			this.site = options.site;
			this.pages = options.site.pages;

		},

		index: function(){

			this.navigate( 'intro', {trigger: true} ); 
			
		},

		selectPage: function( hash, params ){

			_.escape( hash );

			// console.log( 'hash = ' + hash );
			// console.log( 'params = ' + $.param(params) );

			var page = this.pages.normal.get( hash );
			var nextPage;
			if( !this.pages.normal.selected || hash != this.pages.normal.selected.get('name') ){

				nextPage = this.pages.normal.get( hash );
				if( !nextPage ){
					console.log( hash + ' Page not found so a new one was created ' );
					nextPage = new M.Page( { name: hash });
					this.pages.normal.add( nextPage );
				}

				if( nextPage ){

					this.pages.normal.select( nextPage );

				}else{

					window.location.hash = this.pages.normal.at(0).get('name');

				}

			}

			
		}

	});

	M.Site = function( options ){

		var defaults = {
			root: '/mobile'
		};

		this.options = _.defaults( {}, options, defaults );
		this.galleries = new M.Galleries();
		this.id = this.options.siteId;
		this.pageTypes = new M.PageTypes();

		this.pageViewer = new M.PageViewer();
		this.pageLoader = new M.PageLoader({
			pathToMain: this.options.pathToMain
		});

		this.$body = $('body');

		_.bindAll( this, 'createGallery' );

	};

	_.extend( M.Site.prototype, {

		load: function(){
			
			return $.get( '../lib/php/gallery.php', { 'gid': this.id }).promise();

		},

		createGallery: function( data ){

			if(data.success){
					
				this.galleries.add( M.createGallery( this.id, data, 'site' ) );
				this.gallery = this.galleries.get( this.id );
				this.init();
				

			}else{
				alert('Gallery not found :(\n' + 'Please try again!');
				window.location.hash = 'gallery';
			}

		},

		setPages: function(){

			this.pages = new M.SitePages( arguments );
			this.router = new M.SiteRouter({ site: this });

			this.pages.normal.on( 'select:one', this.pageSelected, this );
		
		},

		pageSelected: function( page ){

			if( page ){

				$('.wrapper').animate({'scrollTop': 0}, {'duration':600, 'easing':'swing'});

				this.pageLoader.load( page ).done( _.bind( this.pageLoaded, this ) );

				this.updateNavitems( page );

				switch( page.get('name') ){

					case 'intro':

						this.introPageSelected( page );
						break;

					case 'home':

						this.homePageSelected( page );
						break;

					default:

						this.interiorPageSelected( page );

				}

			}

			if( this.onPageSelected ){
				this.onPageSelected( page );
			}

		},

		pageLoaded: function(){

			var page = arguments[0][0];

			var pageView = this.buildPageView( page );

			this.pageViewer.setView( pageView );

		},

		buildPageView: function( page ){
			
			var type = this.pageTypes.findByName( page.get('type') );

			return new type.ViewType({ model: page });

		},

		introPageSelected: function(){

			this.$body.removeClass('home');
			this.$body.removeClass('inside');
			this.$body.addClass('intro');
			
			if(this.onIntro){
				this.onIntro();
			}

		},

		homePageSelected: function(){

			this.$body.addClass('home');
			this.$body.removeClass('inside');
			this.$body.removeClass('intro');

			if(this.onHome){
				this.onHome();
			}

		},

		interiorPageSelected: function(){

			this.$body.removeClass('home');
			this.$body.removeClass('intro');
			this.$body.addClass('inside');

			if(this.onInterior){
				this.onInterior();
			}

		},

		updateNavitems: function(page){

			// var that = this;
			// this.navitems.each(function(model, index){
			// 	if(model.get('field01') == page.get('name')){
			// 		that.nav.children.findByIndex(index).$el.addClass('selected');
			// 	}else{
			// 		that.nav.children.findByIndex(index).$el.removeClass('selected');
			// 	}
			// });

		},

		startHistory: function( root ){

			console.log(Backbone.history._hasPushState);

			var url;

			var directLink = this.options.directLink;

			Backbone.history.start({ pushState: true, root: root });

			// Use absolute URLs  to navigate to anything not in your Router.
 
			//Only need this for pushState enabled browsers
			if (Backbone.history && Backbone.history._hasPushState) {
			 
			// Use delegation to avoid initial DOM selection and allow all matching elements to bubble
				$(document).delegate("a", "click", function(e) {
					// Get the anchor href and protcol
					var href = $(this).attr("href");
					if(!href){
						return;
					}
					var protocol = this.protocol + "//";

					// Ensure the protocol is not part of URL, meaning its relative.
					// Stop the event bubbling to ensure the link will not cause a page refresh.

					if (href.slice(0, directLink.length) == directLink || href.slice(0, 4) != 'http') {

						e.preventDefault();

						// Checking if overlay page
						if( href.indexOf('?overlay') !== -1 ){

							console.log( 'params!' );

							e.preventDefault();

							var paramsObj = $.deparam(href.substr(href.indexOf('?') + 1));

							var url = $.param.querystring( Backbone.history.fragment, paramsObj );
							
							App.site.router.navigate(url, {trigger: true});

						}else{

							if (href.slice(0, directLink.length) == directLink){
								url = href.slice(directLink.length);
							}else{
								url = href;
							}

							// Note by using Backbone.history.navigate, router events will not be
							// triggered.  If this is a problem, change this to navigate on your
							// router.
							App.site.router.navigate(url, {trigger: true});

						}					
					
					}

				});
 
			}else{

				$(document).delegate("a", "click", function(e) {
					// Get the anchor href and protcol
					var href = $(this).attr("href");
					if(!href){
						return;
					}

					var protocol = this.protocol + "//";

					// Ensure the protocol is not part of URL, meaning its relative.
					// Stop the event bubbling to ensure the link will not cause a page refresh.
					if (href.slice(0, directLink.length) == directLink) {
						
						e.preventDefault();
						if( href.indexOf('?overlay') !== -1 ){

							console.log( 'params!' );

							e.preventDefault();

							var paramsObj = $.deparam(href.substr(href.indexOf('?') + 1));

							var url = $.param.querystring( Backbone.history.fragment, paramsObj );
							
							App.site.router.navigate(url, {trigger: true});

						}else{

							if (href.slice(0, directLink.length) == directLink){
								url = href.slice(directLink.length);
							}else{
								url = href;
							}

							// Note by using Backbone.history.navigate, router events will not be
							// triggered.  If this is a problem, change this to navigate on your
							// router.
							App.site.router.navigate(url, {trigger: true});

						}
					
					}

				});

			}

		},

		init: function(){

			console.log('you should really think about extending this...like...for real.');

		}

	});

	return modiphy;

})( modiphy, Backbone, _ );