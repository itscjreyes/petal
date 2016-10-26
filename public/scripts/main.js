'use strict';

var app = {};

app.init = function () {
	$('select').on('change', function () {
		$('.products').empty();
		var category = $('select').val();
		console.log(category);
		app.getProducts(category);

		$('.selectChoice').addClass('shrink');

		$('.toTop').addClass('show');
	});

	app.toTop();
};

app.getProducts = function (category) {
	$.ajax({
		url: 'http://api.shopstyle.com/api/v2/products',
		method: 'GET',
		dataType: 'json',
		data: {
			pid: 'uid3225-34532635-63',
			limit: 50,
			cat: category,
			sort: 'Recency'
		}
	}).then(function (res) {
		app.displayProducts(res.products);
	});
};

app.displayProducts = function (displayRes) {
	// console.log(displayRes);
	displayRes.forEach(function (product) {
		// console.log(product);
		if (product.brand != null) {
			// console.log("products");
			var image = $('<img>').attr('src', product.image.sizes.IPhone.url);
			var title = $('<h4>').text(product.unbrandedName);
			var brand = $('<h5>').text(product.brand.name).addClass('brand');
			var cost = $('<h5>').text(product.priceLabel).addClass('price');
			var link = $('<a>').attr('href', product.clickUrl).attr('target', '_blank').addClass('productBtn').text('Love it! Gimme!');
			var remove = $('<button>').addClass('productBtn remove').text('Love it not');
			var divWrapper = $('<div>').addClass('wrapper').append(image, title, brand, cost, link, remove);
			var divProduct = $('<div>').addClass('product').append(divWrapper);

			$('.products').append(divProduct);
		}
	});

	//Remove item when remove button is clicked
	$('.remove').on('click', function () {
		var oneProd = $(this).parent().parent();
		console.log(oneProd);
		$(oneProd).fadeOut();
	});
};

app.toTop = function () {
	$('.toTop').on('click', function () {
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});
};

$(function () {
	app.init();

	// VIDEO SCRIPTS
	scaleVideoContainer();

	initBannerVideoSize('.video-container .poster img');
	initBannerVideoSize('.video-container .filter');
	initBannerVideoSize('.video-container video');

	$(window).on('resize', function () {
		scaleVideoContainer();
		scaleBannerVideoSize('.video-container .poster img');
		scaleBannerVideoSize('.video-container .filter');
		scaleBannerVideoSize('.video-container video');
	});
});

function scaleVideoContainer() {

	var height = $(window).height();
	var unitHeight = parseInt(height) + 'px';
	$('.homepage-hero-module').css('height', unitHeight);
}

function initBannerVideoSize(element) {

	$(element).each(function () {
		$(this).data('height', $(this).height());
		$(this).data('width', $(this).width());
	});

	scaleBannerVideoSize(element);
}

function scaleBannerVideoSize(element) {

	var windowWidth = $(window).width(),
	    windowHeight = $(window).height(),
	    videoWidth,
	    videoHeight;

	console.log(windowHeight);

	$(element).each(function () {
		var videoAspectRatio = $(this).data('height') / $(this).data('width');

		$(this).width(windowWidth);

		if (windowWidth < 1000) {
			videoHeight = windowHeight;
			videoWidth = videoHeight / videoAspectRatio;
			$(this).css({ 'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px' });

			$(this).width(videoWidth).height(videoHeight);
		}

		$('.homepage-hero-module .video-container video').addClass('fadeIn animated');
	});
}