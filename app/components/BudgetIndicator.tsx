'use client';

import { useQuery } from '@tanstack/react-query';
import { Card } from "@/app/components/ui/card";
import { Progress } from "@/app/components/ui/progress";
import { format } from 'date-fns';

interface BudgetIndicatorProps {
   month: string;
   totalExpenses: number;
}

export function BudgetIndicator({ month, totalExpenses }: BudgetIndicatorProps) {
   const { data: budget } = useQuery({
      queryKey: ['budget', month],
      queryFn: async () => {
         const response = await fetch(`/api/budget?month=${month}`);
         if (!response.ok) return null;
         return response.json();
      },
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
   });

   if (!budget) return null;

   const budgetAmount = Number(budget.amount);
   const percentage = Math.min((totalExpenses / budgetAmount) * 100, 100);
   const remaining = Math.max(budgetAmount - totalExpenses, 0);
   const isOverBudget = totalExpenses > budgetAmount;

   return (
      <Card className="p-4 mb-6">
         <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Budget Status for {format(new Date(month), 'MMMM yyyy')}</h3>
            <span className={`font-medium ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
               ₹{remaining.toLocaleString()} remaining
            </span>
         </div>
         <Progress value={percentage} className="h-2"
            indicatorClassName={isOverBudget ? 'bg-red-600' : 'bg-green-600'}
         />
         <div className="mt-2 text-sm text-gray-600">
            <span>₹{totalExpenses.toLocaleString()}</span>
            <span className="mx-1">/</span>
            <span>₹{budgetAmount.toLocaleString()}</span>
            {isOverBudget && (
               <span className="text-red-600 ml-2">
                  (₹{(totalExpenses - budgetAmount).toLocaleString()} over budget)
               </span>
            )}
         </div>
      </Card>
   );
}