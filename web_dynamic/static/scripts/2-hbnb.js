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
});