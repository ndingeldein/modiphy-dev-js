var modiphy = ( function( modiphy, Backbone, _ ) {

	var M = modiphy;

	M.GalleryItem = Backbone.Model.extend({

		defaults:{

			parent_id: 0,

			gallery_id: 1,

			filename: '',

			filesize: 0,

			width: 0,

			height: 0,

			mime: '',

			category: 0,

			linktext01: '',

			linktext02: '',

			link01: '',

			link02: '',

			link03: '',

			target01: '',

			target02: '',

			target03: '',

			order: 0,

			field01: '',

			field02: '',

			field03: '',

			field04: '',

			field05: '',

			field06: '',

			field07: '',

			field08: '',

			field09: '',

			field10: '',

			scaleWidth: '',

			scaleHeight: '',

			description01: '',

			description02: '',

			description03: '',

			subcat: 0,

			objType: 0


		},

		initialize: function(){

			var selectable = new Backbone.Picky.Selectable(this);
			_.extend(this, selectable);

		},

		imageUrl: function(maxWidth, maxHeight){

			maxWidth = maxWidth ? maxWidth : this.get('width');
			maxHeight = maxHeight ? maxHeight : this.get('height');
			return M.imagePrefix + this.id + '&maxwidth=' + maxWidth + '&maxheight=' + maxHeight;

		},

		link: function(defaultUrl, linkField){

			defaultUrl = defaultUrl ? defaultUrl : '#';
			linkField = linkField ? linkField : 'link01';

			if( _.indexOf( ['link01', 'link02', 'link03'], linkField ) == -1 ){
				linkField = 'link01';
			}

			return this.get(linkField) ? this.get(linkField) : defaultUrl;

		},

		target: function(defaultTarget, targetField){

			defaultTarget = defaultTarget ? defaultTarget : '_self';
			targetField = targetField ? targetField : 'target01';

			if( _.indexOf( ['target01', 'target02', 'target03'], targetField ) == -1 ){
				targetField = 'target01';
			}

			return this.get(targetField) ? this.get(targetField) : defaultTarget;

		}

	});

	M.GalleryItems = Backbone.Collection.extend({

		model: M.GalleryItem,

		initialize:function(){

			var singleSelect = new Backbone.Picky.SingleSelect(this);
			_.extend(this, singleSelect);
			
		}

	});

	M.GalleryCategory = Backbone.Model.extend({

		defaults:{

			description: '',

			gallery_id: 0,

			id: 0,

			image_id: 0,

			order: 0,

			parent_id: 0

		},

		initialize: function(){

			if( !this.get('items') ){
				this.set('items', new M.GalleryItems() );
			}

		}
		

	});

	M.GalleryCategories = Backbone.Collection.extend({

		model: M.GalleryCategory

	});

	M.Gallery = Backbone.Model.extend({

		defaults: {

			id: 0,

			title: ''

		},

		initialize: function(){

			if( !this.get('categories') ){
				this.set('categories', new M.GalleryCategories() );
			}

		},

		validate: function(attrs, options){

			if( !attrs.title.length ){

				return 'Gallery must have a title.';

			}

			if( !attrs.id ){

				return 'Gallery must have ID and it must be greater than 0.';

			}

		}


	});

	M.Galleries = Backbone.Collection.extend({

		model: M.Gallery,

		findByTitle: function( title ){

			return this.findWhere({ title: title });

		}

	});
	
	return modiphy;

})( modiphy || {}, Backbone, _ );