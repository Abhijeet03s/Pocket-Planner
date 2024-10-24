'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { categories } from '../../lib/constants';
import { cn } from '@/lib/utils';
import { createElement } from 'react';
import { paymentModes } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';

type Expense = {
   id: string;
   amount: string;
   description: string | null;
   date: string;
   categoryId: string;
   paymentMode: string;
};

const fetchExpenses = async (startDate: string, endDate: string): Promise<Expense[]> => {
   const queryParams = new URLSearchParams();
   if (startDate) queryParams.append('startDate', startDate);
   if (endDate) queryParams.append('endDate', endDate);

   const response = await fetch(`/api/expenses?${queryParams.toString()}`);
   if (!response.ok) {
      throw new Error('Failed to fetch expenses');
   }
   return response.json();
};

export function ExpenseList() {
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   const { data: expenses = [], isLoading, isError } = useQuery({
      queryKey: ['expenses', startDate, endDate],
      queryFn: () => fetchExpenses(startDate, endDate),
   });

   if (isLoading) {
      return <div>Loading expenses...</div>;
   }

   if (isError) {
      return <div>Error loading expenses</div>;
   }

   const getCategoryDetails = (categoryId: string) => {
      return categories.find(category => category.id === categoryId) || categories[categories.length - 1];
   };

   const getDescription = (description: string | null, categoryName: string) => {
      if (!description || description.trim() === '') {
         return `Expense for ${categoryName.toLowerCase()}`;
      }
      return description;
   };

   return (
      <div className="space-y-4">
         <div className="flex space-x-4">
            <Input
               type="date"
               value={startDate}
               onChange={(e) => setStartDate(e.target.value)}
               className="w-auto"
            />
            <Input
               type="date"
               value={endDate}
               onChange={(e) => setEndDate(e.target.value)}
               className="w-auto"
            />
         </div>

         <div className="rounded-lg border">
            <div className="grid grid-cols-5 gap-4 p-4 bg-gray-50 rounded-t-lg border-b">
               <div className="font-medium text-sm text-gray-500">Category</div>
               <div className="font-medium text-sm text-gray-500">Description</div>
               <div className="font-medium text-sm text-gray-500">Amount</div>
               <div className="font-medium text-sm text-gray-500">Date</div>
               <div className="font-medium text-sm text-gray-500">Payment Mode</div>
            </div>

            <div className="divide-y">
               {expenses.map((expense) => {
                  const category = getCategoryDetails(expense.categoryId);
                  return (
                     <div key={expense.id} className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                           <div
                              className={cn("p-2 rounded-lg", category.color)}
                              style={{ backgroundColor: category.color }}
                           >
                              {createElement(category.icon, {
                                 size: 16,
                                 style: { color: category.textColor }
                              })}
                           </div>
                           <span className="text-sm font-medium" style={{ color: category.textColor }}>
                              {category.name}
                           </span>
                        </div>
                        <div className="text-sm text-gray-600">
                           {getDescription(expense.description, category.name)}
                        </div>
                        <div className="text-sm font-medium">${parseFloat(expense.amount).toFixed(2)}</div>
                        <div className="text-sm text-gray-600">
                           {format(new Date(expense.date), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-sm text-gray-600">
                           {paymentModes.find(mode => mode.id === expense.paymentMode)?.name || 'Other'}
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {expenses.length === 0 && (
            <div className="text-center py-8 text-gray-500">
               No expenses found for the selected period
            </div>
         )}
      </div>
   );
}
