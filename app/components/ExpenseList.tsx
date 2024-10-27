'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { categories } from '../../lib/constants';
import { createElement } from 'react';
import { paymentModes } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';
import { ExpensePageSkeleton } from "@/app/components/ui/ExpensePageSkeleton";

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

const deleteExpense = async (id: string) => {
   const response = await fetch(`/api/expenses/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
   });
   if (response.ok) {
      return response.json();
   }
   throw new Error('Failed to delete expense');
};

export function ExpenseList() {
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const { data: expenses = [], isLoading, isError } = useQuery({
      queryKey: ['expenses', startDate, endDate],
      queryFn: () => fetchExpenses(startDate, endDate),
   });

   if (isLoading) {
      return <ExpensePageSkeleton />;
   }

   if (isError) {
      return <div>Error loading expenses</div>;
   }

   const getCategoryDetails = (categoryId: string) => {
      return categories.find(category => category.id === categoryId) || categories[categories.length - 1];
   };

   const getExpenseDescription = (description: string | null, categoryName: string) => {
      if (!description || description.trim() === '') {
         return categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();
      }
      return description;
   };

   const handleExpenseDelete = async (id: string) => {
      try {
         await deleteExpense(id);
         await queryClient.invalidateQueries({ queryKey: ['expenses'] });

         toast({
            title: "Success",
            description: "Expense deleted successfully",
            variant: "default",
         });
      } catch (error) {
         console.error('Failed to delete expense:', error);
         toast({
            title: "Error",
            description: "Failed to delete expense",
            variant: "destructive",
         });
      }
   };

   return (
      <div className="space-y-6">
         <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
            <div className="flex flex-col gap-1">
               <label htmlFor="startDate" className="text-sm font-medium text-gray-600">
                  Start Date
               </label>
               <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-40"
               />
            </div>
            <div className="flex flex-col gap-1">
               <label htmlFor="endDate" className="text-sm font-medium text-gray-600">
                  End Date
               </label>
               <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-40"
               />
            </div>
         </div>

         <div className="bg-white rounded-lg border shadow-sm">
            <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-t-lg border-b">
               <div className="font-medium text-sm text-gray-600">Category</div>
               <div className="font-medium text-sm text-gray-600">Description</div>
               <div className="font-medium text-sm text-gray-600">Amount</div>
               <div className="font-medium text-sm text-gray-600">Date</div>
               <div className="font-medium text-sm text-gray-600">Payment Mode</div>
               <div className="font-medium text-sm text-gray-600">Actions</div>
            </div>

            <div className="divide-y">
               {expenses.map((expense) => {
                  const category = getCategoryDetails(expense.categoryId);
                  return (
                     <div key={expense.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-2">
                           <div
                              className="p-2 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: category.color }}
                           >
                              {createElement(category.icon, {
                                 size: 16,
                                 style: { color: category.textColor }
                              })}
                           </div>
                           <span className="text-sm font-medium text-gray-700">
                              {category.name}
                           </span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                           {getExpenseDescription(expense.description, category.name)}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                           ${parseFloat(expense.amount).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">
                           {format(new Date(expense.date), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-sm text-gray-600">
                           {paymentModes.find(mode => mode.id === expense.paymentMode)?.name || 'Other'}
                        </div>
                        <div>
                           <Button
                              variant="ghost"
                              onClick={() => handleExpenseDelete(expense.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                           >
                              Delete
                           </Button>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>

         {expenses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border">
               <p className="text-gray-500 text-lg">
                  {startDate || endDate ? (
                     "No expenses found for the selected period"
                  ) : (
                     "You haven't added any expenses yet"
                  )}
               </p>
               <p className="text-gray-400 text-sm mt-1">
                  {startDate || endDate ? (
                     "Try adjusting your date range"
                  ) : (
                     "Click the 'Add Expense' button to get started"
                  )}
               </p>
            </div>
         )}
      </div>
   );
}
