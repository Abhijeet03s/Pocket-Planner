'use client';

import { format } from 'date-fns';
import { categories } from '../../lib/constants';
import { paymentModes } from '@/lib/constants';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/app/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from '@tanstack/react-query';
import { ExpensePageSkeleton } from '@/app/components/ExpensePageSkeleton';
import { DateRange } from "react-day-picker";
import { Expense } from '@prisma/client';
import { BudgetIndicator } from '@/app/components/BudgetIndicator';
import { useState } from 'react';
import { FilterBar } from './FilterBar';
import { FilterValues } from '@/lib/types';
import { Pagination } from "@/app/components/ui/pagination";

interface ExpenseListProps {
   dateRange: DateRange | undefined;
}

const fetchExpenses = async (dateRange: DateRange | undefined, page: number): Promise<{ expenses: Expense[], total: number, page: number, totalPages: number }> => {
   const queryParams = new URLSearchParams();
   if (dateRange?.from) {
      const startDate = new Date(dateRange.from);
      startDate.setHours(0, 0, 0, 0);
      queryParams.append('startDate', startDate.toISOString());
   }
   if (dateRange?.to) {
      const endDate = new Date(dateRange.to);
      endDate.setHours(23, 59, 59, 999);
      queryParams.append('endDate', endDate.toISOString());
   }
   queryParams.append('page', page.toString());
   queryParams.append('limit', '5');

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

export function ExpenseList({ dateRange }: ExpenseListProps) {
   const { toast } = useToast();
   const queryClient = useQueryClient();
   const [currentPage, setCurrentPage] = useState(1);
   const [filters, setFilters] = useState<FilterValues>({
      category: null,
      paymentMode: null,
      priceSort: null,
      searchQuery: '',
   });

   const { data: monthlyTotal } = useQuery({
      queryKey: ['monthly-total', dateRange?.from, dateRange?.to],
      queryFn: async () => {
         const queryParams = new URLSearchParams();
         if (dateRange?.from) {
            const startDate = new Date(dateRange.from);
            startDate.setHours(0, 0, 0, 0);
            queryParams.append('startDate', startDate.toISOString());
         }
         if (dateRange?.to) {
            const endDate = new Date(dateRange.to);
            endDate.setHours(23, 59, 59, 999);
            queryParams.append('endDate', endDate.toISOString());
         }
         queryParams.append('type', 'total');
         const response = await fetch(`/api/expenses/summary?month=${currentMonth}&type=total`);
         if (!response.ok) return 0;
         const data = await response.json();
         return data.total;
      },
   });

   const { data, isLoading, isError } = useQuery({
      queryKey: ['expenses', dateRange?.from, dateRange?.to, currentPage],
      queryFn: () => fetchExpenses(dateRange, currentPage),
   });

   const getCategoryDetails = (categoryId: string) => {
      return categories.find(category => category.id === categoryId) || categories[categories.length - 1];
   };

   const filteredExpenses = data?.expenses.filter((expense) => {
      const matchesCategory = !filters.category || expense.categoryId === filters.category;
      const matchesPaymentMode = !filters.paymentMode || expense.paymentMode === filters.paymentMode;

      const searchQuery = filters.searchQuery.toLowerCase();
      const category = getCategoryDetails(expense.categoryId);
      const paymentMode = paymentModes.find(mode => mode.id === expense.paymentMode)?.name || 'Other';

      const matchesSearch = !searchQuery ||
         category.name.toLowerCase().includes(searchQuery) ||
         expense.description?.toLowerCase().includes(searchQuery) ||
         expense.amount.toString().includes(searchQuery) ||
         format(new Date(expense.date), 'MMM dd, yyyy').toLowerCase().includes(searchQuery) ||
         paymentMode.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesPaymentMode && matchesSearch;
   }) || [];

   const sortedExpenses = [...filteredExpenses].sort((a, b) => {
      if (filters.priceSort === 'high-to-low') {
         return Number(b.amount) - Number(a.amount);
      }
      if (filters.priceSort === 'low-to-high') {
         return Number(a.amount) - Number(b.amount);
      }
      return 0;
   });

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


   const currentMonth = dateRange?.from ? format(dateRange.from, 'yyyy-MM') : format(new Date(), 'yyyy-MM');
   const totalExpenses = monthlyTotal || 0;

   const handlePageChange = (page: number) => {
      setCurrentPage(page);
   };

   if (isLoading) {
      return <ExpensePageSkeleton />;
   }

   if (isError) {
      return <div>Error loading expenses</div>;
   }

   return (
      <div className="space-y-6">
         <FilterBar onFilterChange={setFilters} />
         <BudgetIndicator month={currentMonth} totalExpenses={totalExpenses} />
         <div className="bg-white rounded-lg border shadow-sm">
            <div className="grid grid-cols-6 gap-4 p-4 bg-gray-50 rounded-t-lg border-b">
               <div className="font-medium text-sm text-gray-600">Category</div>
               <div className="font-medium text-sm text-gray-600">Description</div>
               <div className="font-medium text-sm text-gray-600">Amount</div>
               <div className="font-medium text-sm text-gray-600">Date</div>
               <div className="font-medium text-sm text-gray-600">Payment Mode</div>
               <div className="font-medium text-sm text-gray-600 pl-2">Actions</div>
            </div>

            <div className="divide-y">
               {sortedExpenses.map((expense) => {
                  const category = getCategoryDetails(expense.categoryId);
                  return (
                     <div key={expense.id} className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-center gap-2">
                           <div
                              className="p-2 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: category.color }}
                           >
                              <span>{category.icon}</span>
                           </div>
                           <span className="text-sm font-medium text-gray-700">
                              {category.name}
                           </span>
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                           {getExpenseDescription(expense.description, category.name)}
                        </div>
                        <div className="text-sm font-semibold text-gray-900">
                           ₹{parseFloat(expense.amount.toString()).toFixed(2)}
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
            <div className="p-4 border-t bg-white">
               <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                     Showing {sortedExpenses.length} of {data?.total || 0} expenses
                  </p>
                  <Pagination
                     currentPage={currentPage}
                     totalPages={data?.totalPages || 1}
                     onPageChange={handlePageChange}
                  />
               </div>
            </div>
         </div>
         {sortedExpenses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border">
               <p className="text-gray-500 text-lg">
                  {dateRange ? (
                     "No expenses recorded for this month"
                  ) : (
                     "You haven't added any expenses yet"
                  )}
               </p>
               <p className="text-gray-400 text-sm mt-1">
                  {dateRange ? (
                     "Try selecting a different month or add new expenses"
                  ) : (
                     "Click the 'Add Expense' button to start tracking your spending"
                  )}
               </p>
            </div>
         )}
      </div>
   );
}
