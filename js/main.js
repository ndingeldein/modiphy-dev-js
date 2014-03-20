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

			this.nav.render();
			this.homeButton.render();

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

			this.pages.normal.on('select:one', this.updateNavitems, this);

			var that = this;

			Backbone.history.start();

			
			
		},

		updateNavitems: function(page){

			if(page.get('name') === 'food'){
				TweenMax.to( this.$body.find('.page .image-holder'), 0.4, {autoAlpha:0} );
			}

			var that = this;
			this.navitems.each(function(model, index){
				if(model.get('field01') == page.get('name')){
					that.nav.children.findByIndex(index).$el.addClass('selected');
				}else{
					that.nav.children.findByIndex(index).$el.removeClass('selected');
				}
			});


		},

		onIntro: function(){

			

		},

		onHome: function(){

			

		},

		onInterior: function(){

			

		},

		onPageSelected: function( page ){

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