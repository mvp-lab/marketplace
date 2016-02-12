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
				if (listingDetails.length > 0) {
					listingItemEl.append(listingDetails.find("#listing-attribute-12"));
					listingItemEl.append(listingDetails.find("#listing-attribute-7"));
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