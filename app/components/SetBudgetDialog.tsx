'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PiggyBank } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

export function SetBudgetDialog() {
   const [open, setOpen] = useState(false);
   const [budget, setBudget] = useState('');
   const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'));
   const { toast } = useToast();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const response = await fetch('/api/budget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               amount: parseFloat(budget),
               month
            }),
         });

         if (!response.ok) throw new Error('Failed to set budget');

         toast({
            title: "Success",
            description: "Budget has been set successfully",
         });
         setOpen(false);
      } catch (error) {
         console.error('Failed to set budget:', error);
         toast({
            title: "Error",
            description: "Failed to set budget",
            variant: "destructive",
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
               <PiggyBank className="h-4 w-4" />
               Set Budget
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Set Monthly Budget</DialogTitle>
               <DialogDescription>
                  Set your budget for the selected month.
               </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium">Month</label>
                  <Input
                     type="month"
                     value={month}
                     onChange={(e) => setMonth(e.target.value)}
                     required
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-sm font-medium">Budget Amount</label>
                  <Input
                     type="number"
                     value={budget}
                     onChange={(e) => setBudget(e.target.value)}
                     placeholder="Enter amount"
                     required
                     min="0"
                     step="0.01"
                  />
               </div>
               <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                     Cancel
                  </Button>
                  <Button type="submit">Save Budget</Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}