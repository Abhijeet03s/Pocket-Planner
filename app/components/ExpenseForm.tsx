'use client';

import { createElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from "date-fns";
import { Calendar as CalendarIcon, Wallet, CreditCard, Smartphone, Laptop, Landmark, MoreHorizontal } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { categories, paymentModes } from '@/lib/constants';
import { useExpenseContext } from "@/app/contexts/ExpenseContext";

const expenseSchema = z.object({
   amount: z.number().positive(),
   description: z.string().optional(),
   date: z.date(),
   categoryId: z.string().min(1, "Category is required"),
   paymentMode: z.string().min(1, "Payment mode is required"),
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

const paymentIcons = {
   'wallet': Wallet,
   'credit-card': CreditCard,
   'smartphone': Smartphone,
   'laptop': Laptop,
   'building-bank': Landmark,
   'more-horizontal': MoreHorizontal,
};

export function ExpenseForm() {
   const { triggerRefresh } = useExpenseContext();
   const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<ExpenseFormData>({
      resolver: zodResolver(expenseSchema),
      defaultValues: {
         date: new Date(),
      }
   });
   const [date, setDate] = useState<Date | undefined>(new Date());
   const [isLoading, setIsLoading] = useState(false);
   const { toast } = useToast();

   const onSubmit = async (data: ExpenseFormData) => {
      setIsLoading(true);
      try {
         const response = await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               ...data,
               date: data.date.toISOString(),
            }),
         });

         if (!response.ok) {
            throw new Error('Failed to create expense');
         }

         toast({
            title: "Expense created",
            description: "Your expense has been successfully added.",
         });
         reset();
         setDate(new Date());
         triggerRefresh(); // Add this line to trigger refresh
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

         <div className="grid grid-cols-6 gap-4">
            <div className="col-span-2">
               <Select onValueChange={(value) => setValue('categoryId', value)}>
                  <SelectTrigger>
                     <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                     {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                           <div className="flex items-center gap-2">
                              <div className="p-1 rounded" style={{ backgroundColor: category.color }}>
                                 {createElement(category.icon, {
                                    size: 16,
                                    style: { color: category.textColor }
                                 })}
                              </div>
                              <span style={{ color: category.textColor }}>{category.name}</span>
                           </div>
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               {errors.categoryId && <p className="text-red-500">{errors.categoryId.message}</p>}
            </div>

            {/* Payment Mode Selector - Takes 2 columns */}
            <div className="col-span-2">
               <Select onValueChange={(value) => setValue('paymentMode', value)}>
                  <SelectTrigger>
                     <SelectValue placeholder="Select payment mode" />
                  </SelectTrigger>
                  <SelectContent>
                     {paymentModes.map((mode) => (
                        <SelectItem key={mode.id} value={mode.id}>
                           <div className="flex items-center gap-2">
                              {createElement(paymentIcons[mode.icon as keyof typeof paymentIcons], {
                                 size: 16,
                                 className: "text-gray-600"
                              })}
                              <span>{mode.name}</span>
                           </div>
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
               {errors.paymentMode && <p className="text-red-500">{errors.paymentMode.message}</p>}
            </div>

            {/* Date Picker - Takes 2 columns */}
            <div className="col-span-2">
               <Popover>
                  <PopoverTrigger asChild>
                     <Button
                        variant={"outline"}
                        className={cn(
                           "w-full justify-start text-left font-normal",
                           !date && "text-muted-foreground"
                        )}
                     >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                     <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                           setDate(newDate);
                           setValue('date', newDate || new Date());
                        }}
                        initialFocus
                     />
                  </PopoverContent>
               </Popover>
               {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            </div>
         </div>

         <div>
            <Textarea
               placeholder="Description (optional)"
               className="resize-none"
               {...register('description')}
            />
         </div>

         <Button type="submit" disabled={isLoading} className="w-fit">
            {isLoading ? 'Adding...' : 'Add Expense'}
         </Button>
      </form>
   );
}
