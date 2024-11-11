import Link from 'next/link';
import { satoshi, clashDisplay } from '@/app/fonts/font';
import { Mail, HelpCircle } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { FaGithub as Github, FaTwitter as Twitter } from 'react-icons/fa';

export default function Footer() {
   const currentYear = new Date().getFullYear();

   const quickLinks = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Expenses", href: "/dashboard/expenses" },
      { label: "Profile", href: "/dashboard/profile" },
      { label: "Help Center", href: "#" }
   ];

   const legalLinks = [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
   ];

   return (
      <footer className={`bg-gray-900 ${satoshi.variable} ${clashDisplay.variable} font-satoshi`}>
         <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
               <div className="text-center sm:text-left">
                  <Link href="/" className="inline-block mb-4 sm:mb-6">
                     <h2 className="font-clash-display text-xl sm:text-2xl font-bold text-purple-400">
                        Pocket Planner
                     </h2>
                  </Link>
                  <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 max-w-md mx-auto sm:mx-0">
                     Take control of your finances with our powerful expense tracking and budgeting tools.
                  </p>
                  <div className="flex space-x-3 sm:space-x-4 justify-center sm:justify-start">
                     <Link href="https://github.com" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-all">
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                     </Link>
                     <Link href="https://twitter.com" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-all">
                        <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                     </Link>
                     <Link href="mailto:support@pocketplanner.com" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-purple-400 hover:bg-gray-700 transition-all">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                     </Link>
                  </div>
               </div>

               {/* Quick Links Section */}
               <div className="text-center">
                  <h3 className="font-clash-display text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                     Quick Links
                  </h3>
                  <ul className="space-y-2 sm:space-y-3">
                     {quickLinks.map((link) => (
                        <li key={link.label}>
                           <Link
                              href={link.href}
                              className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 justify-center text-sm sm:text-base"
                           >
                              {link.label}
                           </Link>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Support Section */}
               <div className="text-center sm:text-left">
                  <h3 className="font-clash-display text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">
                     Support
                  </h3>
                  <Card className="bg-gray-800 border-gray-700 p-3 sm:p-4">
                     <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                        <span className="text-white font-medium text-sm sm:text-base">Need Help?</span>
                     </div>
                     <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3">
                        Our support team is here to assist you
                     </p>
                     <Link
                        href="mailto:support@pocketplanner.com"
                        className="text-purple-400 hover:text-purple-300 transition-colors text-xs sm:text-sm font-medium"
                     >
                        support@pocketplanner.com
                     </Link>
                  </Card>
               </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-gray-800 pt-6 sm:pt-8">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                  <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                     © {currentYear} Pocket Planner. All rights reserved.
                  </p>
                  <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
                     {legalLinks.map((link) => (
                        <Link
                           key={link.label}
                           href={link.href}
                           className="text-gray-400 hover:text-purple-400 text-xs sm:text-sm transition-colors"
                        >
                           {link.label}
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </footer>
   );
}