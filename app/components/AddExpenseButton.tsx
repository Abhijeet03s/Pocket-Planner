'use client';

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { ExpenseForm } from "./ExpenseForm";

export function AddExpenseButton() {
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button className="gap-2">
               <Plus className="h-4 w-4" />
               Add Expense
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
               <DialogTitle>Add New Expense</DialogTitle>
               <DialogDescription>
                  Fill in the details below to add a new expense to your records.
               </DialogDescription>
            </DialogHeader>
            <ExpenseForm />
         </DialogContent>
      </Dialog>
   );
}
