import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-black text-white px-5">
      {/* Starry Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(white,transparent)] bg-repeat opacity-15" 
             style={{ backgroundSize: '2px 2px' }}>
        </div>
      </div>

      <h1 className="relative font-extrabold text-[40px] lg:text-[50px] text-center leading-tight">
        <span className="text-[#f56551]">Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips
      </h1>
      
      <p className="relative text-lg lg:text-xl text-gray-300 text-center max-w-2xl">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

      <Link to={'/create-trip'} className="relative mt-5">
        <Button className="bg-[#f56551] hover:bg-[#d44b3f] text-white px-6 py-3 text-lg">
          Get Started, it&apos;s Free
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
