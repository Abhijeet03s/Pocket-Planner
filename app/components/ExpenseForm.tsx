'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast"

const expenseSchema = z.object({
   amount: z.number().positive(),
   description: z.string().min(1),
   date: z.string(),
   categoryId: z.string().optional(),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

export function ExpenseForm() {
   const { register, handleSubmit, reset, formState: { errors } } = useForm<ExpenseFormData>({
      resolver: zodResolver(expenseSchema),
   });
   const [isLoading, setIsLoading] = useState(false);
   const { toast } = useToast();

   const onSubmit = async (data: ExpenseFormData) => {
      setIsLoading(true);
      try {
         const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
         });

         if (!response.ok) {
            throw new Error('Failed to create expense');
         }

         toast({
            title: "Expense created",
            description: "Your expense has been successfully added.",
         });
         reset();
      } catch (error) {
         if (error instanceof Error) {
            toast({
               title: "Error",
               description: "Failed to create expense. Please try again.",
               variant: "destructive",
            });
         }
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         <div>
            <Input
               type="number"
               placeholder="Amount"
               step="0.01"
               {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
         </div>
         <div>
            <Textarea
               placeholder="Description"
               {...register('description')}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
         </div>
         <div>
            <Input
               type="date"
               {...register('date')}
            />
            {errors.date && <p className="text-red-500">{errors.date.message}</p>}
         </div>
         <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Expense'}
         </Button>
      </form>
   );
}