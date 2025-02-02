import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import 'react';
import { useEffect } from 'react';
import { IoMdSend } from "react-icons/io";
// eslint-disable-next-line react/prop-types
function InfoSection({ trip }) {
  useEffect(()=>{
    GetPlacePhoto();
  },[trip])
  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
    })
  }
  return (
    <div>
      <img
        src="/placeholder.jpg"
        className="h-[300px] w-full object-cover rounded-xl"
        alt="Placeholder"
      />
      <div className='flex justify-between items-center'>
      <div className='my-5 flex flex-col gap-2'>
        <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
        <div className='flex'>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs text-md'>📅{trip?.userSelection?.noOfDays} Day</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs text-md'>💰{trip?.userSelection?.budget} Budget</h2>
          <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs text-md'>🥂No. of Traveler: {trip?.userSelection?.noOfPeople}</h2>
        </div>
      </div>
      <Button><IoMdSend /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
