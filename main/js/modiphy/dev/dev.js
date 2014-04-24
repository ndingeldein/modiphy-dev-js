var modiphy = ( function( modiphy, Backbone, _ ) {

	var M = modiphy;

	/*================================
	=            Navitems            =
	================================*/
	
	M.NavitemView = M.ItemView.extend({});
	_.mixinEvent( M.NavitemView.prototype, M.Mixins.Events.Click.Param );

	M.IntroPageView = M.PageView.extend({
		
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
			var hash = $.param.fragment();
			window.location.hash = $.param.querystring( hash, {overlay:'none'});
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