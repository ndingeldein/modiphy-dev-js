var modiphy = ( function( modiphy, Backbone, _ ) {

	var M = modiphy;

	/*================================
	=            Navitems            =
	================================*/
	
	M.NavitemView = M.ItemView.extend({});
	_.mixinEvent( M.NavitemView.prototype, M.Mixins.Events.Click.Param );
	
	
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

			window.location.hash = this.pages.normal.at(0).get('name');
			
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
			
		};

		this.options = _.defaults( {}, options, defaults );
		this.galleries = new M.Galleries();
		this.id = this.options.siteId;
		this.pageTypes = new M.PageTypes();

		this.pageViewer = new M.PageViewer();
		this.overlayViewer = new M.PageViewer({
			el: '.overlay-page-container'
		});

		this.pageLoader = new M.PageLoader();
		this.overlayPageLoader = new M.PageLoader();

		this.$body = $('body');
		this.$logo = $('#logo');

		_.bindAll( this, 'createGallery' );

	};

	_.extend( M.Site.prototype, {

		load: function(){

			return $.get( "gallery.php", { 'gid': this.id }).promise();

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
			this.pages.overlay.on( 'select:one', this.overlayPageSelected, this );
		},

		pageSelected: function( page ){

			if( page ){

				$('body, html').animate({'scrollTop': 0}, {'duration':600, 'easing':'swing'});

				this.pageLoader.load( page ).done( _.bind( this.pageLoaded, this ) );

			}

			this.updateElements( page );

		},

		overlayPageSelected: function( page ){

			if( page ){

				$('body, html').animate({'scrollTop': 0}, {'duration':600, 'easing':'swing'});

				this.overlayPageLoader.load( page ).done( _.bind( this.overlayPageLoaded, this ) );

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

		buildPageView: function( page ){
			
			var type = this.pageTypes.findByName( page.get('type') );

			return new type.ViewType({ model: page });

		},

		updateElements: function( page ){

			if( page.get('name') === 'intro' ){

				this.$body.removeClass('home');
				this.$body.addClass('intro');
				TweenMax.killTweensOf( this.$logo);
				TweenMax.to(this.$logo, 0.5, {autoAlpha:0, onComplete:this.$logo.hide});
				
				this.homeButton.hide();

			}else if( page.get('name') === 'home' ){

				this.$body.addClass('home');
				this.$body.removeClass('intro');
				this.$logo.attr('href', '#intro');
				TweenMax.killTweensOf( this.$logo);
				TweenMax.to(this.$logo, 0.5, {autoAlpha:1, delay:1, onStart:this.$logo.show});

				this.homeButton.hide();

			}else{

				this.$body.removeClass('home');
				this.$body.removeClass('intro');
				this.$body.addClass('inside');
				this.$logo.attr('href', '#home');
				TweenMax.killTweensOf( this.$logo);
				TweenMax.to(this.$logo, 0.5, {autoAlpha:1, delay:1, onStart:this.$logo.show});
				this.homeButton.show();

			}

		},

		init: function(){

			console.log('you should really think about extending this...like...for real.');

		}

	});

/**

	TODO:
	- Figure out if this is a plugin !!!??

**/


	M.Mixins.Collections.Playable = function( collection, options ){

		var defaults = {

			isPlaying : true,
			delay: 5000

		};

		options = _.defaults( {}, options, defaults );

		this.collection = collection;

		this.isPlaying = options.isPlaying;
		this.delay = options.delay;
		this.wasPlaying = this.isPlaying;

	};

	_.extend( M.Mixins.Collections.Playable.prototype, Backbone.Picky.SingleSelect.prototype, {

		next: function(){

			clearTimeout( this.timeoutId );

			var i = this.selected ? this.indexOf( this.selected ) : -1;
			i++;

			if( i >= this.length ){
				i = 0;
			}

			this.select( this.at(i) );

		},

		previous: function(){

			clearTimeout( this.timeoutId );

			var i = this.selected ? this.indexOf( this.selected ) : -1;
			i--;

			if( i < 0 ){
				i = this.length - 1;
			}

			this.select( this.at(i) );

		},

		pause: function(){

			isPlaying = false;
			clearTimeout( this.timeoutId );

		},

		resume: function(){

			this.isPlaying = this.wasPlaying;
			if( this.isPlaying ){
				this.timeoutId = setTimeout( _.bind( this.next, this ), this.delay );
			}

		},

		play: function(){
			this.next();
		}

	});

	M.IntroPageView = M.PageView.extend({

		
		onBeforeRenderChildren: function(){

			this.$intro1 = this.$el.find('.intro-1');

		},

		showTransition: function(){

			TweenMax.to( this.$intro1, 1, {autoAlpha:1, onComplete: this.triggerShown });

		},

		onShown: function(){
			console.log( 'TO' );
			console.log( this.options );
			this.timeoutId = setTimeout( this.goHome, 500);

		},

		hideTransition: function(){

			TweenMax.to( this.$intro1, 1, {autoAlpha:1, onComplete: this.triggerHidden });

		},

		onHide: function(){
			
			if( this.timeoutId ){
				clearTimeout( this.timeoutId );
				delete this.timeoutId;
			}

		},

		onHidden: function(){

			

		},

		goHome: function(){

			window.location.hash = '#home';

		}

	});

	return modiphy;

})( modiphy, Backbone, _ );