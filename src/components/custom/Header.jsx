import 'react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import axios from 'axios';
//import {FcGoogle} from "react-icons/fc";
function Header() {
  const user=JSON.parse(localStorage.getItem('user'));
  const [openDialog,setopenDialog]=useState(false);
  useEffect(()=>{
    console.log(user);
  },[])
  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error)=>console.log(error)
  })
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
      window.location.reload();
      
    }).catch((error) => {
      console.error("Error fetching user profile:", error);
    });
  };
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px=5'>
        <img src='/logo.svg'/>
        <div>
         { user?
        <div className='flex-items-center gap-3'>
          <a href='/create-trip'>
          <Button variant="outline" className="rounded-full">+ Create Trip</Button>
          </a>
          <a href='/my-trips'>
          <Button variant="outline" className="rounded-full">My trip</Button>
          </a>
          <Popover>
          <PopoverTrigger>
          <img src={user?.picture} className='h-[35px] w-[35px] rounded-full'/>
          </PopoverTrigger>
          <PopoverContent>
            <h2 className='cursor-pointer'onClick={()=>{
              googleLogout();
              localStorage.clear();
              window.location.reload();
            }}>Logout</h2>
          </PopoverContent>
          </Popover>

        </div>
        :
        <Button onClick={()=>setopenDialog(true)}>Sign In</Button>
         } 
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

export default Header