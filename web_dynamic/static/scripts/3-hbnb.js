$(function (){
  let $amenChkbx = $('.amenities .popover input');
  let newMap = new Map();
  $amenChkbx.prop('checked', false);
  $amenChkbx.on('change', function (){
    if ($(this).prop('checked') === true)
      newMap.set($(this).data('id'), $(this).data('name'));
    else
      newMap.delete($(this).data('id'));
    let list = new Array(...newMap.values());
    amenStr = list.join(', ');
    if (amenStr.length > 30)
      amenStr = amenStr.slice(0, 30) + '...';
    if (list.length > 0){
      $('.amenities h4').text(amenStr);
    }
    else {
      $('.amenities h4').prop('outerHTML', '<h4>&nbsp;</h4>');
    }
  });
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (api_status){
      if (api_status.status === 'OK')
        $('#api_status').addClass('available');
      else
        $('#api_status').removeClass('available');
    }
  });

  let $section = $('section.places');
  $.ajax({
    type: "post",
    url: "http://0.0.0.0:5001/api/v1/places_search",
    dataType: "json",
    data: JSON.stringify({}),
    contentType: "application/json",
    success: function (list_places){
      list_places.forEach(function (place){
	$section.append(`
	<article> 
		<div class="title_box">
			<h2>${place.name}</h2>
			<div class="price_by_night">$${place.price_by_night}</div>
		</div>
		<div class="information">
			<div class="max_guest">${place.max_guest} Guest${(place.max_guest != 1 && "s") || ""}</div>
			<div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms != 1 && "s") || ""}</div>
			<div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms != 1 && "s") || ""}</div>
		</div>
		<div class="description">
			${place.description}
		</div>
	</article>`);
	/*$('section.places>article')
	 .append('<div class="title_box"></div>')
	 .append('<div class="information"></div>')
	 .append(`<div class="user"><b>Owner:</b>${place.user.first_name} ${place.user.last_name}</div>`)
	 .append(`<div class="description">${place.description}</div>`);
	$('.places>article .title_box')
	 .append(`<h2>${place.name}</h2>`)
	 .append(`<div class="price_by_night">$${place.price_by_night}</div>`);
	$('.places>article .information')
	 .append(`<div class="max_guest">${place.max_guest} Guest${(place.max_guest != 1 && "s") || ""}</div>`)
	 .append(`<div class="number_rooms">${place.number_rooms} Bedroom${(place.number_rooms != 1 && "s") || ""}</div>`)
	 .append(`<div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms != 1 && "s") || ""}</div>`)*/
      });
    }
  });
});
