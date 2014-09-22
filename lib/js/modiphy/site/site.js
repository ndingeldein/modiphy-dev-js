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
		this.overlay = new M.Pages();

		this.normal.set( _.reject( this.allPages, _.isOverlayPage ) );
		this.overlay.set( _.filter( this.allPages, _.isOverlayPage ) );

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
			
			//window.location.hash = this.pages.normal.at(0).get('name');
			this.navigate( 'intro', {trigger: true} );
			
		},

		selectPage: function( hash, params ){

			console.log(hash);

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

			if( params && params.overlay && params.overlay != 'none' ){

				
				var overlayPage;
				if( !this.pages.overlay.selected || params.overlay != this.pages.overlay.selected.get('name') ){

					overlayPage = this.pages.overlay.get( params.overlay );
					if( !overlayPage ){
						console.log( params.overlay + ' Overlay Page not found so a new one was created ' );
						overlayPage = new M.Page( { name: params.overlay, link01: '?overlay=' + params.overlay });
						this.pages.overlay.add( overlayPage );
					}

					if( overlayPage ){

						this.pages.overlay.select( overlayPage );

					}

				}

			}else{				
				
				this.pages.overlay.deselect();
				this.site.overlayViewer.setView( null );

			}
			
		}

	});

	M.Site = function( options ){

		var defaults = {
			root: '/main/'
		};

		this.options = _.defaults( {}, options, defaults );
		this.galleries = new M.Galleries();
		this.id = this.options.siteId;
		this.pageTypes = new M.PageTypes();

		this.pageViewer = new M.PageViewer();
		this.overlayViewer = new M.PageViewer({
			el: '.overlay-page-container'
		});

		this.overlayViewer.on('emptied:viewer', this.overlayEmptied, this );

		this.pageLoader = new M.PageLoader();
		this.overlayPageLoader = new M.PageLoader();

		this.$body = $('body');
		this.$logo = $('#logo');

		_.bindAll( this, 'createGallery' );

	};

	_.extend( M.Site.prototype, {

		load: function(){

			return $.get( "../lib/php/gallery.php", { 'gid': this.id }).promise();

		},

		createGallery: function( data ){

			console.log( data );

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
			this.pages.overlay.on( 'select:one', this.overlayPageSelected, this );

			
			this.overlayPageWrapper = new M.OverlayPageWrapper({
				collection: this.pages.overlay
			});


		},

		pageSelected: function( page ){

			if( page ){

				$('body, html').animate({'scrollTop': 0}, {'duration':600, 'easing':'swing'});

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

		overlayPageSelected: function( page ){

			if( page ){

				$('body, html').animate({'scrollTop': 0}, {'duration':600, 'easing':'swing'});

				this.overlayPageLoader.load( page ).done( _.bind( this.overlayPageLoaded, this ) );

				this.overlayPageWrapper.show();

			}

		},

		pageLoaded: function(){

			var page = arguments[0][0];

			var pageView = this.buildPageView( page );

			this.pageViewer.setView( pageView );

		},

		overlayPageLoaded: function(){

			var page = arguments[0][0];

			var pageView = this.buildPageView( page );

			this.overlayViewer.setView( pageView );

		},

		overlayEmptied: function(){

			this.overlayPageWrapper.hide();

		},

		buildPageView: function( page ){
			
			var type = this.pageTypes.findByName( page.get('type') );

			return new type.ViewType({ model: page });

		},

		introPageSelected: function(){

			this.$body.removeClass('home');
			this.$body.removeClass('inside');
			this.$body.addClass('intro');
			
			this.$logo.attr('href', this.options.directLink + 'intro');
			this.homeButton.hide();

			if(this.onIntro){
				this.onIntro();
			}

		},

		homePageSelected: function(){

			this.$body.addClass('home');
			this.$body.removeClass('inside');
			this.$body.removeClass('intro');

			this.$logo.attr('href', this.options.directLink + 'intro');
			this.homeButton.hide();

			if(this.onHome){
				this.onHome();
			}

		},

		interiorPageSelected: function(){

			this.$body.removeClass('home');
			this.$body.removeClass('intro');
			this.$body.addClass('inside');

			this.$logo.attr('href', this.options.directLink + 'home');
			this.homeButton.show();

			if(this.onInterior){
				this.onInterior();
			}

		},
		updateNavitems: function(page){

			var that = this;
			this.navitems.each(function(model, index){
				if(model.get('field01') == page.get('name')){
					that.nav.children.findByIndex(index).$el.addClass('selected');
				}else{
					that.nav.children.findByIndex(index).$el.removeClass('selected');
				}
			});

		},

		startHistory: function( root ){

			console.log(Backbone.history._hasPushState);

			var url;

			var directLink = this.options.directLink;

			Backbone.history.start({ pushState: true, root: root });

			// Use absolute URLs  to navigate to anything not in your Router.
 
			//Only need this for pushState enabled browsers
			$(document).delegate("a", "click", function(e) {
				// Get the anchor href and protcol
				var href = $(this).attr("href");
				if(!href || href.slice(0, 4) == 'tel:'|| href.slice(0, 7) == 'mailto:'){
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
			

		},

		init: function(){

			console.log('you should really think about extending this...like...for real.');

		}

	});

	M.OverlayPageWrapper = M.ContainerView.extend({

		el: '.overlay-page-wrapper',

		events: {
			'click .close-button': 'closeOverlay'
		},

		initialize: function(){

			// this.bg = this.$('> .bg');
			// this.closeButton = this.$('> .close-button');
			this.listenTo( this.collection, 'select:one', this.pageSelected, this.show );

		},

		closeOverlay: function(e){
			
			e.preventDefault();
			
			var url = $.param.querystring(Backbone.history.fragment, { overlay: 'none'} );
				

			App.site.router.navigate(url, {trigger: true});

			e.stopPropagation();
			

		},

		onShow: function(){

			this.$el.show();

		},

		showTransition: function(){

			TweenMax.to( this.$el, 0.5, { autoAlpha: 1, onComplete: this.triggerShown } );

		},

		hideTransition: function(){

			TweenMax.to( this.$el, 0.5, { autoAlpha: 0, onComplete: this.triggerHidden } );

		},

		onHidden: function(){

			this.$el.hide();

		}



	});


	return modiphy;

})( modiphy, Backbone, _ );