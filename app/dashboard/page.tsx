'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Card } from "@/app/components/ui/card";
import { Wallet, Receipt, PiggyBank, AlertCircle, TrendingDown, TrendingUp } from "lucide-react";
import { QueryClientProvider } from "@/app/providers/QueryClientProvider";
import { BudgetComparisonChart } from "@/app/components/BudgetComparisonChart";
import { SpendingPieChart } from "@/app/components/SpendingPieChart";
import { satoshi } from "@/app/fonts/font";

function DashboardContent() {
   const currentMonth = format(new Date(), 'yyyy-MM');

   const { data: budget } = useQuery({
      queryKey: ['budget', currentMonth],
      queryFn: async () => {
         const response = await fetch(`/api/budget?month=${currentMonth}`);
         if (!response.ok) return null;
         return response.json();
      },
   });

   const { data: expenses } = useQuery({
      queryKey: ['expenses', currentMonth],
      queryFn: async () => {
         const response = await fetch(`/api/expenses/summary?month=${currentMonth}`);
         if (!response.ok) return [];
         return response.json();
      },
   });

   const totalExpenses = expenses?.reduce((sum: number, item: { total: number }) =>
      sum + item.total, 0) || 0;
   const budgetAmount = budget?.amount ? Number(budget.amount) : 0;
   const remaining = Math.max(budgetAmount - totalExpenses, 0);

   const budgetUsagePercentage = budgetAmount ? (totalExpenses / budgetAmount) * 100 : 0;
   const isOverBudget = totalExpenses > budgetAmount;
   const isNearBudget = budgetUsagePercentage >= 80 && !isOverBudget;

   const getBudgetStatusInfo = () => {
      if (isOverBudget) {
         return {
            icon: <AlertCircle className="w-4 h-4 mr-1" />,
            text: `${(budgetUsagePercentage).toFixed(1)}% over budget`,
            color: 'text-red-600'
         };
      }
      if (isNearBudget) {
         return {
            icon: <TrendingUp className="w-4 h-4 mr-1" />,
            text: `${budgetUsagePercentage.toFixed(1)}% of budget used`,
            color: 'text-yellow-600'
         };
      }
      return {
         icon: <TrendingDown className="w-4 h-4 mr-1" />,
         text: `${budgetUsagePercentage.toFixed(1)}% of budget used`,
         color: 'text-green-600'
      };
   };

   const budgetStatus = getBudgetStatusInfo();

   return (
      <div className={`${satoshi.variable} font-satoshi`}>
         <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm font-medium text-gray-600">Monthly Budget</p>
                     <p className="text-2xl font-semibold text-gray-900">₹{budgetAmount.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                     <Wallet className="w-6 h-6 text-purple-600" />
                  </div>
               </div>
               <div className={`mt-4 flex items-center text-sm ${budgetStatus.color}`}>
                  {budgetStatus.icon}
                  <span>₹{remaining.toLocaleString()} remaining</span>
               </div>
            </Card>

            <Card className="p-6">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                     <p className="text-2xl font-semibold text-gray-900">₹{totalExpenses.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                     <Receipt className="w-6 h-6 text-blue-600" />
                  </div>
               </div>
               <div className={`mt-4 flex items-center text-sm ${budgetStatus.color}`}>
                  {budgetStatus.icon}
                  <span>{budgetStatus.text}</span>
               </div>
            </Card>

            <Card className="p-6">
               <div className="flex items-center justify-between">
                  <div>
                     <p className="text-sm font-medium text-gray-600">Budget Left</p>
                     <p className="text-2xl font-semibold text-gray-900">₹{remaining.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-full">
                     <PiggyBank className="w-6 h-6 text-emerald-600" />
                  </div>
               </div>
               <div className={`mt-4 flex items-center text-sm ${isOverBudget ? 'text-red-600' : isNearBudget ? 'text-yellow-600' : 'text-green-600'}`}>
                  {isOverBudget ? <AlertCircle className="w-4 h-4 mr-1" /> :
                     isNearBudget ? <TrendingUp className="w-4 h-4 mr-1" /> :
                        <TrendingDown className="w-4 h-4 mr-1" />}
                  <span>{isOverBudget ? 'Over budget' :
                     isNearBudget ? 'Near budget limit' :
                        `${((remaining / budgetAmount) * 100).toFixed(1)}% remaining`}</span>
               </div>
            </Card>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BudgetComparisonChart selectedDate={new Date()} />
            <SpendingPieChart />
         </div>
      </div>
   );
}

export default function DashboardPage() {
   return (
      <QueryClientProvider>
         <DashboardContent />
      </QueryClientProvider>
   );
}