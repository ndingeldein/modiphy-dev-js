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

			this.pageitems = M.getCatItemsByTitle( this.gallery, 'Pages' );
			this.navitems = M.getCatItemsByTitle( this.gallery, 'Mobile Nav' );
			if(!this.navitems){
				this.navitems = M.getCatItemsByTitle( this.gallery, 'Nav' );
			}
			this.socialNavitems = M.getCatItemsByTitle( this.gallery, 'Social Nav' );


			this.setPages(
				this.pageitems.toJSON(),
				this.navitems.toJSON()
			);

			this.pageTypes.add( new M.PageType('text', M.PageView) );
			this.pageTypes.add( new M.PageType('intro', M.IntroPageView) );
			this.pageTypes.add( new M.PageType('home', M.MobileHomePageView) );

			var niViewOptions = {

				tagName: 'li',
				className: 'navitem',
				templateId: 'ni-template'

			};

			this.nav = new M.CollectionView({

				collection: this.navitems,
				el: '.main-nav',
				itemView: M.NavitemView,
				itemViewOptions: niViewOptions

			});

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

			this.menuButton = new M.MobileMenuButton();
			this.closeButton = new M.MobileCloseButton();

			_.extend( this.pageViewer, M.Mixins.Transitions.Fader );

			this.nav.render();

			MBP.scaleFix();
			MBP.enableActive();
			MBP.preventZoom();


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

			$('body').removeClass('show-nav');

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