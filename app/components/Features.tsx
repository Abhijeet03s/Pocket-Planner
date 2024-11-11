import { BarChart3, PieChart, Calendar, Wallet, CreditCard, ArrowDownToLine } from "lucide-react";
import { satoshi, clashDisplay } from '@/app/fonts/font';
import { Card } from "@/app/components/ui/card";
import Image from 'next/image';
import dashboardPreview from '../assets/dummy-dashboard.png';

export default function Features() {
   const features = [
      {
         icon: <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />,
         title: "Budget Tracking",
         description: "Set monthly budgets and track your spending with interactive charts and real-time alerts"
      },
      {
         icon: <PieChart className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />,
         title: "Category Analysis",
         description: "Visualize spending patterns across different categories with detailed pie charts"
      },
      {
         icon: <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />,
         title: "Monthly Reports",
         description: "Get comprehensive monthly reports and compare expenses across different time periods"
      },
      {
         icon: <ArrowDownToLine className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />,
         title: "Export Data",
         description: "Export your expense data to Excel spreadsheets for external analysis or record-keeping"
      }
   ];

   return (
      <>
         <section className={`py-12 sm:py-16 md:py-24 bg-white ${satoshi.variable} ${clashDisplay.variable}`}>
            <div className="container max-w-7xl mx-auto px-4">
               <div className="text-center mb-8 sm:mb-12 md:mb-16">
                  <h2 className="font-clash-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                     Powerful Features for Better Financial Control
                  </h2>
                  <p className="font-satoshi text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                     Everything you need to manage your expenses effectively
                  </p>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {features.map((feature, index) => (
                     <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="mb-3 sm:mb-4 bg-purple-50 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center">
                           {feature.icon}
                        </div>
                        <h3 className="font-clash-display text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                           {feature.title}
                        </h3>
                        <p className="font-satoshi text-sm sm:text-base text-gray-600">
                           {feature.description}
                        </p>
                     </Card>
                  ))}
               </div>
            </div>
         </section>

         <section className={`py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50/50 to-purple-50 ${satoshi.variable} ${clashDisplay.variable}`}>
            <div className="container max-w-7xl mx-auto px-4">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                  <div className="order-2 lg:order-1">
                     <h2 className="font-clash-display text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
                        Comprehensive Dashboard
                     </h2>
                     <div className="space-y-4 sm:space-y-6">
                        <FeatureDetail
                           icon={<Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
                           title="Budget Overview"
                           description="Track your monthly budget with visual indicators and remaining balance"
                        />
                        <FeatureDetail
                           icon={<PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
                           title="Spending Analytics"
                           description="View your spending distribution across different categories"
                        />
                        <FeatureDetail
                           icon={<CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />}
                           title="Payment Tracking"
                           description="Monitor expenses across different payment methods"
                        />
                     </div>
                  </div>
                  <div className="relative order-1 lg:order-2">
                     <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-xl transform rotate-2 sm:rotate-3 scale-105 opacity-90 sm:opacity-100"></div>
                     <div className="relative bg-white bg-opacity-10 p-2 sm:p-4 rounded-xl backdrop-filter backdrop-blur-lg border border-white border-opacity-20">
                        <Image
                           src={dashboardPreview}
                           alt="Dashboard Preview"
                           width={1000}
                           height={562}
                           className="rounded-lg shadow-xl sm:shadow-2xl w-full h-auto"
                           priority
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}

function FeatureDetail({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
   return (
      <div className="flex gap-3 sm:gap-4 items-start">
         <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            {icon}
         </div>
         <div>
            <h3 className="font-clash-display text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{title}</h3>
            <p className="font-satoshi text-sm sm:text-base text-gray-600">{description}</p>
         </div>
      </div>
   );
}