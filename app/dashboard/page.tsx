import { Card } from "@/components/ui/card";
import { ArrowUpRight, DollarSign, CreditCard, TrendingUp } from "lucide-react";
import { SpendingPieChart } from "@/app/components/SpendingPieChart";

export default function DashboardPage() {
   return (
      <div>
         <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm font-medium text-gray-600">Total Balance</p>
                     <p className="text-2xl font-semibold text-gray-900">$24,500.00</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                     <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
               </div>
               <div className="mt-4 flex items-center text-sm text-green-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>3.5% from last month</span>
               </div>
            </Card>
            <Card className="p-6">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                     <p className="text-2xl font-semibold text-gray-900">$12,750.00</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                     <CreditCard className="w-6 h-6 text-red-600" />
                  </div>
               </div>
               <div className="mt-4 flex items-center text-sm text-red-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>2.1% from last month</span>
               </div>
            </Card>
            <Card className="p-6">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm font-medium text-gray-600">Total Savings</p>
                     <p className="text-2xl font-semibold text-gray-900">$11,750.00</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                     <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
               </div>
               <div className="mt-4 flex items-center text-sm text-blue-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>5.2% from last month</span>
               </div>
            </Card>
            <Card className="p-6">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm font-medium text-gray-600">Budget Left</p>
                     <p className="text-2xl font-semibold text-gray-900">$8,250.00</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                     <DollarSign className="w-6 h-6 text-yellow-600" />
                  </div>
               </div>
               <div className="mt-4 flex items-center text-sm text-yellow-600">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span>1.8% from last month</span>
               </div>
            </Card>
         </div>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SpendingPieChart />
         </div>
      </div>
   );
}