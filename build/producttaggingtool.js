/*! tinycarousel - v2.1.8 - 2015-02-22
 * https://baijs.com/tinycarousel
 *
 * Copyright (c) 2015 Maarten Baijs <wieringen@gmail.com>;
 * Licensed under the MIT license */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){function b(b,e){function f(){return i.update(),i.move(i.slideCurrent),g(),i}function g(){i.options.buttons&&(n.click(function(){return i.move(--t),!1}),m.click(function(){return i.move(++t),!1})),a(window).resize(i.update),i.options.bullets&&b.on("click",".bullet",function(){return i.move(t=+a(this).attr("data-slide")),!1})}function h(){i.options.buttons&&!i.options.infinite&&(n.toggleClass("disable",i.slideCurrent<=0),m.toggleClass("disable",i.slideCurrent>=i.slidesTotal-r)),i.options.bullets&&(o.removeClass("active"),a(o[i.slideCurrent]).addClass("active"))}this.options=a.extend({},d,e),this._defaults=d,this._name=c;var i=this,j=b.find(".viewport:first"),k=b.find(".overview:first"),l=null,m=b.find(".next:first"),n=b.find(".prev:first"),o=b.find(".bullet"),p=0,q={},r=0,s=0,t=0,u="x"===this.options.axis,v=u?"Width":"Height",w=u?"left":"top",x=null;return this.slideCurrent=0,this.slidesTotal=0,this.intervalActive=!1,this.update=function(){return k.find(".mirrored").remove(),l=k.children(),p=j[0]["offset"+v],s=l.first()["outer"+v](!0),i.slidesTotal=l.length,i.slideCurrent=i.options.start||0,r=Math.ceil(p/s),k.append(l.slice(0,r).clone().addClass("mirrored")),k.css(v.toLowerCase(),s*(i.slidesTotal+r)),h(),i},this.start=function(){return i.options.interval&&(clearTimeout(x),i.intervalActive=!0,x=setTimeout(function(){i.move(++t)},i.options.intervalTime)),i},this.stop=function(){return clearTimeout(x),i.intervalActive=!1,i},this.move=function(a){return t=isNaN(a)?i.slideCurrent:a,i.slideCurrent=t%i.slidesTotal,0>t&&(i.slideCurrent=t=i.slidesTotal-1,k.css(w,-i.slidesTotal*s)),t>i.slidesTotal&&(i.slideCurrent=t=1,k.css(w,0)),q[w]=-t*s,k.animate(q,{queue:!1,duration:i.options.animation?i.options.animationTime:0,always:function(){b.trigger("move",[l[i.slideCurrent],i.slideCurrent])}}),h(),i.start(),i},f()}var c="tinycarousel",d={start:0,axis:"x",buttons:!0,bullets:!1,interval:!1,intervalTime:3e3,animation:!0,animationTime:1e3,infinite:!0};a.fn[c]=function(d){return this.each(function(){a.data(this,"plugin_"+c)||a.data(this,"plugin_"+c,new b(a(this),d))})}});

// Include Stylesheet
$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://localhost:3000/build/producttaggingtool.css') );


/* Producttagging Plugin */
;(function(factory) {
    if(typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    }
    else if(typeof exports === 'object') {
        module.exports = factory(require('jquery'));
    }
    else {
        factory(jQuery);
    }
}
(function($) {
    var pluginName = "producttagging"
    ,   defaults   =
        {
        	tags: [],
            type: 1
        }
    ;

    function Plugin($container, options) {
        /**
         * The options of the carousel extend with the defaults.
         *
         * @property options
         * @type Object
         * @default defaults
         */
    	this.options = $.extend({}, defaults, options);

        /**
         * @property _defaults
         * @type Object
         * @private
         * @default defaults
         */
        this._defaults = defaults;

        /**
         * @property _name
         * @type String
         * @private
         * @final
         * @default 'producttagging'
         */
        this._name = pluginName;

        var self = this;

        /**
         * @method _initialize
         * @private
         */
        function _initialize() {
            _attach();
            return self;
        }

        /**
         * @method _attach
         * @private
         */
        function _attach() {

			// Product Template
			var product_template = $("<div class='tt-product-wrapper'>" +
				"<div class='tt-product-image'></div>" +
				"<div class='tt-product-content'>" +
				"<h1 class='tt-product-title'></h1>" +
				"<span class='tt-product-name'></span>" +
				"<div class='tt-product-price-container'><h2 class='tt-product-price'></h2>" +
				"<a class='tt-product-link'></a></div>" +
				"<div class='tt-product-btn-container'><a class='tt-product-btn' target='_blank'></a></div>");

			// Add special classname to image block
			$container.addClass("image-tag-container");

			// Add tags to image
			switch(self.options.type) {
				case 1:
					$container.addClass("image-tag-first");
					self.options.tags.map(function(tag) {
						var $tag_div = $("<div class='image-tag'></div>");
						$tag_div.append(product_template.clone());
						$tag_div.find(".tt-product-image").css("background-image", "url("+tag.image_url+")");
						$tag_div.find(".tt-product-title").html("Buy it!");
						$tag_div.find(".tt-product-name").html(tag.title);
						$tag_div.find(".tt-product-price").html(tag.price);
						$tag_div.find(".tt-product-link").html(">> See details");
						$tag_div.find(".tt-product-btn-container .tt-product-btn").html("Add to cart").attr('href',tag.cart_url);
						$tag_div.css('left', tag.x);
						$tag_div.css('top', tag.y);

						var $tag_pointer = $("<div class='tt-pointer'></div>");
						$tag_div.append($tag_pointer);

						$container.append($tag_div);
					});
					break;
				case 2:
					$container.addClass("image-tag-second");
					$container.append('<div class="link-area"><div class="demo-icon"></div><span class="link-area-text">FIND SIMILAR LOOK</span><span class="up-down-icon">▾</span></div>');
					var $sliderContainer = $("<div class='tags-slider-container'><a class='buttons tt-buttons prev'>prev</a><div class='viewport'><ul class='overview'></ul></div><a class='buttons tt-buttons next'>next</a></div>"),
						$slidelist = $sliderContainer.find("ul");

					$container.append($sliderContainer);

					self.options.tags.map(function(tag) {
						var $tag_div = $("<li class='image-tag' style='width:242.5px;'></li>");
						$tag_div.append(product_template.clone());
						$tag_div.find(".tt-product-image").css("background-image", "url("+tag.image_url+")");
						$tag_div.find(".tt-product-title").html("Buy it!");
						$tag_div.find(".tt-product-name").html(tag.title);
						$tag_div.find(".tt-product-price").html(tag.price);
						$tag_div.find(".tt-product-link").html(">> See details");
						$tag_div.find(".tt-product-btn-container .tt-product-btn").html("Shop").attr('href',tag.cart_url);
						$slidelist.append($tag_div);
					});
					$sliderContainer.tinycarousel({});
					$container.find(".link-area").click(function(){
						$container.toggleClass("tags-slider-open");
					})
					break;
				case 3:
					$container.addClass("image-tag-third");
					var $sliderContainer = $("<div class='tags-slider-container'><a class='buttons tt-buttons prev'>prev</a><div class='viewport'><ul class='overview'></ul></div><a class='buttons tt-buttons next'>next</a></div>"),
						$slidelist = $sliderContainer.find("ul"),
						$pointersContainer = $("<div class='tags-pointer-container'></div>");

					$container.append($sliderContainer);
					$container.append($pointersContainer);

					self.options.tags.map(function(tag, index) {
						var $tag_div = $("<li class='image-tag'></li>");
						$tag_div.append(product_template.clone());
						$tag_div.find(".tt-product-image").css("background-image", "url("+tag.image_url+")");
						$tag_div.find(".tt-product-name").html(tag.title);
						$tag_div.find(".tt-product-price").html(tag.price);
						$tag_div.find(".tt-product-link").html(">> See details");
						$tag_div.find(".tt-product-btn-container .tt-product-btn").html("Shop").attr('href',tag.cart_url);
						$slidelist.append($tag_div);

						var $tag_pointer = $("<div class='tt-pointer' data-id='"+index+"'></div>");
						$tag_pointer.css('left', tag.x);
						$tag_pointer.css('top', tag.y);
						$pointersContainer.append($tag_pointer);
					});
					$sliderContainer.find("li").css('width', $sliderContainer.width());
					var slider = $sliderContainer.tinycarousel().data("plugin_tinycarousel");

					$pointersContainer.find(".tt-pointer").hover(function(){
						slider.move($(this).data('id'));
						$pointersContainer.find(".tt-pointer").removeClass('active');
						$(this).addClass('active');
						$container.addClass('tags-slider-open');
					}, function(){
					});

					$sliderContainer.bind("move", function()
				    {
						$pointersContainer.find(".tt-pointer").removeClass('active');
						$pointersContainer.find(".tt-pointer:nth-child("+(slider.slideCurrent+1)+")").addClass('active');
				    });

				    $container.mouseleave(function(){
						$(this).removeClass('tags-slider-open');
						$pointersContainer.find(".tt-pointer").removeClass('active');
				    });
					break;
			}
        }

        return _initialize();
    }

    /**
    * @class producttagging
    * @constructor
    * @param {Object} options
        @param {Number}  [options.type=1] Type of tagging.
        @param {Array}   [options.tags=[]] Array of tag data.
    */
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if(!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin($(this), options));
            }
        });
    };
}));


var data = [
	[
		{
			x: 240,
			y: 145.5,
			image_url: 'http://whitehouse.prod51.fr/op/img/article_first_tag1.jpg',
			title: 'Warehouse Pea Coat',
			price: '132.35 €',
			cart_url: 'http://www.asos.com/Warehouse/Warehouse-Pea-Coat/Prod/pgeproduct.aspx?iid=5974436&amp;cid=2641&amp;Rf989=4894&amp;sh=0&amp;pge=0&amp;pgesize=36&amp;sort=-1&amp;clr=Navy&amp;totalstyles=20&amp;gridsize=3'
		},
		{
			x: 120,
			y: 300,
			image_url: 'http://whitehouse.prod51.fr/op/img/article_first_tag2.jpg',
			title: 'Black Pliage Tote Bag',
			price: '140.16 €',
			cart_url: 'http://shop.nordstrom.com/s/longchamp-large-le-pliage-tote/3241956?origin=category-personalizedsort&amp;contextualcategoryid=0&amp;fashionColor=Black&amp;resultback=1569'
		},
		{
			x: 205,
			y: 450.5,
			image_url: 'http://whitehouse.prod51.fr/op/img/article_first_tag3.jpg',
			title: 'Black Skinny Jeans',
			price: '38.00 €',
			cart_url: 'http://www.topshop.com/webapp/wcs/stores/servlet/ProductDisplay?catalogId=33057&amp;storeId=12556&amp;productId=17457667&amp;langId=-1'
		}
	],
	[
		{
			image_url: 'http://whitehouse.prod51.fr/op/img/article_second_tag1.jpg',
			title: 'Camel Derbies',
			price: '44.50 €',
			cart_url: 'http://www.brandalley.fr/fiche-Produit/Rayon-1394751'
		},
		{
			image_url: 'http://whitehouse.prod51.fr/op/img/article_second_tag2.jpg',
			title: 'Navy Blazer In Jersey',
			price: '66.18 €',
			cart_url: 'http://www.asos.com/ASOS/ASOS-Skinny-Blazer-In-Jersey/Prod/pgeproduct.aspx?iid=5289343&cid=5678&Rf-200=33&sh=0&pge=0&pgesize=36&sort=-1&clr=Navy&totalstyles=171&gridsize=3'
		},
		{
			image_url: 'http://whitehouse.prod51.fr/op/img/article_second_tag3.jpg',
			title: 'Straight Chinos',
			price: '29.80 €',
			cart_url: 'http://www.asos.com/asos/asos-straight-chinos/prod/pgeproduct.aspx?iid=4685063&clr=Navy&SearchQuery=chino&pgesize=36&pge=0&totalstyles=40&gridsize=3&gridrow=6&gridcolumn=3'
		},
		{
			image_url: 'http://whitehouse.prod51.fr/op/img/article_second_tag4.jpg',
			title: 'White Crew Neck T-Shirt',
			price: '22.00 €',
			cart_url: 'www.topman.com/en/tmuk/product/clothing-140502/mens-t-shirts-vests-2925317/plain-t-shirts-140654/premium-white-crew-neck-t-shirt-5018047?bi=40&ps=20'
		}
	],
	[
		{
			x: 510,
			y: 90,
			image_url: 'http://whitehouse.prod51.fr/op/img/article_third_product1.jpg',
			title: 'White Wooden Cabinet',
			price: '319.99 €',
			cart_url: 'http://www.home24.fr/jack-alice/vitrine-chateau-blanc-imitation-chene-de-san-remo'
		},
		{
			x: 412,
			y: 452,
			image_url: 'http://whitehouse.prod51.fr/op/img/article_third_product2.jpg',
			title: 'White Design Chair',
			price: '329.00 €',
			cart_url: 'http://www.home24.fr/m-rteens/chaise-capitonnee-troenoe-lot-de-4-matiere-synthetique-imitation-cuir-blanc'
		},
		{
			x: 230,
			y: 377,
			image_url: 'http://whitehouse.prod51.fr/op/img/article_third_product3.jpg',
			title: 'Pine Table',
			price: '359.00 €',
			cart_url: 'http://www.ikea.com/fr/fr/catalog/products/60152340/'
		}
	]
];

$(document).ready(function(){
	// Demo - Style1
	$("#image1").producttagging({type: 1, tags: data[0]});
	// Demo - Style2
	$("#image2").producttagging({type: 2, tags: data[1]});
	// Demo - Style3
	$("#image3").producttagging({type: 3, tags: data[2]});
});