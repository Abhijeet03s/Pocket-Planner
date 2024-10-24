import Image from 'next/image';
import dummyDashboard from '../assets/dummy-dashboard.png';
import { satoshi, clashDisplay } from "@/app/fonts/font";

export default function Hero() {
   return (
      <div className={`relative bg-hero bg-cover bg-fixed bg-center text-white ${clashDisplay.variable} ${satoshi.variable}`}>
         <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900 opacity-80 pointer-events-none" aria-hidden="true"></div>
         <div className="relative container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-screen px-4 py-16 md:py-24">
            <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
               <h1 className="font-clash-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                  Welcome to <span className="text-purple-400">Pocket Planner</span>
               </h1>
               <p className="font-satoshi text-lg sm:text-xl md:text-2xl mb-10 text-gray-200 max-w-xl mx-auto md:mx-0">
                  Manage your expenses with ease and take control of your finances
               </p>
               <button className="font-satoshi bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white text-lg sm:text-xl font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition duration-300 ease-in-out shadow-lg flex items-center mx-auto md:mx-0">
                  <span>Get Started</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
               </button>
            </div>
            <div className="w-full md:w-1/2 relative mt-12 md:mt-0">
               <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl transform rotate-3 scale-105"></div>
               <div className="relative bg-white bg-opacity-10 p-4 rounded-xl backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
                  <Image
                     src={dummyDashboard}
                     alt="Pocket Planner Dashboard"
                     width={1000}
                     height={562}
                     className="rounded-lg shadow-2xl w-full h-auto"
                  />
               </div>
            </div>
         </div>
      </div>
   )
}