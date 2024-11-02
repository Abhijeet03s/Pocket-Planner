'use client';

import { Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/app/components/ui/dialog";
import { ExpenseForm } from "./ExpenseForm";
import { useState } from "react";

export function AddExpenseButton() {
   const [open, setOpen] = useState(false);

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button className="gap-2">
               <Plus className="h-4 w-4" />
               Add Expense
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Add New Expense</DialogTitle>
               <DialogDescription className="text-sm text-muted-foreground">
                  Fill in the expense details below.
               </DialogDescription>
            </DialogHeader>
            <ExpenseForm onSuccess={() => setOpen(false)} />
         </DialogContent>
      </Dialog>
   );
}
