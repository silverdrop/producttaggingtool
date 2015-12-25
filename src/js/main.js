var data = {
	image_div_id : "image1",
	tags : [
		{
			x: 240,
			y: 145.5,
			image_url: 'http://whitehouse.prod51.fr/op/img/article_first_tag1.jpg',
			title: 'Warehouse Pea Coat',
			price: '132.35 €'
		}
	]
}

function attach_tag_to_image (image_id, data) {
	if(!image_id || !data) return;

	// Image Tag Template
	var tag_template = $("<div class='image-tag'>" +
		"<div class='tag-modal'>" +
		"<div class='tag-image'></div>" +
		"<div class='tag-content'>" +
		"<h1 class='tag-title'></h1>" +
		"<span class='tag-product-name'></span>" +
		"<h2 class='tag-product-price'></h2>" +
		"<a class='tag-product-link'></a>" +
		"<div class='buy-btn-container'><a class='buy-btn'></a></div>");

	// Add special classname to image block
	$("#" + image_id).addClass("image-tag-container");

	// Add tags to image
	data.map(function(tag) {
		var $tag_div = tag_template.clone();
		$tag_div.css('left', tag.x);
		$tag_div.css('top', tag.y);
		$tag_div.find(".tag-image").css("background-image", "url("+tag.image_url+")");
		$tag_div.find(".tag-title").html("Buy it!");
		$tag_div.find(".tag-product-name").html(tag.title);
		$tag_div.find(".tag-product-price").html(tag.price);
		$tag_div.find(".tag-product-link").html(">> See details");
		$tag_div.find(".buy-btn-container .buy-btn").html("Add to cart");
		$("#" + image_id).append($tag_div);
	});
}

$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'http://localhost:3000/build/producttaggingtool.css') );
$(document).ready(function(){
	attach_tag_to_image(data.image_div_id, data.tags);
});