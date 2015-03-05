(function(){
	
	App.Views.DefaultPage = M.PageView.extend({

		showTransition: function(){

			if($(window).innerWidth() > 767){

				TweenMax.fromTo( this.$el, 0.5, {y:$(window).innerHeight(), autoAlpha:0},{y:0, autoAlpha:1, onComplete: this.triggerShown});

			}else{
				TweenMax.to( this.$el, 0.5, {autoAlpha:1, onComplete: this.triggerShown});
			}
			

		},

		onShown: function(){

			this.$el.attr('style', 'visibility: inherit; opacity: 1;');

			var imgHolder = this.$el.find('.image-wrapper > .image-holder');

			imgHolder.imagesLoaded(function(){
				TweenMax.to( imgHolder, 0.5, {autoAlpha:1});
			});

		},

		hideTransition: function(){

			if($(window).innerWidth() > 767){

				TweenMax.to( this.$el, 0.5, {y:-$(window).innerHeight(), autoAlpha:0, onComplete: this.triggerHidden});

			}else{
				TweenMax.to( this.$el, 0.5, {autoAlpha:0, onComplete: this.triggerHidden});
			}

			

		}
		
	});
	//_.extend( App.Views.DefaultPage.prototype, M.Mixins.PageViews.SocialTray);

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

			TweenMax.to( this.$el, 0.5, {autoAlpha:0, onComplete: this.triggerHidden });

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

			//window.location.hash = '#home';
			App.site.router.navigate( 'home', {trigger: true});

		}

	});

	
	App.Views.MenuButton = Backbone.View.extend({

		events: {
			'click': 'clicked'
		},

		initialize: function(){

			this.listenTo( this.model, 'selected', this.onSelected, this);
			this.listenTo( this.model, 'deselected', this.onDeselected, this);

		},

		onSelected: function(){

			this.$el.addClass('selected');
			
		},

		onDeselected: function(){
			this.$el.removeClass('selected');
		},

		clicked: function(e){
			//$('.mobile-nav-container').toggleClass('show');

			this.model.toggleSelected();

		}

	});

	App.Views.MobileNavContainer = M.ContainerView.extend({

		el: '.mobile-nav-container',

		initialize: function(){
			
			this.listenTo( this.model, 'selected', this.show, this);
			this.listenTo( this.model, 'deselected', this.hide, this);
		},

		onShow: function(){
			
			this.$el.attr('style', '');
			this.$el.addClass('show');

		},

		showTransition: function(){

			var h = this.$el.height();
			this.$el.height(0);
			TweenMax.to( this.$el, 0.5, { height: h, ease: Power3.easeOut, onComplete: this.triggerShown });
		},

		onShown: function(){
			this.$el.attr('style', '');
		},

		onHide: function(){
			//this.$el.removeClass('show');
		},

		hideTransition: function(){

			TweenMax.to( this.$el, 0.5, { height: 0, ease: Power3.easeOut, onComplete: this.triggerHidden });

		},

		onHidden: function(){

			this.$el.attr('style', '');
			this.$el.removeClass('show');

		}

	});

	M.MobileNavitemView = M.NavitemView.extend({

		events: {

			'click > a': 'clicked',

			'click .subnav a': 'subnavClicked'

		},

		initialize: function(){

			this.listenTo( this.model, 'selected', this.onSelected, this);
			this.listenTo( this.model, 'deselected', this.onDeselected, this);

		},

		onSelected: function(){

			if(this.nav){
				this.nav.show();
			}
			
		},

		onDeselected: function(){
			if(this.nav){
				this.nav.hide();
			}
		},

		clicked: function(e){

			if(this.nav){

				e.preventDefault();
				e.stopPropagation();
				this.model.toggleSelected();

			}else{
				
				//this.$el.parent().removeClass('show');

			}			

		},

		subnavClicked: function(){
			if(this.nav){
				this.model.deselect();
				this.$el.parent().removeClass('show');
			}
		},

		onRender: function(){

			if( this.$('.subnav').length){

				var niViewOptions = {

					// tagName: 'li',
					// className: 'navitem',
					// templateId: 'ni-template'

				};

				var category = App.siteGallery.get('categories').findWhere({title: this.model.get('field01')});

				this.nav = new M.DomCollectionView({

					collection: category.get('items'),
					el: this.$('.subnav'),
					itemView: M.NavitemView,
					itemViewOptions: niViewOptions

				});

				var that = this;

				_.extend( this.nav, {

					showTransition: function(){

						this.$el.attr('style', '');
						this.$el.addClass('show');

						var h = this.$el.height();
						this.$el.height(0);
						TweenMax.to( this.$el, 0.5, { height: h, ease: Power3.easeOut, onComplete: this.triggerShown });
					},

					onShown: function(){
						this.$el.attr('style', '');
					},

					onHide: function(){
						//this.$el.removeClass('show');
					},

					hideTransition: function(){

						TweenMax.to( this.$el, 0.5, { height: 0, ease: Power3.easeOut, onComplete: this.triggerHidden });

					},

					onHidden: function(){

						this.$el.attr('style', '');
						this.$el.removeClass('show');

					}

				});

			}

		}
	});

	App.Views.MainNavitem = M.NavitemView.extend({

		events: {

			'click > a': 'clicked',

			'mouseenter': 'rolledOver',

			'mouseleave': 'rolledOut'

		},

		initialize: function(){

			this.listenTo(this.model, 'selected', this.onSelected, this);
			this.listenTo(this.model, 'deselected', this.onDeselected, this);

			if(this.$('.subnav').length){

				this.subnav = new App.Views.Subnav({

					el: this.$('.subnav'),
					model: this.model

				});

				//this.children.add(this.subnav);

			}			

		},

		clicked: function(e){

			if(Modernizr.touch){
				if(this.$('.subnav > li').length && Modernizr.touch){

					e.preventDefault();
					e.stopPropagation();

				}
				this.model.toggleSelected();
			}
		

		},
	
		onSelected: function(){

			//this.$el.addClass('selected');

		},

		onDeselected: function(){

			//this.$el.removeClass('selected');

		},

		rolledOver: function(){

			clearTimeout(this.timeoutId);

			if(!Modernizr.touch){
				this.model.select();
			}

		},

		rolledOut: function(){
			
			this.timeoutId = setTimeout( _.bind(this.model.deselect, this.model), 1500);			

		}

	});

	App.Views.Subnav = M.ItemView.extend({

		initialize: function(){

			this.listenTo(this.model, 'selected', this.onSelected, this);

			this.listenTo(this.model, 'deselected', this.onDeselected, this);

		},

		onSelected: function(){
			
			this.show();

		},

		onDeselected: function(){

			this.hide();

		},

		onShow: function(){

			this.$el.show();

		},

		showTransition: function(){
			TweenMax.fromTo(this.$el, 0.3, {autoAlpha:0, y:20},{autoAlpha:1, y:0, onComplete:this.triggerShown});
		},

		hideTransition: function(){
			TweenMax.to(this.$el, 0.3, {autoAlpha:0, onComplete:this.triggerHidden});
		},

		onHidden: function(){
			this.$el.hide();
		}

	});

	App.Views.ImageSeries = M.ContainerView.extend({

		initialize: function(){

			var playable = new M.Mixins.Collections.Playable(this.collection, {
				delay: 5000
			});
			_.extend(this.collection, playable);

			this.preloader = this.$el.find('.preload');
			this.items = this.$el.find('.series-item');
			
			this.listenTo( this.collection, 'select:one', this.update, this );

			this.imagesAdded = false;

			this.started = false;

		},

		addImages: function(){

			if(this.imagesAdded){ return; }

			this.imagesAdded = true;
			var that = this;

			this.collection.each(function(model, index) {
				that.items.eq(index).css('background-image', 'url(' + model.imageUrl() + ')');
			});

		},

		showTransition: function(){

			var selected = this.collection.selected;
			var $item = this.items.eq( this.collection.indexOf( selected ) );
			
			TweenMax.fromTo( $item, 2, {autoAlpha:0}, {autoAlpha:1, delay:0, onComplete: this.triggerShown });


		},

		loaded: function( selected ){

			if( selected != this.collection.selected ){
				return;
			}

			this.addImages();

			TweenMax.killTweensOf( this.items );

			var $item = this.items.eq( this.collection.indexOf( selected ) );
			this.$el.append( $item );
			
			this.hide().done( this.show() );

		},

		update: function(){

			console.log( 'updating image series');
			if( this.collection.selected ){

				this.collection.pause();

				var selected = this.collection.selected;

				this.preloader.empty().append('<img src="' + selected.imageUrl() + '">')
					.imagesLoaded().done( _.bind( this.loaded, this, selected ) );

			}

		},

		onShown: function(){

			this.collection.resume();
			var that = this;

			this.items.each(function(index, el) {
								
				if( index != that.collection.indexOf( that.collection.selected ) ){

					TweenMax.set( $(this), { autoAlpha: 0 });

				}

			});

		}

	});

	App.Views.HomePage = App.Views.DefaultPage.extend({

		events: {

			'click .next': 'nextClicked',

			'click .prev': 'prevClicked'

		},

		nextClicked: function(){
			
			this.imageSeries.collection.next();

		},

		prevClicked: function(){

			this.imageSeries.collection.previous();

		},

		onBeforeRenderChildren: function(){

			if(!App.site.options.isMobile){

				var images = this.model.get('content').json.images;

				var items = new M.GalleryItems();

				_.each(images, function(n){

					items.add(n);

				});
				
				this.imageSeries = new App.Views.ImageSeries({
					collection: items,
					el: this.$el.find('.series-container')
				});

				// this.tagView = new App.Views.TagView({
				// 	collection: items,
				// 	el: this.$el.find('.tag-container')
				// });

				// this.nav = new M.DomCollectionView({

				// 	collection: items,
				// 	el: this.$el.find('.series-nav'),
				// 	itemView: App.Views.NiSeries,
				// 	itemViewOptions: {}

				// });

				this.children.add( this.imageSeries );
				//this.children.add( this.tagView );
			}

			
			//this.children.add( this.nav );

		},

		onShown: function(){

			if(!App.site.options.isMobile){
				
				this.imageSeries.collection.next();
			}

			App.Views.DefaultPage.prototype.onShown.call(this);
			

		},

		onHide: function(){

			if(!App.site.options.isMobile){
				this.imageSeries.collection.pause();
			}
			

		},

		showTransition: function(){
			
			//TweenMax.killChildTweensOf( this.$el );

			this.$el.show();

			TweenMax.fromTo( this.$el, 0.5, {autoAlpha:0}, {autoAlpha:1, onComplete: this.triggerShown});

			// TweenMax.fromTo(this.$('.prev'), 0.5, {x:-50}, {x:0});
			// TweenMax.fromTo(this.$('.next'), 0.5, {x:50}, {x:0});


		},

		hideTransition: function(){

			TweenMax.killChildTweensOf( this.$el );
			
			TweenMax.to(this.$el, 0.4, {autoAlpha:0,
				onComplete:this.triggerHidden});

		}

		
	});
	
})();
