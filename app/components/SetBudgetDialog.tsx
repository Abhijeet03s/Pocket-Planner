'use client';

import { useState } from 'react';
import { Button } from "@/app/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { PiggyBank } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from 'date-fns';

export function SetBudgetDialog() {
   const [open, setOpen] = useState(false);
   const [budget, setBudget] = useState('');
   const { toast } = useToast();

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
         const currentMonth = format(new Date(), 'yyyy-MM');
         const response = await fetch('/api/budget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               amount: parseFloat(budget),
               month: currentMonth
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
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium">
                     Budget Amount for {format(new Date(), 'MMMM yyyy')}
                  </label>
                  <div className="relative">
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                     <Input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="0.00"
                        required
                        min="0"
                        step="0.01"
                        className="pl-7 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                     />
                  </div>
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