$(document).ready(function () {
    const selectedAmenities = {};
    const stateIds = {};
    const cityIds = {};
  
    $('input[type="checkbox"]').change(function () {
      const amenityId = $(this).attr('data-id');
      const amenityName = $(this).attr('data-name');
  
      if ($(this).is(':checked')) {
        selectedAmenities[amenityId] = amenityName;
      } else {
        delete selectedAmenities[amenityId];
      }
  
      const list = Object.values(selectedAmenities).join(', ');
      $('.amenities h4').text(list);
    });
  
    $.get('http://localhost:5001/api/v1/status/', function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }).fail(function () {
      $('div#api_status').removeClass('available');
    });
  
    $('.filters button').click(function () {
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({ amenities: Object.keys(selectedAmenities) })
      }).done(function (data) {
        $('section.places').empty().append('<h1>Places</h1>');
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
              <div class="description">${place.description}</div>
            </article>`;
          $('section.places').append(placeHTML);
        }
      });
    });
  
    $('.stateCheckBox').click(function () {
      const stateId = $(this).attr('data-id');
      const stateName = $(this).attr('data-name');
  
      if ($(this).prop('checked')) {
        stateIds[stateId] = stateName;
      } else {
        delete stateIds[stateId];
      }
  
      if (Object.keys(stateIds).length === 0 && Object.keys(cityIds).length === 0) {
        $('.locations h4').html('&nbsp;');
      } else {
        $('.locations h4').text(Object.values(stateIds).concat(Object.values(cityIds)).join(', '));
      }
    });
  
    $('.cityCheckBox').click(function () {
      const cityId = $(this).attr('data-id');
      const cityName = $(this).attr('data-name');
  
      if ($(this).prop('checked')) {
        cityIds[cityId] = cityName;
      } else {
        delete cityIds[cityId];
      }
  
      if (Object.keys(stateIds).length === 0 && Object.keys(cityIds).length === 0) {
        $('.locations h4').html('&nbsp;');
      } else {
        $('.locations h4').text(Object.values(cityIds).concat(Object.values(stateIds)).join(', '));
      }
    });

    // Handle click event on review span elements to toggle the display of reviews
  
    $('.reviewSpan').click(function () {
      const reviewSpan = $(this);
      const placeId = reviewSpan.attr('data-id');
      
      $.ajax(`http://0.0.0.0:5001/api/v1/places/${placeId}/reviews`).done(function (data) {
        $('span').addClass('hideReview');
  
        if (reviewSpan.text() === 'show') {
          for (const review of data) {
            $('.reviews ul').append(`<li>${review.text}</li>`);
          }
          reviewSpan.text('hide');
        } else if (reviewSpan.text() === 'hide') {
          $('.reviews ul').empty();
          reviewSpan.text('show');
        }
      });
    });
  });
  