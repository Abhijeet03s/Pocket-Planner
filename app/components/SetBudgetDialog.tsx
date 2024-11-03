'use client';

import { useState, useEffect } from 'react';
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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DateRange } from "react-day-picker";

interface SetBudgetDialogProps {
   dateRange: DateRange | undefined;
}

export function SetBudgetDialog({ dateRange }: SetBudgetDialogProps) {
   const [open, setOpen] = useState(false);
   const [budget, setBudget] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const { toast } = useToast();
   const queryClient = useQueryClient();

   const currentMonth = dateRange?.from ? format(dateRange.from, 'yyyy-MM') : format(new Date(), 'yyyy-MM');
   const displayMonth = dateRange?.from ? format(dateRange.from, 'MMMM yyyy') : format(new Date(), 'MMMM yyyy');

   // Fetch existing budget
   const { data: existingBudget } = useQuery({
      queryKey: ['budget', currentMonth],
      queryFn: async () => {
         const response = await fetch(`/api/budget?month=${currentMonth}`);
         if (!response.ok) return null;
         const data = await response.json();
         return data;
      },
   });

   // Set initial budget value when dialog opens or month changes
   useEffect(() => {
      if (existingBudget?.amount) {
         setBudget(existingBudget.amount.toString());
      } else {
         setBudget('');
      }
   }, [existingBudget, open]);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         const response = await fetch('/api/budget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               amount: parseFloat(budget),
               month: currentMonth
            }),
         });

         if (!response.ok) throw new Error('Failed to set budget');

         // Invalidate queries to refresh the data
         await queryClient.invalidateQueries({ queryKey: ['budget'] });
         await queryClient.invalidateQueries({ queryKey: ['budget-comparison'] });

         toast({
            title: "Success",
            description: `Budget for ${displayMonth} has been ${existingBudget ? 'updated' : 'set'} successfully`,
         });
         setOpen(false);
      } catch (error) {
         console.error('Failed to set budget:', error);
         toast({
            title: "Error",
            description: "Failed to set budget",
            variant: "destructive",
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleReset = async () => {
      try {
         const response = await fetch('/api/budget', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               amount: 0,
               month: currentMonth
            }),
         });

         if (!response.ok) throw new Error('Failed to reset budget');

         await queryClient.invalidateQueries({ queryKey: ['budget'] });
         await queryClient.invalidateQueries({ queryKey: ['budget-comparison'] });

         toast({
            title: "Success",
            description: `Budget for ${displayMonth} has been reset successfully`,
         });
         setOpen(false);
      } catch (error) {
         console.error('Failed to reset budget:', error);
         toast({
            title: "Error",
            description: "Failed to reset budget",
            variant: "destructive",
         });
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
               <PiggyBank className="h-4 w-4" />
               {isSubmitting ? 'Loading...' : existingBudget?.amount > 0 ? 'Edit Budget' : 'Set Budget'}
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>
                  {existingBudget?.amount > 0 ? 'Edit' : 'Set'} Monthly Budget
               </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
               <div className="space-y-2">
                  <label className="text-sm font-medium">
                     Budget Amount for {displayMonth}
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
               <div className="flex justify-between items-center">
                  {existingBudget?.amount > 0 && (
                     <Button
                        type="button"
                        variant="destructive"
                        onClick={handleReset}
                        className="gap-2"
                     >
                        Reset Budget
                     </Button>
                  )}
                  <div className="flex gap-2 ml-auto">
                     <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                     </Button>
                     <Button type="submit">
                        {existingBudget?.amount > 0 ? 'Update' : 'Save'} Budget
                     </Button>
                  </div>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   );
}