App = (function( App ){

	var init = function( data ){

		console.log( data );

	};
	
	App.start = function( options ){

		var site = new M.Site( options );

		$.get( "gallery.php", { 'gid': options.siteId })
			.done( init )
			.fail( function( x, y, e ){

				console.log( e );

			});
		
	};

	
	return App;

})( App || {} );