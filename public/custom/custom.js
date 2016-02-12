(function($,z) {
	z.pageName = "";
	z.PAGE_NAMES = {
		HOME : "home",
		UNKNOWN : ""
	}
	
	var getPageName = function() {
		if ($(".home-listings").length > 0) {
			return z.PAGE_NAMES.HOME;
		}
		return z.PAGE_NAMES.UNKNOWN;
	}
	
	var loadGlobalEvents = function() {
		// to be implemented
	};
	
	var loadHomePageEvents = function() {
		var listingItems = $(".home-list-item");
		// 12=company; 7=interest date; 6=direction; 5=starting price; 9=purchase price; 3=product size
		var listingAttributes = [12, 7, 6, 5, 9, 3];
		var i = 0;
		
		// this method is NOT, i repeat, N O T ideal, it's such a performance burden to make many AJAX calls for each item
		// this is the result of bad time crunching
		// will HAVE to fix this later, HAVE to, preferably make our own API for this
		listingItems.each(function(index, listingItem){
			var listingItemEl = $(listingItem);
			var listingId = listingItemEl.attr("data-listing-id");
			var listingUrl = "/listings/" + listingId;
			$.ajax({
				url: listingUrl,
				dataType: "html",
				cache: true
			})
			.done(function(response){
				var listingDetails = $(response).find(".listing-details");
				var html = "";
				var listingDetail;
				
				if (listingDetails.length > 0) {
					for (i = 0; i < listingAttributes.length; i++){
						listingDetail = listingDetails.find("#listing-attribute-" + listingAttributes[i]);
						if (listingDetail.length > 0) {
							html += listingDetails.find("#listing-attribute-" + listingAttributes[i]).html();
						}
					}
					listingItemEl.append(html);
				}
			})
			.fail(function(ex){
				console.log("AJAX call failed on ", listingUrl, "; exception is:", ex);
			});
		})
	};
	
	var loadPageEvents = function(pageName) {
		if (!pageName || pageName === z.PAGE_NAMES.UNKNOWN) {
			loadGlobalEvents();
		}
		else if (pageName === z.PAGE_NAMES.HOME) {
			loadHomePageEvents();
		}
	};
	
	$(document).ready(function() {
		z.pageName = getPageName();
		loadPageEvents(z.pageName);
	});
})(jQuery, zycs)