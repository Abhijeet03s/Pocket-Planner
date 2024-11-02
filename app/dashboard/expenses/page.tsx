'use client';

import { AddExpenseButton } from "@/app/components/AddExpenseButton";
import { ExpenseList } from "@/app/components/ExpenseList";
import { Card } from "@/app/components/ui/card";
import { QueryClientProvider } from "@/app/providers/QueryClientProvider";
import { Suspense } from "react";
import { ExpensePageSkeleton } from "@/app/components/ExpensePageSkeleton";
import { SetBudgetDialog } from "@/app/components/SetBudgetDialog";
import { MonthSelector } from "@/app/components/MonthSelector";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function ExpensesPage() {
   const [date, setDate] = useState<DateRange | undefined>(() => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { from: start, to: end };
   });

   return (
      <QueryClientProvider>
         <Suspense fallback={<ExpensePageSkeleton />}>
            <div>
               <div className="flex justify-between items-center py-6">
                  <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
               </div>
               <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                     <div className="flex gap-2">
                        <SetBudgetDialog />
                        <MonthSelector
                           date={date}
                           onDateChange={setDate}
                        />
                     </div>
                     <AddExpenseButton />
                  </div>
                  <ExpenseList dateRange={date} />
               </Card>
            </div>
         </Suspense>
      </QueryClientProvider>
   );
}
