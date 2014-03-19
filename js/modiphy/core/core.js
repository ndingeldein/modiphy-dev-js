var modiphy = ( function( modiphy, Backbone, _ ) {
//test
	var M = modiphy;

	console.log( 'core focused dev');

	App = {

		Models: {},
		Collections: {},
		Views: {},
		Router: {}

	};


	M.View = Backbone.View.extend({

		constructor: function( options ){

			_.bindAll( this, 'render' );
			_.bindAll( this, 'hide' );
			_.bindAll( this, 'show' );
			_.bindAll( this, 'triggerShown' );
			_.bindAll( this, 'triggerHidden' );

			this._isShowing = false;

			this.options = _.extend({}, _.result(this, 'options'), _.isFunction(options) ? options.call(this) : options);

			// this.listenTo(this, "before:show", this.onBeforeShow);
			// this.listenTo(this, "before:hide", this.onBeforeHide);
			this.listenTo(this, "shown:view", this.onShownCalled);
			this.listenTo(this, "hidden:view", this.onHiddenCalled);
			this.listenTo(this, "show:view", this.onShow);
			this.listenTo(this, "hide:view", this.onHide);

			Backbone.View.prototype.constructor.apply( this, arguments );			

		},

		_getDeferred: function(){

			if( this.deferred ){
				return this.deferred;
			}else{
				this.deferred = $.Deferred();
				this.deferred.resolve( this );
				return this.deferred;
			}

		},

		toggleShow: function(){

			if( this._isShowing ){
				return this.hide();
			}else{
				return this.show();
			}

		},

		show: function(){

			if( this._isShowing ){
				return this._getDeferred().promise();
			}

			this._isShowing = true;
			this.trigger('show:view', this);

			if( this.deferred ){ this.killTransitions(); }

			this.deferred = $.Deferred();

			if(this.showTransition){

				this.showTransition();

			}else{

				this.trigger('shown:view', this);

			}
			
			return this.deferred.promise( this );

		},

		onShownCalled: function(){
			this.onShown();
			this.deferred.resolve( this );
		},

		onShown: function(){
			//this.delegateEvents();

		},

		onShow: function(){
			//this.$el.show();

		},

		hide: function(){

			if( !this._isShowing ){
				return this._getDeferred().promise();
			}

			this._isShowing = false;

			this.trigger('hide:view', this);

			if( this.deferred ){ this.killTransitions(); }

			this.deferred = $.Deferred();

			if(this.hideTransition){

				this.hideTransition();

			}else{

				this.trigger('hidden:view', this);

			}

			return this.deferred.promise( this );

		},

		onHiddenCalled: function(){
			this.onHidden();
			this.deferred.resolve( this );

		},

		onHidden: function(){
			//this.$el.hide();

		},

		onHide: function(){
			//this.undelegateEvents();

		},

		triggerShown: function(){

			this.trigger('shown:view', this);

		},

		triggerHidden: function(){

			this.trigger('hidden:view', this);

		},

		killTransitions: function(){

			if(this.deferred){
				this.deferred.reject();
				this.deferred = undefined;
			}

		},

		clear: function(){

			this.killTransitions();

			TweenMax.killTweensOf( this.$el );

			if (this.isCleared){ return; }

			this.isCleared = true;

			this.trigger( 'cleared:view', this);

			this.$el.remove().empty();
			this.undelegateEvents();
			this.off();
			this.remove();

		}

	});

	M.ItemView = M.View.extend({

		model: M.GalleryItem,

		constructor: function(){

			this.listenTo( this, 'onBeforeRender:item', this.onBeforeRender);
			this.listenTo( this, 'onRender:item', this.onRender);

			// _.bindAll( this, 'showChildren' );
			// _.bindAll( this, 'hideChildren' );

			M.View.prototype.constructor.apply(this, arguments);

		},

		template: function(){
			
			return M.template( this.options.templateId, { item: this.model.toJSON() } );

		},

		render: function(){

			this.trigger( 'onBeforeRender:item' );

			if( this.options.templateId ){

				this.$el.html( this.template() );
			}

			this.trigger( 'onRender:item' );

			return this;

		},

		onBeforeRender: function(){

		},

		onRender: function(){

		},

		clear: function(){
			if (this.isCleared){ return; }

			this.trigger('item:before:cleared', this);

			M.View.prototype.clear.apply(this, arguments);

			this.trigger('item:cleared', this);
		}

	});

	/**
	
		TODO:
		- Abstract Container View
		- two subclasses?
		- one for el already on dom/parent view and one for dynamically created el
		- need to be able to extend render events on instance in addition to prototypes		- 
	
	**/
	

	M.ContainerView = M.View.extend({

		constructor: function(){

			this.children = new Backbone.ChildViewContainer();
			this.deferreds = [];

			_.bindAll( this, 'hideChildren' );
			_.bindAll( this, 'showChildren' );
			this._isShowingChildren = false;

			this.listenTo( this, 'onBeforeRender:container', this.onBeforeRender);
			this.listenTo( this, 'onRender:container', this.onRender);
			this.listenTo( this, 'onBeforeRender:children', this.onBeforeRenderChildren);
			this.listenTo( this, 'onRender:children', this.onRenderChildren);

			M.View.prototype.constructor.apply(this, arguments);


		},

		template: function(){

			return M.template( this.options.templateId, { item: this.model.toJSON() } );

		},

		render: function(){

			this.trigger( 'onBeforeRender:container' );

			if( this.options.templateId ){
				this.$el.html( this.template() );
			}

			this.trigger( 'onBeforeRender:children' );

			this.renderChildren();

			this.trigger( 'onRender:children' );

			this.trigger( 'onRender:container' );

			return this;

		},

		onBeforeRender: function(){

		},

		onRender: function(){

		},

		onBeforeRenderChildren: function(){

		},

		onRenderChildren: function(){

		},

		renderChildren: function(){

			this.children.each( function( view, index ){

				view.render();

				if( !view.options.el){
					this.$el.append( view.el );
				}

			}, this);

		},

		remove: function(){

			M.View.prototype.remove.call( this );

			_.each( this.views, function( view ){

				view.remove();

			});

		},

		removeItemView: function( item ){

			var view = this.children.findByModel( item );
			this.removeChildView( item );

		},

		removeChildView: function( view ){

			if (view.clear) { view.clear(); }
			else if (view.remove) { view.remove(); }

			this.children.remove( view );

		},

		clear: function(){

			if( this.isCleared ) { return; }

			this.trigger( 'container:before:cleared' );

			this.clearChildren();

			this.deferreds.length = 0;
			delete this.deferreds;
			delete this.deferredChildren;

			this.trigger( 'container:cleared' );

			M.View.prototype.clear.apply(this, arguments);

		},

		clearChildren: function(){

			this.children.each( function( child ){

				this.removeChildView( child );

			}, this);

		},

		_getDeferredChildren: function(){
			if( this.deferredChildren ){
				return this.deferredChildren;
			}else{
				this.deferredChildren = $.Deferred();
				this.deferredChildren.resolve( this );
				return this.deferredChildren.promise();
			}

		},

		showChildren: function(){

			var that = this;

			if( this._isShowingChildren ){
				return this._getDeferredChildren();
			}

			this._isShowingChildren = true;

			this.deferreds.length = 0;

			this.children.each( function( view ){

				that.deferreds.push( view.show() );

			});

			this.deferredChildren = $.when.apply( $, that.deferreds );

			return this.deferredChildren.promise();

		},

		hideChildren: function(){

			var that = this;

			if( !this._isShowingChildren ){
				return this._getDeferredChildren().promise();
			}

			this._isShowingChildren = false;

			this.deferreds.length = 0;

			this.children.each( function( view ){

				that.deferreds.push( view.hide() );

			});

			this.deferredChildren = $.when.apply( $, that.deferreds );

			return this.deferredChildren.promise();

		}

	});


	M.CollectionView = M.ContainerView.extend({

		constructor: function(){
			
			M.ContainerView.prototype.constructor.apply(this, arguments);

		},

		render: function(){

			this.clearChildren();

			return M.ContainerView.prototype.render.call( this );

		},

		addItemView: function( item, ItemView, index ){

			var itemViewOptions = item.get('itemViewOptions') || this.options.itemViewOptions || {};

			var view = this.buildItemView( item, ItemView, itemViewOptions );

			this.children.add( view );

			this.$el.append( view.render().el );

		},

		getItemView: function( item ){

			var itemView = item.get('itemView') || this.options.itemView;

			return itemView;

		},

		buildItemView: function( item, ItemViewType, itemViewOptions ){

			var options = _.extend( {model: item}, itemViewOptions );

			return new ItemViewType( options );

		},

		renderChildren: function(){

			var ItemView;
			this.collection.each( function( item, index ){

				ItemView = this.getItemView( item );
				this.addItemView( item, ItemView, index);

			}, this);

		}

	});

	return modiphy;

})( modiphy || {}, Backbone, _ );