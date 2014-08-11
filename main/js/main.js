App = (function( App ){

	_.extend( M.Site.prototype, {
		init: function(){

			console.log( 'App Started' );

			/**

				TODO:
				- make site gallery not global

			**/

			App.siteGallery = this.gallery;

			var $body = $('body');

			this.navitems = M.getCatItemsByTitle( this.gallery, 'Nav' );
			this.pageitems = M.getCatItemsByTitle( this.gallery, 'Pages' );

			this.setPages(
				this.pageitems.toJSON(),
				this.navitems.toJSON()
			);

			this.pageTypes.add( new M.PageType('text', M.PageView) );
			this.pageTypes.add( new M.PageType('intro', M.IntroPageView) );
			this.pageTypes.add( new M.PageType('gallery_thumbs', M.GalleryThumbsPageView) );
			this.pageTypes.add( new M.PageType('photo_gallery', M.PhotoGalleryPageView) );

			
			var niViewOptions = {

				tagName: 'li',
				className: 'navitem',
				templateId: 'ni-template'

			};

			this.nav = new M.CollectionView({

				collection: this.navitems,
				tagName: 'ul',
				className: 'main-nav',
				itemView: M.NavitemView,
				itemViewOptions: niViewOptions

			});

			this.homeButton = new M.ItemView({
				model: new Backbone.Model({}),
				templateId: 'home-button-template',
				tagName: 'a',
				className: 'home-button',
				attributes: {href: '#home'}

			});

			_.extend( this.homeButton, M.Mixins.Transitions.Fader);

			this.socialNavitems = M.getCatItemsByTitle( this.gallery, 'Social Nav' );

			this.socialNav = new M.CollectionView({

				collection: this.socialNavitems,
				el: '.social-nav',
				itemView: M.NavitemView,
				itemViewOptions: {

					tagName: 'li',
					className: 'navitem',
					templateId: 'ni-social-template'

				}

			});

			this.nav.render();
			this.homeButton.render();
			this.socialNav.render();

			this.$body.find('.nav-container').append( this.nav.el );

			_.extend( this.pageViewer, {

				showTransition: function(){

					TweenMax.to( this.$el, 0.5, {autoAlpha:1, onComplete: this.triggerShown});

				},

				onShown: function(){

					var imgHolder = this.$el.find('.image-holder');

					imgHolder.imagesLoaded(function(){
						TweenMax.to( imgHolder, 0.5, {autoAlpha:1});
					});

				},

				hideTransition: function(){

					TweenMax.to( this.$el, 0.5, {autoAlpha:0, onComplete: this.triggerHidden});

				}

			});

			_.extend( this.overlayViewer, M.Mixins.Transitions.Fader );

			var that = this;

			Backbone.history.start();

			
			
		},

		onIntro: function(){

			

		},

		onHome: function(){

			

		},

		onInterior: function(){

			

		},

		onPageSelected: function( page ){

			console.log( page.get('type') );

			//TweenMax.to( this.$body.find('.page .image-holder'), 0.4, {autoAlpha:0} );

		}

	});
	
	App.start = function( options ){

		var site = new M.Site( options );

		site.load()
			.done( site.createGallery )
			.fail(function(x, y, e){
				console.log(e);
			});
		
	};

	
	return App;

})( App || {} );