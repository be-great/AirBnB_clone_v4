$(document).ready(function() {
    let selectedAmenities = {};
    $('input[type="checkbox"]').change(function() {
        // get from the checkbox the attr or variable
        const amenityid = $(this).attr('data-id');
        const amenityName = $(this).attr('data-name');

        // if a input is checked add it to the dictonary
        if ($(this).is(':checked')) {
            selectedAmenities[amenityid] = amenityName;
        }
        else {
            delete selectedAmenities[amenityid];
        }
        // update the h4 tag inside the div Amenities with the list of Amenities checked
        const list = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(list);
    });
    $.get('http://localhost:5001/api/v1/status/', function(data) {
        console.log("data status:", data.status);
        if (data.status === "OK")
        {
            console.log("inside ok")
            $('div#api_status').addClass('available');
        }
        else {
            console.log("inside none ok")
            $('div#api_status').removeClass('available');
        }
    }).fail(function() {
        $('div#api_status').removeClass('available');
    });
    $.ajax({
        url: 'http://localhost:5001/api/v1/places_search/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({}),  // Empty dictionary as required
        success: function(data) {
            $('section.places').empty();
            for (let place of data) {
                let placeAr = `
                <article>
                    <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                    </div>
                    <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                    </div>
                    <div class="user">
                        <b>Owner:</b> ${place.user ? `${place.user.first_name} ${place.user.last_name}` : 'N/A'}
                    </div>
                    <div class="description">
                        ${place.description ? place.description : ''}
                    </div>
                </article>`;
                console.log(placeAr);
                $('section.places').append(placeAr);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error: ", error);
        }
    });
});