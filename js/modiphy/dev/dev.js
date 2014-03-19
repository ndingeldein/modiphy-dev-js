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