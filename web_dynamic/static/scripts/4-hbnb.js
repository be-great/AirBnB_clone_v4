$(document).ready(function () {
  const selectedAmenities = {};
  $('input[type="checkbox"]').change(function () {
    // get from the checkbox the attr or variable
    const amenityid = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    // if a input is checked add it to the dictonary
    if ($(this).is(':checked')) {
      selectedAmenities[amenityid] = amenityName;
    } else {
      delete selectedAmenities[amenityid];
    }
    // update the h4 tag inside the div Amenities with the list of Amenities checked
    const list = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(list);
  });
  $.get('http://localhost:5001/api/v1/status/', function (data) {
    console.log('data status:', data.status);
    if (data.status === 'OK') {
      console.log('inside ok');
      $('div#api_status').addClass('available');
    } else {
      console.log('inside none ok');
      $('div#api_status').removeClass('available');
    }
  }).fail(function () {
    $('div#api_status').removeClass('available');
  });

  // Add a click event listner to the button tag
  $('.filters button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(selectedAmenities) })
    }).done(function (data) {
      $('section.places').empty();
      $('section.places').append('<h1>Places</h1>');
      for (const place of data) {
        const placeHTML = `<article>
            <div class="title">
            <h2>${place.name}</h2>
            <div class="price_by_night">
          $${place.price_by_night}
          </div>
            </div>
            <div class="information">
            <div class="max_guest">
            <i class="fa fa-users fa-3x" aria-hidden="true"></i>
    
            <br />
    
          ${place.max_guest} Guests
    
          </div>
            <div class="number_rooms">
            <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
    
            <br />
    
          ${place.number_rooms} Bedrooms
          </div>
            <div class="number_bathrooms">
            <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
    
            <br />
    
          ${place.number_bathrooms} Bathroom
    
          </div>
            </div>
            <div class="description">
    
          ${place.description}
    
          </div>
    
          </article> <!-- End 1 PLACE Article -->`;
        $('section.places').append(placeHTML);
      }
    });
  });
});
