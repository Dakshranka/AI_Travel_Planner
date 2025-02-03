import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '@/service/GlobalApi';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACE_API;

function PlacesToVisit({ trip }) {
  const [placePhotos, setPlacePhotos] = useState({});

  // Function to get place photo for each place
  const GetPlacePhoto = async (placeName) => {
    const data = { textQuery: placeName };

    try {
      const result = await GetPlaceDetails(data);
      const photoName = result.data.places[0]?.photos?.[0]?.name;
      if (photoName) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setPlacePhotos((prev) => ({
          ...prev,
          [placeName]: photoUrl,
        }));
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  useEffect(() => {
    if (trip?.TripData?.itinerary) {
      // Fetch photos for each place in the itinerary
      Object.values(trip.TripData.itinerary).forEach((places) => {
        places.forEach((place) => {
          if (place?.placeName) {
            GetPlacePhoto(place.placeName);
          }
        });
      });
    }
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip.TripData?.itinerary
          ? Object.entries(trip.TripData.itinerary)
              .sort(([dayA], [dayB]) => dayA.localeCompare(dayB)) // Sort days alphabetically
              .map(([day, places], dayIndex) => (
                <div key={dayIndex} className="my-3">
                  <h3 className="font-bold text-xl text-blue-600">{day}</h3>
                  {Array.isArray(places) &&
                    places.map((place, placeIndex) => (
                      // eslint-disable-next-line react/jsx-key
                      <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target='_blank'>
                        <div
                          key={placeIndex}
                          className="border p-4 rounded-lg shadow-md my-2 bg-gray-100 hover:scale-105 transition-all hover:shadow-md cursor-pointer"
                        >
                          <h2 className="font-bold text-lg">{place.placeName}</h2>
                          <div>
                            <img
                              src={placePhotos[place.placeName] || '/placeholder.jpg'} // Display the fetched photo URL or placeholder
                              alt={place.placeName}
                              className="w-[400px] h-[230px] rounded-xl"
                            />
                          </div>
                          <div>
                            <p className="text-gray-600">{place.placeDetails}</p>
                            <p className="font-bold text-sm text-gray-500">⏳ Time to Spend: {place.timeToSpend}</p>
                            <p className="text-sm text-gray-500">⭐ Rating: {place.rating}</p>
                            <p className="text-sm text-gray-500">💰 Ticket Pricing: {place.ticketPricing}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              ))
          : <p className="text-gray-500">No itinerary available.</p>
        }
      </div>
    </div>
  );
}

export default PlacesToVisit;
