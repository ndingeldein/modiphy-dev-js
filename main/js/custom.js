(function(){
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
})();
