var modiphy = ( function( modiphy, Backbone, _ ) {

	M = modiphy;

	M.Mixins = {
		Events: {},
		Collections: {},
		Transitions: {}
	};

	/*==============================
	=            Lodash            =
	==============================*/

	// Borrowing this code from Backbone.Collection:
	// http://backbonejs.org/docs/backbone.html#section-106
	//
	// Mix in methods from Underscore, for iteration, and other
	// collection related features.
	var collectionMethods = ['forEach', 'each', 'map', 'find', 'detect', 'filter',
		'select', 'reject', 'every', 'all', 'some', 'any', 'include',
		'contains', 'invoke', 'toArray', 'first', 'initial', 'rest',
		'last', 'without', 'isEmpty', 'pluck'];

	function collection( fn ){

		_.each(collectionMethods, function(method) {
			fn[method] = function() {
				var views = _.values(this._views);
				var args = [views].concat(_.toArray(arguments));
				return _[method].apply(_, args);
			};

		});

	}

	_.mixin({ 'collection': collection });

	/*==============================
	=            EVENTS            =
	==============================*/

	function mixinEvent( view, mixin ){

		view.events = _.extend( {}, view.events, mixin.events);
		_.extend( view, mixin.fn);

	}

	_.mixin({ 'mixinEvent': mixinEvent });

	/*==========  CLICK  ==========*/
	
	M.Mixins.Events.Click = {};

	M.Mixins.Events.Click.ToggleSelect = {

		events: {
			'click': 'clicked'
		},

		fn: {

			clicked: function(e){
				console.log( 'select me!' );
				e.preventDefault();
				this.model.toggleSelected();
			}

		}

	};

	M.Mixins.Events.Click.Param = {

		events: {
			'click': 'clicked'
		},

		fn: {

			clicked: function(e){
				
				
				if( this.model.get('link01').charAt(0) === '?' ){

					console.log( 'params!' );

					e.preventDefault();

					var paramsObj = $.deparam(this.model.get('link01').substr(1));

					var hash = $.param.fragment();
					
					var newUrl = $.param.querystring( hash, paramsObj );
					console.log( newUrl );
					window.location.hash = newUrl;

				}
				
			}

		}

	};

	/*===================================
	=            Transitions            =
	===================================*/

	M.Mixins.Transitions.Fader = {

		fxOptions: {

			showTime: 0.5

		},

		showTransition: function(){

			TweenMax.to( this.$el, this.fxOptions.showTime, {autoAlpha:1, onComplete: this.triggerShown });

		},

		hideTransition: function(){

			TweenMax.to( this.$el, this.fxOptions.showTime, {autoAlpha:0, onComplete: this.triggerHidden });

		}

	};
	
	

	return modiphy;

})( modiphy || {}, Backbone, _ );