import { useEffect, useState } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';

const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=' + import.meta.env.VITE_GOOGLE_PLACE_API;

function UserTripCardItem({ trip }) {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpg');

    const GetPlacePhoto = async () => {
        if (!trip?.userSelection?.location?.label) return;

        const data = { textQuery: trip.userSelection.location.label };

        try {
            const result = await GetPlaceDetails(data);
            const photoRef = result.data?.places?.[0]?.photos?.[0]?.name; // Get the first available photo

            if (photoRef) {
                setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', photoRef));
            }
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    };

    useEffect(() => {
        if (trip) {
            GetPlacePhoto();
        }
    }, [trip]);

    return (
        <Link to={`/view-trip/${trip?.id}`} className="block">
            <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
                <img src={photoUrl} alt="Trip" className="w-full h-48 object-cover rounded-xl" />
                <div className="mt-3">
                    <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
                    <h2 className="text-gray-600">
                        {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCardItem;
