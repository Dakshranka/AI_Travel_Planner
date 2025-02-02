
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '@/constants/options'
import { chatSession } from '@/service/AIModal';
import 'react'
import { useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/FirebaseConfig';
import { useNavigate } from 'react-router-dom';
function CreateTrip() {
  const [place,setPlace]=useState()
  const [openDialog,setopenDialog]=useState(false);
  const [formData,setformData]=useState([])
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const handleInputChnge=(name,value)=>{
    setformData({
      ...formData,
      [name]:value
    })
  }
  useEffect(()=>{
    console.log(formData);
  },[formData])
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })
  const OnGenerateTrip=async()=>{
    const user=localStorage.getItem('user');
    if(!user){
      setopenDialog(true);
      return;
    }

    if(formData?.noOfDays>5 && !formData?.location || !formData?.budget || !formData?.noOfPeople){
      toast("please fill all details")
      return;
    }
    setLoading(true)
    const FINAL_PROMPT=AI_PROMPT
    .replace('{location}',formData?.location.label)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveller}',formData?.noOfPeople)
    .replace('{budget}',formData?.budget)
    //console.log(FINAL_PROMPT);
    const result=await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false)
    SaveAItrip(result?.response?.text())
  }

  const SaveAItrip=async(TripData)=>{
    setLoading(true)
    const user=JSON.parse(localStorage.getItem('user'));
    const docId=Date.now().toString()
    await setDoc(doc(db,"AITrips",docId),{
      userSelection:formData,
      TripData:JSON.parse(TripData),
      userEmail:user?.email,
      id:docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId)

  }
  const GetUserProfile = (tokeninfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokeninfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setopenDialog(false);
      OnGenerateTrip();
    }).catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  };


  return (
    <div className='sm:px-10 md:px-32 lg:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'> Just provide some basic information, and our trip planner will generate a customized iteniary based on your preferences. </p>
      <div className='mt-20 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is the destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange:(v)=>{setPlace(v);handleInputChnge('location',v)}
            }}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input placeholder='Ex.3' type='number' 
          onChange={(e)=>handleInputChnge('noOfDays',e.target.value)}
          />
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index)=>(
              <div key={index} 
              onClick={()=>handleInputChnge('budget',item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.budget==item.title &&'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
          
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure? </h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelersList.map((item,index)=>(
              <div key={index} 
              onClick={()=>handleInputChnge('noOfPeople',item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData?.noOfPeople==item.people &&'shadow-lg border-black'}`}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
          
        </div>
      </div>
      <div className='my-10 justify-end flex'>

      <Button
      disabled={loading}
      onClick={OnGenerateTrip}>
        {
          loading?
          <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>:'Generate Trip'
        }
      </Button>
      </div>
      <Dialog open={openDialog}>
      <DialogContent>
      <DialogHeader>
      <DialogDescription>
        <img src="/logo.svg"/>
        <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
        <p>Sign in to the App with Google Authhentication securely</p>
        <Button
        //disabled={loading} 
        onClick={login}
        className='w-full mt-5'>Sign In With Google</Button>
      </DialogDescription>
      </DialogHeader>
      </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTrip