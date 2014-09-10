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

			this.pageTypes.add( new M.PageType('text', App.Views.DefaultPageView) );
			this.pageTypes.add( new M.PageType('intro', M.IntroPageView) );
			this.pageTypes.add( new M.PageType('gallery_thumbs', M.GalleryThumbsPageView) );
			this.pageTypes.add( new M.PageType('photo_gallery', M.PhotoGalleryPageView) );

			
			var niViewOptions = {};

			this.nav = new M.DomCollectionView({

				collection: this.navitems,
				el: '.main-nav',
				itemView: M.NavitemView,
				itemViewOptions: niViewOptions

			});

			this.homeButton = new M.ItemView({

				model: new Backbone.Model({}),
				el: '.home-button',
				attributes: {href: 'home'}

			});

			_.extend( this.homeButton, M.Mixins.Transitions.Fader);

			this.nav.render();
			this.homeButton.render();

			_.extend( this.overlayViewer, M.Mixins.Transitions.Fader );

			var that = this;

			this.startHistory( this.options.root );
			
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

		this.site = new M.Site( options );

		this.site.load()
			.done( this.site.createGallery )
			.fail(function(x, y, e){
				console.log(e);
			});
		
	};

	
	return App;

})( App || {} );