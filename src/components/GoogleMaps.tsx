import { LoadScriptProps } from "@react-google-maps/api"
import { useEffect, useState, useCallback } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import MapControl from "@/components/MapControl";


const libraries: LoadScriptProps["libraries"] = ["places"]
  
export default function TheaterLocations() {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        libraries,
    });

    // The user's current location
    const [center, setCenter] = useState({ lat: 32.698437, lng: -114.650398});

    // A reference to the current map object
    const [mapRef, setMapRef] = useState<any>(null);

    // An array of all the current marker objects
    const [markerList, setMarkerList] = useState<any>([]);

    // Containers for the direction-drawing engine
    const [directionsServiceHolder, setdirectionsServiceHolder] = useState<any>();
    const [directionsDisplayHolder, setdirectionsDisplayHolder] = useState<any>();

    // Contains a list of current marker objects so that they can be deleted
    let clickMarkers: any = [];
    // Contains a list of place_ids for individual place lookups
    let markerPlaceIds: any = [];

    // Define how the marker showing the user's location will look
    const centerMarkerLabel = {
        color: 'white',
        fontWeight: 'bold',
        text: '•',
        fontSize: '40px',
    };

    useEffect(() => {
        if(mapRef && isLoaded){
            applyRange();
        }
    }, [center]);

    async function clickMarkerEvent(index: any) {

        const start = new google.maps.LatLng(center.lat, center.lng);
        const end = new google.maps.LatLng(
            clickMarkers[index].getPosition()?.lat(),
            clickMarkers[index].getPosition()?.lng()
        );

        const request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        };

        // Draw the route from the center marker to the clicked marker
        directionsServiceHolder.route(request, (response: any, status: any) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplayHolder.setDirections(response);
            } else {
                alert("Failed to render directions");
            }
        });

        // Get information about the current marker
        const detailsRequest = {
            placeId: markerPlaceIds[index],
            fields: [
                'name',
                'formatted_phone_number',
                'rating',
                'formatted_address',
                'website',
                'opening_hours'
            ]
        };

        const markerDetails = new Promise((resolve, reject) => {
            let service = new google.maps.places.PlacesService(mapRef);
            service.getDetails(detailsRequest, (place) => {
                resolve(place);
            })
        });

        markerDetails.then((value: any) => {
            
            let openStatus;
            // Holds the href html string if a theater has a website
            let hrefContent = "";

            if (!value?.opening_hours?.open_now) {
                openStatus = "N/A";
            } else if (value?.opening_hours?.open_now === "true"){
                openStatus = "Open";
            } else {
                openStatus = "Closed";
            }

            // If a website was returned in the places object,
            // append the <a> tag to the content string
            // If there is no website present, this string is empty
            value?.website ? hrefContent = 
                `<a href="${value?.website || "N/A"}" class="text-xl 
                font-semibold text-blue-500 dark:text-blue-500 hover:underline" 
                target="_blank">Website</a>` : '';

            // Used to populate a marker's infoWindow tab when clicked
            let contentString =
                '<div id="content">' +
                    '<dl class="max-w-sm text-gray-900 divide-y divide-gray-200 dark:text-white rounded-lg dark:divide-gray-700 p-2">' +
                        `<h2 class="mb-2 pb-1 text-xl font-semibold text-gray-900 dark:text-gray">${value?.name || "N/A"}</h2>`+
                        '<div class="flex flex-col pb-1">' +
                            '<dt class="mb-1 text-gray-500 md:text-xl dark:text-gray-700">Rating (out of 5 stars)</dt>' +
                            `<dd class="text-lg text-slate-950 font-semibold">${value?.rating || "N/A"}</dd>` +
                        '</div>' +
                        '<div class="flex flex-col py-1">' +
                            '<dt class="mb-1 text-gray-500 md:text-xl dark:text-gray-700">Address</dt>' +
                            `<dd class="text-lg text-slate-950 font-semibold">${value?.formatted_address || "N/A"}</dd>` +
                        '</div>' +
                        '<div class="flex flex-col pt-1">' +
                            '<dt class="mb-1 text-gray-500 md:text-xl dark:text-gray-700">Phone number</dt>' +
                            `<dd class="text-lg text-slate-950 font-semibold">${value?.formatted_phone_number || "N/A"}</dd>` +
                        '</div>' +
                        '<div class="flex flex-col pt-1">' +
                            '<dt class="mb-1 text-gray-500 md:text-xl dark:text-gray-700">Open or closed</dt>' +
                            `<dd class="text-lg text-slate-950 font-semibold">${openStatus || "N/A"}</dd>` +
                        '</div>' +
                        '<div class="flex flex-col pt-1">' +
                        '</div>' +
                    '</dl>' +
                    `<div class="mb-1 text-gray-500 md:text-lg dark:text-gray-700 text-center">`+
                        hrefContent +
                    `</div>`+
                "</div>";

            const infowindow = new google.maps.InfoWindow({
                content: contentString,
                ariaLabel: value.name,
            });
            infowindow.open(mapRef, clickMarkers[index]);
        })
    }

    function rangeSetCallback(results: any, status: any) {

        let bounds = new google.maps.LatLngBounds();

        // Free up previous marker list so sew ones can be regenerated
        // based on the new radius
        for (let j = 0; j < markerList.length; j++) {
            markerList[j].setMap(null);
        }
        setMarkerList([]);

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {

                const curMarkerLat = results[i].geometry.location.lat();
                const curMarkerLng = results[i].geometry.location.lng();
                
                // Create and append the current marker to the list
                const newMarker = new google.maps.Marker({
                    position: {
                        lat: curMarkerLat,
                        lng: curMarkerLng
                    },
                    map: mapRef,
                    title: results[i].name,
                });
                setMarkerList((markerList: any) => [...markerList, newMarker]);

                // Create LatLng object representing the current Marker's location,
                // then extend the map's bounds to include it
                const curMarkerLocation = new google.maps.LatLng(curMarkerLat, curMarkerLng);
                bounds.extend(curMarkerLocation);

                const index = clickMarkers.length;
                clickMarkers.push(newMarker);
                markerPlaceIds.push(results[i].place_id);
                
                newMarker.addListener('click', () => {
                    clickMarkerEvent(index);
                });
            }
        } else {
            alert("Failed to fetch nearby places");
        }

        // // Add the center to the bounds
        const centerLocation = new google.maps.LatLng(center.lat, center.lng);
        bounds.extend(centerLocation);

        // If the only arker is the center marker, zoom in on it
        if (results.length < 1) {
            mapRef.setZoom(12);
            mapRef.setCenter(center);
        } else {
            mapRef.fitBounds(bounds);
        }
    }

    function applyRange() {

        let service = new google.maps.places.PlacesService(mapRef);

        let mapLocationObj = new google.maps.LatLng(
            center.lat,
            center.lng
        );
        
        // 50000 is the max range for a nearbySearch() call
        let request = {
            location: mapLocationObj,
            radius: 50000,
            type: 'movie_theater',
        };

        try {
            service.nearbySearch(request, rangeSetCallback);
        } catch (e) {
            alert("Error performing nearby search");
        }
    }
  
    const onLoad = useCallback(function callback(map: any) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
                setCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                map.setCenter(center);
            });

            const rendererOptions = {
                suppressMarkers: true,
            };

            const directionsService = new google.maps.DirectionsService;
            const directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
            directionsDisplay.setMap(map);
    
            // let directionsDisplay = new google.maps.DirectionsRenderer;
            setdirectionsDisplayHolder(directionsDisplay);
            setdirectionsServiceHolder(directionsService);

            setMapRef(map);
        }
    },[])
  
    return isLoaded ? ( <>
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
          onLoad={(map) => onLoad(map)}
        >
        <MapControl position="BOTTOM_CENTER">
            <button
              onClick={() => applyRange()}
              className="center-btn"
            >
              Center Map
            </button>
        </MapControl>
          <MarkerF
            position={center}
            title={"You"}
            label={centerMarkerLabel}
          ></MarkerF>
        </GoogleMap>
    </>) : <>Loading...</>
}
