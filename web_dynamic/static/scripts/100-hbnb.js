$(document).ready(function () {
  const selectedAmenities = {};
  const stateIds = {};
  const cityIds = {};

  $('input[type="checkbox"]').change(function () {
    // Get the data-id and data-name attributes from the checkbox
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    // If the checkbox is checked, add it to the dictionary; otherwise, remove it
    if ($(this).is(':checked')) {
      selectedAmenities[amenityId] = amenityName;
    } else {
      delete selectedAmenities[amenityId];
    }

    // Update the h4 tag inside the div Amenities with the list of selected amenities
    const list = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(list);
  });

  // Check API status
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

  // Add a click event listener to the button tag
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
        const placeHTML = `
          <article>
            <div class="title">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">
                <i class="fa fa-users fa-3x" aria-hidden="true"></i><br />
                ${place.max_guest} Guests
              </div>
              <div class="number_rooms">
                <i class="fa fa-bed fa-3x" aria-hidden="true"></i><br />
                ${place.number_rooms} Bedrooms
              </div>
              <div class="number_bathrooms">
                <i class="fa fa-bath fa-3x" aria-hidden="true"></i><br />
                ${place.number_bathrooms} Bathroom
              </div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>`;
        $('section.places').append(placeHTML);
      }
    });
  });

  // Handle state checkbox changes
  $('.stateCheckBox').click(function () {
    const stateId = $(this).attr('data-id');
    const stateName = $(this).attr('data-name');

    if ($(this).prop('checked')) {
      stateIds[stateId] = stateName;
    } else {
      delete stateIds[stateId];
    }

    // Update the locations h4 tag
    if (Object.keys(stateIds).length === 0 && Object.keys(cityIds).length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(Object.values(stateIds).concat(Object.values(cityIds)).join(', '));
    }
  });

  // Handle city checkbox changes
  $('.cityCheckBox').click(function () {
    const cityId = $(this).attr('data-id');
    const cityName = $(this).attr('data-name');

    if ($(this).prop('checked')) {
      cityIds[cityId] = cityName;
    } else {
      delete cityIds[cityId];
    }

    // Update the locations h4 tag
    if (Object.keys(stateIds).length === 0 && Object.keys(cityIds).length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(Object.values(cityIds).concat(Object.values(stateIds)).join(', '));
    }
  });
});
