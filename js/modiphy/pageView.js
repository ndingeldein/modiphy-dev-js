var modiphy = ( function( modiphy, Backbone, _ ) {

	var M = modiphy;

	M.PageLoader = function(){

	};

	_.extend( M.PageLoader.prototype, {

		load: function( page ){

			console.log( 'load ' + page.get('name') );

			this.stopLoading(page);

			this.page = page;

			this.deferreds = [];

			this.deferreds.push( this.loadHTML( page ) );

			this.deferreds.push( this.loadJSON( page ) );

			return $.when.apply( $, this.deferreds ).done(function(){

				page.get('content').html = arguments[0][1];
				
				page.get('content').json = arguments[1];

				console.log(page.get('name') + ' loading finished');
			}).fail( function(){
				
				console.log(page.get('name') + ' loading stopped');

			});

		},

		stopLoading: function( page ){

			_.each( this.deferreds, function( deferred ){
				deferred.reject();
			});

			if(this.deferreds){
				this.deferreds.length = 0;
			}
			
		},

		loadHTML: function( page ){

			var deferred = $.Deferred();

			params = $.deparam.querystring( $.param.querystring( $.param.fragment() ) );
			
			params.page = page.get('name');
			params.layout = page.get('layout');
			params.title = page.get('title');

			var req = $.get( 'layout/layout.php', params ).done(function( data ){

					deferred.resolve(page, data);

				});

			deferred.fail(function(){

				// console.log( page.get('name') + ' html loading stopped');

			});

			return deferred;

		},

		loadJSON: function( page ){

			var deferred = $.Deferred();
			
			$.get( 'json/json.php', {

					page: page.get('name'),
					type: this.name

				}, 'json')

				.done(function( data ){

					deferred.resolve(data);

				});

			deferred.fail(function(){

				// console.log( page.get('name') + ' json loading stopped');

			});

			return deferred;

		}

	});

	M.PageType = function(name, ViewType){

		this.name = name || 'text';
		this.ViewType = _.isFunction( ViewType ) ? ViewType : M.PageView;

	};

	M.PageTypes = function( types ){

		this._types = {};
		this._updateLength();
		
		_.each( types, this.add, this);

	};

	_.extend( M.PageTypes.prototype, {

		add: function( type ){

			this._types[type.name] = type;

			this._updateLength();

			return this;

		},

		remove: function( type ){

			delete this._types[type.name];

			this._updateLength();

			return this;

		},

		findByName: function( name ){

			if( !this._types[name] ){
				console.log( 'Page Type ' + name + ' not found. default type selected.');
				return this.findByIndex(0);
			}
			return this._types[name];

		},

		findByIndex: function(index){
			return _.values(this._types)[index];
		},

		_updateLength: function(){
			this.length = _.size( this._views );
		}

	});

	_.collection( M.PageTypes.prototype );

	M.Page = Backbone.Model.extend({

		defaults:{

			content: {
				html: null,
				json: null
			}

		},

		idAttribute: 'name',

		initialize: function(){

			this.set('pages', new M.Pages() );

			var selectable = new Backbone.Picky.Selectable(this);
			_.extend(this, selectable);

			_.backboneDefault( this, 'name', 'page_name' );

			_.backboneDefault( this, 'navText', _.pageToTitle( this.get('name') ) );

			_.backboneDefault( this, 'title', this.get('navText') );

			_.backboneDefault( this, 'layout', 'default' );

			_.backboneDefault( this, 'type', 'text' );

			_.backboneDefault( this, 'link01', '' );

			if( _.isOverlayPage(this) ){

				if( this.get('layout') === 'default' ){
					this.set('layout', 'default_overlay');
				}

			}


			if( !this.get('pages') ){
				this.set( 'pages', new M.Pages() );
			}

		}


	});

	M.Pages = Backbone.Collection.extend({

		model: M.Page,

		initialize: function(){

			var singleSelect = new Backbone.Picky.SingleSelect(this);
			_.extend(this, singleSelect);

		}

	});

	M.PageViewer = M.View.extend({

		el: '.page-container',

		initialize: function(){

			this.children = new Backbone.ChildViewContainer();

		},

		setView: function( view ){

			var that = this;

			if( !view ){

				if(!this.currentView){
					return;
				}

				if(this.currentView){

					this.previousView = this.currentView;
					this.currentView = null;

					this.previousView.hide().then(function(){

						that.hide().then( _.bind( that._renderCurrent, that ) );

					});
				}

				return;

			}

			if(!this.currentView || this.currentView != view ){

				this.previousView = this.currentView;
				this.currentView = view;

				this.children.add( this.currentView );

				if( this.previousView ){

					this.previousView.hide().then(function(){

						that.htmlContent = that.currentView.model.get('content').html;

						that.hide().then( _.bind( that._renderCurrent, that ) );

					});

				}else{
					
					this._renderCurrent();

				}

			}

		},

		_renderCurrent: function(){

			if(this.previousView && this.currentView){
				console.log( 'page content fidelity maintained = ' +
					(this.htmlContent === this.currentView.model.get('content').html) );
			}
			

			var toClear = this.children.filter(function(view, index) {

				if( !this.currentView){
					return true;
				}else{
					return view != this.children.last();
				}
				
			}, this);

			_.invoke( toClear, 'clear' );

			toClear.length = 0;
			this.previousView = undefined;

			if( this.currentView ){

				this.$el.html( this.currentView.render().$el );

				this.show().then( this.currentView.show );

			}

		},

		render: function(){

			return this;

		}

	});

	_.extend( M.PageViewer.prototype, {
		onShow: function(){ this.$el.show();},
		onHidden: function(){ this.$el.hide(); }
	});

	M.PageView = M.ContainerView.extend({

		tagName: 'div',

		className: 'page',

		initialize: function(){

			this.undelegateEvents();
			this.$el.addClass( this.model.get('type') );
			this.$el.addClass( this.model.get('layout') );
			this.$el.addClass( this.model.get('name') );

		},

		onBeforeRender: function(){
			
			if( !this.options.templateId ){
				this.$el.html( this.model.get('content').html );
			}

		}

	});

	_.extend( M.PageViewer.prototype, {
		onShown: function(){ this.delegateEvents();},
		onHide: function(){ this.undelegateEvents(); }
	});

	
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

})( modiphy || {}, Backbone, _ );