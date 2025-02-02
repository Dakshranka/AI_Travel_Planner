import 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'> 
      <h1 className='font-extrabold text-[50px] text-center mt-16'>
        <span className='text-[#f56551]'>Discover Tour Next Adventure with AI:</span> Personalized Itineraries at your Fingertips </h1>
       <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator,creating custom itenaries tailored to your interests and budget</p>
       <Link to={'/create-trip'}>
       <Button>Get Started,it&apos;s Free</Button>
       </Link>
    </div>
  )
}

export default Hero