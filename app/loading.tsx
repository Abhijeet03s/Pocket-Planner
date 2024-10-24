import Image from 'next/image'
import pocketPlannerLogo from './assets/pocket-planner-logo.png'

export default function Loading() {
   return (
      <div className="flex flex-col justify-center items-center h-screen">
         <div className="animatePulse">
            <Image
               src={pocketPlannerLogo}
               alt="Website Logo"
               width={100}
               height={100}
               className="mb-4"
            />
         </div>
      </div>
   )
}