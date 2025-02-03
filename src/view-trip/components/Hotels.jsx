import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '@/service/GlobalApi';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACE_API;

function Hotels({ trip }) {
  const [hotelPhotos, setHotelPhotos] = useState({});

  // Function to get place photo for each hotel
  const GetHotelPhoto = async (hotelName, hotelAddress) => {
    const data = { textQuery: `${hotelName}, ${hotelAddress}` };

    try {
      const result = await GetPlaceDetails(data);
      const photoName = result.data.places[0]?.photos?.[0]?.name;
      if (photoName) {
        const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
        setHotelPhotos(prev => ({
          ...prev,
          [`${hotelName}-${hotelAddress}`]: photoUrl,
        }));
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  useEffect(() => {
    if (trip?.TripData?.hotels) {
      trip.TripData.hotels.forEach(hotel => {
        if (hotel?.hotelName && hotel?.hotelAddress) {
          GetHotelPhoto(hotel.hotelName, hotel.hotelAddress);
        }
      });
    }
  }, [trip]);

  return (
    <div>
      <h2 className="font-bold text-xl mt-5">Hotel Recommendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.TripData?.hotels?.map((hotel, index) => {
          const photoUrl = hotelPhotos[`${hotel.hotelName}-${hotel.hotelAddress}`];

          return (
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target='_blank' key={index}>
              <div className='hover:scale-105 transition-all cursor-pointer'>
                <img
                  src={photoUrl || '/placeholder.jpg'} // Display fetched photo URL or placeholder
                  className="rounded-lg"
                  alt={hotel?.hotelName || 'Hotel Placeholder'}
                />
                <div className='my-2 flex flex-col gap-2'>
                  <h2 className='font-medium'>{hotel?.hotelName}</h2>
                  <h2 className='text-xs text-gray-500'>📍{hotel?.hotelAddress}</h2>
                  <h2 className='text-sm'>💰{hotel?.priceRange}</h2>
                  <h2 className='text-sm'>⭐{hotel?.rating} stars</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
