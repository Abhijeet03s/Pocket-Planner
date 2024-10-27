import { AddExpenseButton } from "@/app/components/AddExpenseButton";
import { ExpenseList } from "@/app/components/ExpenseList";
import { Card } from "@/components/ui/card";
import { QueryClientProvider } from "@/app/providers/QueryClientProvider";
import { Suspense } from "react";
import { ExpensePageSkeleton } from "@/app/components/ui/ExpensePageSkeleton";

export default function ExpensesPage() {
   return (
      <QueryClientProvider>
         <Suspense fallback={<ExpensePageSkeleton />}>
            <div>
               <div className="flex justify-between items-center py-6">
                  <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
                  <AddExpenseButton />
               </div>
               <Card className="p-6">
                  <ExpenseList />
               </Card>
            </div>
         </Suspense>
      </QueryClientProvider>
   );
}
