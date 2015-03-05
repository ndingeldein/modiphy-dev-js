var modiphy = ( function( modiphy, Backbone, _ ) {

	var M = modiphy;

	M.PhotoGalleryViewer = M.ContainerView.extend({

		initialize: function(){

			this.listenTo( this.collection, 'select:one', this.onSelected, this );

		},

		onHidden: function(){
			
			this.update( this.collection.selected );

		},

		getPreloadedImages: function(model){

			var index = this.collection.indexOf( model );
			var p = index - 1;
			p = ( p < 0 ) ? this.collection.length - 1 : p;

			var n = index + 1;
			n = ( n >= this.collection.length ) ? 0 : n;

			var prev = this.collection.at(p);
			var next = this.collection.at(n);
			var str = '<img class="preload" src="' + model.imageUrl() + '">';

			str += '<img class="hidden" src="' + prev.imageUrl() + '">';
			str += '<img class="hidden" src="' + next.imageUrl() + '">';

			return str;			

		},

		update: function( model ){

			this.$el.html( '<div class="img-holder">' + this.getPreloadedImages(model) + '</div>' );

			this.$el.css({
				marginLeft: -(model.get('width')/2) + 'px',
				marginTop: -(model.get('height')/2) + 'px'
			});

			this.$('.preload').imagesLoaded( _.bind( this.loaded, this, model ) );

		},

		loaded: function( model ){

			if( model !== this.collection.selected ){
				return;
			}

			this.show();

		},

		onSelected: function(model){

			this.hide();

		},

		showTransition: function(){
			TweenMax.to( this.$el, 0.5, { autoAlpha:1, onComplete: this.triggerShown });
		},

		hideTransition: function(){
			TweenMax.to( this.$el, 0.5, { autoAlpha:0, onComplete: this.triggerHidden });
		}

	});

	M.PhotoGalleryPageView = M.PageView.extend({

		events: {

			'click .next': 'nextClicked',
			'click .prev': 'prevClicked'

		},

		nextClicked: function(e){

			e.preventDefault();
			e.stopPropagation();

			this.collection.next();
			

		},

		prevClicked: function(e){

			e.preventDefault();
			e.stopPropagation();
			
			this.collection.previous();
			
		},

		onBeforeRenderChildren: function(){

			console.log(this.model.get('content').json);
			
			this.collection = new M.GalleryItems( this.model.get('content').json.images );
			var playable = new M.Mixins.Collections.Playable(this.collection,{
				isPlaying: false
			});
			_.extend(this.collection, playable);

			this.viewer = new M.PhotoGalleryViewer({

				collection: this.collection,
				el: this.$('.image-viewer')

			});

			this.caption = new M.GalleryCaption({

				collection: this.collection,
				el: this.$('.caption')

			});

			this.children.add( this.viewer );

		},

		onShown:function(){

			var params = $.deparam.querystring();
			if(!params.id){
				params.id = this.collection.at(0).get('id');
			}

			this.collection.get( params.id ).select();


		}

	});

	M.GalleryCaption = M.ItemView.extend({

		initialize: function(){

			var defaults = {
				templateId: 'caption-template'
			};

			_.defaults( this.options, defaults );


			this.listenTo( this.collection, 'select:one', this.onSelected, this );

		},

		onSelected: function(model){

			this.model = this.collection.selected;
			if( this.model ){
				this.hide();
			}

		},

		showTransition: function(){

			TweenMax.to( this.$el, 0.5, { autoAlpha:1, onComplete: this.triggerShown });
		},

		hideTransition: function(){
			TweenMax.to( this.$el, 0.5, { autoAlpha:0, onComplete: this.triggerHidden });
		},

		onHidden: function(){
			
			this.render();
			console.log(this.model);
			if( this.model.get('field01').length ){
				this.show();
			}
			

		}

	});

	return modiphy;

})( modiphy, Backbone, _ );