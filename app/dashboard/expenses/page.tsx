import { ExpenseForm } from "@/app/components/ExpenseForm";
import { ExpenseList } from "@/app/components/ExpenseList";

export default function ExpensesPage() {
   return (
      <div>
         <h1 className="text-2xl font-bold mb-4">Expense Management</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <h2 className="text-xl font-semibold mb-2">Add New Expense</h2>
               <ExpenseForm />
            </div>
            <div>
               <h2 className="text-xl font-semibold mb-2">Expense List</h2>
               <ExpenseList />
            </div>
         </div>
      </div>
   );
}