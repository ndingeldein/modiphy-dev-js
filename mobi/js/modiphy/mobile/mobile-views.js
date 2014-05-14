(function(){

	M.MobileMenuButton = Backbone.View.extend({

		el: '.menu-button',

		events: function(){

			var hash;

			if(Modernizr.touch){
				hash = {

					'touchend': 'clicked'
				
				};
			}else{
				hash = {

					'click': 'clicked'
				
				};
			}


			return hash;

		},

		initialize: function(){
			console.log( this.el );
		},

		clicked: function(e){
			console.log('wtf');
			$('body').toggleClass('show-nav');

		}

	});

	M.MobileCloseButton = Backbone.View.extend({

		el: '.nav-wrapper .close-button',

		events: function(){

			var hash;

			if(Modernizr.touch){
				hash = {

					'touchend': 'clicked'
				
				};
			}else{
				hash = {

					'click': 'clicked'
				
				};
			}


			return hash;

		},

		initialize: function(){
			console.log( this.el );
		},

		clicked: function(e){			
			$('body').removeClass('show-nav');
		}

	});

	
	M.MobileHomePageView = M.PageView.extend({

		onBeforeRenderChildren: function(){

			this.navitems = new M.GalleryItems(this.model.get('content').json.navitems);
			this.socialNavitems = new M.GalleryItems(this.model.get('content').json.socialNavitems);

			console.log( this.navitems );

			var niViewOptions = {

				tagName: 'li',
				className: 'navitem',
				templateId: 'ni-template'

			};

			this.nav = new M.CollectionView({

				collection: this.navitems,
				el: this.$('.home-nav'),
				itemView: M.NavitemView,
				itemViewOptions: niViewOptions

			});

			this.socialNav = new M.CollectionView({

				collection: this.socialNavitems,
				el: this.$('.social-nav'),
				itemView: M.NavitemView,
				itemViewOptions: {

					tagName: 'li',
					className: 'navitem',
					templateId: 'ni-social-template'

				}

			});

			this.children.add( this.nav );
			this.children.add( this.socialNav );

		}

	});

	M.MobileIntroPageView = M.PageView.extend({
		
		onBeforeRenderChildren: function(){

			this.$intro1 = this.$el.find('.intro-1');

		},

		showTransition: function(){

			var that = this;
			this.$el.imagesLoaded( _.bind( this.preloaded, this ));
			

		},

		preloaded: function(){

			TweenMax.to( this.$intro1, 1, {autoAlpha:1, onComplete: this.triggerShown });

		},

		onShown: function(){
		
			this.timeoutId = setTimeout( this.hide, 500);

		},

		hideTransition: function(){

			TweenMax.to( this.$intro1, 1, {autoAlpha:0, onComplete: this.triggerHidden });

		},

		onHide: function(){
			
			if( this.timeoutId ){
				clearTimeout( this.timeoutId );
				delete this.timeoutId;
			}

		},

		onHidden: function(){

			TweenMax.killChildTweensOf( this.$el );
			this.goHome();

		},

		goHome: function(){

			window.location.hash = '#home';

		}

	});

})();
