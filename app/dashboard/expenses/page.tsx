import { ExpenseForm } from "@/app/components/ExpenseForm";
import { ExpenseList } from "@/app/components/ExpenseList";
import { Card } from "@/components/ui/card";
import { QueryClientProvider } from "@/app/providers/QueryClientProvider";

export default function ExpensesPage() {
   return (
      <QueryClientProvider>
         <div>
            <h1 className="text-3xl font-bold text-gray-900 py-6">Expense Management</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Expense</h2>
                  <ExpenseForm />
               </Card>
               <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Expense List</h2>
                  <ExpenseList />
               </Card>
            </div>
         </div>
      </QueryClientProvider>
   );
}
