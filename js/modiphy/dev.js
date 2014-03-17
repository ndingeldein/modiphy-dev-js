var modiphy = ( function( modiphy, Backbone, _ ) {

	var M = modiphy;

	/*================================
	=            Navitems            =
	================================*/
	
	M.NavitemView = M.ItemView.extend({});
	_.mixinEvent( M.NavitemView.prototype, M.Mixins.Events.Click.Param );

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

	return modiphy;

})( modiphy, Backbone, _ );