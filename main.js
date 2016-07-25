var app = {};

app.init = function(){
	$('select').on('change', function(){
		$('.products').empty();
		var category = $('select').val();
		console.log(category);
		app.getProducts(category);

		$('.selectChoice').addClass('shrink');
	})
};

app.getProducts = function(category){
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
	}).then(function(res){
		app.displayProducts(res.products)
	});
};

app.displayProducts = function(displayRes){
	// console.log(displayRes);
	displayRes.forEach(function(product){
		// console.log(product);
		if (product.brand != null) {
			// console.log("products");
			var image = $('<img>').attr('src', product.image.sizes.IPhone.url);
			var title = $('<h4>').text(product.unbrandedName);
			var brand = $('<h5>').text(product.brand.name);
			var cost = $('<h5>').text(product.priceLabel);
			var link = $('<a>').attr('href', product.clickUrl).attr('target', '_blank').text('Love it! Gimme!');
			var remove = $('<button>').addClass('remove').text('Love it not');
			var divProduct = $('<div>').addClass('product').append(image, title, brand, cost, link, remove);

			$('.products').append(divProduct);

		}
		
	});
	
	//Remove item when remove button is clicked
	$('.remove').on('click', function(){
		var oneProd = $(this).parent();
		console.log(oneProd);
		$(oneProd).fadeOut(200);
	});
};


$(function(){
	app.init();
});