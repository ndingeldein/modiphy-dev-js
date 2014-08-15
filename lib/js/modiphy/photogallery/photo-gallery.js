var modiphy = ( function( modiphy, Backbone, _ ) {

	var M = modiphy;

	M.GalleryThumb = M.ItemView.extend({

		events: {
			'click': 'clicked'
		},

		clicked: function(e){

			e.preventDefault();

			var paramsObj = {

				overlay: 'photo_gallery',
				id: this.model.get('id')

			};

			var hash = $.param.fragment();
			
			var newUrl = $.param.querystring( hash, paramsObj );
			console.log( newUrl );
			window.location.hash = newUrl;

		}

	});

	M.GalleryThumbsPageView = M.PageView.extend({
		
		onBeforeRenderChildren: function(){

			this.collection = new M.GalleryItems(
				this.model.get('content').json.images
			);

			this.thumbs = new M.CollectionView({

				collection: this.collection,
				el: this.$('.gallery-thumbs'),
				itemView: M.GalleryThumb,
				itemViewOptions: {
					tagName: 'div',
					className: 'gallery-thumb',
					templateId: 'gallery-thumb-template'
				}

			});
			
			this.children.add( this.thumbs );

		}

	});

	M.PhotoGalleryViewer = M.ContainerView.extend({

		initialize: function(){

			this.listenTo( this.collection, 'select:one', this.onSelected, this );

		},

		onHidden: function(){
			
			this.update( this.collection.selected );

		},

		update: function( model ){



			this.$el.html( '<div class="img-holder"><img src="' + model.imageUrl() + '"></div>' );

			this.$el.css({
				marginLeft: -(model.get('width')/2) + 'px',
				marginTop: -(model.get('height')/2) + 'px'
			});

			this.$el.imagesLoaded( _.bind( this.loaded, this, model ) );

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

	return modiphy;

})( modiphy, Backbone, _ );